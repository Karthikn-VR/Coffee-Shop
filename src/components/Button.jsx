import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '', variant = 'primary' }) => {
  const variants = {
    primary: 'bg-gold text-bg-dark hover:bg-cream',
    secondary: 'border border-gold text-gold hover:bg-gold hover:text-bg-dark',
    outline: 'border border-cream/30 text-cream hover:border-cream'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-8 py-3 rounded-full font-poppins font-medium transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};

export default Button;
