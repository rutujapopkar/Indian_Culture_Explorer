// src/LandingPage.js
import React from 'react';
import './LandingPage.css';
import backgroundVideo from './assets/LandingPage_BG.mp4'; 

function LandingPage({ onStartGame }) {
  return (
    <div className="landing-container">
      <video autoPlay loop muted className="video-background">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="content-overlay">
        <h1><strong>DISCOVER AUTHENTIC INDIA</strong></h1> 
        <p><strong>ONE GI AT A TIME</strong></p>               
        
        <button 
          className="start-button"
          onClick={onStartGame}
        >
          CLICK TO CONTINUE
        </button>
      </div>
    </div>
  );
}

export default LandingPage;