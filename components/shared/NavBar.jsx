import { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import withApollo from "@/hoc/withApollo";
import { useLazyGetUser } from "@/apollo/actions";

const AppLink = ({ children, className, href, as }) => (
  <Link href={href} as={as}>
    <a className={className}>{children}</a>
  </Link>
);

const AppNavBar = () => {
  // local state
  const [user, setUser] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);

  // @apollo/client action: useLazyQuery(GET_USER)
  const [getUser, { data, error }] = useLazyGetUser();

  useEffect(() => {
    getUser();
  }, []);

  // update local state with gql response
  if (data) {
    if (data.user && !user) setUser(data.user);
    if (!data.user && user) setUser(null);
    if (!hasResponse) setHasResponse(true);
  }

  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark jc-mw9">
        <AppLink href="/" className="navbar-brand mr-3 font-weight-bold">
          Joe Cui
        </AppLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <AppLink href="/portfolios" className="nav-link mr-3">
              Portfolios
            </AppLink>
            <AppLink href="/forum/categories" className="mr-3 nav-link">
              Forum
            </AppLink>
            <AppLink href="/cv" className="mr-3 nav-link">
              CV
            </AppLink>
          </Nav>
          {hasResponse && (
            <Nav className="ml-auto">
              {user && (
                <>
                  <span className="nav-link mr-2">Welcome {user.username}</span>
                  <NavDropdown
                    className="mr-2"
                    title="Manage"
                    id="basic-nav-dropdown"
                  >
                    {(user.role === "admin" || user.role === "instructor") && (
                      <>
                        <AppLink
                          href="/portfolios/new"
                          className="dropdown-item"
                        >
                          Create Portfolio
                        </AppLink>
                        <AppLink
                          href="/instructor/[id]/dashboard"
                          // "as" attribute comes from next/link
                          as={`/instructor/${user._id}/dashboard`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </AppLink>
                      </>
                    )}
                  </NavDropdown>
                  <AppLink href="/logout" className="nav-link btn btn-danger">
                    Sign Out
                  </AppLink>
                </>
              )}
              {(error || !user) && (
                <>
                  <AppLink href="/login" className="mr-3 nav-link">
                    Sign In
                  </AppLink>
                  <AppLink
                    href="/register"
                    className="nav-link mr-3 btn btn-success bg-green-2 bright"
                  >
                    Sign Up
                  </AppLink>
                </>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withApollo(AppNavBar);
