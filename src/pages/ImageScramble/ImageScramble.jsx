// src/pages/ImageScramble/ImageScramble.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import ImageUploader from '../../components/ImageUploader/ImageUploader';
import { scrambleImage, descrambleImage } from '../../utils/scramble';
import { generateKey } from '../../utils/crypto';

/* Styled Components */
// Container for the page content
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  padding: 0 1rem;
`;

// Title of the page
const Title = styled.h2`
  text-align: center;
  color: #fff;
  margin-bottom: 2rem;
  font-size: 30px;
`;

// Grouping for input elements
const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
`;

// Text input for the key
const TextInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  max-width: 300px;
  margin-bottom: 1rem;
`;

// Grouping for action buttons
const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 45px;
`;

// Styled button component
const Button = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: ${(props) => (props.primary ? '#007bff' : '#28a745')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.primary ? '#0056b3' : '#218838'};
  }
`;

// Preview of the result image
const ImagePreview = styled.img`
  max-width: 400px;
  margin: 2rem 0;
`;

// Display error messages
const ErrorMessage = styled.p`
  color: #dc3545;
  text-align: center;
`;

const KeyInputGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 0.5rem 0;
`;

const KeyInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const GenerateKeyButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.copied ? '#17a2b8' : '#28a745'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.copied ? '#138496' : '#218838'};
  }
`;

/* ImageScramble Component */
const ImageScramble = () => {
  // State variables
  const [image, setImage] = useState(null); // Uploaded image
  const [key, setKey] = useState(''); // Key for scrambling/descrambling
  const [resultImage, setResultImage] = useState(null); // Resulting image
  const [error, setError] = useState(''); // Error message
  const [isKeyGenerated, setIsKeyGenerated] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleGenerateKey = (e) => {
      e.preventDefault();
      setKey(generateKey());
      setIsKeyGenerated(true);
      setCopySuccess(false);
   };

   const handleCopyKey = (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(key);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
   };

  /**
   * Handles the scrambling of the image.
   */
  const handleScramble = async () => {
    setError('');
    if (!image || !key) {
      setError('Please upload an image and enter a key.');
      return;
    }

    try {
      // Scramble the image using the provided key
      const scrambledImage = await scrambleImage(image.url, key);
      setResultImage(scrambledImage);
    } catch (error) {
      console.error('Error scrambling image:', error);
      setError('An error occurred while scrambling the image.');
    }
  };

  /**
   * Handles the descrambling of the image.
   */
  const handleDescramble = async (e) => {
    setError('');
    if (!image || !key) {
      setError('Please upload an image and enter a key.');
      return;
    }

    try {
      // Descramble the image using the provided key
      const descrambledImage = await descrambleImage(image.url, key);
      setResultImage(descrambledImage);
    } catch (error) {
      console.error('Error descrambling image:', error);
      setError('An error occurred while descrambling the image.');
    }
  };

  /**
   * Handles the download of the result image.
   */
  const handleDownload = () => {
    if (resultImage) {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = 'processed-image.png';
      link.click();
    }
  };

  return (
    <Container>
      <Title>Image Scramble Tool</Title>
      <ImageUploader onImageUpload={setImage} image={image} />
      
      <KeyInputGroup>
        <KeyInput
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter a key"
        />
         <GenerateKeyButton
            type="button"
            copied={copySuccess}
            onClick={isKeyGenerated ? handleCopyKey : handleGenerateKey}
         >
            {isKeyGenerated ? (copySuccess ? 'Copied!' : 'Copy Key') : 'Generate Key'}
         </GenerateKeyButton>
      </KeyInputGroup>

      {/* Action Buttons */}
      <ButtonGroup>
        <Button primary onClick={handleScramble}>Scramble Image</Button>
        <Button onClick={handleDescramble}>Descramble Image</Button>
      </ButtonGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      {resultImage && (
        <>
          <ImagePreview src={resultImage} alt="Result" />
          <Button onClick={handleDownload}>Download Image</Button>
        </>
      )}
    </Container>
  );
};

export default ImageScramble;
