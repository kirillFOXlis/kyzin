import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import { supabase } from '../lib/supabase';
import { ArrowRight, Map, Star, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Database } from '../types/supabase';

type Destination = Database['public']['Tables']['destinations']['Row'];

const HomePage: React.FC = () => {
  const [featuredDestinations, setFeaturedDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedDestinations = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('rating', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching destinations:', error);
      } else if (data) {
        setFeaturedDestinations(data);
      }
      setIsLoading(false);
    };

    fetchFeaturedDestinations();
  }, []);

  return (
    <div>
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Популярные направления</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Исследуйте нашу подборку самых удивительных мест для посещения по всему миру.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredDestinations.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <Link
                  to="/destinations"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  Посмотреть все направления
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему выбирают TravelExplorer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Мы помогаем путешественникам открывать удивительные направления с экспертными рекомендациями и подлинными отзывами.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Map className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Интерактивные карты</h3>
              <p className="text-gray-600">
                Исследуйте направления визуально с помощью наших подробных интерактивных карт. Найдите идеальное место для вашего следующего приключения.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Подлинные отзывы</h3>
              <p className="text-gray-600">
                Читайте честные отзывы от реальных путешественников, чтобы принимать обоснованные решения о ваших планах путешествий.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Compass className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Экспертные рекомендации</h3>
              <p className="text-gray-600">
                Получите персонализированные рекомендации на основе ваших предпочтений и стиля путешествий от наших экспертов.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-cover bg-center text-white relative" style={{ backgroundImage: "url('https://images.pexels.com/photos/346768/pexels-photo-346768.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Готовы спланировать свое следующее приключение?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к тысячам путешественников, которые открыли направления своей мечты с TravelExplorer.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 font-medium rounded-lg transition-colors shadow-lg"
            >
              Зарегистрироваться
            </Link>
            <Link
              to="/map"
              className="px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 font-medium rounded-lg transition-colors shadow-lg"
            >
              Исследовать карту
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;