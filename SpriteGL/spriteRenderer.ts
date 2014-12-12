module SpriteGL {
	export class SpriteRenderer {
		gl: WebGLRenderingContext;
		glProgram: WebGLProgram;

		constructor(webglContext: WebGLRenderingContext) {
			this.gl = webglContext;
			this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

			var data = [1.0, 0.0, 0.0,
						0.0, 1.0, 0.0,
						0.0, 1.0, 1.0];
			var buffer = this.gl.createBuffer();
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
			this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);

			this.glProgram = MakeProgram(this.gl);
			this.gl.useProgram(this.glProgram);

		}

		static fromCanvas(canvas: HTMLCanvasElement): SpriteRenderer {
			var ctx = canvas.getContext("webgl");
			return new SpriteRenderer(ctx);
		}

		Render() {
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
		}

	}
}
