module SpriteGL {

	class SpriteRenderer {
		gl: WebGLRenderingContext;

		static fromCanvas(canvas: HTMLCanvasElement): SpriteRenderer {
			var ctx = canvas.getContext("webgl");
			return new SpriteRenderer(ctx);
		}

		constructor(webglContext: WebGLRenderingContext) {
			this.gl = webglContext;
		}

	}
}
