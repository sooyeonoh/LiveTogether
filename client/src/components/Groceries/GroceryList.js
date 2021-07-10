import React from 'react';
import { ListGroup } from 'react-bootstrap';
import GroceryItem from './GroceryItem';

function GroceryList(props) {
    return (
        <ListGroup>
            {props.groceries.map(g => 
                <GroceryItem groceryItem={g} key={props.groceries.indexOf(g)} />
            )}
        </ListGroup>
    );
}

export default GroceryList;