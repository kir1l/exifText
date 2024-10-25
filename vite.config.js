// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	base: '/exifText/', // Make sure this matches your repository name
	build: {
		outDir: '../dist',
		emptyOutDir: true
	}
});
