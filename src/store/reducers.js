import {
    ADD_CHARACTER,
    REMOVE_CHARACTER,
    UPDATE_HEALTH,
    EDIT_CHARACTER,
    MOVE_CHARACTER_DOWN,
    MOVE_CHARACTER_UP
} from './actions';

const initialState = {
  characters: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHARACTER: 
            return {
                characters: [
                    ...state.characters,
                    action.character
                ]
            };
        case REMOVE_CHARACTER:
            return {
                characters: state.characters.filter(currentChar => currentChar !== action.character)
            };
        case UPDATE_HEALTH:
            const updatedHealthList = [...state.characters];
            action.hurtHealBool ?
                updatedHealthList[action.index].currentHealth = updatedHealthList[action.index].currentHealth + action.number
            :
                updatedHealthList[action.index].currentHealth = updatedHealthList[action.index].currentHealth - action.number;
            return {
                characters: [...updatedHealthList]
            };
        case EDIT_CHARACTER:
            const updatedEditList = [...state.characters];
            updatedEditList.splice(action.index, 1, action.character);
            return {
                characters: [...updatedEditList]
            };
        case MOVE_CHARACTER_DOWN:
            const moveDownCharacterList = [...state.characters];
            if (moveDownCharacterList[action.index + 1]) {
                [moveDownCharacterList[action.index], moveDownCharacterList[action.index + 1]] = [moveDownCharacterList[action.index + 1], moveDownCharacterList[action.index]]
            }
            return {
                characters: [...moveDownCharacterList]
            };
            
        case MOVE_CHARACTER_UP:
            const moveUpCharacterList = [...state.characters];
            if (moveUpCharacterList[action.index - 1]) { 
                [moveUpCharacterList[action.index-1], moveUpCharacterList[action.index]] = [moveUpCharacterList[action.index], moveUpCharacterList[action.index-1]];
            }
            return {
                characters: [...moveUpCharacterList]
            };
            

      default:
          return state;
    }
}

export default rootReducer;