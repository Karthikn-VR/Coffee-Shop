import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import TestimonialCard from '../components/TestimonialCard';

const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "The most exquisite coffee I've ever tasted. The atmosphere is simply divine, a true sanctuary for coffee lovers.",
      author: "Sophia Loren",
      role: "Lifestyle Blogger",
      rating: 5
    },
    {
      text: "An unparalleled attention to detail. From the roasting process to the final pour, everything is pure perfection.",
      author: "James Anderson",
      role: "Coffee Connoisseur",
      rating: 5
    },
    {
      text: "Cozy Cup has redefined my morning ritual. The gold-standard service matches the premium quality of their brew.",
      author: "Elena Rossi",
      role: "Architect",
      rating: 4
    }
  ];

  return (
    <section className="py-24 px-6 bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Guest Experiences" subtitle="Testimonials" />
        
        <div className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x">
          {testimonials.map((t, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="min-w-[300px] md:min-w-[400px] snap-center"
            >
              <TestimonialCard {...t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
