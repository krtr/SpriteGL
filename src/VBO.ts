export default class VBO {
	verticlesBuffer: WebGLBuffer;
	private sprVerts = [];
	private txtVerts = [];
	private AtlasSize = 1;
	private gl: WebGLRenderingContext = null;
	private hight: number;

	constructor(gl: WebGLRenderingContext) {
		this.gl = gl;
		this.verticlesBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.verticlesBuffer);
	}

	SetupHeight(hight: number) {
		this.hight = hight;
	}

	SetupForDraw(vertexPositionAttr: number, textureCoordAttr: number, AtlasSize: number) {
		this.gl.enableVertexAttribArray(vertexPositionAttr);
		this.gl.vertexAttribPointer(vertexPositionAttr, 3, this.gl.FLOAT, false, 20, 0);

		this.gl.enableVertexAttribArray(textureCoordAttr);
		this.gl.vertexAttribPointer(textureCoordAttr, 2, this.gl.FLOAT, false, 20, 12);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(15 * 10000), this.gl.STREAM_DRAW);
		this.AtlasSize = AtlasSize;
	}

	RenderAllSpr() {
		this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(this.sprVerts));
		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.sprVerts.length / 5);
		this.sprVerts = []
	}

	RenderAllTxt() {
		this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(this.txtVerts));
		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.txtVerts.length / 5);
		this.txtVerts = []
	}

	DrawSpr(AtlasX: number, AtlasY: number, AtlasWidth, AtlasHeigh, ScreenX: number, ScreenY: number, ScreenWidth: number, ScreenHeight) {
		for (var i = 0; i < VBO.defaultVerts.length; i += 2) {
			//Pos
			this.sprVerts.push(VBO.defaultVerts[i] * ScreenWidth + ScreenX | 0);
			this.sprVerts.push(VBO.defaultVerts[i + 1] * ScreenHeight + ScreenY | 0);
			this.sprVerts.push(this.hight);
			//Tex
			this.sprVerts.push(VBO.defaultVerts[i] * (AtlasWidth / this.AtlasSize) + (AtlasX / this.AtlasSize));
			this.sprVerts.push(VBO.defaultVerts[i + 1] * (AtlasHeigh / this.AtlasSize) + (AtlasY / this.AtlasSize));
		}
	}

	DrawTxt(AtlasX: number, AtlasY: number, AtlasWidth, AtlasHeigh, ScreenX: number, ScreenY: number, ScreenWidth: number, ScreenHeight) {
		for (var i = 0; i < VBO.defaultVerts.length; i += 2) {
			//Pos
			this.txtVerts.push(VBO.defaultVerts[i] * ScreenWidth + ScreenX | 0);
			this.txtVerts.push(VBO.defaultVerts[i + 1] * ScreenHeight + ScreenY | 0);
			this.txtVerts.push(this.hight);
			//Tex
			this.txtVerts.push(VBO.defaultVerts[i] * (AtlasWidth / 1024) + (AtlasX / 1024));
			this.txtVerts.push(VBO.defaultVerts[i + 1] * (AtlasHeigh / 1024) + (AtlasY / 1024));
		}
	}

	private static defaultVerts = [
		//Left
		0.0, 1.0, // 1
		1.0, 0.0, // 2
		0.0, 0.0, // 3
		//Right
		0.0, 1.0, // 1
		1.0, 1.0, // 4
		1.0, 0.0  // 2
	];
}
