import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";

const AppLink = ({ children, className, href }) => (
  <Link href={href}>
    <a className={className}>{children}</a>
  </Link>
);

const AppNavBar = () => {
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
          <Nav className="ml-auto">
            <AppLink href="/login" className="mr-3 nav-link">
              Sign In
            </AppLink>
            <AppLink
              href="/register"
              className="nav-link mr-3 btn btn-success bg-green-2 bright"
            >
              Sign Up
            </AppLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavBar;
