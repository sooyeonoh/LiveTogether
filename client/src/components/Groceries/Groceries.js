import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Search from './Search';
import GroceryItem from './GroceryItem';
import axios from 'axios';
import axiosConfig from "../../axiosConfig";

function Groceries(props) {

    const userID = props.match.params.id;

    const [groceries, setGroceries] = useState([]);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const fetch = () => {
            axios.get("http://localhost:5000/groceries/" + userID, axiosConfig).then(res => {
                setGroceries(res.data);
                res.data.forEach(g => {
                    setPrice(prevPrice => (parseFloat(prevPrice) + parseFloat(g.cost)).toFixed(2))
                })
            }).catch((error) => {
                console.log(error)
            });
        };
        fetch();
    }, [userID]);

    function updateGroceryList(list) {
        setGroceries(list)
        list.forEach(g => {
            setPrice(prevPrice => (parseFloat(prevPrice) + parseFloat(g.cost)).toFixed(2))
        })
    }

    function removeGrocery(grocery) {
        axios.post("http://localhost:5000/removeGrocery", grocery, axiosConfig).then(res => {
            setGroceries(res.data);
            setPrice(prevPrice => (parseFloat(prevPrice) - parseFloat(grocery.cost)).toFixed(2));
            console.log("Successfully removed grocery")
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        
        <div className="view">
            <NavBar userID={userID} history={props.history}/>
            <div className="main-padding d-flex justify-content-between align-items-start" >
                <Search updateGroceryList={updateGroceryList}/>
                <div className='panel d-flex flex-column justify-content-between' style={{marginLeft: '2em'}}>
                    <div>
                        <h3>Your Groceries</h3>
                        <div className="d-flex flex-wrap" style={{overflow: 'scroll', marginTop: '15px'}}>
                            {groceries.map(g => 
                                <GroceryItem groceryItem={g} remove={removeGrocery} key={groceries.indexOf(g)} />
                            )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button className="border-0 d-flex justify-content-between align-items-center" style={{paddingLeft: '1.5rem', paddingRight: '1.5rem', width: '255px',height: '50px', color: 'white', backgroundColor: '#fb6c70', borderRadius: '20px'}}>
                            <div style={{fontSize: '18px'}}> Estimated Total </div>
                            <div style={{fontSize: '18px', fontWeight: 'bolder'}}> ${price} </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Groceries;