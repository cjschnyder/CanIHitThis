import React, { Component } from 'react';

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
                conditions: '',
                attacks: {
                    attackName: '',
                    toHit: 0
                },
                monster: false,
                current: false
            }
        }
    }
    
    render(){
        const {
            modalOpen,
            closeModal,
            addCharacterToInit,
        } = this.props
        const {
            character
        }= this.state
        return(
            <div className={`add-characters-modal-wrapper ${modalOpen ? 'show' : ''}`}>
                <div id='add-characters-modal'>
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
                            <span>Condition</span>
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
                        <div>
                            <span>Is This a Monster?</span>
                            <input 
                                type='checkbox'
                                checked={character.monster}
                                onChange={(e) => {
                                    this.setState({character: {
                                        ...character,
                                        monster: !character.monster
                                    }})
                                }}
                            />
                        </div>
                        <span>Attacks +</span>
                        <div>
                            <span>To Hit</span>
                            <input 
                                value = {character.attacks.toHit}
                                onChange={(e) => {
                                    this.setState({character: {
                                        ...character,
                                        attacks: {
                                            name: '',
                                            toHit: parseInt(e.target.value, 10) || 0 
                                        }
                                    }})
                                }}
                            />
                        </div>
                        <div 
                            className='button' 
                            onClick={() => {addCharacterToInit(character)}}
                        >
                            Add Character
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddCharacter;