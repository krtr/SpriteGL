var gulp = require("gulp");
var typescript = require("gulp-typescript");
var concat = require("gulp-concat");

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
