// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	base: '/exifText/', // Keep this if you have assets that rely on the base path
	build: {
		outDir: 'dist',
		emptyOutDir: true
	}
});
