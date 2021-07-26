import React, { Component } from 'react';
import { Sortable } from '@shopify/draggable';
import './css/InitiativeTracker.css';


class InitiativeTracker extends Component {
    render() {
        return(
            <div className='wrapper'>
                <div className='initiative-list'>
                    Beans
                </div>
                <div className='character-info'>
                </div>
            </div>
        )
    }
}

export default InitiativeTracker