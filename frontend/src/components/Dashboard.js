import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard(props) {
    const userID = props.match.params.id;
    const [user, setUser] = useState({
        fName: "",
        lName: "",
        username: "",
        email: ""
    });

    useEffect(() => {
        const fetch = () => {
        axios.get("http://localhost:5000/dashboard/" + userID).then(res => {
            setUser(res.data);
            console.log("Found user: " + res.data.fName);
        }).catch((error) => {
            console.log(error)
        });
    };
    fetch();
  }, [userID]);

    return (
        <div>
            <h1>Hello {user.fName}</h1>
        </div>
    );
}

export default Dashboard;