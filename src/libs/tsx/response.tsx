import App from "@/src/main";
import { renderToReadableStream } from "react-dom/server";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export async function tsxResponse(context: any) {
	const stream = await renderToReadableStream(<App>{context.response}</App>);
	await stream.allReady;
	return new Response(stream, {
		headers: {
			"Content-Type": "text/html",
		},
	});
}
