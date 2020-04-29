import { createProgram} from "./functions/createProgram";
import { getUniforms } from "./functions/getUniforms";

export class Program {
    constructor (vertexShader, fragmentShader,gl) {
        this.gl = gl,
        this.uniforms = {};
        this.vertexShader = vertexShader
        this.fragmentShader = fragmentShader
        this.program = null
        this.uniforms = null
    }

    setProgram() {
        this.program = createProgram(this.vertexShader, this.fragmentShader, this.gl);
    }

    setUniform() {
        this.uniforms = getUniforms(this.program, this.gl)
    }

    bind () {
        this.gl.useProgram(this.program);
    }
}