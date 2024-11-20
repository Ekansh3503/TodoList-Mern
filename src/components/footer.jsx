// Footer.jsx
import React from 'react';

const Footer = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      Copyright {currentYear} Yours To-Do List
    </footer>
  );
};

export default Footer;
