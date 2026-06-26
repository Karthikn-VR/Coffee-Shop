import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';

const ReservationSection = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-bg-dark relative">
      <div className="max-w-4xl mx-auto">
        <SectionTitle title="Reserve Your Table" subtitle="Private Experience" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/5 border border-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl"
        >
          <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-cream/60 font-poppins text-sm uppercase tracking-widest">Full Name</label>
              <input 
                type="text" 
                className="bg-transparent border-b border-white/20 py-3 text-cream focus:border-gold outline-none transition-colors font-cormorant text-xl" 
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-cream/60 font-poppins text-sm uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                className="bg-transparent border-b border-white/20 py-3 text-cream focus:border-gold outline-none transition-colors font-cormorant text-xl" 
                placeholder="email@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-cream/60 font-poppins text-sm uppercase tracking-widest">Guests</label>
              <select className="bg-transparent border-b border-white/20 py-3 text-cream focus:border-gold outline-none transition-colors font-cormorant text-xl appearance-none">
                <option className="bg-bg-dark" value="1">1 Person</option>
                <option className="bg-bg-dark" value="2">2 People</option>
                <option className="bg-bg-dark" value="3">3 People</option>
                <option className="bg-bg-dark" value="4+">4+ People</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-cream/60 font-poppins text-sm uppercase tracking-widest">Date</label>
              <input 
                type="date" 
                className="bg-transparent border-b border-white/20 py-3 text-cream focus:border-gold outline-none transition-colors font-cormorant text-xl" 
              />
            </div>
            <div className="md:col-span-2 flex justify-center mt-6">
              <Button className="w-full md:w-auto px-16 py-4 text-lg">Request Reservation</Button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ReservationSection;
