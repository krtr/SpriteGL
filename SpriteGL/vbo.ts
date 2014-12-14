module SpriteGL {

	export class VBO {
		verticlesBuffer: WebGLBuffer;
		private verts = [];
		private AtlasSize = 1;

		constructor(gl: WebGLRenderingContext) {
			this.verticlesBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, this.verticlesBuffer);
		}

		SetupForDraw(gl: WebGLRenderingContext, vertexPositionAttr: number, textureCoordAttr: number, texSamplerUni, AtlasSize: number) {
			gl.enableVertexAttribArray(vertexPositionAttr);
			gl.vertexAttribPointer(vertexPositionAttr, 2, gl.FLOAT, false, 16, 0);

			gl.enableVertexAttribArray(textureCoordAttr);
			gl.vertexAttribPointer(textureCoordAttr, 2, gl.FLOAT, false, 16, 8);

			gl.uniform1i(texSamplerUni, 0);
			this.AtlasSize = AtlasSize;
			for (var i = 0; i < VBO.defaultVerts.length; i++) {
				VBO.defaultVerts[i] = VBO.defaultVerts[i] / this.AtlasSize;
			}
		}

		DrawAll(gl: WebGLRenderingContext) {
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verts), gl.STREAM_DRAW);
			gl.drawArrays(gl.TRIANGLES, 0, this.verts.length / 4);
			this.verts = []
		}

		DrawMoar(x: number, y: number, AtlasPosX: number, AtlasPosY: number) {

			for (var i = 0; i < VBO.defaultVerts.length; i += 2) {
				this.verts.push(VBO.defaultVerts[i] + x);
				this.verts.push(VBO.defaultVerts[i + 1] + y);

				this.verts.push((VBO.defaultVerts[i]) + ((1 / this.AtlasSize) * AtlasPosX));
				this.verts.push((VBO.defaultVerts[i + 1]) + ((1 / this.AtlasSize) * AtlasPosY));
			}
		}

		private static defaultVerts =
		[ //Left
			0.0, 1.0,
			1.0, 0.0,
			0.0, 0.0,
		//Right
			0.0, 1.0,
			1.0, 1.0,
			1.0, 0.0
		];
	}
}
