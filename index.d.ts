declare module "*.replit" {
	interface Config {
		readonly objectStorage: {
			defaultBucketID: string
			[key: string]: any
		}
	}
	const config: Config;
	export const objectStorage: Config['objectStorage']
	export default config;
}