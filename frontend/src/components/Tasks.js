import React, {useState, useEffect} from 'react';
import { Card, Form, Row, Col, ListGroup, Button } from "react-bootstrap";
import axios from "axios";
import TaskItem from "./TaskItem";

function Tasks(props) {

    const config = {
        withCredentials: true
    };

    const [addToggle, setAddToggle] = useState({
        add: false,
        button: '+'
    });

    const [newTask, setNewTask] = useState({
        task: "",
        completed: false,
        username: -1
    });
    const [taskList, setTaskList] = useState([]);

    function handleChange(event) {
        setNewTask({
            task: event.target.value,
            completed: false,
            username: taskList.length
        });
    }

    function toggleAdd() {
        setAddToggle({
            add: !addToggle.add, 
            button: addToggle.button === '+' ? '-' : '+'});
    }

    useEffect(() => {
        axios.get("http://localhost:5000/getTasks", config).then(res => {
            setTaskList(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    function addTask(event) {
        event.preventDefault();
        axios.post("http://localhost:5000/addTask", newTask, config).then(res => {
            setTaskList(prevList => [...prevList, res.data]);
            console.log("Successfully added task")
        }).catch(err => {
            console.log(err);
        })
        toggleAdd();
        setNewTask({
            task: "",
            completed: false,
            username: -1
        });
    }

    function removeTask() {
        const completedTask = taskList.find(item => item.completed);
        axios.post("http://localhost:5000/removeTask", completedTask, config).then(res => {
            setTaskList(taskList.filter(item => !item.completed));
            console.log(res.data.message);
        }).catch(err => {
            console.log(err);
        })
    }

    function showInput() {
        return (
            <Form onSubmit={addTask}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control onChange={handleChange} type="text" name="task" value={newTask.task} placeholder="Enter task" />
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
            <Card className="text-center-align margin-top margin-left">
                <Card.Header><h5>Upcoming Tasks</h5></Card.Header>
                <ListGroup variant="flush">
                    {taskList.map(t => {
                        return (
                            <TaskItem taskItem={t} key={taskList.indexOf(t)} remove={removeTask}/>
                        )
                    })}
                    <ListGroup.Item>
                            {addToggle.add && showInput()}
                            <Button onClick={toggleAdd} variant="outline-secondary" className="border-radius margin-small">{addToggle.button}</Button>
                        </ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default Tasks;