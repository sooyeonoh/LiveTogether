import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import SignOut from "./SignOut";

function NavBar(props) {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="/dashboard/:id">Coop</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/dashboard/home/:id">Home</Nav.Link>
                <Nav.Link href="/dashboard/groceries/:id">Groceries</Nav.Link>
                <Nav.Link href="/dashboard/messages/:id">Messages</Nav.Link>
                <SignOut history={props.history}/>
            </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;