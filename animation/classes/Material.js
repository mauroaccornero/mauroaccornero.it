import { createProgram} from "./functions/createProgram";
import { compileShader} from "./functions/compileShader";
import { getUniforms } from "./functions/getUniforms";
import { hashCode } from "./functions/hashCode";

export class Material {
    constructor (vertexShader, fragmentShaderSource, gl) {
        this.gl = gl
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
        this.programs = [];
        this.activeProgram = null;
        this.uniforms = [];
    }

    setKeywords (keywords) {
        let hash = 0;
        for (let i = 0; i < keywords.length; i++)
            hash += hashCode(keywords[i]);

        let program = this.programs[hash];
        if (program == null)
        {
            let fragmentShader = compileShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource, this.gl, keywords);
            program = createProgram(this.vertexShader, fragmentShader, this.gl);
            this.programs[hash] = program;
        }

        if (program == this.activeProgram) return;

        this.uniforms = getUniforms(program, this.gl);
        this.activeProgram = program;
    }

    bind () {
        this.gl.useProgram(this.activeProgram);
    }
}
