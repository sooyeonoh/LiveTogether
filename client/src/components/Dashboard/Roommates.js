import React, { useState, useEffect } from 'react';
import axios from "axios";
import axiosConfig from "../../axiosConfig";
import { Card, ListGroup, Button, Form, Row, Col } from "react-bootstrap";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
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
            setRoommateList(prevList => [...prevList, res.data]);
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

    function sendTask(recipient) {
        axios.post("http://localhost:5000/sendTask", recipient, axiosConfig).then(res => {
            
        }).catch(err => {
            console.log(err);
        })
    }

    const [adding, setAddToggle] = useState(false);

    function toggleAdd() { setAddToggle(!adding) }

    function showInput() {
        return (
            <Form onSubmit={addRoommate} className="mt-2">
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
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
        <div className='panel d-flex flex-column justify-content-between'>
            <div>
                <h5>Your Home</h5>
                <ListGroup variant="flush">
                    <ListGroup.Item></ListGroup.Item>
                    {roommateList.map(r =>
                        <ListGroup.Item className="pt-3 pb-3" key={roommateList.indexOf(r)}>
                            <RoommateItem roommateItem={r} sendTask={sendTask}/>
                        </ListGroup.Item>
                    )}
                    <ListGroup.Item></ListGroup.Item>
                </ListGroup>
            </div>
            <div>
                {adding && showInput()}
                <div className="m-auto d-flex justify-content-end">
                    {adding === true ? <RemoveCircleIcon id="buttonicon" onClick={toggleAdd} /> : <AddCircleIcon id="buttonicon" onClick={toggleAdd}/>}
                </div>
            </div>
        </div>
        
    );
}

export default Roommates;