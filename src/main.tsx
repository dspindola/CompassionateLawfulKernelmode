import { Body, Layout } from "./libs/tsx/layout";

export default function App({ children }: { children: React.ReactNode }) {
	return (
		<Layout
			links={[
				<title key="title">app</title>,
				<link rel="icon" href="/favicon.ico" key="favicon" />,
				<script src="https://cdn.tailwindcss.com" key="tailwind"></script>,
			]}
		>
			<Body className="dark bg-slate-800 text-white p-8 min-h-screen font-mono antialiased text-2xl">
				{children}
			</Body>
		</Layout>
	);
}
