import React, {useState} from 'react';
import { Card, ListGroup, Button, Form, Row, Col } from "react-bootstrap";

function Roommates(props) {

    const [addToggle, setAddToggle] = useState({
        add: false,
        button: '+'
    });

    const [roommate, setRoommate] = useState({
        email: ""
    })

    function addRoommate(event) {
        event.preventDefault();
        const user = {
            email: roommate.email
        }
    }

    function handleChange(event) {
        setRoommate(event.target.value);
      }

    function toggleAdd(event) {
        event.preventDefault();
        setAddToggle({
            add: !addToggle.add, 
            button: addToggle.button === '+' ? '-' : '+'});
    }

    return (
        <div>
            <Card className="text-center-align border-radius margin-top margin-right">
                <Card.Header><h5>Your roommates</h5></Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>John Smith</ListGroup.Item>
                    <ListGroup.Item>Anne Doe</ListGroup.Item>
                    <ListGroup.Item>Jenny Song</ListGroup.Item>
                    <ListGroup.Item>
                        <Button onClick={toggleAdd} variant="outline-secondary" className="border-radius margin-small">{addToggle.button}</Button>
                        {addToggle.add && <Form onSubmit={addRoommate}>
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
                                </Form>}
                        
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default Roommates;