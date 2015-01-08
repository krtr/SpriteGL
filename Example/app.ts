window.onload = function () {
    var canvas = <HTMLCanvasElement> document.getElementById("RenderElement");
    var img = new Image();
    img.src = "atlas.png";
    img.onload = function () {
        var Renderer = SpriteGL.SpriteRenderer.fromCanvas(canvas, img);
        var x = 0;
        var Loop = () => {
            x += 0.1;
            Renderer.Draw((Math.cos(x) + 2) * 100 - 100, (Math.sin(x) + 2) * 100 - 100, (Math.cos(x)+2) * 100, (Math.sin(x)+2) * 100 , 0, 0, 100, 100);

            Renderer.Render();
            requestAnimationFrame(Loop);
        }
        Loop();
    }
};
