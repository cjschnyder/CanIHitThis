import React, { useRef, Component } from 'react';
import Sortable from '@shopify/draggable/lib/sortable';
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
                <section className='initiative-list'>
                    <div className='title-and-options'>
                        <h2>Initiative Order</h2>
                        <div>
                            <div className="button">
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                    {characters.map(char => 
                        <CharacterCard />
                    )}
                </section>
                <section className='character-info'>
                </section>
                <section id='add-characters-modal'>
                    
                </section>
            </div>
        )
    }
}

export default InitiativeTracker