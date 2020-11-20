import { Navbar, NavDropdown, Nav } from "react-bootstrap";

const AppNavBar = () => {
  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark jc-mw9">
        <Navbar.Brand className="mr-3 font-weight-bold" href="#">
          Joe Cui
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="#" className="mr-3">
              Portfolios
            </Nav.Link>
            <Nav.Link href="#" className="mr-3">
              Forum
            </Nav.Link>
            <Nav.Link href="#" className="mr-3">
              CV
            </Nav.Link>
            <Nav.Link href="#" className="mr-3">
              Ask me
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="#" className="mr-3">
              Sign Up
            </Nav.Link>
            <Nav.Link
              href="#"
              className="mr-3 btn btn-success bg-green-2 bright"
            >
              Sign In
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AppNavBar;
