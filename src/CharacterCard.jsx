import React, { Component } from 'react';

class CharacterCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentHealth: props.character.maxHealth
        };
    }
    render() {
        const {
            currentHealth
        } = this.state;
        const {
            remove,
            character,
        } = this.props;

        return (
            <div className='character' >
                <div className='initiative'>
                    <span>Init.</span>
                    <h2>{character.initiative}</h2>
                </div>
                <div className='character-stats'>
                    <span className='character-name'>{character.name}</span>
                    <div className='health-and-ac'>
                        <span>AC: {character.ac}</span>
                        <span>Health: 
                            <input 
                                value={currentHealth} 
                                className='current-health'
                                onChange={(e) => e && this.setState({currentHealth: parseInt(e.target.value, 10) || 0})}
                            /> 
                            / {character.maxHealth}
                        </span>
                    </div>
                    <div className='conditions'>
                        <span>Conditions:</span>
                        <input value={character.conditions} />
                    </div>
                </div>
                <div className='character-settings'>
                    <div className='button' onClick={() => remove()}>
                        Remove
                    </div>
                    <div className='button'>
                        Edit
                    </div>
                </div>
            </div>
        )
    }
}

export default CharacterCard;