import React from 'react';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

function TaskItem(props) {

    function markComplete() {
        props.taskItem.completed = true;
        props.remove();
    }

    return (
        <div>
            {props.taskItem.completed ? <CheckBoxIcon className="d-inline"/>
            : <CheckBoxOutlineBlankIcon className="d-inline" onClick={markComplete}/>
            }
            <div className="d-inline" style={{marginLeft: '1rem'}}>
                {props.taskItem.task}
            </div>
        </div>
    );
}

export default TaskItem;