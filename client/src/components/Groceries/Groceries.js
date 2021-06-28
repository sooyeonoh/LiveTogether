import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import axiosConfig from "../../axiosConfig";
import NavBar from '../NavBar';

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
            <SearchBar/>
        </div>
    );
}

export default Groceries;