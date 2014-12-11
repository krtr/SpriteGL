module SpriteGL {
	export class SpriteRenderer {
		gl: WebGLRenderingContext;

		constructor(webglContext: WebGLRenderingContext) {
			this.gl = webglContext;
		}

		static fromCanvas(canvas: HTMLCanvasElement): SpriteRenderer {
			var ctx = canvas.getContext("webgl");
			return new SpriteRenderer(ctx);
		}

	}
}
