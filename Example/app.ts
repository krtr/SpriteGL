window.onload = function () {
    var canvas = <HTMLCanvasElement> document.getElementById("RenderElement");
    var img = new Image();
    img.onload = function () {
        var test = SpriteGL.SpriteRenderer.fromCanvas(canvas, img);
        var x = 0;
        var Loop = () => {
            x += 0.1;
            test.Draw((Math.cos(x) + 2) * 100 - 100, (Math.sin(x) + 2) * 100 - 100, (Math.cos(x)+2) * 100, (Math.sin(x)+2) * 100 , 0, 0, 100, 100);

            test.Render();
            requestAnimationFrame(Loop);
        }
        requestAnimationFrame(Loop);
    }
    img.src = "atlas.png";
};
