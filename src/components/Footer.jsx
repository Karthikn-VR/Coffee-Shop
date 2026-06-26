import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-bg-dark pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="col-span-1 md:col-span-1">
          <div className="text-2xl font-poppins font-bold text-gold mb-6">COZY CUP</div>
          <p className="text-cream/50 font-cormorant text-lg leading-relaxed">
            Elevating your coffee experience through precision, passion, and a love for the bean.
          </p>
        </div>
        
        <div>
          <h4 className="text-cream font-poppins font-semibold mb-6 uppercase tracking-widest text-sm">Quick Links</h4>
          <ul className="space-y-4 text-cream/50 font-cormorant text-lg">
            <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
            <li><a href="#menu" className="hover:text-gold transition-colors">Menu</a></li>
            <li><a href="#about" className="hover:text-gold transition-colors">Our Story</a></li>
            <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream font-poppins font-semibold mb-6 uppercase tracking-widest text-sm">Opening Hours</h4>
          <ul className="space-y-4 text-cream/50 font-cormorant text-lg">
            <li>Mon - Fri: 7:00 AM - 9:00 PM</li>
            <li>Sat: 8:00 AM - 10:00 PM</li>
            <li>Sun: 8:00 AM - 6:00 PM</li>
          </ul>
        </div>

        <div>
          <h4 className="text-cream font-poppins font-semibold mb-6 uppercase tracking-widest text-sm">Connect</h4>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/karthikn._._?igsh=MTd0aWFkbGQzZWh1cA==" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-cream hover:bg-gold hover:text-bg-dark transition-all">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-cream hover:bg-gold hover:text-bg-dark transition-all">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-cream hover:bg-gold hover:text-bg-dark transition-all">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center text-cream/30 font-poppins text-xs uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Cozy Cup Luxury Coffee. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
