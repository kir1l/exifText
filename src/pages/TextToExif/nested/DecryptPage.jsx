// src/pages/TextToExifNested/Decrypt.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import KeyInput from '../../../components/KeyInput/KeyInput';
import { decryptText } from '../../../utils/crypto';
import { readExifData } from '../../../utils/exif';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';

/* Styled Components */

// Container for the page content
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

// Styled result area
const Result = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: rgb(59, 59, 59);
  border-radius: 4px;
  color: #fff;

  h3 {
    margin-top: 0;
  }
`;

// Styled button component
const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  &:hover {
    background-color: #0056b3;
  }
`;

// Styled error message
const ErrorMessage = styled.p`
  color: #dc3545;
  margin-top: 1rem;
`;

/* Decrypt Component */
const Decrypt = () => {
  // Use the context provided by TextToExif.jsx
  const { image, setImage } = useOutletContext();

  // Component-specific state variables
  const [useKey, setUseKey] = useState(false);          // Whether to use a decryption key
  const [key, setKey] = useState('');                   // The decryption key
  const [decryptedText, setDecryptedText] = useState(''); // The decrypted text
  const [error, setError] = useState('');               // Error message

  /**
   * Handles the decryption process.
   */
  const handleDecrypt = async () => {
    setError('');
    setDecryptedText('');

    if (!image) {
      setError('Please select an image.');
      return;
    }

    try {
      // Read the encrypted text from the image's EXIF data
      const encryptedText = await readExifData(image);

      // Decrypt the text if a key is used
      let finalText;
      if (useKey) {
        // Attempt to decrypt the text with the provided key
        try {
          finalText = decryptText(encryptedText, key);
          if (!finalText) {
            throw new Error('Invalid decryption key or corrupted data.');
          }
        } catch (error) {
          throw new Error('Invalid decryption key or corrupted data.');
        }
      } else {
        finalText = encryptedText;
      }

      setDecryptedText(finalText);
    } catch (error) {
      console.error('Decryption failed:', error);
      setError(error.message || 'Failed to decrypt the message.');
    }
  };

  return (
    <Container>
      <ImageUploader onImageUpload={setImage} image={image} />
      <KeyInput
        mode="decrypt"
        useKey={useKey}
        setUseKey={setUseKey}
        keyValue={key}
        setKeyValue={setKey}
      />
      <Button onClick={handleDecrypt}>Decrypt</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {decryptedText && (
        <Result>
          <h3>Decrypted Text:</h3>
          <p>{decryptedText}</p>
        </Result>
      )}
    </Container>
  );
};

export default Decrypt;
