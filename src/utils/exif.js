// src/utils/exif.js
import piexif from 'piexifjs';

// Helper function to convert image URL to base64 data URL
const getBase64FromUrl = async url => {
	const response = await fetch(url);
	const blob = await response.blob();
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onerror = () => reject(new Error('File reading failed'));
		reader.onloadend = () => resolve(reader.result);
		reader.readAsDataURL(blob);
	});
};

export const writeExifData = async (image, text) => {
	try {
		// Convert image to base64 data URL
		let imageDataUrl;
		if (typeof image === 'object' && image.url) {
			imageDataUrl = await getBase64FromUrl(image.url);
		} else if (typeof image === 'string' && image.startsWith('data:image')) {
			imageDataUrl = image;
		} else {
			throw new Error('Invalid image format');
		}

		let exifObj = piexif.load(imageDataUrl);

		if (!exifObj['Exif']) {
			exifObj['Exif'] = {};
		}

		exifObj['Exif'][piexif.ExifIFD.UserComment] = text;

		const exifBytes = piexif.dump(exifObj);
		const newImageData = piexif.insert(exifBytes, imageDataUrl);
		return newImageData;
	} catch (error) {
		throw new Error(`Failed to write EXIF data: ${error.message}`);
	}
};

export const readExifData = async image => {
	try {
		// Convert image to base64 data URL
		let imageDataUrl;
		if (typeof image === 'object' && image.url) {
			imageDataUrl = await getBase64FromUrl(image.url);
		} else if (typeof image === 'string' && image.startsWith('data:image')) {
			imageDataUrl = image;
		} else {
			throw new Error('Invalid image format');
		}

		const exifObj = piexif.load(imageDataUrl);
		const userComment = exifObj['Exif'][piexif.ExifIFD.UserComment];
		if (!userComment) {
			throw new Error('No encrypted data found');
		}
		const decodedText = userComment;
		return decodedText;
	} catch (error) {
		throw new Error(`Failed to read EXIF data: ${error.message}`);
	}
};
