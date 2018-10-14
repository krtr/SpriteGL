import * as TSM from "tsm";
export default class Shader {
    glProgram: WebGLProgram;
    VertexPosAttribute: number;
    TexCoordAttribute: number;
    private TexSampleUniform;
    private MatUniform;
    private CameraPosUniform;
    private gl;
    constructor(gl: WebGLRenderingContext);
    UseProgram(): void;
    UpdatePosition(x: number, y: number): void;
    private MakeProgram;
    private CompileShader;
    updateMatrix(mat: TSM.mat4): void;
    private static defaultVertexShaderSrc;
    private static defaultFragmentShaderSrc;
}
