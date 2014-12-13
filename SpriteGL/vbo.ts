module SpriteGL {

	export class VBO {
		verticlesBuffer: WebGLBuffer;
		private verts = [];
		constructor(gl: WebGLRenderingContext) {
			this.verticlesBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.verticlesBuffer);
		}

		SetupForDraw(gl: WebGLRenderingContext, vertexPositionAttr: number) {
			gl.enableVertexAttribArray(vertexPositionAttr);
			gl.vertexAttribPointer(vertexPositionAttr, 2, gl.FLOAT, false, 0, 0);
		}

		DrawAll(gl: WebGLRenderingContext) {
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verts), gl.STREAM_DRAW);
			gl.drawArrays(gl.TRIANGLES, 0, this.verts.length / 2);
			this.verts = []
		}

		DrawMoar(x: number, y: number) {
			for (var i = 0; i < VBO.defaultVerts.length; i+=2) {
				this.verts.push(VBO.defaultVerts[i] + x);
				this.verts.push(VBO.defaultVerts[i + 1] + y);
			}
		}

		private static defaultVerts =
		[ //Left
			-0.5, 0.5,
			0.5, -0.5, 
			-0.5, -0.5,
			//Right
			-0.5, 0.5,
			0.5, 0.5,
			0.5, -0.5
		];
	}
}
