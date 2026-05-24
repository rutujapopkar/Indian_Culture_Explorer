// src/AnimatedMap.js
import React from 'react';
import './Map.css'; 

const statesToInclude = [
  'Maharashtra', 'Gujarat', 'Tamil Nadu', 'West Bengal', 'Goa' 
];

// Placeholder for coordinates to simulate a map layout
const stateCoordinates = {
    'Maharashtra': { x: 300, y: 350 },
    'Gujarat': { x: 200, y: 300 },
    'Tamil Nadu': { x: 400, y: 500 },
    'West Bengal': { x: 550, y: 300 },
    'Goa': { x: 350, y: 400 },
};


function AnimatedMap({ onDrop, placedItems, GI_PRODUCTS, isGameComplete }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to get all product names correctly placed in a state
  const getPlacedProductNames = (stateName) => {
    return GI_PRODUCTS
      .filter(p => placedItems[p.id] === stateName)
      .map(p => p.name.split(' ')[0]);
  };

  return (
    <div className="india-map-container">
      <svg viewBox="0 0 800 600" className={`india-map ${isGameComplete ? 'map-complete' : ''}`}>
        <text x="350" y="50" fontSize="30" fontWeight="bold" textAnchor="middle" fill="#007bff">INDIA GI MAP (Animated Simulation)</text>
        
        {statesToInclude.map((state) => {
          const coords = stateCoordinates[state];
          const placedProductNames = getPlacedProductNames(state);
          const isTarget = placedProductNames.length > 0;

          return (
            <g 
                key={state}
                className={`state-group ${isTarget ? 'target-active' : ''}`}
                onDrop={(e) => onDrop(e, state)}
                onDragOver={handleDragOver}
            >
              {/* Animated/Attractive Drop Zone */}
              <rect
                x={coords.x - 75} 
                y={coords.y - 30} 
                width="150" 
                height="60" 
                className={`state-drop-zone ${isTarget ? 'placed-state' : 'unplaced-state'}`}
                rx="10"
              />
              {/* State Name Label */}
              <text 
                x={coords.x} 
                y={coords.y - 10} 
                textAnchor="middle" 
                fill="#fff" /* White text for contrast */
                fontWeight="bold"
                fontSize="18"
              >
                {state}
              </text>
              {/* Placed Item Feedback */}
              {placedProductNames.map((name, index) => (
                <text 
                  key={name}
                  x={coords.x} 
                  y={coords.y + 15 + (index * 15)} 
                  textAnchor="middle" 
                  fill="#fff" 
                  fontSize="12"
                >
                  ✅ {name}
                </text>
              ))}
            </g>
          );
        })}
        {/* Placeholder for actual map details or animation effect */}
        <text x="350" y="580" fill="#666" fontSize="14" textAnchor="middle">
            (In a real project, this would be an actual interactive SVG map)
        </text>
      </svg>
    </div>
  );
}

export default AnimatedMap;