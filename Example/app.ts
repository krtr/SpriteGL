window.onload = function () {
	var canvas = <HTMLCanvasElement> document.getElementById("RenderElement");
	var img = new Image();
	img.src = "atlas.png";
	img.onload = function () {
		var Renderer = SpriteGL.SpriteRenderer.fromCanvas(canvas, img);
		var time = 0;
		var txt = Renderer.PrepareTxt("Gowno", "White", 13);
		var txt2 = Renderer.PrepareTxt("Chuj", "Red", 13);
		var Loop = () => {
			time += 0.002;
			var count = 50;
			for (var i = 0; i < count; i++) {
				var x = Math.cos(time + Math.PI * (i / count * 2)) * 250;
				var y = Math.sin(time + Math.PI * (i / count * 2)) * Math.cos(time + Math.PI * (i / count * 2)) * 100;
				var rotx = x * Math.cos(time) - y * Math.sin(time);
				var roty = y * Math.cos(time) + x * Math.sin(time);
				// Renderer.DrawSpr(0, 0, 32, 32, rotx, roty, 32, 32);
				//Renderer.DrawSpr(0, 0, 32, 32, -roty, rotx, 32, 32);
				Renderer.DrawTxt(txt, rotx, roty);
				Renderer.DrawTxt(txt2, -roty, rotx);
			}

			Renderer.UpdateCamera(time * 5, 0);
			Renderer.RenderAll();
			requestAnimationFrame(Loop);
		}
		Loop();
	}
};
