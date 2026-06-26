import React from 'react';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

const TestimonialCard = ({ text, author, role, rating }) => {
  return (
    <motion.div 
      className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      <div className="flex gap-1 text-gold mb-4">
        {[...Array(5)].map((_, i) => (
          <HiStar key={i} className={`${i < rating ? 'opacity-100' : 'opacity-30'}`} />
        ))}
      </div>
      <p className="text-cream/80 font-cormorant text-xl italic mb-6 leading-relaxed">
        "{text}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
          {author[0]}
        </div>
        <div>
          <h4 className="text-cream font-poppins font-medium">{author}</h4>
          <p className="text-cream/40 text-sm">{role}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
