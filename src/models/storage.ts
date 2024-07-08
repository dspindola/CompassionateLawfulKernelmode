import Elysia, { t } from "elysia"

export const StorageUploadQueryParameters = t.Object({
	compress: t.BooleanString({
		default: false
	})
});

export const StorageUploadBody = t.Object({
	path: t.String(),
	content: t.String()
})

export const model = new Elysia()
	.model('StorageUploadQueryParameters', StorageUploadQueryParameters)
	.model('StorageUploadBody', StorageUploadBody)
