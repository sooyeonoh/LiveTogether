import React, {useState, useEffect} from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import axiosConfig from "../../axiosConfig";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import TaskItem from "./TaskItem";

function Tasks(props) {

    const [newTask, setNewTask] = useState({
        task: "",
        completed: false
    });
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/getTasks", axiosConfig).then(res => {
            setTaskList(res.data)
        }).catch(err => {
            console.log(err);
        })
    }, []);

    function handleChange(event) {
        setNewTask({
            task: event.target.value,
            completed: false
        });
    }

    function addTask(event) {
        event.preventDefault();
        axios.post("http://localhost:5000/addTask", newTask, axiosConfig).then(res => {
            setTaskList(prevList => [...prevList, res.data]);
            console.log("Successfully added task")
        }).catch(err => {
            console.log(err);
        })
        toggleAdd();
        setNewTask({
            task: "",
            completed: false
        });
    }

    function removeTask() {
        const completedTask = taskList.find(item => item.completed);
        axios.post("http://localhost:5000/removeTask", completedTask, axiosConfig).then(res => {
            setTaskList(taskList.filter(item => !item.completed));
            console.log(res.data.message);
        }).catch(err => {
            console.log(err);
        })
    }

    const [adding, setAddToggle] = useState(false);

    function toggleAdd() { setAddToggle(!adding) }

    function showInput() {
        return (
            <Form onSubmit={addTask} className="mt-2">
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="formBasicEmail">
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
        <div className='panel mr-3 d-flex flex-column justify-content-between'>
            <div>
                <h5>Upcoming Tasks</h5>
                <div className="d-flex flex-column flex-wrap pt-2" style={{overflow: '40vh'}}>
                    {taskList.map(t => 
                        <TaskItem taskItem={t} key={taskList.indexOf(t)} remove={removeTask}/>
                    )}
                </div>
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

export default Tasks;