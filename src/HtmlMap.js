import React from 'react';
import './Map.css'; 
// Import your map outline file. We will use it as the SVG content outline.
import mapOutlineImage from './assets/Map_File/india.svg'; 

const statesToInclude = [
  'Maharashtra', 'Gujarat', 'Tamil Nadu', 'West Bengal', 'Goa' 
];

// Defining relative positions (using percentages for static alignment during zoom/resize)
const stateStyles = {
    // Top/Left are percentages relative to the .html-map-area container.
    'Gujarat': { top: '42%', left: '12%', width: '15%', height: '14%' }, 
    'Maharashtra': { top: '55%', left: '20%', width: '16%', height: '16%' }, 
    'Goa': { top: '70%', left: '22%', width: '8%', height: '8%' }, 
    'West Bengal': { top: '42%', left: '55%', width: '15%', height: '14%' }, 
    'Tamil Nadu': { top: '80%', left: '32%', width: '14%', height: '16%' },
};

function HtmlMap({ onDrop, placedItems, GI_PRODUCTS, isGameComplete }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Function to get all product names correctly placed in a state
  const getPlacedProductNames = (stateName) => {
    // Show only the first two words of the product name for brevity on the map
    return GI_PRODUCTS
      .filter(p => placedItems[p.id] === stateName)
      .map(p => p.name.split(' ').slice(0, 2).join(' '));
  };

  return (
    //... inside the return statement of HtmlMap component

<div className="india-map-container">
    {/* ... The html-map-area div goes here ... */}
      
      {/* The HTML container for the map background and positioned drop zones */}
      <div 
        className={`html-map-area ${isGameComplete ? 'map-complete' : ''}`}
        style={{ backgroundImage: `url(${mapOutlineImage})` }} 
      >
        
        {statesToInclude.map((state) => {
          const placedProductNames = getPlacedProductNames(state);
          const isTarget = placedProductNames.length > 0;
          const style = stateStyles[state];

          return (
            <div 
                key={state}
                // The state-drop-zone class handles the hover effect and positioning
                className={`state-drop-zone ${isTarget ? 'placed-state' : ''}`}
                style={{ ...style }}
                onDrop={(e) => onDrop(e, state)}
                onDragOver={handleDragOver}
                title={`Drop GI product here for ${state}`}
            >
              
              {/* Replaced State Name Text with the tiny dot */}
              <div className="state-dot" />

              {/* Placed Item Feedback */}
              <div className="placed-items-list">
                  {placedProductNames.map((name, index) => (
                    <span key={index} className="placed-item-tag">
                      ✅ {name}
                    </span>
                  ))}
              </div>
            </div>
          );
        })}
       
      </div>


          {/* THIS IS THE NEW LOCATION BELOW THE MAP */}
      <div className="map-footer">
        <h2 className="map-title">Interactive Map of India</h2>
        <h3 className='map-subtitle'>The map has been sourced from Survey of India.</h3>
      </div> 


    </div>
  );
}

export default HtmlMap;
