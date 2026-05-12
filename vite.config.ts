import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig( {
	plugins: [ react() ],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: [],
		include: [ "src/**/*.test.{ts,tsx,js,jsx}" ],
		alias: {
			"@": path.resolve( __dirname, "./" )
		}
	}
} );
