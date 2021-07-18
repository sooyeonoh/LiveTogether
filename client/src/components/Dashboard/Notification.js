import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import CloseIcon from '@material-ui/icons/Close';

function Notification(props) {

    const [show, setShow] = useState(true);

    setTimeout(function() {
        setShow(false)}
    , 3000);

    return (
        <Modal
            size="sm"
            show={show}
            id="notification"
        >
            <Modal.Header style={{backgroundColor: props.color, border:'none', borderRadius: '5px'}}>
                <Modal.Title id="example-modal-sizes-title-sm" style={{fontSize: '18px'}}>
                    {props.title}
                </Modal.Title>
                <CloseIcon id="buttonicon" style={{color: 'black'}} onClick={() => setShow(false)}/>
            </Modal.Header>

        </Modal>
    );
}

export default Notification;