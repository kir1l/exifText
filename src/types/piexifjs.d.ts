declare module 'piexifjs' {
	export function load(data: string): any;
	export function dump(exifObject: any): string;
	export function insert(exifBytes: string, data: string): string;
	export function remove(data: string): string;

	export namespace ExifIFD {
		const UserComment: string;
		// Add other Exif tags as needed
	}

	export namespace GPSIFD {
		// Add GPS tags as needed
	}

	export namespace primaryIFD {
		// Add primary tags as needed
	}

	export namespace helpers {
		function encodeUnicode(str: string): string;
		function decodeUnicode(str: string): string;
		// Add other helper functions as needed
	}
}
