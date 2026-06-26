import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import CoffeeCard from '../components/CoffeeCard';

const MenuSection = () => {
  const menuItems = [
    {
      name: 'Espresso',
      description: 'Pure, intense, and bold. A concentrated shot of our finest dark roast beans.',
      price: '$6.00',
      image: 'https://images.pexels.com/photos/8937411/pexels-photo-8937411.jpeg?auto=compress&cs=tinysrgb&w=1200'
    },
    {
      name: 'Cappuccino',
      description: 'A perfect balance of espresso, steamed milk, and a thick layer of creamy foam.',
      price: '$8.00',
      image: 'https://images.pexels.com/photos/36964583/pexels-photo-36964583.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
    },
    {
      name: 'Mocha',
      description: 'Rich espresso blended with premium Ghanaian chocolate and velvety steamed milk.',
      price: '$9.00',
      image: 'https://images.pexels.com/photos/28869124/pexels-photo-28869124.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
    }
  ];

  return (
    <section id="menu" className="py-24 px-6 bg-bg-dark">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="Signature Collection" subtitle="The Finest Brews" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <CoffeeCard {...item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
