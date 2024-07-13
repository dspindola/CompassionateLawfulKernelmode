import { $route } from "@gyoza/route";
import { Layout } from "@gyoza/layout";

export default $route(import.meta)(({ path }) => (
		<Layout className="dark bg-slate-800" links={[
			<link rel="icon" href="/favicon.ico" key="favicon" />,
			<title key="title">{path}</title>
		]}>
			<main className="p-4 border-b border-slate-700">
				<p className="text-white">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, vero!
				</p>
			</main>
		</Layout>
));
