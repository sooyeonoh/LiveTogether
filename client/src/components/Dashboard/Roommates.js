import React, { useState, useEffect } from 'react';
import axios from "axios";
import axiosConfig from "../../axiosConfig";
import { Card, ListGroup, Button, Form, Row, Col } from "react-bootstrap";
import RoommateItem from "./RoommateItem";

function Roommates(props) {

    const [roommate, setRoommate] = useState({
        email: "",
        username: "",
        removed: false
    })

    const [roommateList, setRoommateList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/getRoommates", axiosConfig).then(res => {
            setRoommateList(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    function handleChange(event) {
        setRoommate({
            email: event.target.value,
            username: event.target.value,
            removed: false
        })
    }

    function addRoommate(event) {
        event.preventDefault();
        axios.post("http://localhost:5000/addRoommate", roommate, axiosConfig).then(res => {
            setRoommateList(prevList => [...prevList, res.data._id]);
            console.log("Successfully added roommate")
        }).catch(err => {
            console.log(err);
        })
        toggleAdd();
        setRoommate({
            email: "",
            username: "",
            removed: false
        });
    }

    const [addToggle, setAddToggle] = useState({
        add: false,
        button: '+'
    });

    function toggleAdd() {
        setAddToggle({
            add: !addToggle.add, 
            button: addToggle.button === '+' ? '-' : '+'});
    }

    function showInput() {
        return (
            <Form onSubmit={addRoommate}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control onChange={handleChange} type="email" name="email" value={roommate.email} placeholder="Enter email address" />
                        </Form.Group>
                    </Col>
                    <Col xs="auto">
                        <Button variant="light" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }

    return (
        <div>
            <Card className="text-center-align border-radius margin-top margin-right">
                <Card.Header><h5>Your roommates</h5></Card.Header>
                <ListGroup variant="flush">
                    {roommateList.map(r => {
                        return (
                            <RoommateItem roommateItem={r} key={roommateList.indexOf(r)} />
                        )
                    })}
                    <ListGroup.Item>
                        <Button onClick={toggleAdd} variant="outline-secondary" className="border-radius margin-small">{addToggle.button}</Button>
                        {addToggle.add && showInput()}
                        
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default Roommates;