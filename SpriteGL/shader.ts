module SpriteGL {

	export class Shader {
		glProgram: WebGLProgram;
		VertexPosAttribute: number;

		constructor(gl: WebGLRenderingContext) {
			this.glProgram = this.MakeProgram(gl);
			this.VertexPosAttribute = gl.getAttribLocation(this.glProgram, "aVertexPosition");
		}

		private MakeProgram(gl: WebGLRenderingContext): WebGLProgram {
			var vertexShader = this.CompileShader(gl, Shader.defaultVertexShaderSrc, gl.VERTEX_SHADER);
			var fragmentShader = this.CompileShader(gl, Shader.defaultFragmentShaderSrc, gl.FRAGMENT_SHADER);

			var glProgram = gl.createProgram();
			gl.attachShader(glProgram, vertexShader);
			gl.attachShader(glProgram, fragmentShader);
			gl.linkProgram(glProgram);

			return glProgram;
		}

		private CompileShader(gl: WebGLRenderingContext, src: string, type) {
			var Shader = gl.createShader(type);
			gl.shaderSource(Shader, src);
			gl.compileShader(Shader);

			return Shader;
		}

		private static defaultVertexShaderSrc = [
			"attribute vec3 aVertexPosition;",
			"void main(void) {",
			"	gl_Position = vec4(aVertexPosition, 1.0);",
			"}"].join("\n");

		private static defaultFragmentShaderSrc = [
			"void main(void) {",
			"	gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);",
			"}"].join("\n");

	}
}
