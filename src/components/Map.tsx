import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import type { Database } from '../types/supabase';

type Destination = Database['public']['Tables']['destinations']['Row'];

interface RegionCoordinates {
  lat: number;
  lng: number;
  zoom: number;
}

interface MapProps {
  selectedCoordinates: RegionCoordinates | null;
}

const InteractiveMap: React.FC<MapProps> = ({ selectedCoordinates }) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [defaultCenter] = useState<[number, number]>([20, 0]);
  const defaultZoom = 2;

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

  const mapState = {
    center: selectedCoordinates 
      ? [selectedCoordinates.lat, selectedCoordinates.lng]
      : defaultCenter,
    zoom: selectedCoordinates ? selectedCoordinates.zoom : defaultZoom,
  };

  return (
    <div className="h-[600px] w-full rounded-lg shadow-lg overflow-hidden">
      <YMaps query={{ lang: 'ru_RU' }}>
        <Map
          defaultState={{
            center: defaultCenter,
            zoom: defaultZoom,
            controls: []
          }}
          state={mapState}
          width="100%"
          height="100%"
          options={{
            suppressMapOpenBlock: true
          }}
        >
          <ZoomControl />
          {destinations.map((destination) => (
            <Placemark
              key={destination.id}
              geometry={[destination.latitude, destination.longitude]}
              properties={{
                balloonContentHeader: destination.name,
                balloonContentBody: `
                  <div style="max-width: 250px">
                    <img src="${destination.image_url}" 
                         alt="${destination.name}" 
                         style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;" />
                    <p style="color: #666; margin-bottom: 8px;">${destination.location}</p>
                    <p style="margin-bottom: 12px;">${destination.description}</p>
                    <a href="/destinations/${destination.id}" 
                       style="color: #2563eb; font-weight: 500; text-decoration: none;">
                      Подробнее
                    </a>
                  </div>
                `,
              }}
              options={{
                preset: 'islands#blueCircleDotIcon',
                openBalloonOnClick: true
              }}
            />
          ))}
        </Map>
      </YMaps>
    </div>
  );
};

export default InteractiveMap;