export const ADD_CHARACTER = 'ADD_CHARACTER';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
export const UPDATE_HEALTH ='UPDATE_HEALTH';
export const EDIT_CHARACTER = 'EDIT_CHARACTER';
export const MOVE_CHARACTER_DOWN = 'MOVE_CHARACTER_DOWN';
export const MOVE_CHARACTER_UP = 'MOVE_CHARACTER_UP';
export const SORT_CHARACTERS = 'SORT_CHARACTERS';
export const LOAD_CHARACTERS = 'LOAD_CHARACTERS';

export function addCharacter(character) {
  return { type: ADD_CHARACTER, character};
}

export function removeCharacter(character) {
  return { type: REMOVE_CHARACTER, character };
}

export function updateHealth(index, number, hurtHealBool) {
    return {type: UPDATE_HEALTH, index, number, hurtHealBool};
}

export function editCharacter(character, index) {
    return {type: EDIT_CHARACTER, character, index};
}

export function moveCharacterDown(index) {
    return {type: MOVE_CHARACTER_DOWN, index}
}

export function moveCharacterUp(index) {
    return {type: MOVE_CHARACTER_UP, index}
}

export function sortCharacters() {
    return {type: SORT_CHARACTERS}
}

export function loadCharacters(loadedList) {
    return {type: LOAD_CHARACTERS, loadedList}
}