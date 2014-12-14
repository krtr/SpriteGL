window.onload = function () {
	var canvas = <HTMLCanvasElement> document.getElementById("RenderElement");
	var img = new Image();
	img.onload = function () {
		var test = SpriteGL.SpriteRenderer.fromCanvas(canvas,img);
		var Loop = () => {

			for (var i = 0; i < 10000; i++) {
				test.vbo.DrawMoar(Math.random() - 0.5, Math.random() - 0.5, (Math.random() * 2) | 0, (Math.random() * 2));
			}

			test.Render();
			requestAnimationFrame(Loop);
		}
		requestAnimationFrame(Loop);
	}
	img.src = "atlas.png";
};
