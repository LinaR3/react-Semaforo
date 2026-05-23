import React, { useState, useEffect, useRef } from 'react';
import '../../styles/home.css';

const COLORS = ["red", "yellow", "green"];

const Home = () => {
  const [color, setColor] = useState("red");
  const [showPurple, setShowPurple] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [autoInterval, setAutoInterval] = useState(5000);
  const intervalRef = useRef(null);

  const allColors = showPurple ? [...COLORS, "purple"] : COLORS;

  const cycleColor = () => {
    setColor(prev => {
      const i = allColors.indexOf(prev);
      return allColors[(i + 1) % allColors.length];
    });
  };

  const togglePurple = () => {
    setShowPurple(prev => {
      if (prev && color === "purple") setColor("red");
      return !prev;
    });
  };

  const toggleAuto = () => {
    setIsAuto(prev => !prev);
  };

  useEffect(() => {
    if (isAuto) {
      intervalRef.current = setInterval(() => {
        setColor(prev => {
          const i = allColors.indexOf(prev);
          return allColors[(i + 1) % allColors.length];
        });
      }, autoInterval);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAuto, autoInterval, allColors]);

  return (
    <div className="container">
      <div className="stick"></div>
      <div className="traffic-light">
        {allColors.map(c => (
          <div
            key={c}
            role="button"
            aria-label={`Luz ${c}`}
            onClick={() => !isAuto && setColor(c)}
            className={`light ${c}${color === c ? ` glow-${c}` : ""}`}
          />
        ))}
      </div>

      <div className="buttons-container">
        <button className="btn btn-semaforo" onClick={cycleColor} disabled={isAuto}>
          Alternar color
        </button>
        <button className="btn btn-semaforo" onClick={togglePurple} disabled={isAuto}>
          {showPurple ? "Quitar luz púrpura" : "Añadir luz púrpura"}
        </button>

        <button
          className={`btn btn-semaforo ${isAuto ? "btn-active" : ""}`}
          onClick={toggleAuto}
        >
          {isAuto ? "⏹ Desactivar automático" : "▶ Activar automático"}
        </button>

        {isAuto && (
          <div className="auto-buttons">
            {[5000, 15000, 20000].map(ms => (
              <button
                key={ms}
                className={`btn btn-semaforo ${autoInterval === ms ? "btn-active" : ""}`}
                onClick={() => setAutoInterval(ms)}
              >
                {ms / 1000}s
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;