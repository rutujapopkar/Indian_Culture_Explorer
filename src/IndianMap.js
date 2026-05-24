// src/IndianMap.js
import React from 'react';
import './Map.css'; 

// States required for the GI products from the data
const statesToInclude = [
  { name: 'Maharashtra', pathD: 'M300,300 L450,300 L450,450 L300,450 Z', x: 375, y: 375 },
  { name: 'Gujarat', pathD: 'M100,200 L250,200 L250,350 L100,350 Z', x: 175, y: 275 },
  { name: 'Tamil Nadu', pathD: 'M400,500 L550,500 L550,650 L400,650 Z', x: 475, y: 575 },
  { name: 'West Bengal', pathD: 'M600,250 L750,250 L750,400 L600,400 Z', x: 675, y: 325 },
  { name: 'Goa', pathD: 'M350,480 L380,480 L380,510 L350,510 Z', x: 365, y: 495 },
];

function IndianMap({ onDrop, placedItems, GI_PRODUCTS }) {
  const handleDragOver = (e) => e.preventDefault();
  
  const getPlacedProductNames = (stateName) => {
    return GI_PRODUCTS
      .filter(p => placedItems[p.id] === stateName)
      .map(p => p.name.split(' ')[0]);
  };

  return (
    <div className="india-map-container">
      <svg viewBox="0 0 900 700" className="india-map-svg">
        <text x="450" y="50" className="map-title" textAnchor="middle">INDIA (GI States)</text>
        
        {statesToInclude.map(({ name, pathD, x, y }) => {
          const isPlaced = Object.values(placedItems).includes(name);
          const placedProductNames = getPlacedProductNames(name);

          return (
            <g key={name} 
               onDrop={(e) => onDrop(e, name)}
               onDragOver={handleDragOver}
               className={`state-group ${isPlaced ? 'state-placed' : ''}`}
               data-state={name}
            >
              {/* Path element representing the state */}
              <path 
                d={pathD} 
                className={`state-path ${isPlaced ? 'placed' : ''}`}
              />
              {/* State Name Label */}
              <text 
                x={x} 
                y={y - 15} 
                className="state-name-label"
              >
                {name}
              </text>
              {/* Placed Item Feedback */}
              {placedProductNames.map((pName, index) => (
                <text 
                  key={pName}
                  x={x} 
                  y={y + 5 + (index * 15)} 
                  className="placed-product-label"
                >
                  ✅ {pName}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
      <p className="map-note">*Simplified Interactive Map*</p>
    </div>
  );
}

export default IndianMap;