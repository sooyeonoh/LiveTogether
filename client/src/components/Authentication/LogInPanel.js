import React from 'react';
import { Button } from "react-bootstrap";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TelegramIcon from '@material-ui/icons/Telegram';
import "../../css/LogInPanel.css"

function LogInPanel(props) {

    return (
        <div className="full-height d-flex justify-content-center align-items-center">
            <Button className="btn-small" href="/signin" onClick={props.triggerHide} variant="dark" size="lg">
                <TelegramIcon className="btn-icon"/>
                Sign In
              </Button>
              <Button className="btn-small" href="/signup" onClick={props.triggerHide} variant="dark" size="lg">
                  <PersonAddIcon className="btn-icon"/>
                  Sign Up
              </Button>
        </div>
    );
}

export default LogInPanel;