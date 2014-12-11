var gulp = require("gulp");
var typescript = require("gulp-typescript");
var concat = require("gulp-concat");

gulp.task("build-src", function () {
	gulp.src("./SpriteGL/*.ts")
	.pipe(typescript({ sortOutput: true, target: "ES5", removeComments: true }))
	.pipe(concat("SpriteGL.js"))
	.pipe(gulp.dest("./bin"));
});

gulp.task("build-decl", function () {
	gulp.src("./SpriteGL/*.ts")
	.pipe(typescript({ declarationFiles: true }))
	.pipe(gulp.dest("./bin"));
});

