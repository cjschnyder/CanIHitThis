import React, { useRef, Component } from 'react';
import Sortable from '@shopify/draggable/lib/sortable';
import CharacterCard from './CharacterCard';
import './css/InitiativeTracker.css';


class InitiativeTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addCharacter: {
                name: '',
                initiative: 0,
                ac: 0,
                maxHealth: 0,
                conditions: '',
                monster: false,
                attacks: {
                    attackName: '',
                    toHit: 0
                }
            },
            characters: [],
            addCharacterModal: false
        };
    }
    render() {
        const {
            addCharacter,
            characters,
            addCharacterModal
        } = this.state
        
        const removeCharacter = (index) => {
            const updatedCharacterList = characters;
            updatedCharacterList.splice(index, 1);
            this.setState({characters: updatedCharacterList});
        }
        
        return(
            <div className='wrapper'>
                <section className='initiative-list'>
                    <div className='title-and-options'>
                        <h2>Initiative Order</h2>
                        <div>
                            <div className="button" onClick={() => this.setState({addCharacterModal: true})}>
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                    {characters.map((char, index) => 
                        <CharacterCard character={char} remove={() => removeCharacter(index)}/>
                    )}
                </section>
                <section className='character-info'>
                </section>
                <div className={`add-characters-modal-wrapper ${addCharacterModal ? 'show' : ''}`}>
                    <div id='add-characters-modal'>
                        <div className='character-modal-title'>
                            <h2>Add Characters to Initiative</h2>
                            <div className="button" onClick={() => this.setState({addCharacterModal: false})}>
                                <span>X</span>
                            </div>
                        </div>
                        <div className='add-character-info'>
                            <div>
                                <span>Name</span>
                                <input
                                    value = {addCharacter.name}
                                    onChange={(e) => {
                                    e.persist();
                                    this.setState(prevState => ({addCharacter: {
                                        ...prevState.addCharacter,
                                            name: e.target.value
                                    }}))
                                }}/>
                            </div>
                            <div>
                                <span>Initiative</span>
                                <input 
                                    value = {addCharacter.initiative}
                                    onChange={(e) => {
                                    e.persist();
                                    this.setState(prevState => ({addCharacter: {
                                        ...prevState.addCharacter,
                                            initiative: parseInt(e.target.value, 10) || 0 
                                    }}))
                                }}/>
                            </div>
                            <div>
                                <span>AC</span>
                                <input 
                                    value = {addCharacter.ac}
                                    onChange={(e) => {
                                    e.persist();
                                    this.setState(prevState => ({addCharacter: {
                                        ...prevState.addCharacter,
                                            ac: parseInt(e.target.value, 10) || 0 
                                    }}))
                                }}/>
                            </div>
                            <div>
                                <span>Max Health</span>
                                <input 
                                    value = {addCharacter.maxHealth}
                                    onChange={(e) => {
                                    e.persist();
                                    this.setState(prevState => ({addCharacter: {
                                        ...prevState.addCharacter,
                                            maxHealth: parseInt(e.target.value, 10) || 0 
                                    }}))
                                }}/>
                            </div>
                            <div>
                                <span>Condition</span>
                                <input 
                                    value = {addCharacter.conditions}
                                    onChange={(e) => {
                                    e.persist();
                                    this.setState(prevState => ({addCharacter: {
                                        ...prevState.addCharacter,
                                            conditions: e.target.value
                                    }}))
                                }}/>
                            </div>
                            <div>
                                <span>Monster?</span>
                                <input 
                                    type='checkbox'
                                    checked={addCharacter.monster}
                                    onChange={(e) => {
                                    e.persist();
                                    this.setState(prevState => ({addCharacter: {
                                        ...prevState.addCharacter,
                                            monster: !addCharacter.monster
                                    }}))
                                }}/>
                            </div>
                            <span>Attacks +</span>
                            <div>
                                <span>To Hit</span>
                                <input 
                                    value = {addCharacter.attacks.toHit}
                                    onChange={(e) => {
                                    e.persist();
                                    this.setState(prevState => ({addCharacter: {
                                        ...prevState.addCharacter,
                                            attacks: {
                                                name: '',
                                                toHit: parseInt(e.target.value, 10) || 0 
                                            }
                                    }}))
                                }}/>
                            </div>
                            <div 
                                className='button' 
                                onClick={() => this.setState({
                                    characters: characters.concat(addCharacter),
                                    addCharacter: {
                                        name: '',
                                        initiative: 0,
                                        ac: 0,
                                        maxHealth: 0,
                                        health: 0,
                                        conditions: '',
                                        monster: false,
                                        attacks: {
                                            attackName: '',
                                            toHit: 0
                                        }
                                    }
                                })}
                            >
                                Add Character
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InitiativeTracker