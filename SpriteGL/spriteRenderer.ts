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
			this.vbo.SetupForDraw(this.gl, this.Shader.VertexPosAttribute);
		}

		Render() {
			var start = performance.now();
			this.gl.clear(this.gl.COLOR_BUFFER_BIT);
			this.vbo.DrawAll(this.gl);
			var time = performance.now() - start;
			console.log(time);
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
