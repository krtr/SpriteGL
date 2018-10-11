"use strict";

module.exports = {
	input: "SpriteGL/index.ts",
	banner: true,
	format: ["es", "cjs", "umd", "umd-min"],
	"typescript2": {
		clean: true,
		useTsconfigDeclarationDir: true
	}
};
