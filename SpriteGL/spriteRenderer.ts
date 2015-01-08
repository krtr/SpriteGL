module SpriteGL {
    export class SpriteRenderer {
        private gl: WebGLRenderingContext;
        private Shader: Shader;
        private vbo: VBO;
        private texture: WebGLTexture;
        private SpriteSize: number;

        constructor(webglContext: WebGLRenderingContext, Image: HTMLImageElement) {
            this.gl = webglContext;
            this.vbo = new VBO(this.gl);
            this.Shader = new Shader(this.gl);
            this.gl.useProgram(this.Shader.glProgram);

            this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
            this.CreateTexture(Image);
            this.gl.uniform1i(this.Shader.TexSampleUniform, 0);
            this.vbo.SetupForDraw(this.gl, this.Shader.VertexPosAttribute, this.Shader.TexCoordAttribute, Image.width);
        }

        Render() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT);
            this.vbo.DrawAll(this.gl);
        }

        UpdateViewPort(width: number, height: number) {
            this.gl.viewport(0, 0, width, height);
            var projmatrix = TSM.mat4.orthographic(-width/2, width/2, -height/2, height/2, 0.1, 2.0);
            var cameramatrix = TSM.mat4.lookAt(new TSM.vec3([0.0, 0.0, 1.0]), new TSM.vec3([0.0, 0.0, 0.0]), new TSM.vec3([0.0, 1.0, 0.0]));
            this.Shader.updateMatrix(projmatrix.multiply(cameramatrix));
        }

        Draw(AtlasX: number, AtlasY: number, AtlasWidth, AtlasHeigh, ScreenX: number, ScreenY: number, ScreenWidth: number, ScreenHeight) {
            this.vbo.DrawMoar(AtlasX, AtlasY, AtlasWidth, AtlasHeigh, ScreenX, ScreenY, ScreenWidth, ScreenHeight);
        }

        private CreateTexture(image: HTMLImageElement) {
            this.texture = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGB, this.gl.RGB, this.gl.UNSIGNED_BYTE, image);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        }

        static fromCanvas(canvas: HTMLCanvasElement, Image: HTMLImageElement): SpriteRenderer {
            try {
                var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            } catch (e) {
                console.log("Error with WebGL context initialization");
                return null;
            }
            var newRenderer = new SpriteRenderer(ctx, Image);
            newRenderer.UpdateViewPort(canvas.width, canvas.height);
            return newRenderer;
        }

    }
}
