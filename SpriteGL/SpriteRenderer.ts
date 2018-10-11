import VBO from "./VBO";
import Shader from "./Shader";
import TextDrawer from "./TextDrawer";

export default class SpriteRenderer {
	private gl: WebGLRenderingContext;
	private Shader: Shader;
	private vbo: VBO;
	private texture: WebGLTexture;
	private SpriteSize: number;
	private Text: TextDrawer;

	constructor(webglContext: WebGLRenderingContext, Image: HTMLImageElement, Filtering = SpriteRenderer.TextureFilteringLinear) {
		this.gl = webglContext;
		this.vbo = new VBO(this.gl);
		this.Shader = new Shader(this.gl);
		this.Text = new TextDrawer(this.gl);
		this.Shader.UseProgram();
		this.CreateTexture(Image, Filtering);
		this.vbo.SetupForDraw(this.Shader.VertexPosAttribute, this.Shader.TexCoordAttribute, Image.width);

		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.enable(this.gl.BLEND);
		this.SetHight(0.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
	}

	RenderAll() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.vbo.RenderAllSpr();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.Text.texture);
		this.vbo.RenderAllTxt();
	}

	UpdateViewPort(width: number, height: number) {
		this.gl.viewport(0, 0, width, height);
		var projmatrix = TSM.mat4.orthographic(-width / 2, width / 2, height / 2, -height / 2, 0.1, 2.0);
		var cameramatrix = TSM.mat4.lookAt(new TSM.vec3([0.0, 0.0, 1.0]), new TSM.vec3([0.0, 0.0, 0.0]), new TSM.vec3([0.0, 1.0, 0.0]));
		this.Shader.updateMatrix(projmatrix.multiply(cameramatrix));
	}

	DrawSpr(AtlasX: number, AtlasY: number, AtlasWidth, AtlasHeigh, ScreenX: number, ScreenY: number, ScreenWidth: number, ScreenHeight) {
		this.vbo.DrawSpr(AtlasX, AtlasY, AtlasWidth, AtlasHeigh, ScreenX, ScreenY, ScreenWidth, ScreenHeight);
	}

	SetHight(hight: number) {
		this.vbo.SetupHeight(hight);
	}

	PrepareTxt(str: string, color: string, fontSize: number, outLine = false) {
		return this.Text.PrepareTxt(str, color, fontSize, outLine);
	}

	DisposeTxt(txtObj) {
		this.Text.DisposeTxt(txtObj);
	}

	DrawTxt(txtObj, PosX: number, PosY: number) {
		this.vbo.DrawTxt(txtObj.Pos.x, txtObj.Pos.y, txtObj.Size.Width, txtObj.Size.Height, PosX, PosY, txtObj.Size.Width, txtObj.Size.Height);
	}

	UpdateCamera(x: number, y: number) {
		this.Shader.UpdatePosition(x, y);
	}

	private CreateTexture(image: HTMLImageElement, filtering: number) {
		this.texture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
		if (filtering == SpriteRenderer.TextureFilteringLinear) {
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
		} else {
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
			this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
		}
	}

	static fromCanvas(canvas: HTMLCanvasElement, Image: HTMLImageElement, Filtering = SpriteRenderer.TextureFilteringLinear): SpriteRenderer {
		try {
			var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		} catch (e) {
			console.log("Error with WebGL context initialization");
			return null;
		}
		var newRenderer = new SpriteRenderer(ctx, Image, Filtering);
		newRenderer.UpdateViewPort(canvas.width, canvas.height);
		return newRenderer;
	}

	static TextureFilteringLinear = 0;
	static TextureFilteringNearest = 1;
}
