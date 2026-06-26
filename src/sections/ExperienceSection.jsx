import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { MdSettings, MdLocalFireDepartment, MdCoffee, MdAutoAwesome } from 'react-icons/md';

const ExperienceSection = () => {
  const steps = [
    {
      title: 'Select Beans',
      description: 'Sourcing only the top 1% of Arabica beans from ethical farms.',
      icon: <MdSettings className="text-3xl" />
    },
    {
      title: 'Precision Roast',
      description: 'Small-batch slow roasting to unlock deep, complex flavor profiles.',
      icon: <MdLocalFireDepartment className="text-3xl" />
    },
    {
      title: 'Artisan Brew',
      description: 'Hand-crafted brewing methods ensuring the perfect extraction.',
      icon: <MdCoffee className="text-3xl" />
    },
    {
      title: 'Pure Serve',
      description: 'Served in luxury porcelain to enhance the sensory experience.',
      icon: <MdAutoAwesome className="text-3xl" />
    }
  ];

  return (
    <section className="py-24 px-6 bg-bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="The Brewing Journey" subtitle="Craftsmanship" />
        
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center p-6"
            >
              <div className="w-20 h-20 rounded-full bg-coffee border-2 border-gold flex items-center justify-center text-gold mb-6 shadow-xl shadow-gold/10">
                {step.icon}
              </div>
              <h3 className="text-xl font-poppins font-semibold text-cream mb-3">{step.title}</h3>
              <p className="text-cream/50 font-cormorant text-lg">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
