export default class SpriteRenderer {
    private gl;
    private Shader;
    private vbo;
    private texture;
    private SpriteSize;
    private Text;
    constructor(webglContext: WebGLRenderingContext, Image: HTMLImageElement, Filtering?: number);
    RenderAll(): void;
    UpdateViewPort(width: number, height: number): void;
    DrawSpr(AtlasX: number, AtlasY: number, AtlasWidth: any, AtlasHeigh: any, ScreenX: number, ScreenY: number, ScreenWidth: number, ScreenHeight: any): void;
    SetHight(hight: number): void;
    PrepareTxt(str: string, color: string, fontSize: number, outLine?: boolean): any;
    DisposeTxt(txtObj: any): void;
    DrawTxt(txtObj: any, PosX: number, PosY: number): void;
    UpdateCamera(x: number, y: number): void;
    private CreateTexture;
    static fromCanvas(canvas: HTMLCanvasElement, Image: HTMLImageElement, Filtering?: number): SpriteRenderer;
    static TextureFilteringLinear: number;
    static TextureFilteringNearest: number;
}
