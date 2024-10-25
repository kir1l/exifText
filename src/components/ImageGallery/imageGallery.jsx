// src/components/ImageGallery/imageGallery.jsx
import React, { useState } from 'react';
import styled from 'styled-components';

// Import images
import meme1 from '../../assets/images/memes/meme1.jpg';
import meme2 from '../../assets/images/memes/meme2.jpg';
import meme3 from '../../assets/images/memes/meme3.jpg';
import nature1 from '../../assets/images/nature/nature1.jpg';
import nature2 from '../../assets/images/nature/nature2.jpg';
import nature3 from '../../assets/images/nature/nature3.jpg';

const GalleryContainer = styled.div`
	padding: 0 20px 20px;
	text-align: center;
`;

const CategoryTabs = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
  justify-content: center;
`;

const Tab = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#007bff' : '#f0f0f0')};
  color: ${(props) => (props.active ? 'white' : 'black')};
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.active ? '#0056b3' : '#e0e0e0'};
  }
`;

const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, auto));
  gap: 20px;
`;

const TitleDiv = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const ImageCard = styled.div`
  cursor: pointer;
  border: ${(props) =>
    props.selected ? '3px solid #007bff' : '3px solid transparent'};
  border-radius: 4px;

  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 2px;
  }
`;

const categories = {
  memes: [
    { id: 1, url: meme1 },
    { id: 2, url: meme2 },
    { id: 3, url: meme3 },
  ],
  nature: [
    { id: 4, url: nature1 },
    { id: 5, url: nature2 },
    { id: 6, url: nature3 },
  ],
};

const ImageGallery = ({ onSelectImage, selectedImage }) => {
  const [activeCategory, setActiveCategory] = useState('memes');

  return (
    <GalleryContainer>
      <TitleDiv>Select Template Image</TitleDiv>
      <CategoryTabs>
        {Object.keys(categories).map((category) => (
          <Tab
            key={category}
            active={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Tab>
        ))}
      </CategoryTabs>
      <ImagesGrid>
        {categories[activeCategory].map((image) => (
          <ImageCard
            key={image.id}
            selected={selectedImage && selectedImage.url === image.url}
            onClick={() =>
              onSelectImage &&
              onSelectImage({ ...image, isUserUpload: false })
            }
          >
            <img src={image.url} alt={`Template ${image.id}`} />
          </ImageCard>
        ))}
      </ImagesGrid>
    </GalleryContainer>
  );
};

export default ImageGallery;
