import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import DestinationCard from '../components/DestinationCard';
import { TrendingUp, Users, Umbrella, Mountain, Utensils, Camera } from 'lucide-react';
import type { Database } from '../types/supabase';

type Destination = Database['public']['Tables']['destinations']['Row'];

const categories = [
  { name: 'Популярное сейчас', icon: <TrendingUp className="h-5 w-5" /> },
  { name: 'Для семей', icon: <Users className="h-5 w-5" /> },
  { name: 'Пляжный отдых', icon: <Umbrella className="h-5 w-5" /> },
  { name: 'Приключения', icon: <Mountain className="h-5 w-5" /> },
  { name: 'Еда и культура', icon: <Utensils className="h-5 w-5" /> },
  { name: 'Фотография', icon: <Camera className="h-5 w-5" /> },
];

const RecommendationsPage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [activeCategory, setActiveCategory] = useState('Популярное сейчас');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('rating', { ascending: false });

      if (error) {
        console.error('Error fetching destinations:', error);
      } else if (data) {
        setDestinations(data);
      }
      setIsLoading(false);
    };

    fetchDestinations();
  }, []);

  // Filter destinations based on active category (this would be more sophisticated in a real app)
  const getFilteredDestinations = () => {
    // For demo purposes, just return all destinations
    // In a real app, you would filter based on category
    return destinations.slice(0, 6);
  };

  const filteredDestinations = getFilteredDestinations();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Рекомендации по поездкам</h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
          Откройте для себя персонализированные рекомендации по направлениям, основанные на ваших интересах и предпочтениях в путешествии.          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`flex items-center px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{activeCategory}</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Советы путешественникам для {activeCategory}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">Планируйте заранее</h4>
                    <p className="text-gray-600">
                    Бронируйте жилье и мероприятия заранее, особенно в разгар сезона, чтобы избежать разочарований и часто получать более выгодные цены.                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">Упаковывай по-умному</h4>
                    <p className="text-gray-600">
                    Изучите погоду и соберите необходимые вещи. Не забудьте о таких предметах первой необходимости, как удобная обувь для ходьбы, адаптеры и любые необходимые лекарства.                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">Выучите ключевые фразы</h4>
                    <p className="text-gray-600">
                    Изучение нескольких основных фраз на местном языке поможет вам лучше усвоить их и проявить уважение к местной культуре.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">Попробуйте блюда местной кухни</h4>
                    <p className="text-gray-600">
                    Не упустите возможность отведать аутентичные блюда местной кухни. Спросите местных жителей, где можно найти лучшие блюда.                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;