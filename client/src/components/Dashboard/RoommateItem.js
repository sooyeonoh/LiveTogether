import React from 'react';
import { ListGroup } from "react-bootstrap";

function RoommateItem(props) {

    return (
        <div>
            <ListGroup.Item>
                {props.roommateItem.fName} {props.roommateItem.lName}
            </ListGroup.Item>
        </div>
    );
}

export default RoommateItem;