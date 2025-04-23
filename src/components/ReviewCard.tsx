import React from 'react';
import { Star, User } from 'lucide-react';

interface ReviewCardProps {
  review: {
    id: number;
    user: {
      username: string;
      avatar_url: string | null;
    };
    rating: number;
    comment: string;
    created_at: string;
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`h-4 w-4 ${i <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-3">
        {review.user.avatar_url ? (
          <img 
            src={review.user.avatar_url} 
            alt={review.user.username} 
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <User className="h-6 w-6 text-blue-500" />
          </div>
        )}
        <div>
          <h4 className="font-medium text-gray-800">{review.user.username}</h4>
          <div className="flex items-center">
            <div className="flex mr-2">
              {renderStars()}
            </div>
            <span className="text-xs text-gray-500">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <p className="text-gray-600">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;