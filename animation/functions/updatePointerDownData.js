import { generateColor} from "./generateColor";

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
})
