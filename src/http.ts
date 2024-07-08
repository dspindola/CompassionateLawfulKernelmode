import { Elysia, t } from "elysia"
import { Client } from "@replit/object-storage"
import { cors } from "@elysiajs/cors"
import { swagger } from "@elysiajs/swagger"
import { staticPlugin } from "@elysiajs/static"
import logixlysia from 'logixlysia'
import { elysiaObjectStoragePlugin } from "./plugins/storage"

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
	.use(staticPlugin({
		assets: "./",
		prefix: "/_static",
		noCache: true,
	}))
	.use(swagger())
	.use(elysiaObjectStoragePlugin<'/storage'>({
		prefix: "/storage",
		bucketId: "replit-objstore-090156f4-ff5a-4431-b7aa-c6ed330d5efb"
	}))


export default http;
