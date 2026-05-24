// src/DescriptionOverlay.js
import React from 'react';
import './DescriptionOverlay.css'; 

function DescriptionOverlay({ product, onClose }) {
  return (
    <div className="overlay-backdrop">
      <div className="overlay-content">
        <button onClick={onClose} className="close-button">X</button>
        <h2 className="overlay-gi-name">{product.name} - India's GI Treasure</h2>
        
        <div className="details-grid">
            <p><strong>State:</strong> {product.state}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>GI Number:</strong> {product.gi_number}</p>
        </div>

        <p className="description-text">{product.description}</p>
        
        {/* Displaying the Image */}
        <div className="product-image-container">
            <img 
                src={require(`./assets/${product.image_path}`)} 
                alt={product.name} 
                className="product-image-full"
            />
        </div>
      </div>
    </div>
  );
}

export default DescriptionOverlay;