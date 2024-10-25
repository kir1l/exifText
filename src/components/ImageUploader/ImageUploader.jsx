// src/components/ImageUploader/ImageUploader.jsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const DropzoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #cccccc;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin-bottom: 2rem;

  &:hover {
    border-color: #007bff;
  }
`;

const ImagePreview = styled.img`
  max-width: 300px;
  margin: 0 auto
  
`;

const ImageUploader = ({ onImageUpload, image }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          onImageUpload && onImageUpload({ url: reader.result, isUserUpload: true });
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    multiple: false,
  });

  return (
    <UploadContainer>
      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <p>Drag & drop an image here, or click to select one</p>
        )}
      </DropzoneContainer>
      {image && image.isUserUpload && (
        <ImagePreview src={image.url} alt="Uploaded Preview" />
      )}
    </UploadContainer>
  );
};

export default ImageUploader;
