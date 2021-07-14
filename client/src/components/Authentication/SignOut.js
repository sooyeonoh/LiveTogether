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
        <button className="btn btn-light position-absolute mb-5 bottom-0 border-0" style={{width: '120px', height: '40px', backgroundColor: '#a7d1e7', borderRadius: '20px'}} onClick={signOut}>
            Sign Out
        </button>
    );
}

export default SignOut;