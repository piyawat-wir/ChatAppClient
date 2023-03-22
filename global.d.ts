namespace NodeJS {
	interface ProcessEnv {
		NODE_ENV: string;
		PORT: number;
		NEXT_PUBLIC_BACKEND_URI: string;
		JWT_TOKEN_KEY: string;
	}
}