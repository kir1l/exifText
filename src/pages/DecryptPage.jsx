import React, { useState } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import KeyInput from '../components/KeyInput/KeyInput';
import { decryptText } from '../utils/crypto';
import { readExifData } from '../utils/exif';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Result = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: rgb(59 59 59);
`;

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

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-top: 1rem;
  padding: 0.5rem;
`;

const DecryptPage = () => {
  const { image } = useOutletContext();
  const [useKey, setUseKey] = useState(false);
  const [key, setKey] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [error, setError] = useState('');

  const handleDecrypt = async () => {
    if (!image) {
      setError('Please select an image first');
      return;
    }

    if (useKey && !key) {
      setError('Please enter a decryption key');
      return;
    }

    try {
      setError('');
      const encryptedText = await readExifData(image);
      
      if (useKey) {
        try {
          const decrypted = decryptText(encryptedText, key);
          setDecryptedText(decrypted);
        } catch (decryptError) {
          setError('Invalid decryption key');
          setDecryptedText('');
        }
      } else {
        setDecryptedText(encryptedText);
      }
    } catch (error) {
      setError('Failed to read encrypted data from image');
      setDecryptedText('');
    }
  };

  return (
    <Container>
      <KeyInput 
        mode="decrypt"
        useKey={useKey}
        setUseKey={setUseKey}
        keyValue={key}
        setKeyValue={setKey}
      />
      <Button onClick={handleDecrypt}>Decrypt</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {decryptedText && !error && (
        <Result>
          <h3>Decrypted Text:</h3>
          <p>{decryptedText}</p>
        </Result>
      )}
    </Container>
  );
};

export default DecryptPage;
