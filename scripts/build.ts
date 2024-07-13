import { build } from "tsup";

export const buildServerDeps = () =>
	build({
		entry: ["./src/app.ts", "./src/api.ts", "./src/http.ts", "./src/setup.ts"],
		target: "esnext",
		platform: "neutral",
		format: ["esm"],
		outDir: "dist",
		shims: true,
		treeshake: true,
		tsconfig: "./tsconfig.json",
		sourcemap: "inline",
		loader: {
			".ts": "ts",
		},
	});

export const buildServerEntry = () =>
	build({
		entry: ["./src/index.ts"],
		target: "esnext",
		platform: "neutral",
		format: ["esm"],
		outDir: "dist",
		shims: true,
		treeshake: true,
		tsconfig: "./tsconfig.json",
		sourcemap: "inline",
		loader: {
			".ts": "ts",
		},
	});

export const buildLibs = () =>
	build({
		entry: ["./src/libs/api/client.ts"],
		target: "esnext",
		platform: "neutral",
		format: ["esm"],
		loader: {
			".ts": "ts",
			".tsx": "tsx",
		},
		dts: {
			entry: ["./src/libs/api/client.ts", "./src/api.ts"]
		}
	});

await buildLibs()
