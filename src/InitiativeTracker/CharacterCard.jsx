import React, { Component } from 'react';
import { connect } from 'react-redux';
import {removeCharacter, updateHealth} from '../store/actions';

class CharacterCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            index,
            removeCharacter,
            edit,
            characterInfo,
            updateHealth
        } = this.props;

        return (
            <div className={`character ${characterInfo.current ? 'current' : ''}`} >
                <div className='initiative'>
                    <span>Init.</span>
                    <h2>{characterInfo.initiative}</h2>
                </div>
                <div className='character-stats'>
                    <span className='character-name'>{characterInfo.name}</span>
                    <div className='health-and-ac'>
                        <span>AC: {characterInfo.ac}</span>
                        <span>Health: 
                             {characterInfo.currentHealth} 
                            /{characterInfo.maxHealth}
                        </span>
                    </div>
                    <div className='conditions'>
                        <span>Conditions:</span>
                        <input
                            type="text"
                            value={characterInfo.conditions} 
                            onChange={(e) => this.setState({conditions: e.target.value})}
                        />
                    </div>
                </div>
                <div className='character-settings'>
                    <div className='change-health'>
                    <div
                        className='button heal'
                        onClick={() => {
                        updateHealth(
                            index, 
                            parseInt(document.querySelector('#health-input').value, 10) || 0,
                            true
                        );
                        document.querySelector('#health-input').value = null;
                        }}
                    >
                        <span>Heal</span>
                    </div>
                    <input id="health-input" type="text"/>
                    <div
                        className='button harm'
                        onClick={() => {
                            updateHealth(
                                index, 
                                parseInt(document.querySelector('#health-input').value, 10) || 0,
                                false
                            );
                            document.querySelector('#health-input').value = null;
                        }}
                    >
                        <span>Damage</span>
                    </div>
                </div>
                <div className='button' onClick={() => removeCharacter(characterInfo)}>
                    Remove
                </div>
                <div className='button' onClick={() => edit()}>
                    Edit
                </div>
                </div>
                <div className='move-initiative'>
                    <div className='button move-up' />
                    <div className='button move-down' />
                </div>
            </div>
        )
    }
}

export default connect(null, {
  removeCharacter: removeCharacter,
  updateHealth: updateHealth
})(CharacterCard);