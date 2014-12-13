window.onload = function() {
	var canvas = <HTMLCanvasElement> document.getElementById("RenderElement");
	var test = SpriteGL.SpriteRenderer.fromCanvas(canvas);
	var Loop = () => {
		test.Render();
		requestAnimationFrame(Loop);
	}
	requestAnimationFrame(Loop);
};
