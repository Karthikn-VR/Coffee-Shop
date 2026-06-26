import React from 'react';
import coffeeImage from '../assets/Coffee-cup.png';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
// Steam wisp configuration for varied, natural look
const steamWisps = [
  { id: 0, left: '35%', delay: 0,   duration: 2.5, driftX: -15 },
  { id: 1, left: '45%', delay: 0.6, duration: 3.2, driftX: 10  },
  { id: 2, left: '55%', delay: 1.2, duration: 2.8, driftX: -8  },
  { id: 3, left: '42%', delay: 1.8, duration: 3.5, driftX: 18  },
  { id: 4, left: '52%', delay: 0.9, duration: 2.2, driftX: -20 },
  { id: 5, left: '49%', delay: 1.5, duration: 2.7, driftX: -17 },
  { id: 6, left: '38%', delay: 0.3, duration: 3.0, driftX: 12  },
  { id: 7, left: '47%', delay: 2.0, duration: 2.6, driftX: -12 },
  { id: 8, left: '58%', delay: 1.1, duration: 3.4, driftX: 20  },
  { id: 9, left: '40%', delay: 2.4, duration: 2.9, driftX: -18 },
  { id: 10, left: '51%', delay: 0.7, duration: 3.1, driftX: 15 },
  { id: 11, left: '15%', delay: 0.4, duration: 3.2, driftX: -22 },
  { id: 12, left: '20%', delay: 1.0, duration: 2.8, driftX: -15 },
  { id: 13, left: '22%', delay: 1.7, duration: 3.4, driftX: -25 },
  { id: 14, left: '32%', delay: 0.2, duration: 2.6, driftX: -18 },
  { id: 15, left: '25%', delay: 2.1, duration: 3.1, driftX: -12 },
];



// Individual steam wisp component
const SteamWisp = ({ left, delay, duration, driftX }) => {
  return (
    <motion.div
      className="absolute bottom-0"
      style={{ left }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative w-3 origin-bottom"
        animate={{
          y:       [0, -80, -140],
          x:       [0, driftX * 0.5, driftX],
          opacity: [0, 0.6, 0],
          scaleX:  [0.8, 1.4, 2],
        }}
        transition={{
          duration,
          repeat:    Infinity,
          delay,
          ease:      'easeOut',
          times:     [0, 0.6, 1],
        }}
      >
        {/* Main steam body */}
        <div className="w-2 h-16 bg-gradient-to-t from-white/40 via-white/20 to-transparent rounded-full blur-md" />
        
        {/* Inner bright core */}
        <div className="absolute inset-0 w-1 mx-auto h-12 bg-white/30 rounded-full blur-sm" />
      </motion.div>
    </motion.div>
  );
};

const HeroSection = () => {

   const navigate = useNavigate()
 

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-bg-dark"
    >
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-brown)_0%,_var(--color-bg-dark)_70%)] opacity-40" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full opacity-20"
            initial={{
              x:       Math.random() * 100 + '%',
              y:       Math.random() * 100 + '%',
              opacity: Math.random() * 0.5,
            }}
            animate={{
              y:       ['-10%', '110%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat:   Infinity,
              ease:     'linear',
              delay:    Math.random() * 10,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <h1 className="text-6xl md:text-8xl font-poppins font-bold text-cream leading-[1.1] mb-6">
            A Moment,<br />
            <span className="text-gold italic font-cormorant">Brewed.</span>
          </h1>
          <p className="text-cream/60 font-cormorant text-2xl mb-10 max-w-md">
            Experience the art of luxury coffee. Freshly brewed for you, crafted with passion.
          </p>
          <Button onClick={()=> navigate("/make-coffee")} className="text-lg px-12 py-4">Explore Menu</Button>
         
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center items-center"
        >
          {/* ── Floating Cup + Steam wrapper ── */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-20"
          >
            {/* ── Steam container ──
                Positioned absolutely above the cup.
                Adjust `bottom` & `left/right` to match your image's cup rim. */}
            <div
              className="absolute pointer-events-none"
              style={{
                bottom: '65%',   /* ← raise/lower to sit on cup rim  */
                left:   '38%',   /* ← shift to center over cup rim   */
                right:  '20%',
                height: '160px', /* steam travel distance             */
              }}
            >
              {steamWisps.map((wisp) => (
                <SteamWisp key={wisp.id} {...wisp} />
              ))}
            </div>

            {/* Coffee cup image */}
            <img
              src={coffeeImage}
              alt="Luxury Coffee"
              className="w-[1250px] max-w-none object-contain drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>
      </div>
     
    </section>
  );
};

export default HeroSection;