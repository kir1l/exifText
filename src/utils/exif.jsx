import piexifjs from 'piexifjs';

// Helper function to convert image URL to base64 data URL
const getBase64FromUrl = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('File reading failed'));
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

// UTF-8 Base64 encoding and decoding functions
function utf8ToBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function base64ToUtf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

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

    let exifObj = piexifjs.load(imageDataUrl);

    if (!exifObj.Exif) {
      exifObj.Exif = {};
    }

    // Encode text to Base64 (UTF-8)
    const encodedText = utf8ToBase64(text);
    exifObj.Exif[piexifjs.ExifIFD.UserComment] = encodedText;

    const exifBytes = piexifjs.dump(exifObj);
    const newImageData = piexifjs.insert(exifBytes, imageDataUrl);
    return newImageData;
  } catch (error) {
    throw new Error(`Failed to write EXIF data: ${error.message}`);
  }
};

export const readExifData = async (image) => {
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

    const exifObj = piexifjs.load(imageDataUrl);
    const userComment = exifObj.Exif[piexifjs.ExifIFD.UserComment];
    if (!userComment) {
      throw new Error('No encrypted data found');
    }

    // Decode text from Base64 (UTF-8)
    const decodedText = base64ToUtf8(userComment);
    return decodedText;
  } catch (error) {
    throw new Error(`Failed to read EXIF data: ${error.message}`);
  }
};
