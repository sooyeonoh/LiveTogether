import React from 'react';
import { Button } from "react-bootstrap";

function GoogleButton(props) {

    return (
        <div>
            <p>or</p>
            <Button variant="outline-primary" href="http://localhost:5000/auth/google" style={{marginTop: '0'}}>Sign in with Google</Button>
        </div>
    );
}

export default GoogleButton;