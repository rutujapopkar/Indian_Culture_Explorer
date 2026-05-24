// src/App.js
import React, { useState } from 'react';
import { GI_PRODUCTS } from './data';
import LandingPage from './LandingPage'; 
import HtmlMap from './HtmlMap'; // HTML Map Component
import GIList from './GIList';
import DescriptionOverlay from './DescriptionOverlay';
import './App.css'; 
import background from './assets/MainPage_BG.jpg';

// IMPORTANT: Updated file name for animated background

function App() {
  const [placedItems, setPlacedItems] = useState({});
  const [selectedGI, setSelectedGI] = useState(null);
  const [gameStarted, setGameStarted] = useState(false); 

  const handleStartGame = () => setGameStarted(true);
  
  const handleReturnToLanding = () => {
      setGameStarted(false);
      setPlacedItems({});
      setSelectedGI(null);
  };
  
  const handleDrop = (e, droppedState) => {
    e.preventDefault();
    const giId = e.dataTransfer.getData('giId');
    const giProduct = GI_PRODUCTS.find(p => p.id === giId);

    if (giProduct && giProduct.state === droppedState && !placedItems[giId]) {
      setPlacedItems(prev => ({ ...prev, [giId]: droppedState }));
      setSelectedGI(giProduct); // Open info overlay
    } 
  };

  const handleDragStart = (e, giId) => {
    e.dataTransfer.setData('giId', giId);
    e.dataTransfer.effectAllowed = "move"; 
  };

  const handleCloseOverlay = () => setSelectedGI(null);

  const unplacedProducts = GI_PRODUCTS.filter(p => !placedItems[p.id]);
  const score = Object.keys(placedItems).length;
  const totalItems = GI_PRODUCTS.length;
  const isGameComplete = score === totalItems;

  if (!gameStarted) {
    return <LandingPage onStartGame={handleStartGame} />;
  }

  return (
    // Set the main page background using the imported GIF
    <div className="app-container" style={{backgroundImage: `url(${background})`}}> 
      
      {/* Back Button */}
      <button className="back-button" onClick={handleReturnToLanding}>
          ← Back to Intro
      </button>

      <h1 className="main-title">DISCOVER AUTHENTIC INDIA</h1>
      

      <div className="game-area">
        <HtmlMap 
          onDrop={handleDrop} 
          placedItems={placedItems} 
          GI_PRODUCTS={GI_PRODUCTS} 
          isGameComplete={isGameComplete}
        />
        
        <GIList 
          products={unplacedProducts} 
          onDragStart={handleDragStart} 
        />
      </div>

      {selectedGI && (
        <DescriptionOverlay product={selectedGI} onClose={handleCloseOverlay} />
      )}
    </div>
  );
}

export default App;