class TextDrawer {
	public TextureSize = { Width: 1024, Height: 1024 };
	private ctx: CanvasRenderingContext2D;
	private canvas: HTMLCanvasElement;
	public texture: WebGLTexture;
	private txtsList = new Array<
		{
			str: string; Pos: { x: number; y: number };
			Size: { Width: number; Height: number };
			Color: string; FontSize: number; OutLine: boolean;
		}
		>();
	private gl: WebGLRenderingContext;
	constructor(gl: WebGLRenderingContext) {
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

	PrepareTxt(str: string, color: string, fontSize: number, outline: boolean): any {
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
            str: str, Pos: { x: 0, y: currStartY }, Size: {
            Width: currTxtWidth + Math.sqrt(fontSize) * 1.7,
            Height: fontSize + Math.sqrt(fontSize) * 2
            },
            Color: color, FontSize: fontSize, OutLine: outline
        };
		this.txtsList.push(test);
        this.BakeTexture();
		return test;
	}

    DisposeTxt(txtObj) {
        var index = this.txtsList.indexOf(txtObj);
        
        if (index > -1 && index) {
            this.txtsList.splice(index, 1);
        }

        this.UpdatePositon();
        this.BakeTexture();

    }

    private UpdatePositon() {
        this.txtsList.sort((a, b) => { return a.Pos.y - b.Pos.y });
        for (var i = 0; i < this.txtsList.length; i++) {
            var newPosY = 0;
            for (var j = 0; j < i; j++) {
                newPosY += this.txtsList[j].Size.Height * 1.2;
            }
            this.txtsList[i].Pos.y = newPosY;
        }
    }

	private BakeTexture() {
	
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.miterLimit = 1;
		this.ctx.lineJoin = "round";
		for (var i = 0; i < this.txtsList.length; i++) {
			this.ctx.fillStyle = this.txtsList[i].Color;
			this.ctx.font = "bold " + this.txtsList[i].FontSize + "px Tahoma";
			if (this.txtsList[i].OutLine) {
				this.ctx.lineWidth = Math.sqrt(this.txtsList[i].FontSize)*1.5;
				this.ctx.strokeStyle = "black";
				this.ctx.strokeText(this.txtsList[i].str, 5, this.txtsList[i].Pos.y, 1024);
			}
			this.ctx.fillText(this.txtsList[i].str, 5, this.txtsList[i].Pos.y, 1024);
		}
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
		this.gl.texSubImage2D(this.gl.TEXTURE_2D, 0, 0, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.canvas);
	}
}