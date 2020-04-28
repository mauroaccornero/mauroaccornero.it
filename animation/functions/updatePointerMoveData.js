import {correctDeltaX} from "./correctDeltaX";
import {correctDeltaY} from "./correctDeltaY";

/*export const updatePointerMoveData = (pointer, posX, posY, canvas) => ({
    ...pointer,
    prevTexcoordX: pointer.texcoordX,
    prevTexcoordY: pointer.texcoordY,
    texcoordX: (posX / canvas.width),
    texcoordY: (1.0 - posY / canvas.height),
    deltaX: correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX, canvas),
    deltaY: correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY, canvas),
    moved: (Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0),
})*/


export function updatePointerMoveData (pointer, posX, posY, canvas) {
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX, canvas);
    pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY, canvas);
    pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
    return pointer
}
