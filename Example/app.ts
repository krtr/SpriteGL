window.onload = function () {
    var canvas = <HTMLCanvasElement> document.getElementById("RenderElement");
    var img = new Image();
    img.src = "atlas.png";
    img.onload = function () {
        var Renderer = SpriteGL.SpriteRenderer.fromCanvas(canvas, img);
        var time = 0;
        var Loop = () => {
            time += 0.02;
            for (var i = 0; i < 50; i++) {
                var x = Math.cos(time + Math.PI * (i / 25)) * 250;
                var y = Math.sin(time + Math.PI * (i / 25)) * Math.cos(time + Math.PI * (i / 25)) * 100;
                var rotx= x * Math.cos(time) - y * Math.sin(time);
                var roty = y * Math.cos(time) + x * Math.sin(time);
                Renderer.Draw(0, 0, 32, 32, rotx, roty, 32, 32);
                Renderer.Draw(0, 0, 32, 32, -roty, rotx, 32, 32);
            }

            Renderer.RenderAll();
            requestAnimationFrame(Loop);
        }
        Loop();
    }
};
