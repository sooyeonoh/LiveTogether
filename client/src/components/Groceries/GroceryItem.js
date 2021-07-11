import React from 'react';
import { Card } from 'react-bootstrap';

const GroceryItem = (props) => (
        <Card style={{ width: '200px' }}>
            <Card.Img className="m-auto" style={{ width: '100px' }} variant="top" src={"https://spoonacular.com/cdn/ingredients_100x100/"+ props.groceryItem.img} />
                <Card.Body>
                    <Card.Title>{props.groceryItem.name}</Card.Title>
                    <Card.Text>
                    {props.groceryItem.count}
                    ${parseFloat(props.groceryItem.count) * parseFloat(props.groceryItem.cost)}
                    </Card.Text>
                </Card.Body>
        </Card>
    );

export default GroceryItem;