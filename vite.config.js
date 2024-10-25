// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => ({
	plugins: [react()],
	base: command === 'build' ? '/exifText/' : '/',
	build: {
		outDir: 'dist',
		emptyOutDir: true
	}
}));
