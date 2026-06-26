import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-bg-dark overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-64 h-54 bg-gold/10 rounded-full blur-3xl" />
          <img 
            src="https://images.pexels.com/photos/13735913/pexels-photo-13735913.jpeg?auto=compress&cs=tinysrgb&w=500" 
            alt="Crafting Coffee" 
            className="relative z-10 rounded-3xl shadow-2xl border border-white/10"
          />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-coffee/40 rounded-full blur-2xl" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle 
            title="Crafted Since 1988" 
            subtitle="Our Heritage" 
            centered={false} 
          />
          <p className="text-cream/70 font-cormorant text-2xl leading-relaxed mb-8">
            Every cup tells a story of carefully selected beans, slow roasting, and exceptional craftsmanship. 
            We believe that coffee is more than just a drink; it's a ritual, a moment of peace in a bustling world.
          </p>
          <p className="text-cream/50 font-cormorant text-xl leading-relaxed mb-10">
            Our master roasters travel the globe to find the finest Arabica beans, ensuring each batch meets 
            our rigorous standards of luxury and taste.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
