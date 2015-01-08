var gulp = require("gulp");
var typescript = require("gulp-typescript");
var concat = require("gulp-concat");
var nodemon = require("gulp-nodemon");
var open = require("open");
var StaticServer = require('static-server');
var addsrc = require('gulp-add-src');
var runsequence = require("run-sequence");
var fs = require("fs");


gulp.task("build", function () {
    runsequence("build-files", "remove-internal-classes")
});

gulp.task("build-files", function () {
    var tsResult = gulp.src(["./SpriteGL/*.ts", "./3rd/tsm-0.7.d.ts"])
					.pipe(typescript({ sortOutput: true, target: "ES5", removeComments: true, declarationFiles: true }));

    tsResult.dts
		.pipe(concat("SpriteGL.d.ts"))
		.pipe(gulp.dest("./bin"));

    tsResult.js
        .pipe(addsrc("./3rd/tsm-0.7.js"))
		.pipe(concat("SpriteGL.js"))
		.pipe(gulp.dest("./bin"));
});

gulp.task("debug", function () {
    gulp.src("./bin/SpriteGL.js")
		.pipe(gulp.dest("./Example"));

    var tsResult = gulp.src(["./Example/*.ts", "./bin/SpriteGL.d.ts"])
					.pipe(typescript({ target: "ES5" }))
					.pipe(gulp.dest("./Example"));

    var server = new StaticServer({ rootPath: './Example', port: 80, host: 'localhost' });

    server.start(function () {
        console.log('Server listening to', server.port);
        open("http://localhost")
    });
})

gulp.task("remove-internal-classes", function () {
    setTimeout(function () {
        var data = fs.readFileSync('./bin/SpriteGL.d.ts').toString();
        var start = data.indexOf("class SpriteRenderer {", 0);
        var end = data.indexOf("}", start+1);
        var new_string = data.substring(start, end + 1);
        fs.writeFileSync('./bin/SpriteGL.d.ts',"declare module SpriteGL { \n" + new_string + "\n }");
    }, 1000);

});
