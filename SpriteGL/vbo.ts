module SpriteGL {

	export class VBO {
		verticlesBuffer: WebGLBuffer;

		constructor(gl: WebGLRenderingContext) {
			this.verticlesBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.verticlesBuffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(VBO.defaultVerts), gl.STATIC_DRAW);
		}

		private static defaultVerts = [ -0.5, 0.5, 0.0,
										0.0, 0.0, 0.0,
										-0.5, -0.5, 0.0];
	}
}
