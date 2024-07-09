declare module "*.replit" {
	type Config<T = object> = T;
	export const config: Config;
	export default config;
}
