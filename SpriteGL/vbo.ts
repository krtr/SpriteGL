module SpriteGL {

    export class VBO {
        verticlesBuffer: WebGLBuffer;
        private verts = [];
        private AtlasSize = 1;

        constructor(gl: WebGLRenderingContext) {
            this.verticlesBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.verticlesBuffer);
        }

        SetupForDraw(gl: WebGLRenderingContext, vertexPositionAttr: number, textureCoordAttr: number, AtlasSize: number) {

            gl.enableVertexAttribArray(vertexPositionAttr);
            gl.vertexAttribPointer(vertexPositionAttr, 2, gl.FLOAT, false, 16, 0);

            gl.enableVertexAttribArray(textureCoordAttr);
            gl.vertexAttribPointer(textureCoordAttr, 2, gl.FLOAT, false, 16, 8);

            this.AtlasSize = AtlasSize;
        }

        DrawAll(gl: WebGLRenderingContext) {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.verts), gl.STREAM_DRAW);
            gl.drawArrays(gl.TRIANGLES, 0, this.verts.length / 4);
            this.verts = []
        }

        DrawMoar(AtlasX: number, AtlasY: number, AtlasWidth, AtlasHeigh, ScreenX: number, ScreenY: number, ScreenWidth: number, ScreenHeight) {
            for (var i = 0; i < VBO.defaultVerts.length; i += 2) {
                //Pos
                this.verts.push(VBO.defaultVerts[i] * ScreenWidth + ScreenX | 0);
                this.verts.push(-VBO.defaultVerts[i + 1] * ScreenHeight + ScreenY | 0);
                //Tex
                this.verts.push(VBO.defaultVerts[i] * (AtlasWidth /this.AtlasSize) + (AtlasX / this.AtlasSize));
                this.verts.push(VBO.defaultVerts[i + 1] * (AtlasHeigh / this.AtlasSize) + (AtlasY / this.AtlasSize));
            }
        }

        private static defaultVerts =
        [	//Left
            0.0, 1.0, // 1
            1.0, 0.0, // 2
            0.0, 0.0, // 3
            //Right
            0.0, 1.0, // 1
            1.0, 1.0, // 4
            1.0, 0.0  // 2
        ];
    }
}
