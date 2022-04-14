import React, { Component } from 'react';
import { connect } from 'react-redux';
import {sortCharacters, loadCharacters} from '../store/actions';
import CharacterCard from './CharacterCard';
import AddCharacter from './AddCharacter';
import '../css/InitiativeTracker.css';


class InitiativeTracker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCharacterIndex: -1,
            combat: false,
            roundNumber: 0,
            showAddCharacterModal: false,
            saveInitiativeModal: false,
            initiativeSaveName: '',
            loadInitiativeModal: false
        };
    }
    
    render() {
        const {
            characters,
            sortCharacters,
            loadCharacters
        } = this.props
        const {
            currentCharacterIndex,
            combat,
            roundNumber,
            showAddCharacterModal,
            saveInitiativeModal,
            initiativeSaveName,
            loadInitiativeModal
        } = this.state
        
        const toggleAddCharModal = () => {
            this.setState({showAddCharacterModal: !showAddCharacterModal});
        }
        
        const initiateCombat = () => {
            this.setState({
                combat: true,
                roundNumber: 1,
                currentCharacterIndex: 0,
            });
        }
        
        const stopCombat = () => {
            this.setState({
                combat: false,
                roundNumber: 0,
                currentCharacterIndex: -1,
            });
        }
        
        const nextInCombat = () => {
            const incrementedCharacterIndex = currentCharacterIndex + 1;
            const incrementedRound = roundNumber + 1;
            
            this.setState({
                currentCharacterIndex: characters[incrementedCharacterIndex] ? incrementedCharacterIndex : 0,
                roundNumber: characters[incrementedCharacterIndex] ? roundNumber : incrementedRound
            })
                
        }
        
        const prevInCombat = () => {
            const decrementedCharacterIndex = currentCharacterIndex - 1;
            const decrementedRound = roundNumber - 1;
            
            (roundNumber > 1 || currentCharacterIndex !== 0) && this.setState({
                currentCharacterIndex: characters[decrementedCharacterIndex] ? decrementedCharacterIndex : characters.length - 1,
                roundNumber: characters[decrementedCharacterIndex] ? roundNumber : decrementedRound
            })
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
                            key={`${character.name}+${character.currentHealth}+${index}`}
                            index={index}
                            currentTurn={index === currentCharacterIndex}
                            characterInfo={character}
                        />
                    )}
                    <section className='saveLoadButtons'>
                        <div
                            className="button"
                            onClick={() => this.setState({saveInitiativeModal: true})}
                        >
                            Save Initiative
                        </div>
                        <div
                            className="button"
                            onClick={() => {this.setState({loadInitiativeModal: true})}}
                        >
                            Load Initiative
                        </div>
                    </section>
                </section>
                <section className='character-info' />
                <AddCharacter 
                    modalOpen={showAddCharacterModal}
                    closeModal={() => toggleAddCharModal()}
                />
                <div className={`save-initiative-modal add-characters-modal-wrapper ${saveInitiativeModal ? 'show' : ''}`}>
                    <div className='add-characters-modal'>
                        <div className='character-modal-title'>
                            <h2>Save Initiative List As...</h2>
                            <div className="button" onClick={() => this.setState({saveInitiativeModal: false})}>
                                <span>X</span>
                            </div>
                        </div>
                        <div className='add-character-info'>
                            <div>
                                <span>Name</span>
                                <input
                                    value = {initiativeSaveName}
                                    onChange={(e) => {
                                        this.setState({initiativeSaveName: e.target.value})
                                    }}
                                />
                            </div>
                            <div 
                            className='button' 
                            onClick={() => {
                                localStorage.setItem(initiativeSaveName, JSON.stringify(characters));
                                this.setState({
                                    saveInitiativeModal: false,
                                    initiativeSaveName: ''
                                });
                            }}
                        >
                            Save
                        </div>
                        </div>
                    </div>
                </div>
                <div className={`add-characters-modal-wrapper ${loadInitiativeModal ? 'show' : ''}`}>
                    <div className='add-characters-modal'>
                        <div className='character-modal-title'>
                            <h2>Saved Initiatives</h2>
                            <div className="button" onClick={() => this.setState({loadInitiativeModal: false})}>
                                <span>X</span>
                            </div>
                        </div>
                        <div className='load-initative-list'>
                            {
                                
                                Object.keys(JSON.parse(JSON.stringify(localStorage))).map(item =>
                                    <div className='load-item'>
                                        <h3>{item}:</h3>
                                        <div 
                                            className='button' 
                                            onClick={() => {
                                                loadCharacters(JSON.parse(localStorage.getItem(item)));
                                                this.setState({loadInitiativeModal: false});
                                            }}
                                        >
                                            Load
                                        </div>
                                        <div 
                                            className='button' 
                                            onClick={() => {
                                                localStorage.removeItem(item);
                                                this.setState({loadInitiativeModal: false});
                                            }}
                                        >
                                            Delete
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    characters: state.characters
  };
};

export default connect(mapStateToProps, {
    sortCharacters: sortCharacters,
    loadCharacters: loadCharacters
})(InitiativeTracker);