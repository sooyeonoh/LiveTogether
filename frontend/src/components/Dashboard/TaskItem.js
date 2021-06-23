import React from 'react';
import { ListGroup } from "react-bootstrap";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

function TaskItem(props) {

    function markComplete() {
        props.taskItem.completed = true;
        props.remove();
    }

    return (
        <div>
            <ListGroup.Item style={{ textAlign: 'left' }}>
                {props.taskItem.completed ? <CheckBoxIcon className="margin-small"/>
                : <CheckBoxOutlineBlankIcon onClick={markComplete} className="margin-small"/>
                }
                {props.taskItem.task}
            </ListGroup.Item>
        </div>
    );
}

export default TaskItem;