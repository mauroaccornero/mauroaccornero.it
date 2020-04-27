import { resizeFBO } from "./resizeFBO";
import { createFBO } from "./createFBO";

export function resizeDoubleFBO (target, w, h, internalFormat, format, type, param, copyProgram, gl, blit) {
    if (target.width == w && target.height == h){
        return target;
    }
    target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param, gl, blit, copyProgram);
    target.write = createFBO(w, h, internalFormat, format, type, param, gl);
    target.width = w;
    target.height = h;
    target.texelSizeX = 1.0 / w;
    target.texelSizeY = 1.0 / h;
    return target;
}
