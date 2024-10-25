import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	base: '/imgText/', // Changed to match repository name
	build: {
		outDir: 'dist',
		emptyOutDir: true
	}
});
