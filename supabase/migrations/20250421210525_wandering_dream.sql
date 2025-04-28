/*
  # Initial Schema Setup for TravelExplorer

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key) - Linked to auth.users
      - `created_at` (timestamp)
      - `username` (text)
      - `avatar_url` (text, nullable)
      - `bio` (text, nullable)
    
    - `destinations`
      - `id` (integer, primary key)
      - `created_at` (timestamp)
      - `name` (text)
      - `description` (text)
      - `image_url` (text)
      - `location` (text)
      - `latitude` (numeric)
      - `longitude` (numeric)
      - `rating` (numeric)
    
    - `reviews`
      - `id` (integer, primary key)
      - `created_at` (timestamp)
      - `destination_id` (integer, foreign key)
      - `user_id` (uuid, foreign key)
      - `rating` (integer)
      - `comment` (text)

  2. Security
    - Enable RLS on all tables
    - Create policies for each table
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  username text NOT NULL,
  avatar_url text,
  bio text
);

-- Create destinations table
CREATE TABLE IF NOT EXISTS destinations (
  id serial PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  location text NOT NULL,
  latitude numeric NOT NULL,
  longitude numeric NOT NULL,
  rating numeric DEFAULT 4.0
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id serial PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  destination_id integer REFERENCES destinations(id) ON DELETE CASCADE,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies for user_profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON user_profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Create RLS Policies for destinations
CREATE POLICY "Destinations are viewable by everyone"
  ON destinations
  FOR SELECT
  USING (true);

-- Create RLS Policies for reviews
CREATE POLICY "Reviews are viewable by everyone"
  ON reviews
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON reviews
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
  ON reviews
  FOR DELETE
  USING (auth.uid() = user_id);

-- Insert sample destination data
INSERT INTO destinations (name, description, image_url, location, latitude, longitude, rating)
VALUES
  ('Париж, Франция", "Город света известен своей потрясающей архитектурой, художественными музеями и романтической атмосферой. Посетите такие знаковые достопримечательности, как Эйфелева башня, Лувр и собор Парижской Богоматери.', 'https://www.webturizm.ru/storage/photos/france/france-parizh-22171.jpg', 'Европа', 48.8566, 2.3522, 4.7),
  
  ('Токио, Япония", "Оживленный мегаполис, сочетающий в себе ультрасовременные и традиционные аспекты, Токио предлагает посетителям уникальные впечатления от своих технологий, кухни и культуры. Исследуйте такие районы, как Сибуя, Синдзюку и Асакуса.', 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Азия', 35.6762, 139.6503, 4.8),
  
  ('Рим, Италия", "Вечный город - это живой музей древних руин, искусства эпохи Возрождения и изысканной кухни. Посетите Колизей, Римский форум, Ватикан и бросьте монетку в фонтан Треви.', 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Европа', 41.9028, 12.4964, 4.6),
  
  ('Бали, Индонезия", "Этот тропический рай предлагает потрясающие пляжи, пышные рисовые террасы и богатое культурное наследие. Познакомьтесь с искусством Убуда, посетите древние храмы или отдохните на нетронутых пляжах Куты и Семиньяка.', 'https://images.pexels.com/photos/1822458/pexels-photo-1822458.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Азия', -8.3405, 115.0920, 4.5),
  
  ('Нью-Йорк, США", "Большое яблоко" - мировой центр искусства, культуры, моды и финансов. Посетите такие знаковые достопримечательности, как Таймс-сквер, Центральный парк, Эмпайр-Стейт-билдинг и Статуя Свободы.', 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Северная Америка', 40.7128, -74.0060, 4.7),
  
  ('Санторини, Греция", "Санторини - живописный остров в Эгейском море, известный своими потрясающими закатами, белоснежными зданиями и церквями с голубыми куполами. Посетите деревни Ия и Фира или отдохните на уникальных черных и красных пляжах.', 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Европа', 36.3932, 25.4615, 4.9),
  
  ('Кейптаун, Южная Африка", "На фоне Столовой горы Кейптаун представляет собой сочетание природы, приключений и городской суеты. Посетите мыс Доброй Надежды, остров Роббен и колоритный район Бо-Каап.', 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Африка', -33.9249, 18.4241, 4.6),
  
  ('Сидней, Австралия", "Сидней, известный своим знаменитым оперным театром и мостом Харбор-Бридж, предлагает посетителям прекрасные пляжи, отличные рестораны и оживленную культурную жизнь. Посетите пляж Бонди, прогуляйтесь по Королевскому ботаническому саду или поднимитесь на Сиднейский мост Харбор-Бридж.', 'https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Океания', -33.8688, 151.2093, 4.7),
  
  ('Рио-де-Жанейро, Бразилия", "Рио, известный своими потрясающими пляжами, ярким карнавалом и культовой статуей Христа-Искупителя, предлагает посетителям уникальное сочетание природной красоты и городской суеты. Посетите пляжи Копакабана и Ипанема или полюбуйтесь видами с горы Сахарная голова.', 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Южная Америка', -22.9068, -43.1729, 4.5),
  
  ('Киото, Япония", "Киото, культурное сердце Японии, известен своими классическими буддийскими храмами, садами, императорскими дворцами и традиционными деревянными домами. Посетите культовый храм Фусими Инари, Кинкаку-дзи (Золотой павильон) и бамбуковые рощи Арасияма.', 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Азия', 35.0116, 135.7681, 4.8);