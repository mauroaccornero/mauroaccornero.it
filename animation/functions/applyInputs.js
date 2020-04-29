import {multipleSplats} from "./multipleSplats";
import {splatPointer} from "./splatPointer";

export const applyInputs = (splatStack, pointers, parameters, gl, blit, programs, canvas, config) => {
    let newSplatStack = splatStack
    if (splatStack.length > 0) {
        newSplatStack.pop();
        multipleSplats(newSplatStack, parameters, gl, blit, programs, canvas, config);
    }
    for(let p = 0; p < pointers.length;p++){
        const pointer = pointers[p]
        if (pointer.moved) {
            pointer.moved = false;
            splatPointer(pointer, config, parameters, gl, blit, programs, canvas);
        }
    }
    return newSplatStack
}
