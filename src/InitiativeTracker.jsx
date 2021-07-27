import React, { Component } from 'react';
import { Sortable } from '@shopify/draggable';
import CharacterCard from './CharacterCard';
import './css/InitiativeTracker.css';


class InitiativeTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            characters: [{}]
        };
    }
    render() {
        const {
            characters
        } = this.state
        return(
            <div className='wrapper'>
                <div className='initiative-list'>
                    <div className="title-and-options">
                        <h2>Beans</h2>
                        <div>
                            <div className="button">
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                    {characters.map(char => 
                        <CharacterCard />               
                    )}
                </div>
                <div className='character-info'>
                </div>
            </div>
        )
    }
}

export default InitiativeTracker