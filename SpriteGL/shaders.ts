module SpriteGL {
	var VertexShaderSrc = [
		"attribute vec3 aVertexPosition;",
		"void main(void) {",
		"	gl_Position = vec4(aVertexPosition, 1.0);",
		"}"].join("\n");

	var FragmentShaderSrc = [
		"void main(void) {",
		"	gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);",
		"}"].join("\n");

	function CompileShader(gl: WebGLRenderingContext, src: string, type) {
		var Shader = gl.createShader(type);
		gl.shaderSource(Shader, src);
		gl.compileShader(Shader);

		return Shader;
	}

	export function MakeProgram(gl: WebGLRenderingContext): WebGLProgram {
		var vertexShader = CompileShader(gl, VertexShaderSrc, gl.VERTEX_SHADER);
		var fragmentShader = CompileShader(gl, FragmentShaderSrc, gl.FRAGMENT_SHADER);

		var glProgram = gl.createProgram();
		gl.attachShader(glProgram, vertexShader);
		gl.attachShader(glProgram, fragmentShader);
		gl.linkProgram(glProgram);

		return glProgram;
	}
}
