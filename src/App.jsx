import React, { useState, useEffect } from 'react';
import { MessageCircle, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Inject model-viewer script on all devices
if (typeof window !== 'undefined' && !document.getElementById('model-viewer-script')) {
  const script = document.createElement('script');
  script.id = 'model-viewer-script';
  script.type = 'module';
  script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
  document.head.appendChild(script);
}

const Starburst = ({ text, colorClass = "text-[var(--color-green)]" }) => (
  <div className="relative w-20 h-20 -rotate-12 flex items-center justify-center">
    <svg viewBox="0 0 100 100" className={`absolute inset-0 w-full h-full ${colorClass} fill-current drop-shadow-sm`}>
      <path d="M50 0 L58 18 L77 10 L80 29 L98 33 L89 50 L98 67 L80 71 L77 90 L58 82 L50 100 L42 82 L23 90 L20 71 L2 67 L11 50 L2 33 L20 29 L23 10 L42 18 Z" />
    </svg>
    <span className="relative z-10 font-archivo font-black uppercase text-white text-[11px] text-center leading-tight">
      {text}
    </span>
  </div>
);

const WavyDivider = ({ fillColor }) => (
  <div className="w-full overflow-hidden leading-none z-10 relative -mt-1 origin-top">
    <svg className="relative block w-full h-[30px] md:h-[45px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35C50.27,47.45,103.58,68.81,159.2,74.5,215,80.12,258.94,68.91,321.39,56.44Z" className={fillColor} fill="currentColor"></path>
    </svg>
  </div>
);

const MENU_ITEMS = [
  {
    id: 1,
    name: 'SOURDOUGH ARTISAN',
    description: 'Roti sourdough yang dipanggang segar dengan pinggiran renyah dan bagian tengah yang lembut dan asam.',
    imageUrl: '/sourdough-artisan.png',
    price: 'Rp 45.000',
    badge: 'BEST SELLER',
  },
  {
    id: 2,
    name: 'CLASSIC CROISSANT',
    description: 'Lembut, penuh mentega, dan dipanggang hingga keemasan. Citra rasa asli Paris dalam setiap gigitan.',
    imageUrl: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&q=75&w=600',
    price: 'Rp 25.000',
  },
  {
    id: 3,
    name: 'STRAWBERRY TART',
    description: 'Kulit kue renyah isi custard vanila lembut dan topping potongan stroberi segar.',
    imageUrl: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&q=75&w=600',
    price: 'Rp 35.000',
    badge: 'NEW!',
  },
  {
    id: 4,
    name: 'LUXURY CHOCO CAKE',
    description: 'Lapisan cokelat yang kaya dan lembut, dilapisi dengan ganache cokelat hitam yang lumer.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=75&w=600',
    price: 'Rp 250.000',
  },
  {
    id: 5,
    name: 'CINNAMON ROLLS',
    description: 'Roti gulung kayu manis hangat dengan topping krim keju khas kami yang lezat.',
    imageUrl: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=75&w=600',
    price: 'Rp 30.000',
  }
];

const NEW_MENU_ITEM = MENU_ITEMS[2]; // Strawberry Tart (NEW!)

const WHATSAPP_NUMBER = '6287881537270';

const generateWhatsAppUrl = (itemName) => {
  let message = itemName ? `Halo! Saya ingin memesan ${itemName} dari DewiArta Bakery.` : `Halo! Saya ingin bertanya tentang pemesanan kue di DewiArta Bakery.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export default function App() {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [wheelIndex, setWheelIndex] = useState(0);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const smoothReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const nextWheelItem = () => setWheelIndex((prev) => (prev + 1) % MENU_ITEMS.length);
  const prevWheelItem = () => setWheelIndex((prev) => (prev - 1 < 0 ? MENU_ITEMS.length - 1 : prev - 1));

  const activeWheelItem = MENU_ITEMS[wheelIndex];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] font-inter text-[var(--color-dark)] overflow-x-hidden selection:bg-[var(--color-yellow)] selection:text-[var(--color-dark)] relative">
      
      {/* Navbar Minimalist */}
      <nav className="fixed w-full z-50 bg-[var(--color-bg)] border-b-2 border-black/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            <h1 className="text-2xl md:text-3xl font-archivo font-black uppercase tracking-tighter">
              DewiArta<span className="text-[var(--color-green)]">.</span>
            </h1>
            <div className="flex gap-4 items-center">
              <a href="#menu" className="hidden md:block font-bold text-sm tracking-wide hover:opacity-70 transition-opacity">MENU</a>
              <a href="#reviews" className="hidden md:block font-bold text-sm tracking-wide hover:opacity-70 transition-opacity mr-4">REVIEWS</a>
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2 md:px-8 md:py-3 bg-[var(--color-yellow)] text-black font-archivo uppercase text-sm md:text-base rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                ORDER NOW
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 bg-[var(--color-bg)] border-b-2 border-transparent">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-12">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full md:w-[55%] z-10 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <motion.h1 variants={smoothReveal} className="text-[3.5rem] md:text-[6.5rem] leading-[0.85] font-archivo font-black uppercase tracking-tighter mb-6 -rotate-2">
              AUTHENTIC <br />
              BALINESE <br />
              <span className="text-[var(--color-green)]">BAKERY</span>
            </motion.h1>
            <motion.p variants={smoothReveal} className="text-xl font-medium max-w-sm mb-10 text-gray-700 leading-relaxed mx-auto md:mx-0">
              Cook less, live more. Fresh ingredients, high protein pastries, you can't go wrong with DewiArta.
            </motion.p>
            <motion.a
              variants={smoothReveal}
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-12 py-4 font-archivo text-xl uppercase bg-[var(--color-yellow)] text-black rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              SHOP NOW
            </motion.a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-[45%] relative mt-12 md:mt-0"
          >
            {/* Cutout style floating 3D Model without the harsh box */}
            <div className="relative w-full aspect-square md:aspect-[4/5] rounded-full sm:rounded-[4rem] bg-[var(--color-yellow)] border-2 border-black shadow-lg overflow-hidden -rotate-3 hover:rotate-0 transition-transform duration-500">
               {/* @ts-ignore */}
               <model-viewer
                  src={isMobile ? "/Cake3d-mobile.glb" : "/Cake3d.glb"}
                  alt="Kue 3D DewiArta Bakery"
                  auto-rotate
                  camera-controls
                  disable-zoom
                  shadow-intensity="1"
                  exposure="1.1"
                  style={{ width: '100%', height: '100%', background: 'transparent' }}
                />
            </div>
            {/* Soft decorative floating badge */}
            <div className="absolute -bottom-6 md:bottom-12 -left-4 md:-left-12 rotate-6 z-20">
              <Starburst text="100% FRESH" colorClass="text-[var(--color-green)]" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Adding wavy divider connecting bg to yellow section */}
      <WavyDivider fillColor="text-[var(--color-yellow)]" />

      {/* Marquee and Story Section (Yellow Background) */}
      <section id="reviews" className="bg-[var(--color-yellow)] pb-32 -mt-[5px] scroll-mt-24">
        {/* Infinite Marquee */}
        <div className="w-full overflow-hidden border-y-2 border-black py-4 bg-white/30 backdrop-blur-sm mb-20 flex whitespace-nowrap">
          <div className="flex animate-marquee font-archivo text-2xl uppercase tracking-wider text-black/80">
            <span className="mx-8">100% BEBAS PENGAWET</span> •  
            <span className="mx-8">PREMIUM INGREDIENTS</span> •
            <span className="mx-8">FRESH FROM THE OVEN</span> •
            <span className="mx-8">HOME BAKED</span> •
            <span className="mx-8">100% BEBAS PENGAWET</span> •  
            <span className="mx-8">PREMIUM INGREDIENTS</span> •
            <span className="mx-8">FRESH FROM THE OVEN</span> •
            <span className="mx-8">HOME BAKED</span> •
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal}
            className="text-3xl md:text-5xl font-archivo font-black uppercase text-black mb-8 leading-tight rotate-1"
          >
            "When it comes to pastries, DewiArta does it right. The ingredients are top notch and the quality is to die for."
          </motion.h2>
          <p className="font-bold text-black/70">DEWIARTA BAKERY REGULARS</p>
        </div>
      </section>

      <WavyDivider fillColor="text-[var(--color-bg)]" />

      {/* Simple Static Introduction Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 md:px-8 bg-[var(--color-bg)] -mt-[5px]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 border-b-2 border-black/10 pb-24">
          {/* Left Text */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal}
            className="w-full md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left z-10"
          >
            <h2 className="text-xl md:text-2xl font-bold font-archivo uppercase text-[var(--color-green)] mb-4 tracking-widest">Introducing</h2>
            <h3 className="text-4xl md:text-[4rem] leading-[0.9] font-archivo font-black uppercase mb-2 text-black">
              {NEW_MENU_ITEM.name}
            </h3>
            <p className="text-2xl font-black font-archivo text-[var(--color-green)] mb-6">{NEW_MENU_ITEM.price}</p>
            <p className="text-lg font-medium text-gray-700 max-w-sm mb-8">
              {NEW_MENU_ITEM.description}
            </p>
            <a
              href={generateWhatsAppUrl(NEW_MENU_ITEM.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[var(--color-yellow)] text-black font-archivo uppercase text-sm rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              SHOP NOW
            </a>
          </motion.div>

          {/* Right Static Full Image */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal}
            className="w-full md:w-[50%] relative"
          >
            <div className="w-full aspect-[4/3] rounded-3xl border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_#000000] bg-white">
              <img src={NEW_MENU_ITEM.imageUrl} alt={NEW_MENU_ITEM.name} className="w-full h-full object-cover" />
            </div>
            {NEW_MENU_ITEM.badge && (
               <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 z-10">
                 <Starburst text={NEW_MENU_ITEM.badge} colorClass="text-[var(--color-green)]" />
               </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Meet The Squad - Wheel Section in Cream Background */}
      <section id="menu" className="pb-32 max-w-7xl mx-auto px-4 md:px-8 bg-[var(--color-bg)] overflow-hidden scroll-mt-24">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-[5.5rem] font-archivo font-black uppercase leading-[0.8] mb-4">
            Meet the Squad
          </h2>
          <a href="#" className="font-bold underline uppercase tracking-wider text-sm hover:text-[var(--color-green)] transition-colors">Shop All Bakery</a>
        </motion.div>

        <div className="flex flex-col items-center">
          
          {/* Wheel / Clock Viewer */}
          <div className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center overflow-visible mb-8 md:mb-16">
            {/* Soft oval background mimicking a pedestal */}
            <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-black/5 rounded-[100%] blur-3xl z-0" />
            
            {MENU_ITEMS.map((item, index) => {
              const len = MENU_ITEMS.length;
              let offset = index - wheelIndex;
              if (offset < -Math.floor(len / 2)) offset += len;
              if (offset > Math.floor(len / 2)) offset -= len;

              // Setup positions to mimic a top arc
              let x = 0;
              let y = 300; 
              let scale = 0.5;
              let opacity = 0;
              let zIndex = 0;
              let rotate = 0;

              if (offset === 0) {
                // Active item top center
                x = 0;
                y = isMobile ? -10 : -30;
                scale = 1;
                opacity = 1;
                zIndex = 10;
              } else if (offset === 1) {
                // Next item right
                x = isMobile ? 140 : 250;
                y = isMobile ? 60 : 100;
                scale = 0.65;
                opacity = 0.8;
                zIndex = 5;
                rotate = 15;
              } else if (offset === -1) {
                // Previous item left
                x = isMobile ? -140 : -250;
                y = isMobile ? 60 : 100;
                scale = 0.65;
                opacity = 0.8;
                zIndex = 5;
                rotate = -15;
              }

              return (
                <motion.div
                  key={item.id}
                  initial={false}
                  animate={{ x, y, scale, opacity, zIndex, rotate }}
                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  className="absolute w-[200px] h-[200px] md:w-[320px] md:h-[320px] rounded-full border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_#000000] cursor-pointer bg-white"
                  onClick={() => {
                    if (offset === 1) nextWheelItem();
                    if (offset === -1) prevWheelItem();
                  }}
                >
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover select-none pointer-events-none" />
                </motion.div>
              );
            })}
          </div>

          {/* Active Item Details & Arrows */}
          <div className="flex items-center gap-4 md:gap-12 w-full max-w-4xl mx-auto px-4 mt-8 md:mt-4">
             {/* Left Arrow */}
             <button 
                onClick={prevWheelItem} 
                className="shrink-0 p-3 md:p-4 rounded-full border-2 border-black bg-[var(--color-yellow)] text-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all"
             >
                <ChevronLeft size={28} className="stroke-[3]" />
             </button>
             
             {/* Details Text Content */}
             <div className="flex-grow text-center overflow-hidden min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeWheelItem.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <h3 className="text-3xl md:text-[3.5rem] leading-[0.9] font-archivo font-black uppercase mb-2 text-black">
                      {activeWheelItem.name}
                    </h3>
                    <p className="text-2xl md:text-3xl font-black font-archivo text-[var(--color-green)] mb-4">{activeWheelItem.price}</p>
                    <p className="text-sm md:text-base font-medium text-gray-700 max-w-md mx-auto">
                      {activeWheelItem.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
             </div>

             {/* Right Arrow */}
             <button 
                onClick={nextWheelItem} 
                className="shrink-0 p-3 md:p-4 rounded-full border-2 border-black bg-[var(--color-yellow)] text-black shadow-[4px_4px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000000] transition-all"
             >
                <ChevronRight size={28} className="stroke-[3]" />
             </button>
          </div>
          <a
            href={generateWhatsAppUrl(activeWheelItem.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 px-8 py-3 bg-[var(--color-yellow)] text-black font-archivo uppercase text-sm rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_#000000] hover:shadow-[2px_2px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            ORDER NOW
          </a>
        </div>
      </section>

      <WavyDivider fillColor="text-[var(--color-green)]" />

      {/* Comparison Section (Green Background) */}
      <section className="bg-[var(--color-green)] py-24 text-white -mt-[5px]">
         <div className="max-w-5xl mx-auto px-4 md:px-8">
            <motion.h2 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal}
              className="text-4xl md:text-[4rem] text-center font-archivo font-black uppercase leading-[0.9] mb-16"
            >
              What makes <br className="hidden md:block"/> DewiArta better?
            </motion.h2>

            {/* Blocky Table Style */}
            <motion.div 
               initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal}
               className="bg-white rounded-xl border-2 border-black text-black overflow-hidden shadow-[8px_8px_0px_0px_#000000]"
            >
               <div className="grid grid-cols-3 md:grid-cols-4 items-center bg-[var(--color-yellow)] border-b-2 border-black p-4 md:p-6 font-archivo font-black uppercase text-sm md:text-xl">
                  <div className="col-span-1 md:col-span-2">Features</div>
                  <div className="text-center text-[var(--color-green)]">DewiArta</div>
                  <div className="text-center text-gray-500">Others</div>
               </div>
               
               <div className="grid grid-cols-3 md:grid-cols-4 items-center border-b-2 border-black p-4 md:p-6">
                  <div className="col-span-1 md:col-span-2 font-bold uppercase text-xs md:text-base">Phenomenal Taste</div>
                  <div className="flex justify-center"><Check className="text-[var(--color-green)] stroke-[3]" /></div>
                  <div className="flex justify-center"><X className="text-gray-400 stroke-[3]" /></div>
               </div>

               <div className="grid grid-cols-3 md:grid-cols-4 items-center border-b-2 border-black p-4 md:p-6 bg-gray-50">
                  <div className="col-span-1 md:col-span-2 font-bold uppercase text-xs md:text-base">Guilt Free Snacking</div>
                  <div className="flex justify-center"><Check className="text-[var(--color-green)] stroke-[3]" /></div>
                  <div className="flex justify-center"><X className="text-gray-400 stroke-[3]" /></div>
               </div>

               <div className="grid grid-cols-3 md:grid-cols-4 items-center p-4 md:p-6">
                  <div className="col-span-1 md:col-span-2 font-bold uppercase text-xs md:text-base">100% Fresh Oven</div>
                  <div className="flex justify-center"><Check className="text-[var(--color-green)] stroke-[3]" /></div>
                  <div className="flex justify-center"><X className="text-gray-400 stroke-[3]" /></div>
               </div>
            </motion.div>
         </div>
      </section>

      <WavyDivider fillColor="text-[#000000]" />

      {/* Location Section */}
      <section className="bg-black py-24 text-[var(--color-bg)] -mt-[5px]">
         <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.h2 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal}
              className="text-4xl md:text-[4rem] text-center font-archivo font-black uppercase leading-[0.9] mb-12 text-[var(--color-yellow)]"
            >
              VISIT US
            </motion.h2>

            <motion.div 
               initial="hidden" whileInView="visible" viewport={{ once: true }} variants={smoothReveal}
               className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden border-4 border-white shadow-[8px_8px_0px_0px_#28B474]"
            >
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.804835748822!2d114.93898027593659!3d-8.222372291810219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1835247d7aaef%3A0x16c429dca8a4846b!2sDewi%20Arta%20Bakery!5e0!3m2!1sen!2sid!4v1776313511408!5m2!1sen!2sid" 
                 width="100%" 
                 height="100%" 
                 style={{border:0}} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
            </motion.div>
         </div>
      </section>

      {/* Footer minimal style */}
      <footer className="bg-black text-[var(--color-bg)] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <h2 className="text-4xl md:text-[5rem] font-archivo font-black uppercase text-[var(--color-yellow)]">DEWIARTA<span className="text-[var(--color-green)]">.</span></h2>
            <div className="flex gap-4">
              <a href="#" className="font-bold underline uppercase tracking-wider text-sm hover:text-[var(--color-green)] transition-colors">Instagram</a>
              <a href="#" className="font-bold underline uppercase tracking-wider text-sm hover:text-[var(--color-yellow)] transition-colors">WhatsApp</a>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between text-sm font-medium text-gray-400">
            <p>COPYRIGHT @DEWIARTA BAKERY</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
