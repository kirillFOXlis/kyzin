import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-cover bg-center h-[600px]" style={{ backgroundImage: "url('https://avatars.mds.yandex.net/i?id=2ddc71fbc315a8e1439dd7e979d6e493_l-8406302-images-thumbs&n=13')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
          Откройте для себя удивительные <span className="text-blue-400">направления</span>
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl">
          Исследуйте тщательно отобранные направления для путешествий, читайте подлинные отзывы и планируйте свое следующее приключение с TravelExplorer.
        </p>
        
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-3xl mb-8 transition-all transform hover:scale-[1.01]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Куда вы хотите поехать?" 
                  className="w-full outline-none"
                  aria-label="Поиск направлений"
                />
              </div>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Исследовать
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Link to="/map" className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium py-3 px-6 rounded-lg flex items-center shadow-md">
            <MapPin className="h-5 w-5 mr-2" />
            Открыть интерактивную карту
          </Link>
          <Link to="/destinations" className="bg-white hover:bg-gray-100 transition-colors text-blue-600 font-medium py-3 px-6 rounded-lg shadow-md">
            Популярные направления
          </Link>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="fill-white">
          <path d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,53.3C672,53,768,75,864,80C960,85,1056,75,1152,64C1248,53,1344,43,1392,37.3L1440,32L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;