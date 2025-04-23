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
  ('Paris, France', 'The City of Light is known for its stunning architecture, art museums, and romantic atmosphere. Visit iconic landmarks like the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral.', 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Europe', 48.8566, 2.3522, 4.7),
  
  ('Tokyo, Japan', 'A vibrant metropolis that combines ultramodern and traditional aspects, Tokyo offers visitors a unique experience with its technology, cuisine, and culture. Explore neighborhoods like Shibuya, Shinjuku, and Asakusa.', 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Asia', 35.6762, 139.6503, 4.8),
  
  ('Rome, Italy', 'The Eternal City is a living museum of ancient ruins, Renaissance art, and delicious cuisine. Visit the Colosseum, Roman Forum, Vatican City, and throw a coin in the Trevi Fountain.', 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Europe', 41.9028, 12.4964, 4.6),
  
  ('Bali, Indonesia', 'This tropical paradise offers stunning beaches, lush rice terraces, and a rich cultural heritage. Explore Ubud''s art scene, visit ancient temples, or relax on the pristine beaches of Kuta and Seminyak.', 'https://images.pexels.com/photos/1822458/pexels-photo-1822458.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Asia', -8.3405, 115.0920, 4.5),
  
  ('New York City, USA', 'The Big Apple is a global center for art, culture, fashion, and finance. Visit iconic landmarks like Times Square, Central Park, Empire State Building, and the Statue of Liberty.', 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1600', 'North America', 40.7128, -74.0060, 4.7),
  
  ('Santorini, Greece', 'Famous for its stunning sunsets, white-washed buildings, and blue-domed churches, Santorini is a picturesque island in the Aegean Sea. Explore the villages of Oia and Fira, or relax on the unique black and red beaches.', 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Europe', 36.3932, 25.4615, 4.9),
  
  ('Cape Town, South Africa', 'With Table Mountain as its backdrop, Cape Town offers a blend of nature, adventure, and urban excitement. Visit the Cape of Good Hope, Robben Island, and the colorful Bo-Kaap neighborhood.', 'https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Africa', -33.9249, 18.4241, 4.6),
  
  ('Sydney, Australia', 'Known for its iconic Opera House and Harbour Bridge, Sydney offers visitors beautiful beaches, great dining, and a vibrant cultural scene. Visit Bondi Beach, explore the Royal Botanic Garden, or climb the Sydney Harbour Bridge.', 'https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Oceania', -33.8688, 151.2093, 4.7),
  
  ('Rio de Janeiro, Brazil', 'Famous for its stunning beaches, vibrant carnival, and the iconic Christ the Redeemer statue, Rio offers visitors a unique blend of natural beauty and urban excitement. Visit Copacabana and Ipanema beaches, or take in the views from Sugarloaf Mountain.', 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg?auto=compress&cs=tinysrgb&w=1600', 'South America', -22.9068, -43.1729, 4.5),
  
  ('Kyoto, Japan', 'The cultural heart of Japan, Kyoto is known for its classical Buddhist temples, gardens, imperial palaces, and traditional wooden houses. Visit the iconic Fushimi Inari Shrine, Kinkaku-ji (Golden Pavilion), and the bamboo groves of Arashiyama.', 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1600', 'Asia', 35.0116, 135.7681, 4.8);