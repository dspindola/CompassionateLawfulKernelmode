import app, { http } from "@app/http";
import { BuildConfig, BunPlugin } from "bun";

export default {
	server: http.listen({
		port: app.port,
		hostname: app.hostname,
		development: app.dev,
		lowMemoryMode: app.lowMemoryMode,
		reusePort: app.reusePort,
	}),
	routers: [
		{
			name: "server",
			kind: "http",
			base: "/api",
			handler: [import.meta.dir, 'api.ts']
		},
		{
			name: "client",
			kind: "http",
			base: "/",
			handler: [import.meta.dir, 'app.ts']
		}
	],
	configs: [
		{
			name: 'client',
			build: {
				entrypoints: ['src/app.ts', "src/routes", "src/libs/tsx"],
				format: "esm",
				target: "bun",
				outdir: "/_dist",
				naming: "client/[dir]/[name].[ext]",
				loader: {
					".ts": "ts",
					".tsx": "tsx",
					".css": "file",
				},
				sourcemap: "linked",
				define: {
					'import.meta': Bun.inspect({
						env: process.env,
						ssr: false
					})
				}
			} satisfies BuildConfig,
			meta: 'export const { env } = import.meta',
			plugins: [

			]
		},
		{
			name: 'server',
			build: {
				entrypoints: ['src/api.ts', "src/libs/api", "src/libs/db"],
				format: "esm",
				target: "bun",
				outdir: "/_dist",
				naming: "server/[dir]/[name].[ext]",
				loader: {
					".ts": "ts",
					".wasm": "wasm",
				},
				sourcemap: "linked",
				define: {
					'process.meta': Bun.inspect({
						env: process.env,
						ssr: true
					})
				}
			} satisfies BuildConfig,
			meta: 'export const { env, ssr } = process.meta',
			plugins: [
				{
					name: "rsc",
					setup(build) {
						build.onResolve({ filter: /.tsx$/ }, async (ctx) => {
							const useServer = (await Bun.file(ctx.path).text()).split("\n").at(0)?.includes('use server');

							console.log({
								useServer: {
									[useServer ? 'use server' : 'use client']: {
										path: ctx.path,
										file: Bun.file(ctx.path),
										ssr: useServer,
									}
								}
							})
							return {
								path: ctx.path,
								namespace: ctx.namespace
							}
						})
					}
				}
			] as BunPlugin[]
		}
	]
}