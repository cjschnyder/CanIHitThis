export const ADD_CHARACTER = 'ADD_CHARACTER';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
export const UPDATE_HEALTH ='UPDATE_HEALTH';

export function addCharacter(character) {
  return { type: ADD_CHARACTER, character};
}

export function removeCharacter(character) {
  return { type: REMOVE_CHARACTER, character };
}

export function updateHealth(index, number, hurtHealBool) {
    return {type: UPDATE_HEALTH, index, number, hurtHealBool};
}