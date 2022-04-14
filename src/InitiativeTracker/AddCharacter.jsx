import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addCharacter} from '../store/actions'

class AddCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            character: {
                name: '',
                initiative: 0,
                ac: 0,
                maxHealth: 0,
                currentHealth: 0,
                conditions: ''
            }
        }
    }
    
    render(){
        const {
            modalOpen,
            closeModal,
            addCharacter
        } = this.props
        const {
            character
        }= this.state
        return(
            <div className={`add-characters-modal-wrapper ${modalOpen ? 'show' : ''}`}>
                <div className='add-characters-modal'>
                    <div className='character-modal-title'>
                        <h2>Add Characters to Initiative</h2>
                        <div className="button" onClick={() => closeModal()}>
                            <span>X</span>
                        </div>
                    </div>
                    <div className='add-character-info'>
                        <div>
                            <span>Name</span>
                            <input
                                value = {character.name}
                                onChange={(e) => {
                                    this.setState({character: {
                                        ...character,
                                        name: e.target.value
                                    }})
                                }}
                            />
                        </div>
                        <div>
                            <span>Initiative</span>
                            <input 
                                value = {character.initiative}
                                onChange={(e) => {
                                    this.setState({character: {
                                        ...character,
                                        initiative: parseInt(e.target.value, 10) || 0 
                                    }})
                                }}
                            />
                        </div>
                        <div>
                            <span>AC</span>
                            <input 
                                value = {character.ac}
                                onChange={(e) => {
                                    this.setState({character: {
                                        ...character,
                                        ac: parseInt(e.target.value, 10) || 0 
                                    }})
                                }}
                            />
                        </div>
                        <div>
                            <span>Max Health</span>
                            <input 
                                value = {character.maxHealth}
                                onChange={(e) => {
                                    this.setState({character: {
                                        ...character,
                                        maxHealth: parseInt(e.target.value, 10) || 0,
                                        currentHealth: parseInt(e.target.value, 10) || 0
                                    }})
                                }}
                            />
                        </div>
                        <div>
                            <span>Conditions</span>
                            <input 
                                value = {character.conditions}
                                onChange={(e) => {
                                    this.setState({character: {
                                        ...character,
                                        conditions: e.target.value
                                    }})
                                }}
                            />
                        </div>
                        <div 
                            className='button' 
                            onClick={() => {
                                addCharacter(character);
                                this.setState({character: {
                                    name: '',
                                    initiative: 0,
                                    ac: 0,
                                    maxHealth: 0,
                                    currentHealth: 0,
                                    conditions: ''
                                }})
                            }}
                        >
                            Add Character
                        </div>
                        <div 
                            className='button' 
                            onClick={() => {
                                addCharacter(character);
                            }}
                        >
                            Add Character & Keep Values
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {
  addCharacter: addCharacter
})(AddCharacter);