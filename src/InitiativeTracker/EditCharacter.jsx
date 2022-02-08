import React, { Component } from 'react';
import { connect } from 'react-redux';
import {editCharacter} from '../store/actions'


class EditCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCharacterInfo: {...this.props.characters[this.props.index]}
        }
    }
    
    render(){
        const {
            modalOpen,
            closeModal,
            index,
            editCharacter
        } = this.props
        const {
            currentCharacterInfo
        } = this.state
        
        return(
            <div className={`add-characters-modal-wrapper ${modalOpen ? 'show' : ''}`}>
                <div id='add-characters-modal'>
                    <div className='character-modal-title'>
                        <h2>{`Edit ${currentCharacterInfo.name}`}</h2>
                        <div className="button" onClick={() => closeModal()}>
                            <span>X</span>
                        </div>
                    </div>
                    <div className='add-character-info'>
                        <div>
                            <span>Name</span>
                            <input
                                value = {currentCharacterInfo.name}
                                onChange={(e) => {
                                    this.setState({currentCharacterInfo: {
                                        ...currentCharacterInfo,
                                        name: e.target.value
                                    }})
                                }}
                            />
                        </div>
                        <div>
                            <span>Initiative</span>
                            <input 
                                value = {currentCharacterInfo.initiative}
                                onChange={(e) => {
                                    this.setState({currentCharacterInfo: {
                                        ...currentCharacterInfo,
                                        initiative: parseInt(e.target.value, 10) || 0 
                                    }})
                                }}
                            />
                        </div>
                        <div>
                            <span>AC</span>
                            <input 
                                value = {currentCharacterInfo.ac}
                                onChange={(e) => {
                                    this.setState({currentCharacterInfo: {
                                        ...currentCharacterInfo,
                                        ac: parseInt(e.target.value, 10) || 0 
                                    }})
                                }}
                            />
                        </div>
                        <div>
                            <span>Max Health</span>
                            <input 
                                value = {currentCharacterInfo.maxHealth}
                                onChange={(e) => {
                                    this.setState({currentCharacterInfo: {
                                        ...currentCharacterInfo,
                                        maxHealth: parseInt(e.target.value, 10) || 0,
                                        currentHealth: parseInt(e.target.value, 10) || 0
                                    }})
                                }}
                            />
                        </div>
                        <div>
                            <span>Condition</span>
                            <input 
                                value = {currentCharacterInfo.conditions}
                                onChange={(e) => {
                                    this.setState({currentCharacterInfo: {
                                        ...currentCharacterInfo,
                                        conditions: e.target.value
                                    }})
                                }}
                            />
                        </div>
                        <div>
                            <span>Is This a Monster?</span>
                            <input 
                                type='checkbox'
                                checked={currentCharacterInfo.monster}
                                onChange={(e) => {
                                    this.setState({currentCharacterInfo: {
                                        ...currentCharacterInfo,
                                        monster: !currentCharacterInfo.monster
                                    }})
                                }}
                            />
                        </div>
                        <span>Attacks +</span>
                        <div>
                            <span>To Hit</span>
                            <input 
                                value = {currentCharacterInfo.attacks.toHit}
                                onChange={(e) => {
                                    this.setState({currentCharacterInfo: {
                                        ...currentCharacterInfo,
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
                            onClick={() => {editCharacter(currentCharacterInfo, index)}}
                        >
                            Apply
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
  editCharacter: editCharacter,
})(EditCharacter);