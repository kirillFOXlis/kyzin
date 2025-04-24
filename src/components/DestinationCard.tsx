import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import type { Database } from '../types/supabase';

type Destination = Database['public']['Tables']['destinations']['Row'];

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={destination.image_url} 
          alt={destination.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 text-yellow-500 flex items-center rounded-full py-1 px-2 text-sm font-medium">
          <Star className="h-4 w-4 fill-current mr-1" />
          {destination.rating.toFixed(1)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{destination.name}</h3>
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 text-blue-500 mr-1" />
          <span className="text-sm">{destination.location}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>
        <div className="flex justify-between items-center">
          <Link
            to={`/destinations/${destination.id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Подробнее
          </Link>
          <Link
            to={`/map?lat=${destination.latitude}&lng=${destination.longitude}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
          >
            <MapPin className="h-4 w-4 mr-1" />
            Показать на карте
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;