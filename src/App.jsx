import React, { useState, useEffect } from 'react';
import { MessageCircle, MapPin, Clock, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Inject model-viewer script on all devices
if (typeof window !== 'undefined' && !document.getElementById('model-viewer-script')) {
  const script = document.createElement('script');
  script.id = 'model-viewer-script';
  script.type = 'module';
  script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
  document.head.appendChild(script);
}

const MENU_ITEMS = [
  {
    id: 1,
    name: 'Roti Sourdough Artisan',
    description: 'Roti sourdough yang dipanggang segar dengan pinggiran renyah dan bagian tengah yang lembut dan asam. Difermentasi selama 48 jam.',
    price: 'Rp 45.000',
    imageUrl: 'https://images.unsplash.com/photo-1585478259615-5553e1a8a25c?auto=format&fit=crop&q=75&w=600',
  },
  {
    id: 2,
    name: 'Croissant Mentega Klasik',
    description: 'Lembut, penuh mentega, dan dipanggang hingga keemasan. Citra rasa asli Paris dalam setiap gigitan.',
    price: 'Rp 25.000',
    imageUrl: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?auto=format&fit=crop&q=75&w=600',
  },
  {
    id: 3,
    name: 'Kue Cokelat Mewah',
    description: 'Lapisan cokelat yang kaya dan lembut, dilapisi dengan ganache cokelat hitam yang lumer di mulut.',
    price: 'Rp 250.000',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=75&w=600',
  },
  {
    id: 4,
    name: 'Cinnamon Rolls',
    description: 'Roti gulung kayu manis hangat dengan topping krim keju khas kami yang lezat.',
    price: 'Rp 30.000',
    imageUrl: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&q=75&w=600',
  },
  {
    id: 5,
    name: 'Tarte Stroberi',
    description: 'Kulit kue renyah isi custard vanila lembut dan topping potongan stroberi segar.',
    price: 'Rp 35.000',
    imageUrl: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&q=75&w=600',
  },
  {
    id: 6,
    name: 'Kue Perayaan Kustom',
    description: 'Kue kustom berdesain indah untuk ulang tahun, pernikahan, atau momen spesial apa pun.',
    price: 'Mulai dari Rp 350.000',
    imageUrl: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?auto=format&fit=crop&q=75&w=600',
  },
];

const TOP_SELLERS = [
  MENU_ITEMS[2], // Kue Cokelat Mewah
  MENU_ITEMS[5], // Kue Perayaan Kustom
  MENU_ITEMS[1], // Croissant
];

const WHATSAPP_NUMBER = '6287881537270'; // Gunakan nomor WhatsApp asli Anda di sini

const generateWhatsAppUrl = (itemName) => {
  let message = '';
  if (itemName) {
    message = `Halo! Saya melihat website DewiArta Bakery dan tertarik untuk memesan ${itemName}. Apakah masih tersedia?`;
  } else {
    message = `Halo! Saya ingin bertanya tentang pemesanan kue di DewiArta Bakery.`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const touchStartX = React.useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TOP_SELLERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % TOP_SELLERS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? TOP_SELLERS.length - 1 : prev - 1));

  // Animasi untuk Framer Motion
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800 overflow-x-hidden">
      {/* Navbar Minimalist */}
      <nav className="fixed w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-stone-900 tracking-tight"
            >
              DewiArta <span className="text-orange-600">Bakery</span>
            </motion.h1>
            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              Ada pertanyaan? <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden min-h-[90vh] flex items-center">
        {/* Latar belakang dekoratif */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-100/50 mix-blend-multiply filter blur-3xl opacity-70"></div>
        <div className="absolute top-40 right-40 w-72 h-72 rounded-full bg-yellow-100/50 mix-blend-multiply filter blur-3xl opacity-70"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Teks Hero Utama */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-stone-900 tracking-tight drop-shadow-sm mb-6 leading-tight">
                Dibuat Dengan <span className="text-orange-600">Penuh Cinta</span>
              </motion.h1>
              <motion.p variants={fadeIn} className="mt-4 max-w-lg mx-auto lg:mx-0 text-lg sm:text-xl text-stone-600 mb-10 font-light tracking-wide">
                Nikmati roti artisan, kue kering yang lembut, dan kue perayaan kustom yang dipanggang segar setiap pagi khusus untuk Anda.
              </motion.p>
              <motion.div variants={fadeIn} className="flex justify-center lg:justify-start">
                <a
                  href={generateWhatsAppUrl('Kue Perayaan Kustom')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-bold text-white transition-all duration-300 bg-orange-600 border border-transparent rounded-full shadow-xl hover:bg-orange-700 hover:shadow-orange-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 hover:-translate-y-1"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 transition-transform group-hover:scale-110" />
                  Pesan via WhatsApp
                </a>
              </motion.div>

              {/* Badge tambahan untuk detail kecil di sebelah kiri */}
              <motion.div variants={fadeIn} className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-100">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-stone-700">Rating 4.9/5</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-stone-100">
                  <span className="text-sm font-semibold text-stone-700">🍞 100% Bebas Pengawet</span>
                </div>
              </motion.div>
            </motion.div>

            {/* 3D Cake Hero di sebelah kanan */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative mx-auto lg:ml-auto w-full max-w-md"
            >
              {/* 3D Cake — all devices */}
              <div className="relative rounded-t-[4rem] rounded-bl-[4rem] rounded-br-2xl overflow-hidden shadow-2xl border-[6px] border-white bg-stone-100 z-10 w-full aspect-[4/5] sm:aspect-[3/4]">
                {/* @ts-ignore */}
                <model-viewer
                  src="/Cake3d.glb"
                  alt="Kue 3D DewiArta Bakery"
                  auto-rotate
                  camera-controls
                  disable-zoom
                  shadow-intensity="1"
                  exposure="1.1"
                  style={{ width: '100%', height: '100%', background: 'transparent' }}
                />
              </div>

              {/* Elemen melayang statis/animasi (Floating badge) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-stone-100 flex items-center gap-4 z-20"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✨</span>
                </div>
                <div>
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">Tiap Hari</p>
                  <p className="text-stone-900 font-bold">100% Fresh Oven</p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Top 3 Bestsellers Carousel Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4 flex items-center justify-center gap-2">
              <Star className="text-yellow-400 w-8 h-8 fill-yellow-400" /> 3 Terlaris Minggu Ini <Star className="text-yellow-400 w-8 h-8 fill-yellow-400" />
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Pilihan favorit pelanggan kami yang paling sering dipesan. Selalu fresh dari oven!
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div
            className="relative max-w-4xl mx-auto h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl group"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={TOP_SELLERS[currentSlide].imageUrl}
                  alt={TOP_SELLERS[currentSlide].name}
                  className="w-full h-full object-cover"
                  loading={currentSlide === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white">
                  <div className="inline-block px-3 py-1 bg-orange-600 text-xs font-bold uppercase rounded-full mb-4 shrink-0">
                    Peringkat #{currentSlide + 1}
                  </div>
                  <h3 className="text-3xl sm:text-5xl font-bold mb-3">{TOP_SELLERS[currentSlide].name}</h3>
                  <p className="text-stone-200 text-sm sm:text-base max-w-lg mb-6 line-clamp-2">
                    {TOP_SELLERS[currentSlide].description}
                  </p>
                  <div className="flex items-center gap-6">
                    <span className="text-2xl font-bold text-orange-400">{TOP_SELLERS[currentSlide].price}</span>
                    <a
                      href={generateWhatsAppUrl(TOP_SELLERS[currentSlide].name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-2 text-sm font-semibold text-white bg-[#25D366] rounded-full hover:bg-[#1DA851] transition-transform hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Pesan Sekarang
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-white/40 transition-all duration-300 pointer-events-auto z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-white/40 transition-all duration-300 pointer-events-auto z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {TOP_SELLERS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-orange-500 w-8" : "bg-white/50 hover:bg-white"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 sm:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-4">Semua Menu Kami</h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          <p className="mt-4 text-stone-600 max-w-2xl mx-auto">
            Jelajahi pilihan roti dan kue harian kami. Semuanya dibuat dari nol menggunakan bahan-bahan loka dan impor premium.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
        >
          {MENU_ITEMS.map((item) => (
            <motion.div
              variants={fadeIn}
              whileHover={{ y: -8 }}
              key={item.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-stone-900 leading-tight pr-4">{item.name}</h3>
                  <span className="text-lg font-bold text-orange-600 shrink-0">{item.price}</span>
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-6 flex-grow">{item.description}</p>
                <a
                  href={generateWhatsAppUrl(item.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto w-full inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-white transition-all duration-200 bg-[#25D366] rounded-xl hover:bg-[#1DA851] shadow-md hover:shadow-lg active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Pesan Sekarang
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer / Visit Us */}
      <footer className="bg-stone-900 text-stone-300 py-16 sm:py-20 border-t-4 border-orange-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Kunjungi DewiArta Bakery</h2>
              <p className="text-stone-400">Masuk dan rasakan aroma roti segar yang baru keluar dari oven.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-orange-500 mt-1 shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-1">Lokasi Kami</h4>
                  <p className="text-stone-400 hover:text-stone-200 transition-colors cursor-pointer">
                    Jalan Raya, Pupuan<br />Kec. Seririt, Kabupaten Buleleng<br />Bali 81153
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-orange-500 mt-1 shrink-0" />
                <div>
                  <h4 className="text-white font-semibold mb-1">Jam Operasional</h4>
                  <p className="text-stone-400">
                    Senin - Jumat: 07:00 - 20:00 WIB<br />
                    Sabtu - Minggu: 08:00 - 21:00 WIB
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-stone-800 rounded-2xl p-2 h-64 sm:h-80 overflow-hidden shadow-2xl relative group"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d493.60071429462425!2d114.94150790914863!3d-8.222284068315576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1835247d7aaef%3A0x16c429dca8a4846b!2sDewi%20Arta%20Bakery!5e0!3m2!1sen!2sid!4v1775134089343!5m2!1sen!2sid"
              className="w-full h-full rounded-xl filter grayscale group-hover:grayscale-0 transition-all duration-500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-stone-800 text-center text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} DewiArta Bakery. Hak Cipta Dilindungi Undang-Undang.</p>
        </div>
      </footer>
    </div>
  );
}
