import React from 'react';
import { ListGroup } from "react-bootstrap";
import NearMeIcon from '@material-ui/icons/NearMe';

function RoommateItem(props) {

    return (
        <div className="w-100 d-flex flex-row justify-content-between">
            <div>
                {props.roommateItem.fName} {props.roommateItem.lName}
            </div>
            <NearMeIcon id="buttonicon" onClick={() => props.sendTask(props.roommateItem)}/>
        </div>
        
    );
}

export default RoommateItem;