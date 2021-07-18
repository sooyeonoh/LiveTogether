import React, { useState } from 'react';
import NearMeIcon from '@material-ui/icons/NearMe';
import { Modal, Button, Form } from 'react-bootstrap';
import Notification from './Notification';

function RoommateItem(props) {

    const [show, setShow] = useState(false);
    const [notify, setNotify] = useState(false);
    const [task, setTask] = useState({
        task: "",
        completed: false
    });

    const handleClose = () => { setShow(false); setTask({task: "", completed: false}) }
    const handleShow = () => { setShow(true); setNotify(false) };

    function sendTask() {
        handleClose();
        props.sendTask(props.roommateItem, task);
        setNotify(true);
    }

    function showNotification() {
        return (<Notification title={"Task sent to " + props.roommateItem.fName} color='#e1eec7'/>);
    }

    return (
        <div className="w-100 d-flex flex-row justify-content-between">
            <div>
                {props.roommateItem.fName} {props.roommateItem.lName}
            </div>
            <NearMeIcon id="buttonicon" onClick={handleShow}/>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title>Send a task to {props.roommateItem.fName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Control type="text" value={task.task} onChange={(event) => setTask(event.target.value)}/>
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={sendTask}>
                    Send
                </Button>
                </Modal.Footer>
            </Modal>

            {notify && showNotification()}

        </div>
        
    );
}

export default RoommateItem;