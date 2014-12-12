window.onload = () => {
	var canvas = <HTMLCanvasElement> document.getElementById("RenderElement");
	var test = SpriteGL.SpriteRenderer.fromCanvas(canvas);
	test.Render();
};
