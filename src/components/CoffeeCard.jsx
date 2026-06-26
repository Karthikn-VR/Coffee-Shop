import React from 'react';
import { motion } from 'framer-motion';

const CoffeeCard = ({ name, description, price, image }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group relative p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
    >
      <div className="relative h-64 mb-6 overflow-hidden rounded-2xl">
        <motion.img 
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 to-transparent" />
      </div>
      <div className="flex justify-between items-end mb-3">
        <h3 className="text-2xl font-poppins font-semibold text-cream">{name}</h3>
        <span className="text-gold font-poppins font-medium">{price}</span>
      </div>
      <p className="text-cream/60 font-cormorant text-lg leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default CoffeeCard;
