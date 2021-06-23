import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosConfig from "../../axiosConfig";
import NavBar from '../NavBar';
import Roommates from './Roommates';
import Tasks from './Tasks';
import { Container, Jumbotron, Button, Row, Col } from "react-bootstrap";

function Dashboard(props) {

    const userID = props.match.params.id;
    const [user, setUser] = useState({
        fName: "",
        lName: "",
        username: "",
        email: ""
    });
    const [today, setDate] = React.useState(new Date());
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        const fetch = () => {
        axios.get("http://localhost:5000/dashboard/" + userID, axiosConfig).then(res => {
            setUser(res.data);
            console.log("Found user: " + res.data.fName);
        }).catch((error) => {
            console.log(error)
        });
        setDate(new Date());
    };
    fetch();
  }, [userID]);

    return (
        <div>
            <NavBar userID={userID} history={props.history}/>
            <div className="main-padding">
                <Jumbotron style={{backgroundColor: "lightgray"}} className="flex space-between card-padding border-radius">
                    <div>
                        <h1>Welcome back, {user.fName}</h1>
                        <p style={{fontSize: '18px', margin: '0'}}>
                            Today is {days[today.getDay()]}, {months[today.getMonth()]} {today.getDate()}
                        </p>
                    </div>
                    <p>
                        <Button variant="primary">See today's updates</Button>
                    </p>
                </Jumbotron>
                <Container fluid>
                    <Row className="flex space-around wrap">
                        <Col><Roommates/></Col>
                        <Col><Tasks/></Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Dashboard;