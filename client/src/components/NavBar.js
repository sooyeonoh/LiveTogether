import React from 'react';
import { Navbar, Nav, Container } from "react-bootstrap";
import SignOut from "./Authentication/SignOut";

function NavBar(props) {

    return (
        <Navbar className="d-flex flex-column align-items-center justify-content-start" id="navbar" variant="dark">

            <Navbar.Brand className="m-0 mt-5 mb-5" href={"/dashboard/" + props.userID} style={{fontWeight: 'bolder'}}>LiveTogether</Navbar.Brand>
            <Nav className="w-100 d-flex flex-column align-items-center justify-content-center">
                <Nav.Link className="navlink" href={"/dashboard/" + props.userID}>Home</Nav.Link>
                <Nav.Link className="navlink" href={"/groceries/" + props.userID}>Groceries</Nav.Link>
                <Nav.Link className="navlink" href={"/messages/" + props.userID}>Messages</Nav.Link>
                <SignOut history={props.history}/>
            </Nav>

        </Navbar>
    );
}

export default NavBar;