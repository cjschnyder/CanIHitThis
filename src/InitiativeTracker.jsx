import React, { Component } from 'react';
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
                attacks: {
                    attackName: '',
                    toHit: 0
                },
                monster: false,
                current: false
            },
            characters: [],
            currentCharacterIndex: -1,
            combat: false,
            roundNumber: 0,
            addCharacterModal: false
        };
    }
    render() {
        const {
            addCharacter,
            characters,
            currentCharacterIndex,
            combat,
            roundNumber,
            addCharacterModal
        } = this.state
        
        const removeCharacter = (index) => {
            const updatedCharacterList = characters;
            updatedCharacterList.splice(index, 1);
            this.setState({characters: updatedCharacterList});
        }
        
        const sortCharacters = () => {
            const sortedCharacterList = characters;
            sortedCharacterList.sort((char1, char2) => char2.initiative - char1.initiative);
            this.setState({characters: sortedCharacterList});
        }
        
        const initiateCombat = () => {
            const trackedCharacterList = characters;
            trackedCharacterList[0].current = true;
            this.setState({
                combat: true,
                roundNumber: 1,
                currentCharacterIndex: 0,
                characters: trackedCharacterList
            });
        }
        
        const stopCombat = () => {
            const trackedCharacterList = characters;
            trackedCharacterList[currentCharacterIndex].current = false;
            this.setState({
                combat: false,
                roundNumber: 0,
                currentCharacterIndex: -1,
                characters: trackedCharacterList
            });
        }
        
        const nextInCombat = () => {
            const trackedCharacterList = characters;
            const incrementedCharacterIndex = currentCharacterIndex + 1;
            const incrementedRound = roundNumber + 1;
            trackedCharacterList[incrementedCharacterIndex] ?
                (
                    trackedCharacterList[currentCharacterIndex].current = false,
                    trackedCharacterList[incrementedCharacterIndex].current = true
                )
            :   
                (
                    trackedCharacterList[currentCharacterIndex].current = false,
                    trackedCharacterList[0].current = true
                )
            
            this.setState({
                characters: trackedCharacterList,
                currentCharacterIndex: trackedCharacterList[0].current ? 0 : incrementedCharacterIndex,
                roundNumber: trackedCharacterList[0].current ? incrementedRound : roundNumber
            })
                
        }
        
        const prevInCombat = () => {
            const trackedCharacterList = characters;
            const decrementedCharacterIndex = currentCharacterIndex - 1;
            const decrementedRound = roundNumber - 1;
            
            if (roundNumber > 1 || currentCharacterIndex > 0) {
                trackedCharacterList[decrementedCharacterIndex] ?
                    (
                        trackedCharacterList[currentCharacterIndex].current = false,
                        trackedCharacterList[decrementedCharacterIndex].current = true
                    )
                :   
                    (
                        trackedCharacterList[currentCharacterIndex].current = false,
                        trackedCharacterList[trackedCharacterList.length - 1].current = true
                    )

                this.setState({
                    characters: trackedCharacterList,
                    currentCharacterIndex: trackedCharacterList[trackedCharacterList.length - 1].current ? trackedCharacterList.length - 1 : decrementedCharacterIndex,
                    roundNumber: trackedCharacterList[trackedCharacterList.length - 1].current && roundNumber > 1 ? decrementedRound : roundNumber
                })
            }
        }
        
        return(
            <div className='wrapper'>
                <section className='initiative-list'>
                    {
                        combat ?
                            <div className='title-and-options'>
                                <h2>Round: {roundNumber}</h2>
                                <div className='header-buttons'>
                                    <div className="button" onClick={() => {characters.length && prevInCombat()}}>
                                        <span>&#60;</span>
                                    </div>
                                     <div className="button" onClick={() => stopCombat()}>
                                        <span>X</span>
                                    </div>
                                     <div className="button" onClick={() => {characters.length && nextInCombat()}}>
                                        <span>&#62;</span>
                                    </div>
                                </div>
                            </div>
                        :
                            <div className='title-and-options'>
                            <h2>Initiative Order</h2>
                                <div className='header-buttons'>
                                    <div className="button" onClick={() => this.setState({addCharacterModal: true})}>
                                        <span>+ Add</span>
                                    </div>
                                    <div className="button long" onClick={() => {
                                        characters.length && (
                                            sortCharacters(),
                                            initiateCombat()
                                        )
                                    }}>
                                        <span>Sort & Start Combat</span>
                                    </div>
                                </div>
                            </div>
                    }
                    {characters.map((char, index) => 
                        <CharacterCard character={char} remove={() => removeCharacter(index)} />
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
                                <span>Is This a Monster?</span>
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
                                onClick={() => {
                                    this.setState({
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
                                    })
                                }}
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