import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import DestinationCard from '../components/DestinationCard';
import { Search, Filter, Globe, MapPin } from 'lucide-react';
import type { Database } from '../types/supabase';

type Destination = Database['public']['Tables']['destinations']['Row'];

const regions = [
  'Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania'
];

const DestinationsPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching destinations:', error);
      } else if (data) {
        setDestinations(data);
        setFilteredDestinations(data);
      }
      setIsLoading(false);
    };

    fetchDestinations();
  }, []);

  useEffect(() => {
    let filtered = destinations;
    
    if (searchTerm) {
      filtered = filtered.filter(dest => 
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedRegion) {
      filtered = filtered.filter(dest => 
        dest.location.includes(selectedRegion)
      );
    }
    
    setFilteredDestinations(filtered);
  }, [searchTerm, selectedRegion, destinations]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region === selectedRegion ? '' : region);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Explore Amazing Destinations</h1>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Discover top-rated destinations around the world, from relaxing beaches to exciting cities and adventure spots.
          </p>
          
          <div className="bg-white p-3 rounded-lg shadow-lg max-w-3xl mx-auto">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Search className="h-5 w-5 text-gray-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search for destinations..." 
                className="w-full outline-none"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-500" />
                Filter by Region
              </h3>
              <div className="space-y-2">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => handleRegionChange(region)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center ${
                      selectedRegion === region ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <MapPin className={`h-4 w-4 mr-2 ${selectedRegion === region ? 'text-blue-500' : 'text-gray-400'}`} />
                    {region}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-blue-500" />
                Filter by Rating
              </h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
                    <div className="ml-2 flex items-center">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} filled />
                      ))}
                      {[...Array(5 - rating)].map((_, i) => (
                        <Star key={i} filled={false} />
                      ))}
                    </div>
                    <span className="ml-1 text-gray-600">{`& Up`}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-gray-600">
                    Showing {filteredDestinations.length} {filteredDestinations.length === 1 ? 'destination' : 'destinations'}
                  </p>
                  <select 
                    className="border border-gray-300 rounded-md p-2 bg-white text-gray-700"
                    defaultValue="name-asc"
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="rating-desc">Highest Rated</option>
                    <option value="rating-asc">Lowest Rated</option>
                  </select>
                </div>
                
                {filteredDestinations.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <p className="text-gray-600 mb-4">No destinations found matching your criteria.</p>
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedRegion('');
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDestinations.map((destination) => (
                      <DestinationCard key={destination.id} destination={destination} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StarProps {
  filled: boolean;
}

const Star: React.FC<StarProps> = ({ filled }) => (
  <svg 
    className={`h-4 w-4 ${filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
    />
  </svg>
);

export default DestinationsPage;