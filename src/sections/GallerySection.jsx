import { motion } from "framer-motion";

const gallery = [
  {
    src: "https://images.pexels.com/photos/37014534/pexels-photo-37014534.jpeg?auto=compress&cs=tinysrgb&w=1200",
    wide: true,
    tall: false,
  },
  {
    src: "https://images.pexels.com/photos/9812132/pexels-photo-9812132.jpeg?auto=compress&cs=tinysrgb&w=1200",
    wide: false,
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/12821515/pexels-photo-12821515.jpeg?auto=compress&cs=tinysrgb&w=1200",
    wide: false,
    tall: false,
  },
  {
    src: "https://images.pexels.com/photos/18086755/pexels-photo-18086755.jpeg?auto=compress&cs=tinysrgb&w=1200",
    wide: false,
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/36271626/pexels-photo-36271626.jpeg?auto=compress&cs=tinysrgb&w=1200",
    wide: true,
    tall: false,
  },
];

export default function GallerySection(){
  return (
    <section className="bg-bg-dark relative overflow-hidden border-t border-white/[0.058] py-24 sm:py-32">
      <div className="max-w-[1140px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-display text-[11px] tracking-[0.22em] uppercase text-gold mb-4">Gallery</p>
            <h2 className="font-display text-[44px] sm:text-[54px] font-light text-cream leading-[0.98] tracking-tight">Quiet light, <br/>warm cups</h2>
          </div>
          <div className="hidden sm:block font-body text-cream-55 text-[18px] max-w-[290px]">Shot on film. Marais, 7am.</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 auto-rows-[240px] sm:auto-rows-[250px]">
          {/* Row 1 */}
          <GalleryTile src={gallery[3].src} className="sm:col-span-2 lg:col-span-7" />
          <GalleryTile src={gallery[1].src} className="lg:col-span-5 lg:row-span-2" />
          {/* Row 2 */}
          <GalleryTile src={gallery[2].src} className="sm:col-span-1 lg:col-span-4" />
          <GalleryTile src={gallery[0].src} className="sm:col-span-1 lg:col-span-3 lg:row-span-2" />
          <GalleryTile src={gallery[4].src} className="sm:col-span-2 lg:col-span-4" />
        </div>
      </div>
    </section>
  );
}

function GalleryTile({ src, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      className={`relative rounded-[18px] overflow-hidden bg-surface border border-white/[0.06] group ${className}`}
    >
      <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-[1100ms] group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/[0.04] transition-colors" />
    </motion.div>
  );
}
