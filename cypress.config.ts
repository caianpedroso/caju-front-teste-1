import { defineConfig } from 'cypress';
import cypressCoverage from "@cypress/code-coverage/task";

export default defineConfig({
	e2e: {
		baseUrl: 'http://localhost:3001',
		supportFile: false,
		setupNodeEvents(on, config) {
			cypressCoverage(on, config);
			return config;
		},
	},
})