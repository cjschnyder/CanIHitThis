import React, { Component } from 'react';

class CharacterCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentHealth: props.character.maxHealth,
            conditions: props.character.conditions
        };
    }
    render() {
        const {
            currentHealth,
            conditions
        } = this.state;
        const {
            remove,
            character,
        } = this.props;

        return (
            <div className={`character ${character.current ? 'current' : ''}`} >
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
                                onChange={(e) => this.setState({currentHealth: parseInt(e.target.value, 10) || 0})}
                            /> 
                            / {character.maxHealth}
                        </span>
                    </div>
                    <div className='conditions'>
                        <span>Conditions:</span>
                        <input 
                            value={conditions} 
                            onChange={(e) => this.setState({conditions: e.target.value})}
                        />
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