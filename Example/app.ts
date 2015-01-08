window.onload = function () {
    var canvas = <HTMLCanvasElement> document.getElementById("RenderElement");
    var img = new Image();
    img.src = "atlas.png";
    img.onload = function () {
        var Renderer = SpriteGL.SpriteRenderer.fromCanvas(canvas, img);
        var x = 0;
        var Loop = () => {
            x += 0.02;
            for (var i = 0; i < 50; i++) {
                Renderer.Draw(0, 0, 32, 32, Math.cos(x + i) * 250, Math.sin(x + i) * Math.cos(x + i) * 100, 32, 32);
            }

            Renderer.RenderAll();
            requestAnimationFrame(Loop);
        }
        Loop();
    }
};
