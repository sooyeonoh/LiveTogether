import React from 'react';
import axios from 'axios';
import axiosConfig from "../../axiosConfig";
import { Button } from "react-bootstrap";

function SignOut(props) {

    const signOut = () => {
        axios.get("http://localhost:5000/signout", axiosConfig)
            .then(res => {
                if (res.status === 200) {
                    console.log("Sign out successful");
                    props.history.push("/");
                }
            }).catch(err => {
                console.log("Failed to sign out", err);
          });
    }

    return (
        <Button onClick={signOut}>
            Sign Out
        </Button>
    );
}

export default SignOut;