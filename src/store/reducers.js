import { ADD_CHARACTER, REMOVE_CHARACTER, UPDATE_HEALTH } from './actions';

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
            const updatedCharacterList = [...state.characters];
            action.hurtHealBool ?
                updatedCharacterList[action.index].currentHealth = updatedCharacterList[action.index].currentHealth + action.number
            :
                updatedCharacterList[action.index].currentHealth = updatedCharacterList[action.index].currentHealth - action.number;
            return {
                characters: updatedCharacterList
            };

      default:
          return state;
    }
}

export default rootReducer;