"use strict";

module.exports = {
	input: "src/index.ts",
	banner: true,
	format: ["es", "cjs", "umd", "umd-min"],
	"typescript2": {
		clean: true,
		useTsconfigDeclarationDir: true
	}
};
