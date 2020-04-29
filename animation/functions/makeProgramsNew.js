import {
    shaders
} from "./shaders/index.js";
import {Material} from "../classes/Material";
import {addKeywords} from "../classes/functions/addKeywords";
import {getUniforms} from "../classes/functions/getUniforms";
import {compileShader} from "../classes/functions/compileShader";

export const makeProgramsNew = (gl, ext) => {
    const {
        advectionShader,
        baseVertexShader,
        bloomBlurShader,
        bloomFinalShader,
        bloomPrefilterShader,
        blurShader,
        blurVertexShader,
        checkerboardShader,
        clearShader,
        colorShader,
        copyShader,
        curlShader,
        displayShaderSource,
        divergenceShader,
        gradientSubtractShader,
        pressureShader,
        splatShader,
        sunraysMaskShader,
        sunraysShader,
        vorticityShader
    } = shaders

    const compileOnce = (gl, source, type, keywords = null) => {
        if (keywords !== null) {
            const k = keywords(ext)
            source = addKeywords(source, k);
        }
        const shader = gl.createShader(gl[type]);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader
    }

    let programs = {}
    let programsShaders = {
        advectionProgram: {vs: baseVertexShader, fs: advectionShader}, //this one needs ext for keywords
        bloomBlurProgram: {vs: baseVertexShader, fs: bloomBlurShader},
        bloomFinalProgram: {vs: baseVertexShader, fs: bloomFinalShader},
        bloomPrefilterProgram: {vs: baseVertexShader, fs: bloomPrefilterShader},
        blurProgram: {vs: blurVertexShader, fs: blurShader},
        checkerboardProgram: {vs: baseVertexShader, fs: checkerboardShader},
        clearProgram: {vs: baseVertexShader, fs: clearShader},
        colorProgram: {vs: baseVertexShader, fs: colorShader},
        copyProgram: {vs: baseVertexShader, fs: copyShader},
        curlProgram: {vs: baseVertexShader, fs: curlShader},
        divergenceProgram: {vs: baseVertexShader, fs: divergenceShader},
        gradienSubtractProgram: {vs: baseVertexShader, fs: gradientSubtractShader},
        pressureProgram: {vs: baseVertexShader, fs: pressureShader},
        splatProgram: {vs: baseVertexShader, fs: splatShader},
        sunraysMaskProgram: {vs: baseVertexShader, fs: sunraysMaskShader},
        sunraysProgram: {vs: baseVertexShader, fs: sunraysShader},
        vorticityProgram: {vs: baseVertexShader, fs: vorticityShader},
    }

    const programsShaderArray = Object.entries(programsShaders)

    for(let psa = 0; psa < programsShaderArray.length; psa++){
        const key = programsShaderArray[psa][0]
        const value = programsShaderArray[psa][1]
        const vs = compileOnce(gl, value.vs.source, value.vs.type, value.vs.keywords)
        const fs = compileOnce(gl, value.fs.source, value.fs.type, value.fs.keywords)
        programs[key] = {vs, fs}
    }

    const programsArray = Object.entries(programs)
    for(let pa = 0; pa < programsArray.length; pa++){
        const key = programsArray[pa][0]
        const value = programsArray[pa][1]
        const {vs, fs} = value
        let program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        /*
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Link failed: ' + gl.getProgramInfoLog(program));
            console.error('vs info-log: ' + gl.getShaderInfoLog(vs));
            console.error('fs info-log: ' + gl.getShaderInfoLog(fs));
        } else {
*/
        let singleProgram = {
            bind: () => gl.useProgram(program),
            uniforms: getUniforms(program, gl)
        }
        programs[key] = singleProgram
    }


    const oldBaseVertexShader = gl => compileShader(gl.VERTEX_SHADER, `
        precision highp float;
    
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;
    
        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
    `, gl);

    const oldDisplayShaderSource = () => `
    precision highp float;
    precision highp sampler2D;

    varying vec2 vUv;
    varying vec2 vL;
    varying vec2 vR;
    varying vec2 vT;
    varying vec2 vB;
    uniform sampler2D uTexture;
    uniform sampler2D uBloom;
    uniform sampler2D uSunrays;
    uniform sampler2D uDithering;
    uniform vec2 ditherScale;
    uniform vec2 texelSize;

    vec3 linearToGamma (vec3 color) {
        color = max(color, vec3(0));
        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
    }

    void main () {
        vec3 c = texture2D(uTexture, vUv).rgb;

    #ifdef SHADING
        vec3 lc = texture2D(uTexture, vL).rgb;
        vec3 rc = texture2D(uTexture, vR).rgb;
        vec3 tc = texture2D(uTexture, vT).rgb;
        vec3 bc = texture2D(uTexture, vB).rgb;

        float dx = length(rc) - length(lc);
        float dy = length(tc) - length(bc);

        vec3 n = normalize(vec3(dx, dy, length(texelSize)));
        vec3 l = vec3(0.0, 0.0, 1.0);

        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
        c *= diffuse;
    #endif

    #ifdef BLOOM
        vec3 bloom = texture2D(uBloom, vUv).rgb;
    #endif

    #ifdef SUNRAYS
        float sunrays = texture2D(uSunrays, vUv).r;
        c *= sunrays;
    #ifdef BLOOM
        bloom *= sunrays;
    #endif
    #endif

    #ifdef BLOOM
        float noise = texture2D(uDithering, vUv * ditherScale).r;
        noise = noise * 2.0 - 1.0;
        bloom += noise / 255.0;
        bloom = linearToGamma(bloom);
        c += bloom;
    #endif

        float a = max(c.r, max(c.g, c.b));
        gl_FragColor = vec4(c, a);
    }
`

    const baseVertexShaderPerformance = oldBaseVertexShader(gl)
    const displayMaterial = new Material(baseVertexShaderPerformance, oldDisplayShaderSource(), gl);

    return {programs, displayMaterial}
}
