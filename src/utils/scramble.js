// src/utils/scramble.js

import seedrandom from 'seedrandom';

export const scrambleImage = (imageDataUrl, key) => {
	return new Promise((resolve, reject) => {
		try {
			// Create an image element
			const img = new Image();
			img.src = imageDataUrl;
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				canvas.width = img.width;
				canvas.height = img.height;

				ctx.drawImage(img, 0, 0);

				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				const pixels = imageData.data;

				// Generate indices array based on the key
				const indices = new Uint32Array(pixels.length / 4);
				for (let i = 0; i < indices.length; i++) {
					indices[i] = i;
				}

				const pseudoRandom = seedrandom(key);

				// Shuffle indices
				for (let i = indices.length - 1; i > 0; i--) {
					const j = Math.floor(pseudoRandom() * (i + 1));
					[indices[i], indices[j]] = [indices[j], indices[i]];
				}

				// Shuffle pixels based on shuffled indices
				const shuffledPixels = new Uint8ClampedArray(pixels.length);
				for (let i = 0; i < indices.length; i++) {
					const srcIndex = indices[i] * 4;
					shuffledPixels[i * 4] = pixels[srcIndex];
					shuffledPixels[i * 4 + 1] = pixels[srcIndex + 1];
					shuffledPixels[i * 4 + 2] = pixels[srcIndex + 2];
					shuffledPixels[i * 4 + 3] = pixels[srcIndex + 3];
				}

				// Update image data with shuffled pixels
				imageData.data.set(shuffledPixels);
				ctx.putImageData(imageData, 0, 0);

				const scrambledDataUrl = canvas.toDataURL();
				resolve(scrambledDataUrl);
			};

			img.onerror = error => {
				reject(new Error('Failed to load image'));
			};
		} catch (error) {
			reject(error);
		}
	});
};

export const descrambleImage = (imageDataUrl, key) => {
	return new Promise((resolve, reject) => {
		try {
			// Create an image element
			const img = new Image();
			img.src = imageDataUrl;
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');

				canvas.width = img.width;
				canvas.height = img.height;

				ctx.drawImage(img, 0, 0);

				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				const pixels = imageData.data;

				// Generate indices array based on the key
				const indices = new Uint32Array(pixels.length / 4);
				for (let i = 0; i < indices.length; i++) {
					indices[i] = i;
				}

				const pseudoRandom = seedrandom(key);

				// Shuffle indices in the same way as during scrambling
				for (let i = indices.length - 1; i > 0; i--) {
					const j = Math.floor(pseudoRandom() * (i + 1));
					[indices[i], indices[j]] = [indices[j], indices[i]];
				}

				// Create inverse mapping to restore original pixel order
				const inverseIndices = new Uint32Array(indices.length);
				for (let i = 0; i < indices.length; i++) {
					inverseIndices[indices[i]] = i;
				}

				// Rearrange pixels back to original positions
				const unshuffledPixels = new Uint8ClampedArray(pixels.length);
				for (let i = 0; i < inverseIndices.length; i++) {
					const srcIndex = inverseIndices[i] * 4;
					unshuffledPixels[i * 4] = pixels[srcIndex];
					unshuffledPixels[i * 4 + 1] = pixels[srcIndex + 1];
					unshuffledPixels[i * 4 + 2] = pixels[srcIndex + 2];
					unshuffledPixels[i * 4 + 3] = pixels[srcIndex + 3];
				}

				// Update image data with unshuffled pixels
				imageData.data.set(unshuffledPixels);
				ctx.putImageData(imageData, 0, 0);

				const descrambledDataUrl = canvas.toDataURL();
				resolve(descrambledDataUrl);
			};

			img.onerror = error => {
				reject(new Error('Failed to load image'));
			};
		} catch (error) {
			reject(error);
		}
	});
};
