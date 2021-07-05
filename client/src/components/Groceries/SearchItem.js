import React from 'react';
import { ListGroup } from 'react-bootstrap';

function SearchItem(props) {
    return (
        <ListGroup.Item>
            {props.item.name}
        </ListGroup.Item>
    );
}

export default SearchItem;