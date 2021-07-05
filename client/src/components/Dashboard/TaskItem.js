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
            <ListGroup.Item className="text-left">
                {props.taskItem.completed ? <CheckBoxIcon className="m-1"/>
                : <CheckBoxOutlineBlankIcon onClick={markComplete} className="m-1"/>
                }
                {props.taskItem.task}
            </ListGroup.Item>
        </div>
    );
}

export default TaskItem;