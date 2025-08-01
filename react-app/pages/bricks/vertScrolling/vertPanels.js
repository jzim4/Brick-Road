/*
Author: Jonah Zimmer

This file contains the panels that appear in the scrolling path as well as the zoomable forms. 
*/

import React, { useState } from 'react';

export default function VertPanel() {
  const [modalImage, setModalImage] = useState(null);

  function openModal(fileName) {
    setModalImage(`/panels/big/IMG_${fileName}.jpeg`);
  }

  function closeModal() {
    setModalImage(null);
  }

  const panelHeights = [283, 326, 327, 320.7, 326.6, 331, 325, 330, 328, 321, 328, 327, 329].map(h => h * 1.5);
  const panelData = [2694, 2698, 2700, 2701, 2702, 2706, 2708, 2711, 2715, 2716, 2719, 2721, 2725];

  return <div id="vertPanelsContainer">
    {modalImage && (
      <div id="vertImageModal" onClick={closeModal}>
        <span className="close-modal" onClick={closeModal}>&times;</span>
        <img className="modal-content" src={modalImage} />
      </div>
    )}
    {panelData.map((panel, i) => (
        <div onClick={() => openModal(panel)} className="vertPanel" style={{height: panelHeights[i] + "px"}} key={panel}>
            <p>Click to see panel image</p>
            <p>Panel {i+1}</p>
        </div>
    ))}
  </div>
}
