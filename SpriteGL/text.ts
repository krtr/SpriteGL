class TextDrawer {
	public TextureSize = { Width: 1024, Height: 1024 };
	private ctx: CanvasRenderingContext2D;
	private canvas: HTMLCanvasElement;
	public texture: WebGLTexture;
	private txtsList = new Array<
		{
			str: string; Pos: { x: number; y: number };
			Size: { Width: number; Height: number };
			Color: string; FontSize: number;
		}
		>();
	private gl: WebGLRenderingContext;
	constructor(gl: WebGLRenderingContext) {
		this.gl = gl;
		this.canvas = document.createElement("canvas");
		this.canvas.width = 1024;
		this.canvas.height = 1024;
		this.ctx = this.canvas.getContext("2d");
		this.texture = this.gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.ctx.getImageData(0, 0, 1024, 1024));
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
	}

	PrepareTxt(str: string, color: string, fontSize: number): any {
		this.ctx.font = fontSize+ "px Arial";
		var size = this.ctx.measureText(str);
		var currStartY = 0;
		for (var i = 0; i < this.txtsList.length; i++) {
			currStartY += fontSize * 1.5;
		}
		var test = { str: str, Pos: { x: 0, y: currStartY }, Size: { Width: size.width, Height: fontSize * 1.5 }, Color: color, FontSize: fontSize };
		this.txtsList.push(test);
		this.BakeTexture();
		return test;
	}

	private BakeTexture() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (var i = 0; i < this.txtsList.length; i++) {
			this.ctx.fillStyle = this.txtsList[i].Color;
			this.ctx.font = this.txtsList[i].FontSize + "px Tahoma";
			this.ctx.fillText(this.txtsList[i].str, 0, this.txtsList[i].Pos.y + this.txtsList[i].FontSize, 1024);
		}
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.ctx.getImageData(0, 0, 1024, 1024));
	}
}