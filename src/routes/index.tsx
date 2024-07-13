import { $route } from "@gyoza/route";
import { Head, Load } from "./$.layout";

export default $route(import.meta)(({ path }) => <html lang="en" className="dark">
	<Head>
		{Load}
	</Head>
	<body className="bg-slate-800">
		<main>
			<header>
				<span>{path}</span>
			</header>
		</main>
	</body>
</html>);
