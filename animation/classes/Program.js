import { createProgram} from "./functions/createProgram";
import { getUniforms } from "./functions/getUniforms";

export class Program {
    constructor (vertexShader, fragmentShader,gl) {
        this.gl = gl,
        this.uniforms = {};
        this.program = createProgram(vertexShader, fragmentShader, this.gl);
        this.uniforms = getUniforms(this.program, this.gl);
    }

    bind () {
        this.gl.useProgram(this.program);
    }
}