import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import logo from './dTwentyIconWPerc.png';
import StatsCalculator from './StatsCalculator';
import InitiativeTracker from './InitiativeTracker';
import './css/CanIHitThis.css';

class CanIHitThis extends Component {
    render() {        
        return(
            <div id='hitThis'>
                <BrowserRouter>
                     <header>
                        <img src={logo} className="dice-logo" alt="dice logo" />
                        <h1 className="title">Can I Hit This?</h1>
                        <div className="nav-menu">
                            <a href='/'>
                                <div className="link">
                                    <span>Stats Calculator</span>
                                </div>
                            </a>
                            <a href='/initiative'>
                                <div className="link">
                                    <span>Initiative Tracker</span>
                                </div>
                            </a>
                        </div>
                    </header>
                    <Switch>
                        <Route path='/initiative'><InitiativeTracker /></Route>
                        <Route path='/'><StatsCalculator /></Route>
                    </Switch>
                </BrowserRouter>
            
            </div>
        )
    }
}

export default CanIHitThis;