import { Elysia, t } from "elysia"
import { StorageAPI } from "./api";

export const StorageUploadQueryParameters = t.Object({
	compress: t.BooleanString({
		default: false
	})
});

export const StorageUploadBody = t.Object({
	path: t.String(),
	content: t.String()
})

export const elysiaObjectStoragePlugin = <T extends string>({ prefix, bucketId }: {
	bucketId: string,
	prefix: T,
}) => new Elysia<T>({ name: 'storage', prefix })
	.model('StorageUploadQueryParameters', StorageUploadQueryParameters)
	.model('StorageUploadBody', StorageUploadBody)
	.decorate('_storage', new StorageAPI({
		bucketId,
	}))
	.get("/list", ({ _storage }) => {
		return _storage.list()
	})
	.post('/upload-from-text', async ({ _storage, body, query }) => {
		return _storage.uploadFromText(body.path, body.content, {
			compress: query.compress
		})
	}, {
		query: "StorageUploadQueryParameters",
		body: "StorageUploadBody"
	})
	.post('/upload-from-bytes', async ({ _storage, body, query }) => {
		return await _storage.uploadFromBytes(body.path, Buffer.from(body.content), {
			compress: query.compress
		})
	}, {
		query: "StorageUploadQueryParameters",
		body: "StorageUploadBody"
	})
	.post('/upload-from-filename', async ({ _storage, body, query }) => {
		return await _storage.uploadFromFilename(body.path, query.filename, {
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
	.get('/download-as-stream', ({ query, _storage }) => {
		return _storage.downloadAsStream(query.filename, {
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
	.get('/download-as-text', ({ query, _storage }) => {
		return _storage.downloadAsText(query.filename, {
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
	.get('/download-as-bytes', ({ query, _storage }) => {
		return _storage.downloadAsBytes(query.filename, {
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
	.get('/file-exists', ({ query, _storage }) => {
		return _storage.exists(query.objectName,)
	}, {
		query: t.Object({
			objectName: t.String()
		})
	})
	.delete('/object', ({ body, query, _storage }) => {
		return _storage.delete(body.objectName, {
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