import { renderToReadableStream } from "react-dom/server";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function tsxResponse(context: any) {
	const stream = await renderToReadableStream(context.response);
	await stream.allReady;
	return new Response(stream, {
		headers: {
			"Content-Type": "text/html",
		},
	});
}
