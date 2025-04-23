import React from 'react';
import InteractiveMap from '../components/Map';
import { Search, Filter, Compass } from 'lucide-react';

const MapPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Interactive Travel Map</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore destinations visually, find nearby attractions, and plan your itinerary with our interactive map.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
                <Search className="h-5 w-5 text-gray-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search for a destination or address" 
                  className="w-full outline-none"
                  aria-label="Search destinations"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Popular Destinations</h3>
              <ul className="space-y-3">
                {['Paris, France', 'Tokyo, Japan', 'Rome, Italy', 'New York, USA', 'Bali, Indonesia'].map((location, index) => (
                  <li key={index}>
                    <button className="w-full text-left flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors">
                      <Compass className="h-4 w-4 text-blue-500 mr-2" />
                      <span className="text-gray-600">{location}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Map Layers</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-gray-600">Popular Attractions</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-gray-600">Hotels</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-gray-600">Restaurants</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                  <span className="ml-2 text-gray-600">Public Transport</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <InteractiveMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;