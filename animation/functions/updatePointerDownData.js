import { generateColor} from "./generateColor";
/*
export const updatePointerDownData = (pointer, id, posX, posY, canvas) => ({
    ...pointer,
    id,
    down: true,
    moved: false,
    texcoordX: (posX / canvas.width),
    texcoordY: (1.0 - posY / canvas.height),
    prevTexcoordX: pointer.texcoordX,
    prevTexcoordY: pointer.texcoordY,
    deltaX: 0,
    deltaY: 0,
    color: generateColor(),
})*/


export function updatePointerDownData (pointer, id, posX, posY, canvas) {
    pointer.id = id;
    pointer.down = true;
    pointer.moved = false;
    pointer.texcoordX = posX / canvas.width;
    pointer.texcoordY = 1.0 - posY / canvas.height;
    pointer.prevTexcoordX = pointer.texcoordX;
    pointer.prevTexcoordY = pointer.texcoordY;
    pointer.deltaX = 0;
    pointer.deltaY = 0;
    pointer.color = generateColor();
    return pointer
}

