import React from 'react';
import Image from 'next/image';
import { Download, ArrowRight } from 'lucide-react';

const CompanyPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FF]">
      {/* First Section - Hero with Background */}
      <div className="relative min-h-[calc(100vh-64px)]">
        <div className="absolute inset-0">
          <img 
            src="/img/company-hero.png"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-3xl">
            Masak makin menyenangkan
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
            Temukan dan bagikan resep lezat untuk masakan harianmu
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition-colors">
              <Download className="w-5 h-5" />
              Unduh Aplikasi
            </button>
          </div>
        </div>
      </div>

      {/* Second Section - Split Content with light background */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Cari dan temukan resep dari komunitas Cookpad
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Melalui fitur pencarian di Cookpad, kamu dapat menemukan resep berdasarkan bahan atau nama hidangan,
              memastikan kamu selalu mendapat inspirasi masak setiap harinya.
            </p>
            <p className="text-lg text-gray-600">
              Pengalaman ini bahkan lebih baik lagi dengan menggunakan aplikasi Cookpad secara gratis!
            </p>
            <div className="pt-4">
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-lg"
              >
                Unduh aplikasi <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - iPhone Mockup */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-[320px] h-[650px]">
              <img
                src="/img/iphone-frame.png"
                alt="iPhone frame"
                className="absolute inset-0 w-full h-full object-contain z-20"
              />
              <img
                src="/img/iphone-frame.jpg"
                alt="App interface"
                className="absolute inset-[12px] rounded-[32px] object-cover z-10"
              /> 
            </div>
          </div>
        </div>

        {/* Left Content - iPhone Mockup */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-24">
          {/* Left iPhone Mockup */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
            <div className="relative w-[320px] h-[650px]">
              <img
                src="/img/iphone-frame2.png"
                alt="iPhone frame"
                className="absolute inset-0 w-full h-full object-contain z-20"
              />
              <img
                src="/img/iphone-frame.jpg"
                alt="App interface"
                className="absolute inset-[12px] rounded-[32px] object-cover z-10"
              /> 
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Bagikan resepmu dengan mudah
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Berbagi resep favoritmu dengan komunitas Cookpad sangat mudah. 
              Unggah foto, tulis langkah-langkah memasak, dan bagikan tips terbaikmu.
            </p>
            <p className="text-lg text-gray-600">
              Jadilah bagian dari komunitas memasak terbesar di Indonesia!
            </p>
            <div className="pt-4">
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-lg"
              >
                Mulai berbagi resep <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;