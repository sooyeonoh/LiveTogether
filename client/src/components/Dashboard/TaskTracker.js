import React, { useEffect } from 'react';
import { BarChart } from 'recharts';
import axios from 'axios';
import axiosConfig from "../../axiosConfig";

function TaskTracker(props) {

    useEffect(() => {
        axios.get("http://localhost:5000/getTaskData", axiosConfig).then(res => {
            
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <div className='panel mt-3 d-flex flex-column justify-content-between'>
            <div>
                <h5>Task Tracker</h5>
            </div>

        </div>
    );
}

export default TaskTracker;