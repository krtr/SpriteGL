declare module SpriteGL {
    class Shader {
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
        private MakeProgram(gl);
        private CompileShader(gl, src, type);
        updateMatrix(mat: TSM.mat4): void;
        private static defaultVertexShaderSrc;
        private static defaultFragmentShaderSrc;
    }
}

declare module SpriteGL {
    class SpriteRenderer {
        private gl;
        private Shader;
        private vbo;
        private texture;
        private SpriteSize;
        private Text;
        constructor(webglContext: WebGLRenderingContext, Image: HTMLImageElement);
        RenderAll(): void;
        UpdateViewPort(width: number, height: number): void;
        DrawSpr(AtlasX: number, AtlasY: number, AtlasWidth: any, AtlasHeigh: any, ScreenX: number, ScreenY: number, ScreenWidth: number, ScreenHeight: any): void;
        PrepareTxt(str: string, color: string, fontSize: number, outLine?: boolean): any;
        DrawTxt(txtObj: any, PosX: number, PosY: number): void;
        UpdateCamera(x: number, y: number): void;
        private CreateTexture(image);
        static fromCanvas(canvas: HTMLCanvasElement, Image: HTMLImageElement): SpriteRenderer;
    }
}

declare class TextDrawer {
    TextureSize: {
        Width: number;
        Height: number;
    };
    private ctx;
    private canvas;
    texture: WebGLTexture;
    private txtsList;
    private gl;
    constructor(gl: WebGLRenderingContext);
    PrepareTxt(str: string, color: string, fontSize: number, outline: boolean): any;
    private BakeTexture();
}

declare module SpriteGL {
    class VBO {
        verticlesBuffer: WebGLBuffer;
        private sprVerts;
        private txtVerts;
        private AtlasSize;
        private gl;
        constructor(gl: WebGLRenderingContext);
        SetupForDraw(vertexPositionAttr: number, textureCoordAttr: number, AtlasSize: number): void;
        RenderAllSpr(): void;
        RenderAllTxt(): void;
        DrawSpr(AtlasX: number, AtlasY: number, AtlasWidth: any, AtlasHeigh: any, ScreenX: number, ScreenY: number, ScreenWidth: number, ScreenHeight: any): void;
        DrawTxt(AtlasX: number, AtlasY: number, AtlasWidth: any, AtlasHeigh: any, ScreenX: number, ScreenY: number, ScreenWidth: number, ScreenHeight: any): void;
        private static defaultVerts;
    }
}
