# EXIF Crypto Tool

An application that allows you to encrypt and decrypt text within the EXIF data of images. Supports different image templates and handles Unicode characters, including Russian text.

## Table of Contents

- [Features](#features)
- [Live Demo](#live-demo)
- [Usage Guide](#usage-guide)
  - [Encrypt Text into an Image](#encrypt-text-into-an-image)
  - [Decrypt Text from an Image](#decrypt-text-from-an-image)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Encrypt Text into Image EXIF Data**: Hide any text within the EXIF metadata of JPEG images.
- **Decrypt Text from Image EXIF Data**: Extract and read hidden text from the EXIF metadata of images.
- **Supports Unicode Characters**: Handle Unicode text, including Russian and other non-Latin characters.
- **Optional Encryption Key**: Use AES encryption to securely encrypt your text with a key.
- **Image Templates**: Choose from various image templates or upload your own images.
- **User-Friendly Interface**: Simple and intuitive UI built with React and styled-components.

## Live Demo

You can try the application live at [https://kir1l.github.io/exifText/](https://kir1l.github.io/exifText/)

## Usage Guide

### Encrypt Text into an Image

1. **Navigate to the Application**:

   - Open your web browser and go to the live demo: [https://kir1l.github.io/exifText/](https://kir1l.github.io/exifText/)

2. **Select or Upload an Image**:

   - Select from Image Gallery:
     - Browse through available categories (e.g., Memes, Nature)
     - Click on an image to select it
   - Upload Your Own Image:
     - Click on the "Drag & drop an image here, or click to select one" area
     - Choose an image from your device (JPEG/JPG format recommended)

3. **Enter Text to Encrypt**:

   - Scroll down to the Encrypt section
   - In the "Enter text to encrypt..." textarea, type the text you want to hide
   - Supports text in any language, including Russian and other Unicode characters

4. **Optional: Use an Encryption Key**:

   - Check the "Use encryption key" checkbox
   - Generate a Key:
     - Click on "Generate Key" to create a random encryption key
     - Click "Copy Key" to copy it to your clipboard
   - Or Enter Your Own Key:
     - Type your custom key into the input field

5. **Encrypt and Download the Image**:
   - Click the "Encrypt" button
   - The encrypted image will be automatically downloaded as encrypted-image.jpg

### Decrypt Text from an Image

1. **Navigate to the Decrypt Page**:

   - Click on "Decrypt" in the navigation bar

2. **Upload the Encrypted Image**:

   - Click on the upload area
   - Select the image containing the hidden text

3. **Optional: Enter Decryption Key**:

   - Check the "Use decryption key" checkbox
   - Enter the correct decryption key

4. **Decrypt and View Text**:
   - Click the "Decrypt" button
   - The hidden text will be displayed under "Decrypted Text:"

### Key Files and Directories

- `src/components/`: Reusable React components
- `src/pages/`: Page components for routing
- `src/utils/`: Utility functions
- `src/App.jsx`: Main application component
- `src/main.jsx`: Entry point
- `vite.config.js`: Vite configuration
- `package.json`: Project configuration

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the Repository

2. Clone Your Fork:

```bash
git clone https://github.com/your-username/exifText.git
cd exifText
```

3 .Create a Branch:

```bash
git checkout -b feature/your-feature-name
```

4. Make Your Changes

5. Commit Your Changes:

```bash
git add .
git commit -m "Add your commit message here"

```

6. Push Your Changes:

```bash
git push origin feature/your-feature-name
```

7. Create a Pull Request

## License

This project is licensed under the MIT License.
Note: Ensure you have the rights to use and modify the images you select or upload.

[Back to Top](#table-of-contents)
