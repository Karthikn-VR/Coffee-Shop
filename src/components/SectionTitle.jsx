import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, centered = true }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}
    >
      {subtitle && (
        <span className="text-gold uppercase tracking-[0.3em] text-sm font-poppins font-medium block mb-4">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-6xl font-poppins font-bold text-cream leading-tight">
        {title}
      </h2>
    </motion.div>
  );
};

export default SectionTitle;
