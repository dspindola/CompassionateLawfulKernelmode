import { Elysia, t } from "elysia"
import { Client } from "@replit/object-storage"

export const StorageUploadQueryParameters = t.Object({
	compress: t.BooleanString({
		default: false
	})
});

export const StorageUploadBody = t.Object({
	path: t.String(),
	content: t.String()
})

class Storage {
	constructor() { }

	static async uploadFromText(client: Client, path: string, content: string, options: {
		compress: boolean
	}) {
		return await client.uploadFromText(path, content, options)
	}

	static async uploadFromBytes(client: Client, path: string, content: Buffer, options: {
		compress: boolean
	}) {
		return await client.uploadFromBytes(path, content, options)
	}

	static async uploadFromFilename(client: Client, name: string, filename: string, options: {
		compress: boolean,
	}) {
		try {

			const file = Bun.file(filename) as import('bun').BunFile;
			const fileExists = await file.exists();

			if (!fileExists || !file.name) {
				throw new Error(`Filen ${filename} finns inte`)
			}

			return await client.uploadFromFilename(name, file.name, options)
		} catch (error) {
			const { message } = error as Error
			return new Response(message, { status: 404 })
		}
	}
}

export const elysiaObjectStoragePlugin = <T extends string>({ prefix, bucketId }: {
	bucketId: string,
	prefix: T,
}) => new Elysia<T>({ name: 'storage', prefix })
	.model('StorageUploadQueryParameters', StorageUploadQueryParameters)
	.model('StorageUploadBody', StorageUploadBody)
	.decorate('storage', new Client({ bucketId }))
	.get("/list", ({ storage }) => {
		return storage.list()
	})
	.post('/upload-from-text', async ({ storage, body, query }) => {
		return Storage.uploadFromText(storage, body.path, body.content, {
			compress: query.compress
		})
	}, {
		query: "StorageUploadQueryParameters",
		body: "StorageUploadBody"
	})
	.post('/upload-from-bytes', async ({ storage, body, query }) => {
		return await Storage.uploadFromBytes(storage, body.path, Buffer.from(body.content), {
			compress: query.compress
		})
	}, {
		query: "StorageUploadQueryParameters",
		body: "StorageUploadBody"
	})
	.post('/upload-from-filename', async ({ storage, body, query }) => {
		return Storage.uploadFromFilename(storage, body.path, query.filename, {
			compress: query.compress
		})
	}, {
		query: t.Object({
			filename: t.String(),
			compress: t.BooleanString({
				default: false
			})
		}),
		body: "StorageUploadBody"
	})
	.get('/download-as-stream', ({ query, storage }) => {
		return storage.downloadAsStream(query.filename, {
			decompress: query.decompress
		})
	}, {
		query: t.Object({
			filename: t.String(),
			decompress: t.BooleanString({
				default: false
			})
		})
	})
	.get('/download-as-text', ({ query, storage }) => {
		return storage.downloadAsText(query.filename, {
			decompress: query.decompress
		})
	}, {
		query: t.Object({
			filename: t.String(),
			decompress: t.BooleanString({
				default: false
			})
		})
	})
	.get('/download-as-bytes', ({ query, storage }) => {
		return storage.downloadAsBytes(query.filename, {
			decompress: query.decompress
		})
	}, {
		query: t.Object({
			filename: t.String(),
			decompress: t.BooleanString({
				default: false
			})
		})
	})
	.get('/file-exists', ({ query, storage }) => {
		return storage.exists(query.objectName,)
	}, {
		query: t.Object({
			objectName: t.String()
		})
	})
	.delete('/object', ({ body, query, storage }) => {
		return storage.delete(body.objectName, {
			ignoreNotFound: query.ignoreNotFound
		})
	}, {
		query: t.Object({
			ignoreNotFound: t.BooleanString()

		}),
		body: t.Object({
			objectName: t.String()
		})
	})