import { build } from "tsup";

await build({
	entry: ["./src/http.ts"],
	target: "esnext",
	platform: "node",
	format: ["esm"],
	outDir: "dist",
	shims: true,
	treeshake: true,
	tsconfig: "./tsconfig.json",
	sourcemap: "inline",
	loader: {
		".ts": "ts",
	},
	dts: {
		entry: ["./src/http.ts"],
	},
});
