import React, { useEffect, useRef } from 'react';
import './Confetti.css'; // Put your CSS in a separate file for cleaner organization

const Confetti = () => {
  const containerRef = useRef();

  useEffect(() => {
    const confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D'];
    const confettiAnimations = ['slow', 'medium', 'fast'];
    const confettiFrequency = 25; // Interval for generating new confetti elements

    const createConfetti = () => {
      const confettiEl = document.createElement('div');
      const confettiSize = `${Math.floor(Math.random() * 3) + 7}px`;
      const confettiColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      const confettiLeft = `${Math.floor(Math.random() * containerRef.current.offsetWidth)}px`;
      const confettiAnimation = confettiAnimations[Math.floor(Math.random() * confettiAnimations.length)];

      confettiEl.classList.add('confetti', `confetti--animation-${confettiAnimation}`);
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiColor;

      containerRef.current.appendChild(confettiEl);

      // Remove the confetti element after 3 seconds
      setTimeout(() => {
        if (confettiEl.parentNode) {
          confettiEl.parentNode.removeChild(confettiEl);
        }
      }, 3000);
    };

    // Set interval for creating confetti
    const interval = setInterval(createConfetti, confettiFrequency);

    // Clean up on component unmount
    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="confetti-container"></div>;
};

export default Confetti;
