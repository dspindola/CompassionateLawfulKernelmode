import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import refresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
	plugins: [
		react({
			jsxImportSource: "react",
			jsxRuntime: "automatic",
		}),
		refresh({
			include: ["src/client", "src/routes"],
		}),
	],
	esbuild: {
		sourcemap: true,
	},
});
