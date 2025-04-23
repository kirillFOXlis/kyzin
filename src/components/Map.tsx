import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { supabase } from '../lib/supabase';
import { Link, useSearchParams } from 'react-router-dom';
import type { Database } from '../types/supabase';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet marker icon issue
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

type Destination = Database['public']['Tables']['destinations']['Row'];

const RecenterAutomatically = ({ lat, lng }: { lat: number, lng: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 12);
  }, [lat, lng, map]);
  return null;
};

const InteractiveMap: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [searchParams] = useSearchParams();
  const paramLat = searchParams.get('lat');
  const paramLng = searchParams.get('lng');
  
  const [center, setCenter] = useState<[number, number]>([
    paramLat ? parseFloat(paramLat) : 40.730610,
    paramLng ? parseFloat(paramLng) : -73.935242
  ]);

  useEffect(() => {
    if (paramLat && paramLng) {
      setCenter([parseFloat(paramLat), parseFloat(paramLng)]);
    }
  }, [paramLat, paramLng]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*');

      if (error) {
        console.error('Error fetching destinations:', error);
      } else if (data) {
        setDestinations(data);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div className="h-[600px] w-full">
      <MapContainer
        center={center}
        zoom={8}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg shadow-lg z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <RecenterAutomatically lat={center[0]} lng={center[1]} />
        
        {destinations.map((destination) => (
          <Marker 
            key={destination.id} 
            position={[destination.latitude, destination.longitude]}
          >
            <Popup>
              <div className="w-full max-w-[250px]">
                <img 
                  src={destination.image_url} 
                  alt={destination.name} 
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="font-bold text-lg">{destination.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{destination.location}</p>
                <p className="text-sm mb-3 line-clamp-2">{destination.description}</p>
                <Link 
                  to={`/destinations/${destination.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;