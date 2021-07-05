import React from 'react';
import { ListGroup } from 'react-bootstrap';

function GroceryList(props) {
    return (
        <ListGroup>
            {props.groceries.map(item => 
                <ListGroup.Item>item</ListGroup.Item>
            )}
        </ListGroup>
    );
}

export default GroceryList;