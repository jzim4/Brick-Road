/*
Author: Jonah Zimmer

This file contains the panels that appear in the scrolling path as well as the zoomable forms. 
*/

import React, { useState, useEffect, useRef } from 'react';

export default function Panel() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomedIndex, setZoomedIndex] = useState(null);
  const galleryRef = useRef(null);

  const panelsData = [
    { id: 2694, width: 332.8 },
    { id: 2698, width: 326 },
    { id: 2700, width: 327 },
    { id: 2701, width: 320.7 },
    { id: 2702, width: 326.6 },
    { id: 2706, width: 331 },
    { id: 2708, width: 325 },
    { id: 2711, width: 330 },
    { id: 2715, width: 328 },
    { id: 2716, width: 321 },
    { id: 2719, width: 328 },
    { id: 2721, width: 327 },
    { id: 2725, width: 329 },
  ];

  function openGallery(index) {
    setActiveIndex(index);
    setGalleryOpen(true);
    setZoomedIndex(null);
  }

  function closeGallery() {
    setGalleryOpen(false);
    setZoomedIndex(null);
  }

  useEffect(() => {
    if (galleryOpen && galleryRef.current) {
      const activeThumbnail = galleryRef.current.children[activeIndex];
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [galleryOpen, activeIndex]);

  const renderGallery = () => {
    if (!galleryOpen) return null;

    const isZoomed = zoomedIndex !== null;
    const activePanel = panelsData[activeIndex];

    const handleBackdropClick = () => {
      if (isZoomed) {
        setZoomedIndex(null);
      } else {
        closeGallery();
      }
    }

    return (
      <div id="gallery-popup" onClick={handleBackdropClick}>
        <button onClick={closeGallery} id="closeGallery">Close</button>
        <div id="gallery-container" className={isZoomed ? 'zoomed' : ''} onClick={(e) => e.stopPropagation()}>
          <div id="gallery-stage-container" className={isZoomed ? 'zoomed' : ''}>
            <div id="gallery-stage">
              <img
                src={`/panels/big/IMG_${activePanel.id}.jpeg`}
                className="gallery-panel"
                alt={`Panel ${activePanel.id}`}
                onClick={() => setZoomedIndex(isZoomed ? null : activeIndex)}
              />
            </div>
          </div>

          <div id="gallery-thumbnails" ref={galleryRef}>
            {panelsData.map((panel, index) => (
              <img
                key={panel.id}
                src={`/panels/small/IMG_${panel.id}.jpeg`}
                className={`thumbnail-panel ${index === activeIndex ? 'active' : ''}`}
                alt={`Thumbnail ${panel.id}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>

        </div>
      </div>
    );
  };

  return (
    <div id="panelsContainer">
      {renderGallery()}
      {panelsData.map((panel, index) => (
        <img
          key={panel.id}
          onClick={() => openGallery(index)}
          className="panel"
          width={panel.width}
          height="363"
          src={`/panels/small/IMG_${panel.id}.jpeg`}
          alt={`Panel ${panel.id}`}
        />
      ))}
    </div>
  );
}
