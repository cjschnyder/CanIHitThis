import React, { Component } from 'react';
import CharacterCard from './CharacterCard';
import AddCharacter from './AddCharacter';
import '../css/InitiativeTracker.css';


class InitiativeTracker extends Component {
    constructor(props) {
        super(props);
        this.updateHealth = this.updateHealth.bind(this);
        this.addCharacterToInit = this.addCharacterToInit.bind(this);
        this.state = {
            characters: [],
            currentCharacterIndex: -1,
            combat: false,
            roundNumber: 0,
            showAddCharacterModal: false
        };
    }
    
    updateHealth(index, number, addHPBool) {
        const updatedCharacterList = this.state.characters;
            addHPBool ?
                updatedCharacterList[index].currentHealth = updatedCharacterList[index].currentHealth + number
            :
                updatedCharacterList[index].currentHealth = updatedCharacterList[index].currentHealth - number;
            this.setState({characters: updatedCharacterList});
    }
    
    addCharacterToInit(character) {
        const updatedCharacterList = this.state.characters
        this.setState({characters: updatedCharacterList.concat(character)})
        this.setState({characters: updatedCharacterList.concat(character)})
    }
    
    render() {
        const {
            addCharacter,
            characters,
            currentCharacterIndex,
            combat,
            roundNumber,
            showAddCharacterModal
        } = this.state
        
        const toggleAddCharModal = () => {
            this.setState({showAddCharacterModal: !showAddCharacterModal});
        }
        
        const removeCharacter = (character) => {
            const updatedCharacterList = characters.filter(currentChar => currentChar !== character);
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
                                    <div
                                        className="button"
                                        onClick={() => this.setState({showAddCharacterModal: true})}
                                    >
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
                    {characters.map((character, index) => 
                        <CharacterCard
                            index={index}
                            characterInfo={character}
                            remove={() => removeCharacter(character)}
                            updateCurrentHealth = {this.updateHealth}
                        />
                    )}
                </section>
                <section className='character-info'>
                </section>
                <AddCharacter 
                    modalOpen={showAddCharacterModal}
                    closeModal={() => toggleAddCharModal()}
                    addCharacterToInit={this.addCharacterToInit}
                />
            </div>
        )
    }
}

export default InitiativeTracker