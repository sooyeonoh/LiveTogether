import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import SignOut from "./Authentication/SignOut";

function NavBar(props) {

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href={"/dashboard/" + props.userID}>Coop</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href={"/dashboard/" + props.userID}>Home</Nav.Link>
                <Nav.Link href={"/groceries/" + props.userID}>Groceries</Nav.Link>
                <Nav.Link href={"/messages/" + props.userID}>Messages</Nav.Link>
                <SignOut history={props.history}/>
            </Nav>
            </Container>
        </Navbar>
    );
}

export default NavBar;