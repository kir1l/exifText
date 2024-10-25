// vite.config.js
export default defineConfig({
	plugins: [react()],
	base: '/exifText/', // Changed from '/imgText/' to '/exifText/'
	build: {
		outDir: '../dist',
		emptyOutDir: true
	}
});
