import React from 'react';
import { Card } from 'react-bootstrap';
import CancelIcon from '@material-ui/icons/Cancel';

const GroceryItem = (props) => (
        <Card className="border-0 m-2 p-1 pt-4" style={{ width: '180px', boxShadow: '1px 1px 5px rgba(0, 0, 0, .15)'}}>
            <Card.Img className="m-auto" style={{ maxWidth: '75px', maxHeight: '75px' }} variant="top" src={"https://spoonacular.com/cdn/ingredients_100x100/"+ props.groceryItem.image} />
            <CancelIcon type="button" onClick={() => props.remove(props.groceryItem)} className="position-absolute" style={{top: '0', right: '0', margin: '10px 10px 0 0', color: 'lightgray'}}/>
                <Card.Body>
                    <Card.Title>{props.groceryItem.name}</Card.Title>
                    <Card.Text className="d-flex justify-content-between">
                        <p style={{color: 'gray'}}>
                            {props.groceryItem.count} kg
                        </p>
                        <p style={{color: '#fb6c70', fontWeight: 'bolder'}}>
                            ${props.groceryItem.count * props.groceryItem.cost}
                        </p>
                    </Card.Text>
                </Card.Body>
        </Card>
    );

export default GroceryItem;