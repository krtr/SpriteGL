export default class TextDrawer {
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
    DisposeTxt(txtObj: any): void;
    private UpdatePositon;
    private BakeTexture;
}
