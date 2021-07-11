import React from 'react';
import { ListGroup } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';

function SearchItem(props) {

    return (
        <ListGroup.Item className="d-flex justify-content-between">
            {props.item.name}
            <AddIcon onClick={() => props.addGrocery(props.item)}/>
        </ListGroup.Item>
    );
}

export default SearchItem;