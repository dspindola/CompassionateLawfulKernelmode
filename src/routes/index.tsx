export function get() {
    return <html lang="en" class="dark">
        <head>
            <title>home</title>
            <link rel="shortcut icon" href="/icons/fox/1.svg" type="image/svg+xml" />
            <script src="https://cdn.tailwindcss.com/3.4.4" />
        </head>
        <body class="dark:bg-gray-900 dark:text-gray-100">
            <header class="bg-gray-1000 dark:bg-gray-900 p-8 fixed top-0 left-0 right-0 z-50">
                <nav class="flex justify-between items-center">
                    <ul class="flex items-center flex-row">
                        <li>
                            <a target="_blank" rel="noreferrer" href="/swagger">docs</a>
                        </li>
                    </ul>
                </nav>

                <button hx-post="/" type="button">fox</button>
            </header>

            <main class="flex flex-col items-center justify-center h-screen">
                <section class="hover:scale-105 transition-all duration-300 dark:bg-slate-950 shadow shadow-md shadow-slate-950 p-8 rounded-lg">
                    <span class="text-2xl font-bold text-blue-200">Blue Fox</span>
                    <img src="/icons/fox/1.svg" alt="fox" width="256" height="256" />
                </section>
            </main>
        </body>
    </html >
}
