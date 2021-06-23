import React, { useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import GoogleButton from './GoogleButton';
import axios from "axios";
import axiosConfig from "../../axiosConfig";
import "../../css/SignIn.css";

function SignUp(props) {

    const [profile, setProfile] = useState({
        fName: "",
        lName: "",
        username: "",
        email: "",
        password: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
    
        setProfile(prevProfile => {
          switch (name) {
            case "email":
              return {
                ...prevProfile,
                email: value,
                username: value
              };
            case "password":
              return {
                ...prevProfile,
                password: value
              };
            case "fName":
              return {
                ...prevProfile,
                fName: value
              };
            case "lName":
              return {
                ...prevProfile,
                lName: value
              }
            default:
              return prevProfile;
          }
        });
    }

    function handleSubmit(event) {
      event.preventDefault();

      const user = {
        fName: profile.fName,
        lName: profile.lName,
        username: profile.username,
        email: profile.email,
        password: profile.password
      }

      axios.post('http://localhost:5000/signup', user, axiosConfig)
        .then((res) => {
            if (res.data._id) {
              console.log("Redirecting to dashboard for user ID: " + res.data._id);
              props.history.push("/dashboard/:" + res.data._id);
          }
        }).catch((error) => {
            console.log(error)
        });

      setProfile({ fName: '', lName: '', username: '', email: '', password: '' })
    }

    return (
      <div className="center-container text-center-align">
        <Form className="form card-padding border-radius" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <Row className="g-2">
              <Col md>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control onChange={handleChange} type="text" name="fName" value={profile.fName} placeholder="First Name"/>
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                  <Form.Control onChange={handleChange} type="text" name="lName" value={profile.lName} placeholder="Last Name" />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control onChange={handleChange} type="email" name="email" value={profile.email} placeholder="Email address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control onChange={handleChange} type="password" name="password" value={profile.password} placeholder="Password" />
            </Form.Group>
            <Button className="margin-bottom" variant="primary" type="submit">
                Submit
            </Button>
            <GoogleButton/>
        </Form>
      </div>
    );
}

export default SignUp;