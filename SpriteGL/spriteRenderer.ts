module SpriteGL {
	export class SpriteRenderer {
		gl: WebGLRenderingContext;

		constructor(webglContext: WebGLRenderingContext) {
			this.gl = webglContext;
			this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
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
