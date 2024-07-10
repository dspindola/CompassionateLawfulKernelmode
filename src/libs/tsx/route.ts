import type { Context } from "elysia";
import type { ReactNode } from "react";

const resolveProps = <T>(props: T) => props;

type Props<T> = ReturnType<typeof resolveProps<T>>;
export const $route = (meta: Props<ImportMeta>) => {
	if (process.env.NODE_ENV === "development") {
		import(meta.url).then(() => {
			const asset = {
				[meta.path]: {
					meta: {
						url: meta.url,
						dir: meta.dir,
						file: meta.file,
						env: {},
					},
				},
			};
			Bun.write(`.tmp/routes/${meta.file}.txt`, Bun.inspect(asset));
		});
	}

	return (
		Component: (
			props: Props<{
				params: Context["params"];
				path: Context["path"];
				query: Context["query"];
			}>,
		) => ReactNode,
	) => {
		return {
			get: (context: Context) =>
				Component({
					params: context.params,
					path: context.path,
					query: context.query,
				}),
			meta: meta,
		};
	};
};
