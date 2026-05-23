import React, { useState, useEffect, useRef } from 'react';
import '../../styles/home.css';

const COLORS = ["red", "yellow", "green"];

const LABELS = {
  red:    { text: "Alto",          emoji: "🔴" },
  yellow: { text: "Precaución",    emoji: "🟡" },
  green:  { text: "Siga",          emoji: "🟢" },
  purple: { text: "Modo especial", emoji: "🟣" },
};

const Home = () => {
  const [color, setColor] = useState("red");
  const [showPurple, setShowPurple] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [autoInterval, setAutoInterval] = useState(5000);
  const [history, setHistory] = useState([
    { color: "red", time: new Date() }
  ]);
  const intervalRef = useRef(null);

  const allColors = showPurple ? [...COLORS, "purple"] : COLORS;

  const changeColor = (newColor) => {
    setColor(newColor);
    setHistory(prev => [
      { color: newColor, time: new Date() },
      ...prev.slice(0, 4)
    ]);
  };

  const cycleColor = () => {
    setColor(prev => {
      const i = allColors.indexOf(prev);
      const next = allColors[(i + 1) % allColors.length];
      setHistory(h => [{ color: next, time: new Date() }, ...h.slice(0, 4)]);
      return next;
    });
  };

  const togglePurple = () => {
    setShowPurple(prev => {
      if (prev && color === "purple") changeColor("red");
      return !prev;
    });
  };

  const toggleAuto = () => setIsAuto(prev => !prev);

  useEffect(() => {
    if (isAuto) {
      intervalRef.current = setInterval(() => {
        setColor(prev => {
          const i = allColors.indexOf(prev);
          const next = allColors[(i + 1) % allColors.length];
          setHistory(h => [{ color: next, time: new Date() }, ...h.slice(0, 4)]);
          return next;
        });
      }, autoInterval);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAuto, autoInterval, allColors]);

  const formatTime = (date) =>
    date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className="page-layout">

      {/* columna izquierda — semáforo + botones */}
      <div className="left-column">
        <h1 className="app-title">Semáforo</h1>

        <div className="status-label">
          <span className="status-emoji">{LABELS[color].emoji}</span>
          <span className="status-text">{LABELS[color].text}</span>
        </div>

        <div className="traffic-pole">
          <div className="traffic-light">
            {allColors.map(c => (
              <div key={c} className={`light-wrapper`}>
                <div className="light-visor" />
                <div
                  role="button"
                  aria-label={`Luz ${c}`}
                  onClick={() => !isAuto && changeColor(c)}
                  className={`light ${c}${color === c ? ` glow-${c}` : ""}`}
                />
              </div>
            ))}
          </div>
          <div className="stick" />
          <div className="base" />
        </div>

        <div className="buttons-container">

          {/* secundario */}
          <button className="btn btn-secondary-action" onClick={cycleColor} disabled={isAuto}>
            Alternar color
          </button>

          {/* terciario */}
          <button className="btn btn-tertiary-action" onClick={togglePurple} disabled={isAuto}>
            {showPurple ? "− Quitar luz púrpura" : "+ Añadir luz púrpura"}
          </button>

          {/* primario */}
          <button
            className={`btn btn-primary-action ${isAuto ? "btn-active" : ""}`}
            onClick={toggleAuto}
          >
            {isAuto ? "⏹ Desactivar automático" : "▶ Activar automático"}
          </button>

          {isAuto && (
            <div className="auto-buttons">
              {[5000, 15000, 20000].map(ms => (
                <button
                  key={ms}
                  className={`btn btn-time ${autoInterval === ms ? "btn-time-active" : ""}`}
                  onClick={() => setAutoInterval(ms)}
                >
                  {ms / 1000}s
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* columna derecha — historial */}
      <div className="right-column">
        <h2 className="history-title">Historial Clicks</h2>
        <ul className="history-list">
          {history.map((entry, i) => (
            <li key={i} className={`history-item ${i === 0 ? "history-item--latest" : ""}`}>
              <span className="history-dot" data-color={entry.color} />
              <div className="history-info">
                <span className="history-label">{LABELS[entry.color].text}</span>
                <span className="history-time">{formatTime(entry.time)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Home;