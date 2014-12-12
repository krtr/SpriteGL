var gulp = require("gulp");
var typescript = require("gulp-typescript");
var concat = require("gulp-concat");
var nodemon = require("gulp-nodemon");
var open = require("open");
var StaticServer = require('static-server');

gulp.task("build", function () {
	var tsResult = gulp.src("./SpriteGL/*.ts")
					.pipe(typescript({ sortOutput: true, target: "ES5", removeComments: true, declarationFiles: true }));

	tsResult.dts
		.pipe(concat("SpriteGL.d.ts"))
		.pipe(gulp.dest("./bin"));

	tsResult.js
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
	});
})
