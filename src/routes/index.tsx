import { $route } from "@gyoza/route";
import { Head } from "./$.layout";

export default $route(import.meta)(({ path }) => (
	<html lang="en" className="dark">
		<Head>
			<title>{path}</title>
		</Head>
		<body className="bg-slate-800">
			<main>
				<header>
					<span>{path}</span>
				</header>
			</main>
		</body>
	</html>
));
