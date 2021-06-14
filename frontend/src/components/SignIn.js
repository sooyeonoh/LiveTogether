import React, {useState} from 'react';
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import GoogleButton from "./GoogleButton";
import "../css/SignIn.css";

function SignIn(props) {

    const [profile, setProfile] = useState({
        username: "",
        email: "",
        password: ""
    });

    function handleChange(event) {
      const { name, value } = event.target;
  
      setProfile(prevValue => {
        if (name === "email") {
          return {
            ...prevValue,
            email: value,
            username: value
          };
        } else if (name === "password") {
          return {
            ...prevValue,
            password: value };
        }
      });
    }

    function handleSubmit(event) {
      event.preventDefault();

      const user = {
        username: profile.username,
        email: profile.email,
        password: profile.password
      }

      axios.post('http://localhost:5000/signin', user, {withCredentials: true})
        .then(res => {
          if (res.data._id) {
            console.log("User ID is: " + res.data._id);
            console.log("Redirecting to dashboard");
            props.history.push("/dashboard/" + res.data._id);
          }
        }).catch((error) => {
            console.log(error)
        });

      setProfile({ username: '', email: '', password: '' });
    }

    return (
      <div>
        <Form className="form" onSubmit={handleSubmit} >
            <h1>Sign In</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control onChange={handleChange} type="email" name="email" value={profile.email} placeholder="Email address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control onChange={handleChange} type="password" name="password" value={profile.password} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <GoogleButton/>
        </Form>
      </div>
    );
}

export default SignIn;