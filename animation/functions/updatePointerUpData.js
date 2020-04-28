/*
export const updatePointerUpData = pointer => ({...pointer,down: false})
*/


export function updatePointerUpData (pointer) {
    pointer.down = false;
    return pointer
}
