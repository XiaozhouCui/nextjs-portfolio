import { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import withApollo from "@/hoc/withApollo";
import { useLazyGetUser } from "@/apollo/actions";

const AppLink = ({ children, className, href }) => (
  <Link href={href}>
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

  if (data) {
    if (data.user && !user) {
      setUser(data.user);
      setHasResponse(true);
    }

    if (!data.user && !hasResponse) {
      setHasResponse(true);
    }
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
                  <span className="nav-link mr-4">Welcome {user.username}</span>
                  <AppLink href="/login" className="nav-link btn btn-danger">
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
