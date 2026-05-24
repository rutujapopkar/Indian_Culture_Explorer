// src/GIList.js
import React from 'react';
import './GIList.css'; 

function GIList({ products, onDragStart }) {
  return (
    <div className="gi-list-container">
      <h4>DRAG AND DROP THE GI ICONS TO ITS RESPECTIVE STATE.</h4>
      <div className="gi-icons-grid">
        {products.map(product => (
          <div
            key={product.id}
            className="gi-icon"
            draggable
            onDragStart={(e) => onDragStart(e, product.id)}
            title={`Drag ${product.name} to ${product.state}`}
          >
            {/* Image display using the provided paths */}
            <img 
                src={require(`./assets/${product.image_path}`)} 
                alt={product.name} 
                className="gi-product-image"
            />
            <span className="gi-name">{product.name.split(' ').slice(0, 2).join(' ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GIList;