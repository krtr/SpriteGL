module SpriteGL {
	export class SpriteRenderer {
		gl: WebGLRenderingContext;
		Shader: Shader;
		vbo: VBO;

		constructor(webglContext: WebGLRenderingContext) {
			this.gl = webglContext;
			this.vbo = new VBO(this.gl);
			this.Shader = new Shader(this.gl);
			this.gl.useProgram(this.Shader.glProgram);

			this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		}

		Render() {
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
			this.gl.enableVertexAttribArray(this.Shader.VertexPosAttribute);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vbo.verticlesBuffer);
			this.gl.vertexAttribPointer(this.Shader.VertexPosAttribute, 3, this.gl.FLOAT, false, 0, 0);
			this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
		}

		static fromCanvas(canvas: HTMLCanvasElement): SpriteRenderer {
			try {
			var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
			} catch (e) {
				return null;
			}
			return new SpriteRenderer(ctx);
		}

	}
}
