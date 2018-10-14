/*!
 * SpriteGL v0.0.0
 * (c) 2015-present 
 * Released under the ISC License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var TSM = require('tsm');

var Shader = /** @class */ (function () {
    function Shader(gl) {
        this.gl = null;
        this.gl = gl;
        this.glProgram = this.MakeProgram(gl);
        this.VertexPosAttribute = gl.getAttribLocation(this.glProgram, "aVertexPosition");
        this.TexCoordAttribute = gl.getAttribLocation(this.glProgram, "aTexCoord");
        this.TexSampleUniform = gl.getUniformLocation(this.glProgram, "sampler2d");
        this.MatUniform = gl.getUniformLocation(this.glProgram, "uProjectionView");
        this.CameraPosUniform = gl.getUniformLocation(this.glProgram, "uCameraPos");
    }
    Shader.prototype.UseProgram = function () {
        this.gl.useProgram(this.glProgram);
        this.gl.uniform1i(this.TexSampleUniform, 0);
    };
    Shader.prototype.UpdatePosition = function (x, y) {
        this.gl.uniform2f(this.CameraPosUniform, x, y);
    };
    Shader.prototype.MakeProgram = function (gl) {
        var vertexShader = this.CompileShader(gl, Shader.defaultVertexShaderSrc, gl.VERTEX_SHADER);
        var fragmentShader = this.CompileShader(gl, Shader.defaultFragmentShaderSrc, gl.FRAGMENT_SHADER);
        var glProgram = gl.createProgram();
        gl.attachShader(glProgram, vertexShader);
        gl.attachShader(glProgram, fragmentShader);
        gl.linkProgram(glProgram);
        return glProgram;
    };
    Shader.prototype.CompileShader = function (gl, src, type) {
        var Shader = gl.createShader(type);
        gl.shaderSource(Shader, src);
        gl.compileShader(Shader);
        if (!gl.getShaderParameter(Shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(Shader));
        }
        return Shader;
    };
    Shader.prototype.updateMatrix = function (mat) {
        this.gl.uniformMatrix4fv(this.MatUniform, false, mat.all());
    };
    Shader.defaultVertexShaderSrc = "\n\t\tattribute vec3 aVertexPosition;\n\t\tattribute vec2 aTexCoord;\n\t\tuniform mat4 uProjectionView;\n\t\tuniform vec2 uCameraPos;\n\t\tvarying vec2 vtexCoord;\n\t\tvoid main(void) {\n\t\t\tvtexCoord = aTexCoord;\n\t\t\tgl_Position = vec4(aVertexPosition.x - uCameraPos.x, aVertexPosition.y - uCameraPos.y, aVertexPosition.z, 1.0) * uProjectionView;\n\t\t}\n\t";
    Shader.defaultFragmentShaderSrc = "\n\t\tprecision mediump float;\n\t\tuniform sampler2D sampler2d;\n\t\tvarying vec2 vtexCoord;\n\t\tvoid main(void) {\n\t\t\tgl_FragColor = texture2D(sampler2d, vec2(vtexCoord.s,vtexCoord.t));\n\t\t\tif(gl_FragColor.a < 0.5) discard;\n\t\t}\n\t";
    return Shader;
}());

var VBO = /** @class */ (function () {
    function VBO(gl) {
        this.sprVerts = [];
        this.txtVerts = [];
        this.AtlasSize = 1;
        this.gl = null;
        this.gl = gl;
        this.verticlesBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticlesBuffer);
    }
    VBO.prototype.SetupHeight = function (hight) {
        this.hight = hight;
    };
    VBO.prototype.SetupForDraw = function (vertexPositionAttr, textureCoordAttr, AtlasSize) {
        this.gl.enableVertexAttribArray(vertexPositionAttr);
        this.gl.vertexAttribPointer(vertexPositionAttr, 3, this.gl.FLOAT, false, 20, 0);
        this.gl.enableVertexAttribArray(textureCoordAttr);
        this.gl.vertexAttribPointer(textureCoordAttr, 2, this.gl.FLOAT, false, 20, 12);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(15 * 10000), this.gl.STREAM_DRAW);
        this.AtlasSize = AtlasSize;
    };
    VBO.prototype.RenderAllSpr = function () {
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(this.sprVerts));
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.sprVerts.length / 5);
        this.sprVerts = [];
    };
    VBO.prototype.RenderAllTxt = function () {
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, new Float32Array(this.txtVerts));
        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.txtVerts.length / 5);
        this.txtVerts = [];
    };
    VBO.prototype.DrawSpr = function (AtlasX, AtlasY, AtlasWidth, AtlasHeigh, ScreenX, ScreenY, ScreenWidth, ScreenHeight) {
        for (var i = 0; i < VBO.defaultVerts.length; i += 2) {
            //Pos
            this.sprVerts.push(VBO.defaultVerts[i] * ScreenWidth + ScreenX | 0);
            this.sprVerts.push(VBO.defaultVerts[i + 1] * ScreenHeight + ScreenY | 0);
            this.sprVerts.push(this.hight);
            //Tex
            this.sprVerts.push(VBO.defaultVerts[i] * (AtlasWidth / this.AtlasSize) + (AtlasX / this.AtlasSize));
            this.sprVerts.push(VBO.defaultVerts[i + 1] * (AtlasHeigh / this.AtlasSize) + (AtlasY / this.AtlasSize));
        }
    };
    VBO.prototype.DrawTxt = function (AtlasX, AtlasY, AtlasWidth, AtlasHeigh, ScreenX, ScreenY, ScreenWidth, ScreenHeight) {
        for (var i = 0; i < VBO.defaultVerts.length; i += 2) {
            //Pos
            this.txtVerts.push(VBO.defaultVerts[i] * ScreenWidth + ScreenX | 0);
            this.txtVerts.push(VBO.defaultVerts[i + 1] * ScreenHeight + ScreenY | 0);
            this.txtVerts.push(this.hight);
            //Tex
            this.txtVerts.push(VBO.defaultVerts[i] * (AtlasWidth / 1024) + (AtlasX / 1024));
            this.txtVerts.push(VBO.defaultVerts[i + 1] * (AtlasHeigh / 1024) + (AtlasY / 1024));
        }
    };
    VBO.defaultVerts = [
        //Left
        0.0, 1.0,
        1.0, 0.0,
        0.0, 0.0,
        //Right
        0.0, 1.0,
        1.0, 1.0,
        1.0, 0.0 // 2
    ];
    return VBO;
}());

var TextDrawer = /** @class */ (function () {
    function TextDrawer(gl) {
        this.TextureSize = { Width: 1024, Height: 1024 };
        this.txtsList = new Array();
        this.gl = gl;
        this.canvas = document.createElement("canvas");
        this.canvas.width = 1024;
        this.canvas.height = 1024;
        this.canvas.style.backgroundColor = "black";
        this.ctx = this.canvas.getContext("2d");
        this.ctx.textBaseline = "top";
        this.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.canvas);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    }
    TextDrawer.prototype.PrepareTxt = function (str, color, fontSize, outline) {
        this.ctx.font = "bold " + fontSize + "px Tahoma";
        var currTxtWidth = this.ctx.measureText(str).width;
        var currStartY = 0;
        var highestPosYIndex = 0;
        for (var i = 0; i < this.txtsList.length; i++) {
            if (this.txtsList[i].Pos.y >= this.txtsList[highestPosYIndex].Pos.y) {
                highestPosYIndex = i;
                currStartY = this.txtsList[highestPosYIndex].Pos.y + this.txtsList[highestPosYIndex].Size.Height * 1.2;
            }
        }
        var test = {
            str: str,
            Pos: { x: 0, y: currStartY },
            Size: {
                Width: currTxtWidth + Math.sqrt(fontSize) * 1.7,
                Height: fontSize + Math.sqrt(fontSize) * 2
            },
            Color: color,
            OutLine: outline,
            FontSize: fontSize
        };
        this.txtsList.push(test);
        this.BakeTexture();
        return test;
    };
    TextDrawer.prototype.DisposeTxt = function (txtObj) {
        var index = this.txtsList.indexOf(txtObj);
        if (index > -1 && index) {
            this.txtsList.splice(index, 1);
        }
        this.UpdatePositon();
        this.BakeTexture();
    };
    TextDrawer.prototype.UpdatePositon = function () {
        this.txtsList.sort(function (a, b) { return a.Pos.y - b.Pos.y; });
        for (var i = 0; i < this.txtsList.length; i++) {
            var newPosY = 0;
            for (var j = 0; j < i; j++) {
                newPosY += this.txtsList[j].Size.Height * 1.2;
            }
            this.txtsList[i].Pos.y = newPosY;
        }
    };
    TextDrawer.prototype.BakeTexture = function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.miterLimit = 1;
        this.ctx.lineJoin = "round";
        for (var i = 0; i < this.txtsList.length; i++) {
            this.ctx.fillStyle = this.txtsList[i].Color;
            this.ctx.font = "bold " + this.txtsList[i].FontSize + "px Tahoma";
            if (this.txtsList[i].OutLine) {
                this.ctx.lineWidth = Math.sqrt(this.txtsList[i].FontSize) * 1.5;
                this.ctx.strokeStyle = "black";
                this.ctx.strokeText(this.txtsList[i].str, 5, this.txtsList[i].Pos.y, 1024);
            }
            this.ctx.fillText(this.txtsList[i].str, 5, this.txtsList[i].Pos.y, 1024);
        }
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.canvas);
    };
    return TextDrawer;
}());

var SpriteRenderer = /** @class */ (function () {
    function SpriteRenderer(webglContext, Image, Filtering) {
        if (Filtering === void 0) { Filtering = SpriteRenderer.TextureFilteringLinear; }
        this.gl = webglContext;
        this.vbo = new VBO(this.gl);
        this.Shader = new Shader(this.gl);
        this.Text = new TextDrawer(this.gl);
        this.Shader.UseProgram();
        this.CreateTexture(Image, Filtering);
        this.vbo.SetupForDraw(this.Shader.VertexPosAttribute, this.Shader.TexCoordAttribute, Image.width);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.BLEND);
        this.SetHight(0.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
    }
    SpriteRenderer.prototype.RenderAll = function () {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.vbo.RenderAllSpr();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.Text.texture);
        this.vbo.RenderAllTxt();
    };
    SpriteRenderer.prototype.UpdateViewPort = function (width, height) {
        this.gl.viewport(0, 0, width, height);
        var projmatrix = TSM.mat4.orthographic(-width / 2, width / 2, height / 2, -height / 2, 0.1, 2.0);
        var cameramatrix = TSM.mat4.lookAt(new TSM.vec3([0.0, 0.0, 1.0]), new TSM.vec3([0.0, 0.0, 0.0]), new TSM.vec3([0.0, 1.0, 0.0]));
        this.Shader.updateMatrix(projmatrix.multiply(cameramatrix));
    };
    SpriteRenderer.prototype.DrawSpr = function (AtlasX, AtlasY, AtlasWidth, AtlasHeigh, ScreenX, ScreenY, ScreenWidth, ScreenHeight) {
        this.vbo.DrawSpr(AtlasX, AtlasY, AtlasWidth, AtlasHeigh, ScreenX, ScreenY, ScreenWidth, ScreenHeight);
    };
    SpriteRenderer.prototype.SetHight = function (hight) {
        this.vbo.SetupHeight(hight);
    };
    SpriteRenderer.prototype.PrepareTxt = function (str, color, fontSize, outLine) {
        if (outLine === void 0) { outLine = false; }
        return this.Text.PrepareTxt(str, color, fontSize, outLine);
    };
    SpriteRenderer.prototype.DisposeTxt = function (txtObj) {
        this.Text.DisposeTxt(txtObj);
    };
    SpriteRenderer.prototype.DrawTxt = function (txtObj, PosX, PosY) {
        this.vbo.DrawTxt(txtObj.Pos.x, txtObj.Pos.y, txtObj.Size.Width, txtObj.Size.Height, PosX, PosY, txtObj.Size.Width, txtObj.Size.Height);
    };
    SpriteRenderer.prototype.UpdateCamera = function (x, y) {
        this.Shader.UpdatePosition(x, y);
    };
    SpriteRenderer.prototype.CreateTexture = function (image, filtering) {
        this.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
        if (filtering == SpriteRenderer.TextureFilteringLinear) {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        }
        else {
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        }
    };
    SpriteRenderer.fromCanvas = function (canvas, Image, Filtering) {
        if (Filtering === void 0) { Filtering = SpriteRenderer.TextureFilteringLinear; }
        try {
            var ctx = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        }
        catch (e) {
            console.log("Error with WebGL context initialization");
            return null;
        }
        var newRenderer = new SpriteRenderer(ctx, Image, Filtering);
        newRenderer.UpdateViewPort(canvas.width, canvas.height);
        return newRenderer;
    };
    SpriteRenderer.TextureFilteringLinear = 0;
    SpriteRenderer.TextureFilteringNearest = 1;
    return SpriteRenderer;
}());

var SpriteGL = { Shader: Shader, SpriteRenderer: SpriteRenderer, TextDrawer: TextDrawer, VBO: VBO };

exports.Shader = Shader;
exports.SpriteGL = SpriteGL;
exports.SpriteRenderer = SpriteRenderer;
exports.TextDrawer = TextDrawer;
exports.VBO = VBO;
exports.default = SpriteGL;
