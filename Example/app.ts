var SpriteGL = require("../SpriteGL");

window.onload = function () {
	var canvas = <HTMLCanvasElement>document.getElementById("RenderElement");
	var img = new Image();
	img.src = require("./atlas.png");
	img.onload = function () {
		var Renderer = SpriteGL.SpriteRenderer.fromCanvas(canvas, img, SpriteGL.SpriteRenderer.TextureFilteringNearest);
		var time = 0;
		var txt = Renderer.PrepareTxt("8", "White", 25, true);
		var txt2 = Renderer.PrepareTxt("test", "Red", 13, true);
		var txt3 = Renderer.PrepareTxt("te5235t", "Red", 13, true);
		var Loop = () => {
			time += 0.002;
			var count = 100;
			for (var i = 0; i < count; i++) {
				var x = Math.cos(time + Math.PI * (i / count * 2)) * 250;
				var y = Math.sin(time + Math.PI * (i / count * 2)) * Math.cos(time + Math.PI * (i / count * 2)) * 100;
				var rotx = x * Math.cos(time) - y * Math.sin(time);
				var roty = y * Math.cos(time) + x * Math.sin(time);
				// Renderer.DrawSpr(0, 0, 32, 32, rotx, roty, 32, 32);
				// Renderer.DrawSpr(0, 0, 32, 32, -roty, rotx, 32, 32);
				Renderer.SetHight(Math.random() / 100);
				Renderer.DrawTxt(txt, rotx, roty);
				Renderer.DrawTxt(txt2, -roty, rotx);
			}
			Renderer.DrawTxt(txt, 0, 0);
			Renderer.DrawTxt(txt, 0, 100);
			Renderer.DrawTxt(txt, 100, 0);
			Renderer.DrawSpr(0, 0, 32, 32, -100, 0, 32, 32);
			Renderer.UpdateCamera(time * 5, 0);
			Renderer.RenderAll();
			Renderer.DisposeTxt(txt2);
			txt2 = Renderer.PrepareTxt(time.toString(), "Red", 13, true);
			requestAnimationFrame(Loop);
		}
		Loop();
	}
};
