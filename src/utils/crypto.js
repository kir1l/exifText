import CryptoJS from 'crypto-js';

export const encryptText = (text, key) => {
	try {
		return CryptoJS.AES.encrypt(text, key).toString();
	} catch (error) {
		throw new Error('Encryption failed');
	}
};

export const decryptText = (ciphertext, key) => {
	try {
		const bytes = CryptoJS.AES.decrypt(ciphertext, key);
		return bytes.toString(CryptoJS.enc.Utf8);
	} catch (error) {
		throw new Error('Decryption failed');
	}
};

export const generateKey = (length = 32) => {
	return CryptoJS.lib.WordArray.random(length).toString();
};
