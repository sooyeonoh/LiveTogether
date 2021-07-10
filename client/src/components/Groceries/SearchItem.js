import React from 'react';
import axios from 'axios';
import axiosConfig from "../../axiosConfig";
import { ListGroup } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';

function SearchItem(props) {

    const grocery = {
        id: props.item.id,
        name: props.item.name,
        img: props.item.image,
        aisle: props.item.aisle,
        count: 1,
        username: props.item.id
    }

    function addGrocery(event) {
        event.preventDefault();
        axios.post("http://localhost:5000/addGrocery", grocery, axiosConfig).then(res => {
            
            console.log("Successfully added grocery")
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <ListGroup.Item className="d-flex justify-content-between">
            {props.item.name}
            <AddIcon onClick={addGrocery}/>
        </ListGroup.Item>
    );
}

export default SearchItem;