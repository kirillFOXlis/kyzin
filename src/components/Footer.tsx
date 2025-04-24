import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TravelExplorer</h3>
            <p className="text-gray-300 mb-4">
              Откройте для себя самые удивительные направления мира с экспертными рекомендациями и отзывами путешественников.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition">Главная</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-gray-300 hover:text-white transition">Направления</Link>
              </li>
              <li>
                <Link to="/recommendations" className="text-gray-300 hover:text-white transition">Рекомендации</Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-300 hover:text-white transition">Карта</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Ресурсы</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition">Путеводители</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition">Советы путешественникам</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition">Частые вопросы</Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 hover:text-white transition">О нас</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Свяжитесь с нами</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300">info@travelexplorer.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300">+7 (999) 123-4567</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-300">ул. Путешественников 123, Москва</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TravelExplorer. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;