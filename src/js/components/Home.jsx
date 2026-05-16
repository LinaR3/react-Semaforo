import React, { useState } from 'react';
import '../../styles/home.css';

const COLORS = ["red", "yellow", "green"];

const Home = () => {
  const [color, setColor] = useState("red");
  const [showPurple, setShowPurple] = useState(false);

  const allColors = showPurple ? [...COLORS, "purple"] : COLORS;

  const cycleColor = () => {
    const i = allColors.indexOf(color);
    setColor(allColors[(i + 1) % allColors.length]);
  };

  const togglePurple = () => {
    setShowPurple(prev => {
      if (prev && color === "purple") setColor("red");
      return !prev;
    });
  };
eturn (
    <div className="container">
      <div className="stick"></div>
      <div className="traffic-light">
        {allColors.map(c => (
          <div
            key={c}
            role="button"
            aria-label={`Luz ${c}`}
            onClick={() => setColor(c)}
            className={`light ${c}${color === c ? ` glow-${c}` : ""}`}
          />
        ))}
      </div>
      <div className="buttons-container">
        <button className="btn btn-primary" onClick={cycleColor}>
          Alternar color
        </button>
        <button className="btn btn-info" onClick={togglePurple}>
          {showPurple ? "Quitar luz púrpura" : "Añadir luz púrpura"}
        </button>
      </div>
    </div>
  );
};

export default Home;