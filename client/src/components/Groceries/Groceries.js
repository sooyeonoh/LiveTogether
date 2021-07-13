import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Search from './Search';
import GroceryItem from './GroceryItem';
import axios from 'axios';
import axiosConfig from "../../axiosConfig";

function Groceries(props) {

    const userID = props.match.params.id;

    const [groceries, setGroceries] = useState([]);

    useEffect(() => {
        const fetch = () => {
            axios.get("http://localhost:5000/groceries/" + userID, axiosConfig).then(res => {
                setGroceries(res.data);
                console.log(res.data);
            }).catch((error) => {
                console.log(error)
            });
        };
        fetch();
    }, [userID]);

    function addToGroceryList(grocery) {
        setGroceries([...groceries, grocery])
    }

    return (
        
        <div className="view">
            <NavBar userID={userID} history={props.history}/>
            <div className="main-padding d-flex justify-content-between align-items-start" >
                <Search showAddedGrocery={addToGroceryList}/>
                <div className='w-100 h-100 rounded' style={{marginLeft: '2em', backgroundColor: "white", padding: '35px'}}>
                    <h3>Your Groceries</h3>
                    <div className="d-flex flex-wrap">
                        {groceries.map(g => 
                            <GroceryItem groceryItem={g} key={groceries.indexOf(g)} />
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Groceries;