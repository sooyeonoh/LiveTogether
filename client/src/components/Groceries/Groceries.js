import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Search from './Search';
import GroceryList from './GroceryList';
import axios from 'axios';
import axiosConfig from "../../axiosConfig";

function Groceries(props) {

    const userID = props.match.params.id;

    const [groceries, setGroceries] = useState([]);

    useEffect(() => {
        const fetch = () => {
            axios.get("http://localhost:5000/groceries/" + userID, axiosConfig).then(res => {
                setGroceries(res.data);
                console.log("Found groceries");
                console.log(res.data);
            }).catch((error) => {
                console.log(error)
            });
        };
        fetch();
    }, [userID]);

    return (
        <div>
            <NavBar userID={userID} history={props.history}/>
            <div className="main-padding d-flex justify-content-center align-items-start" >
                <Search />
            </div>
            <GroceryList groceries={groceries} />

        </div>
    );
}

export default Groceries;