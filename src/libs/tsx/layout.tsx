import { Transpiler } from "bun";
import React, { ReactNode } from "react";
import { PreinitModuleOptions } from "react-dom";

type Options<T extends "script" | "style"> = {
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

function resolveLoadedOption<T extends "script" | "style">(
	type: "module" | "script",
	option: Options<T>,
) {
	const { as, src, id, ...props } = option;
	const context = { props: { ...props, src, id, type }, as };
	return () => (
		<script
			src={context.props.src}
			id={context.props.id}
			type={context.props.type}
		/>
	);
}

function RenderLoadedOption(props: {
	src: string;
	id: string;
	type?: "module";
	as: "script" | "style";
}) {
	const C = resolveLoadedOption(props.type ?? "script", {
		as: "script",
		src: props.src,
		id: props.id,
		type: props.type,
	});
	return <C />;
}

export const Load = ({ children }: { children: ReactNode }) => {
	const Elements = ({ children }: { children: ReactNode }) => (
		<>
			{[
				load<"script">({
					src: "https://cdn.tailwindcss.com",
					id: "tailwindcss-css",
					as: "script",
					type: "module",
				}),
			].map((C) => (
				<RenderLoadedOption key={C.id} {...C} />
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
	return <head>{Elements}</head>;
};

export const Body = ({
	children,
	...props
}: { children: ReactNode } & React.JSX.IntrinsicElements["body"]) => {
	return <body {...props}>{children}</body>;
};

export const Html = ({
	children,
	...props
}: { children: ReactNode } & React.JSX.IntrinsicElements["html"]) => {
	return (
		<html lang="en" {...props}>
			{children}
		</html>
	);
};

export const Layout = ({
	links = [],
	children,
	...props
}: {
	links?: ReactNode[];
	children: ReactNode;
} & React.JSX.IntrinsicElements["html"]) => {
	return (
		<Html {...props}>
			<Head>{links}</Head>
			{children}
		</Html>
	);
};
