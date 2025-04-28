import React, { useState } from 'react';
import InteractiveMap from '../components/Map';
import { Search, Filter, Compass } from 'lucide-react';

interface RegionCoordinates {
  lat: number;
  lng: number;
  zoom: number;
}

const regionCoordinates: Record<string, RegionCoordinates> = {
  'Европа': { lat: 48.8566, lng: 2.3522, zoom: 4 },
  'Азия': { lat: 35.6762, lng: 139.6503, zoom: 4 },
  'Северная Америка': { lat: 40.7128, lng: -74.0060, zoom: 4 },
  'Южная Америка': { lat: -22.9068, lng: -43.1729, zoom: 4 },
  'Африка': { lat: -33.9249, lng: 18.4241, zoom: 4 },
  'Океания': { lat: -33.8688, lng: 151.2093, zoom: 4 }
};

const MapPage: React.FC = () => {
  const [selectedCoordinates, setSelectedCoordinates] = useState<RegionCoordinates | null>(null);

  const handleRegionClick = (region: string) => {
    const coordinates = regionCoordinates[region];
    if (coordinates) {
      setSelectedCoordinates(coordinates);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Интерактивная карта путешествий</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Исследуйте направления визуально, находите ближайшие достопримечательности и планируйте свой маршрут с помощью нашей интерактивной карты.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Поиск направления или адреса" 
                  className="w-full outline-none"
                  aria-label="Поиск направлений"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Фильтры
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Поиск
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Регионы мира</h3>
              <ul className="space-y-3">
                {Object.keys(regionCoordinates).map((region) => (
                  <li key={region}>
                    <button 
                      onClick={() => handleRegionClick(region)}
                      className="w-full text-left flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors"
                    >
                      <Compass className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-gray-600">{region}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Слои карты</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-gray-600">Популярные места</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-gray-600">Отели</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-gray-600">Рестораны</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-gray-600">Общественный транспорт</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <InteractiveMap selectedCoordinates={selectedCoordinates} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;