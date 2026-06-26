import React from 'react';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import MenuSection from '../sections/MenuSection';
import ExperienceSection from '../sections/ExperienceSection';
import GallerySection from '../sections/GallerySection';
import TestimonialsSection from '../sections/TestimonialsSection';
import ReservationSection from '../sections/ReservationSection';
import FooterSection from '../sections/FooterSection';

const Home = () => {
  return (
    <main className="bg-bg-dark">
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <ExperienceSection />
      <GallerySection />
      <TestimonialsSection />
      <ReservationSection />
      <FooterSection />
    </main>
  );
};

export default Home;
