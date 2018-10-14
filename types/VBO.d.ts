export default class VBO {
    verticlesBuffer: WebGLBuffer;
    private sprVerts;
    private txtVerts;
    private AtlasSize;
    private gl;
    private hight;
    constructor(gl: WebGLRenderingContext);
    SetupHeight(hight: number): void;
    SetupForDraw(vertexPositionAttr: number, textureCoordAttr: number, AtlasSize: number): void;
    RenderAllSpr(): void;
    RenderAllTxt(): void;
    DrawSpr(AtlasX: number, AtlasY: number, AtlasWidth: any, AtlasHeigh: any, ScreenX: number, ScreenY: number, ScreenWidth: number, ScreenHeight: any): void;
    DrawTxt(AtlasX: number, AtlasY: number, AtlasWidth: any, AtlasHeigh: any, ScreenX: number, ScreenY: number, ScreenWidth: number, ScreenHeight: any): void;
    private static defaultVerts;
}
