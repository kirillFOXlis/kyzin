import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { MapPin, Star, Clock, User, MessageCircle } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import type { Database } from '../types/supabase';
import { useAuth } from '../lib/auth';

type Destination = Database['public']['Tables']['destinations']['Row'];

interface Review {
  id: number;
  created_at: string;
  rating: number;
  comment: string;
  user: {
    username: string;
    avatar_url: string | null;
  };
}

const DestinationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    const fetchDestinationDetails = async () => {
      if (!id) return;
      
      setIsLoading(true);
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching destination:', error);
      } else if (data) {
        setDestination(data);
        
        // Fetch reviews for this destination
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select(`
            id,
            created_at,
            rating,
            comment,
            user_profiles (
              username,
              avatar_url
            )
          `)
          .eq('destination_id', id);

        if (reviewsError) {
          console.error('Error fetching reviews:', reviewsError);
        } else if (reviewsData) {
          // Transform the data to match our Review interface
          const formattedReviews = reviewsData.map(review => ({
            id: review.id,
            created_at: review.created_at,
            rating: review.rating,
            comment: review.comment,
            user: {
              username: review.user_profiles?.username || 'Anonymous',
              avatar_url: review.user_profiles?.avatar_url,
            }
          }));
          
          setReviews(formattedReviews);
        }
      }
      setIsLoading(false);
    };

    fetchDestinationDetails();
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !destination) return;
    
    const { error } = await supabase
      .from('reviews')
      .insert({
        destination_id: destination.id,
        user_id: user.id,
        rating: newReview.rating,
        comment: newReview.comment,
      });

    if (error) {
      console.error('Error submitting review:', error);
    } else {
      // Fetch the user profile to get the username
      const { data: userData } = await supabase
        .from('user_profiles')
        .select('username, avatar_url')
        .eq('id', user.id)
        .single();
      
      // Add the new review to the list
      setReviews([...reviews, {
        id: Date.now(), // Temporary ID
        created_at: new Date().toISOString(),
        rating: newReview.rating,
        comment: newReview.comment,
        user: {
          username: userData?.username || 'Anonymous',
          avatar_url: userData?.avatar_url,
        }
      }]);
      
      // Reset the form
      setNewReview({
        rating: 5,
        comment: '',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination not found</h1>
          <p className="text-gray-600 mb-8">
            The destination you're looking for doesn't exist or has been removed.
          </p>
          <Link 
            to="/destinations"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="h-96 bg-cover bg-center relative" style={{ backgroundImage: `url(${destination.image_url})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">{destination.name}</h1>
            <div className="flex items-center justify-center text-white">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{destination.location}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-yellow-100 text-yellow-800 flex items-center rounded-full py-1 px-3 text-sm font-medium">
                  <Star className="h-4 w-4 fill-current mr-1" />
                  {destination.rating.toFixed(1)}
                </div>
                <span className="mx-2 text-gray-500">•</span>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">Best time to visit: May-September</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Link
                  to={`/map?lat=${destination.latitude}&lng=${destination.longitude}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Map
                </Link>
              </div>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-4">About this destination</h2>
            <p className="text-gray-600 mb-6">
              {destination.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Beautiful natural landscapes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Rich cultural heritage</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Delicious local cuisine</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Friendly locals</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Good to know</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Local currency: Euro (€)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Language: French, English widely spoken</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Time zone: GMT+1</span>
                  </li>
                  <li className="flex items-start">
                    <span className="h-5 w-5 text-blue-500 mr-2">•</span>
                    <span className="text-gray-600">Visa: Required for some countries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MessageCircle className="h-6 w-6 mr-2 text-blue-500" />
            Reviews & Ratings
            <span className="ml-2 text-sm font-normal text-gray-600">({reviews.length})</span>
          </h2>
          
          {user && (
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Rating</label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="p-1"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      >
                        <Star 
                          className={`h-6 w-6 ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Comment</label>
                  <textarea
                    rows={4}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Share your experience with this destination..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}
          
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 mb-4">No reviews yet for this destination.</p>
              {!user && (
                <Link 
                  to="/login"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Login to be the first to write a review
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailPage;