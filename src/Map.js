import React from 'react';
import './Map.css';
import mapOutlineImage from './assets/Map_File/india.svg';

const statesToInclude = ['Maharashtra', 'Gujarat', 'Tamil Nadu', 'West Bengal', 'Goa'];

const stateStyles = {
  Gujarat: { top: '42%', left: '12%', width: '15%', height: '14%' },
  Maharashtra: { top: '55%', left: '20%', width: '16%', height: '16%' },
  Goa: { top: '70%', left: '22%', width: '8%', height: '8%' },
  WestBengal: { top: '42%', left: '55%', width: '15%', height: '14%' },
  TamilNadu: { top: '80%', left: '32%', width: '14%', height: '16%' },
};

function HtmlMap({ onDrop, placedItems, GI_PRODUCTS, isGameComplete }) {
  const handleDragOver = (e) => e.preventDefault();

  const getPlacedProductNames = (stateName) =>
    GI_PRODUCTS.filter((p) => placedItems[p.id] === stateName)
      .map((p) => p.name.split(' ').slice(0, 2).join(' '));

  return (
    <div className="india-map-container">
      {/* Map Area */}
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
              className={`state-drop-zone ${isTarget ? 'placed-state' : ''}`}
              style={style}
              onDrop={(e) => onDrop(e, state)}
              onDragOver={handleDragOver}
              title={`Drop GI product here for ${state}`}
            >
              <div className="state-dot" />
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

      {/* Footer — Now correctly below the map */}
      <div className="map-footer">
        <h2 className="map-title">Interactive Map of India</h2>
        <h3 className="map-subtitle">The map has been sourced from Survey of India.</h3>
      </div>
    </div>
  );
}

export default HtmlMap;
