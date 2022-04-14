import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditCharacter from './EditCharacter';
import {
    removeCharacter,
    updateHealth,
    moveCharacterDown,
    moveCharacterUp
} from '../store/actions';

class CharacterCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openEdit: false
        }
    }
    render() {
        const {
            index,
            removeCharacter,
            characterInfo,
            currentTurn,
            updateHealth,
            moveCharacterDown,
            moveCharacterUp
        } = this.props;
        const {
            openEdit
        } = this.state
        
        const toggleEditModal = () => {
            this.setState({openEdit: !openEdit});
        }

        return (
            <div className={`character ${currentTurn ? 'current' : ''}`} >
                <div className='initiative'>
                    <span>Init.</span>
                    <h2>{characterInfo.initiative}</h2>
                </div>
                <div className='character-stats'>
                    <span className='character-name'>{characterInfo.name}</span>
                    <div className='health-and-ac'>
                        <span>AC: {characterInfo.ac}</span>
                        {
                            characterInfo.currentHealth === 0 ?
                                <div>
                                    <span>
                                        Successes
                                        <input type='checkbox'/>
                                        <input type='checkbox'/>
                                        <input type='checkbox'/>
                                    </span>
                                    <span>
                                        Failures
                                        <input type='checkbox'/>
                                        <input type='checkbox'/>
                                        <input type='checkbox'/>
                                    </span>
                                </div>
                            :
                                <span>Health: 
                                     {characterInfo.currentHealth} 
                                    /{characterInfo.maxHealth}
                                </span>
                        }
                    </div>
                    <div className={`conditions ${characterInfo.currentHealth === 0 ? 'hide' : ''}`}>
                        <span>Conditions:</span>
                        <span>
                            {characterInfo.conditions}
                        </span>
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
                    <div className='remove-edit'>
                        <div className='button' onClick={() => removeCharacter(characterInfo)}>
                            Remove
                        </div>
                        <div className='button' onClick={() => toggleEditModal()}>
                            Edit
                        </div>
                    </div>
                </div>
                <div className='move-initiative'>
                    <div className='button move-up' onClick={() => moveCharacterUp(index)}>
                        <span>&#10148;</span>
                    </div>
                    <div className='button move-down' onClick={() => moveCharacterDown(index)} >
                        <span>&#10148;</span>
                    </div>
                </div>
                <EditCharacter
                    modalOpen={openEdit}
                    closeModal={() => toggleEditModal()}
                    index={index}
                    character={characterInfo}
                />
            </div>
        )
    }
}

export default connect(null, {
    removeCharacter: removeCharacter,
    updateHealth: updateHealth,
    moveCharacterDown: moveCharacterDown,
    moveCharacterUp: moveCharacterUp
})(CharacterCard);