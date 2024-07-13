import React, { ReactNode } from "react"
import { preinit, PreinitModuleOptions } from "react-dom"

type Options<T extends (PreinitModuleOptions['as'] & "script" | "style")> = ({
	script: { src: string, type?: "module", as: T, id: string } & PreinitModuleOptions
	style: { src: string, as: T, id: string } & PreinitModuleOptions
})[T]
function load<T extends 'script' | 'style'>(options: Options<T>) {
	return options
}

export const Load = [load({
	src: "https://cdn.tailwindcss.com",
	id: "tailwindcss-css",
	as: "script",
	type: "module"
}),] as ReturnType<typeof load>[]

export const Head = ({ children }: { children: typeof Load }) => {
	children.map(child => preinit(child.src, {
		as: child.as,
		fetchPriority: "high"
	}))
	return <head>
		<title>app</title>
		<meta charSet="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		{children.map(c => <c.as key={c.src} src={c.src} id={c.id} data-type={c.as} />)}
	</head>
}