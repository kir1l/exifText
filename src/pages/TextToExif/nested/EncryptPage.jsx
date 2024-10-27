// src/pages/TextToExifNested/Encrypt.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { useOutletContext } from 'react-router-dom';
import KeyInput from '../../../components/KeyInput/KeyInput';
import { encryptText } from '../../../utils/crypto';
import { writeExifData } from '../../../utils/exif';
import ImageUploader from '../../../components/ImageUploader/ImageUploader';
import ImageGallery from '../../../components/ImageGallery/imageGallery'

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  min-height: 100px;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const EncryptPage = () => {
  const { image, setImage } = useOutletContext();
  const [text, setText] = useState('');
  const [useKey, setUseKey] = useState(false);
  const [key, setKey] = useState('');

  const handleEncrypt = async (e) => {
    e.preventDefault();
    if (!image || !text) {
      alert('Please select an image and enter text');
      return;
    }

    try {
      const processedText = useKey ? encryptText(text, key) : text;
      const processedImage = await writeExifData(image, processedText);
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'yandex-photo.jpg';
      link.click();
    } catch (error) {
      console.error('Encryption failed:', error);
      alert('Encryption failed. Please try again.');
    }
  };

  return (
    <Container>
      <ImageUploader onImageUpload={setImage} image={image} />
      <ImageGallery onSelectImage={setImage} selectedImage={image} />
      <Form onSubmit={handleEncrypt}>
        <KeyInput
          mode="encrypt"
          useKey={useKey}
          setUseKey={setUseKey}
          keyValue={key}
          setKeyValue={setKey}
        />
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to encrypt..."
        />
        <Button type="submit">Encrypt</Button>
      </Form>
    </Container>
  );
};

export default EncryptPage;
