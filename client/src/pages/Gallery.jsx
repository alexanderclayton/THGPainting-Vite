import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const [toggleState, setToggleState] = useState(false);
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    // Fetch gallery data from the backend API
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      const response = await fetch('/api/gallery');
      const data = await response.json();
      setGalleryData(data);
    } catch (error) {
      console.error('Error fetching gallery data:', error);
    }
  };

  const handleToggle = () => {
    setToggleState(!toggleState);
  };

  const renderGallery = () => {
    return galleryData.map((item) => (
      <div key={item.id}>
        <h3>{item.caption}</h3>
        <img src={toggleState ? item.afterImage : item.beforeImage} alt={item.caption} />
      </div>
    ));
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={toggleState} onChange={handleToggle} />
        Toggle Before/After
      </label>
      {renderGallery()}
    </div>
  );
};

export default Gallery;
