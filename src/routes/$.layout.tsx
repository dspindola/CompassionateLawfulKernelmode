import React, { ReactNode } from "react";
import { PreinitModuleOptions } from "react-dom";

type Options<T extends (PreinitModuleOptions["as"] & "script") | "style"> = {
	script: {
		src: string;
		type?: "module";
		as: T;
		id: string;
	} & PreinitModuleOptions;
	style: { src: string; as: T; id: string } & PreinitModuleOptions;
}[T];
function load<T extends "script" | "style">(options: Options<T>) {
	return options;
}

export const Load = ({ children }: { children: ReactNode }) => {
	const Elements = ({ children }: { children: ReactNode }) => (
		<>
			{(
				[
					load({
						src: "https://cdn.tailwindcss.com",
						id: "tailwindcss-css",
						as: "script",
						type: "module",
					}),
				] as ReturnType<typeof load>[]
			).map(({ as: As, ...c }) => (
				<As key={c.src} src={c.src} id={c.id} />
			))}
			{children}
		</>
	);

	return (
		<Elements>
			<React.Suspense>{children}</React.Suspense>
		</Elements>
	);
};

export const Head = ({ children: Children }: { children: ReactNode }) => {
	const Elements = Load({ children: Children });
	return (
		<head>
			<meta charSet="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link
				rel="shortcut icon"
				href="/_static/favicon.svg"
				type="image/svg+xml"
			/>
			{Elements}
		</head>
	);
};
