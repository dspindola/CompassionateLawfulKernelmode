import { Client } from "@replit/object-storage";

export class StorageAPI {
	#api: Client;

	constructor(api: { bucketId: string }) {
		this.#api = new Client({
			bucketId: api.bucketId,
		});
	}

	async uploadFromText(
		path: string,
		content: string,
		options: {
			compress: boolean;
		},
	) {
		return await this.#api.uploadFromText(path, content, options);
	}

	async uploadFromBytes(
		path: string,
		content: Buffer,
		options: {
			compress: boolean;
		},
	) {
		return await this.#api.uploadFromBytes(path, content, options);
	}

	async uploadFromFilename(
		name: string,
		filename: string,
		options: {
			compress: boolean;
		},
	) {
		try {
			const file = Bun.file(filename) as import("bun").BunFile;
			const fileExists = await file.exists();

			if (!fileExists || !file.name) {
				throw new Error(`Filen ${filename} finns inte`);
			}

			return await this.#api.uploadFromFilename(name, file.name, options);
		} catch (error) {
			const { message } = error as Error;
			return new Response(message, { status: 404 });
		}
	}

	async exists(objectName: string) {
		return await this.#api.exists(objectName);
	}

	async delete(
		objectName: string,
		options: {
			ignoreNotFound: boolean;
		},
	) {
		return await this.#api.delete(objectName, options);
	}

	async list() {
		return await this.#api.list();
	}

	async downloadAsStream(
		filename: string,
		options: {
			decompress: boolean;
		},
	) {
		return await this.#api.downloadAsStream(filename, options);
	}

	async downloadAsText(
		filename: string,
		options: {
			decompress: boolean;
		},
	) {
		return await this.#api.downloadAsText(filename, options);
	}

	async downloadAsBytes(
		filename: string,
		options: {
			decompress: boolean;
		},
	) {
		return await this.#api.downloadAsBytes(filename, options);
	}
}
