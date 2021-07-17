import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from 'recharts';
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
        <div className="view">
            <NavBar userID={userID} history={props.history}/>
            <div className="main-padding">
                <Container fluid className="p-0">
                    <Jumbotron className="panel d-flex justify-content-between align-items-center" style={{padding: '35px'}}>
                        <div>
                            <h1>Welcome back, {user.fName}</h1>
                            <p style={{fontSize: '18px', margin: '0'}}>
                                Today is {days[today.getDay()]}, {months[today.getMonth()]} {today.getDate()}
                            </p>
                        </div>
                        <button className="border-0 p-2" style={{width: '200px',height: '40px', color: 'white', backgroundColor: '#fb6c70', borderRadius: '20px'}}>See today's updates</button>
                    </Jumbotron>
                </Container>
                <Container fluid className="p-0 mt-4">
                    <Row className="d-flex justify-content-around flex-wrap">
                        <Col xs={8}><Tasks/></Col>
                        <Col><Roommates/></Col>
                    </Row>
                </Container>
                <Container fluid className="p-0">
                    <div className='panel mt-4 d-flex flex-column justify-content-between'>
                        <div>
                            <h5>Task Tracker</h5>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Dashboard;