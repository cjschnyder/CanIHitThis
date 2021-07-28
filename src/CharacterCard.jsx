import React, { Component } from 'react';

class CharacterCard extends Component {
    render() {
        return (
            <div className='character' >
                <div className='initiative'>
                    <span>Init.</span>
                    <input/>
                </div>
                <div className='character-stats'>
                    <span className='character-name'>Name Filler</span>
                    <div className='health-and-ac'>
                        <span>AC: #</span>
                        <span>Health: # / #</span>
                    </div>
                    <div className='conditions'>
                        <span>Conditions:</span>
                        <input />
                    </div>
                </div>
            </div>
        )
    }
}

export default CharacterCard;