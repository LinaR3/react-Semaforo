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

};

export default Home;