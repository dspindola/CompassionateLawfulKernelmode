import { Elysia } from "elysia"
import { html } from "@elysiajs/html"
import { cors } from "@elysiajs/cors"
import { swagger } from "@elysiajs/swagger"
import { staticPlugin } from "@elysiajs/static"
import logixlysia from 'logixlysia'
import { elysiaObjectStoragePlugin } from "./plugins/storage"
import { get, } from "./routes";

const mode = process.env.NODE_ENV !== "production" ? 'dev' : 'prod'

const http = new Elysia()
	.use(logixlysia({
		config: {
			ip: true,
			logFilePath: `${process.cwd()}/.tmp/.logs/${mode}.log`,
			customLogFormat:
				'🦊 {now} {level} {duration} {method} {pathname} {status} {message} {ip}',
			logFilter: {
				level: ['INFO', 'ERROR', 'WARNING'],
				status: [500, 404, 200],
				method: ['GET', 'POST']
			}
		}
	}))
	.use(cors())
	.use(html({
		autoDetect: true,
		autoDoctype: true
	}))
	.use(staticPlugin({
		prefix: "/",
		noCache: true,
	}))
	.use(swagger())
	.use(elysiaObjectStoragePlugin<'/storage'>({
		prefix: "/storage",
		bucketId: "replit-objstore-090156f4-ff5a-4431-b7aa-c6ed330d5efb"
	}))
	.get('/', get)



export default http;
