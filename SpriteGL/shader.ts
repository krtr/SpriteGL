module SpriteGL {

	export class Shader {
		glProgram: WebGLProgram;
		VertexPosAttribute: number;
		TexCoordAttribute: number;
		TexSampleUniform: WebGLUniformLocation;

		constructor(gl: WebGLRenderingContext) {
			this.glProgram = this.MakeProgram(gl);
			this.VertexPosAttribute = gl.getAttribLocation(this.glProgram, "aVertexPosition");
			this.TexCoordAttribute = gl.getAttribLocation(this.glProgram, "aTexCoord");
			this.TexSampleUniform = gl.getUniformLocation(this.glProgram, "sampler2d");
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

			if (!gl.getShaderParameter(Shader, gl.COMPILE_STATUS)) {
				alert(gl.getShaderInfoLog(Shader));
			}
			return Shader;
		}

		private static defaultVertexShaderSrc = [
			"attribute vec2 aVertexPosition;",
			"attribute vec2 aTexCoord;",
			"varying vec2 vtexCoord;",
			"void main(void) {",
			"	vtexCoord = aTexCoord;",
			"	gl_Position = vec4(aVertexPosition, 0.0, 1.0);",
			"}"].join("\n");

		private static defaultFragmentShaderSrc = [
			"precision mediump float;",
			"uniform sampler2D sampler2d;",
			"varying vec2 vtexCoord;",
			"void main(void) {",
			"	gl_FragColor = texture2D(sampler2d, vec2(vtexCoord.s,vtexCoord.t));",
			"}"].join("\n");

	}
}
