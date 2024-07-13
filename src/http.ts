import { setup } from "@app/setup";
export { mode } from "@app/setup";
import app, { ROUTES } from "@/src/app";
import api from "@/src/api";
import { write } from "bun";

export const http = setup
	.state("dist", {} as any)
	.state("routes", await ROUTES())
	.onStart((ctx) => {
		Object.entries(ctx.store.routes)
			.map(([path, route]) => {
				const t = `export type Route = ${Bun.inspect({
					[`/${path}`]: {
						url: route.meta.url,
						file: route.meta.file,
						dir: route.meta.dir,
					},
				})}`;
				write(`.tmp/${route.meta.url.replace(process.cwd(), ".")}.d.ts`, t);
				return {
					t,
					path,
					url: Bun.fileURLToPath(route.meta.url),
				};
			})
			.map(async (r) => {
				return Bun.build({
					entrypoints: [r.url],
					outdir: ".dist/routes",
					sourcemap: "external",
					target: "bun",
					format: "esm",
					splitting: true,
					loader: {
						".tsx": "tsx",
						".jsx": "jsx",
						".css": "file",
						".svg": "file",
					},
					publicPath: `/_static`,
				}).then((out) => {
					console.log(`Built ${out.outputs.length} files for ${r.path}`);
					out.outputs.map((o) => {
						console.log(`  ${r.path}`);
						ctx.store.dist[r.path] = {
							[o.path]: {
								hash: o.hash,
								path: o.path,
								size: o.size,
							},
						};
					});
				});
			});
	})
	.use((ctx) => ctx.use(app(ctx)))
	.use(
		api({
			docs: {
				path: "/docs",
			},
		}),
	);

export const port = process.env.PORT;
export const hostname = process.env.HOSTNAME;
export const reusePort = process.env.REUSE_PORT === "1";
export const lowMemoryMode = process.env.LOW_MEMORY_MODE === "1";
export const dev = process.env.NODE_ENV === "development";

export default {
	http,
	port,
	hostname,
	reusePort,
	lowMemoryMode,
	dev,
};
