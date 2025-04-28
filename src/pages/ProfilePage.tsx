import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { User, Edit, Save, X } from 'lucide-react';

interface UserProfile {
  id: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<Partial<UserProfile>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
      } else if (data) {
        setProfile(data);
        setUpdatedProfile({
          username: data.username,
          bio: data.bio || '',
        });
      }
      setIsLoading(false);
    };

    fetchUserProfile();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleSaveProfile = async () => {
    if (!user || !profile) return;
    
    setIsSaving(true);
    
    const { error } = await supabase
      .from('user_profiles')
      .update({
        username: updatedProfile.username,
        bio: updatedProfile.bio,
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
    } else {
      // Update local state
      setProfile({
        ...profile,
        username: updatedProfile.username || profile.username,
        bio: updatedProfile.bio || profile.bio,
      });
      setIsEditing(false);
    }
    
    setIsSaving(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdatedProfile({
      username: profile?.username,
      bio: profile?.bio || '',
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-white flex items-center justify-center overflow-hidden">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt={profile.username} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-16 w-16 text-gray-400" />
                )}
              </div>
            </div>
          </div>
          
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="username"
                    value={updatedProfile.username || ''}
                    onChange={handleInputChange}
                    className="text-2xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-800">{profile?.username}</h1>
                )}
                <p className="text-gray-600">{user.email}</p>
              </div>
              
              <div>
                {isEditing ? (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isSaving}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                    >
                      {isSaving ? (
                        <div className="h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Сохранить
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Отменить
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Редактировать профиль
                  </button>
                )}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Ещё</h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={updatedProfile.bio || ''}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us about yourself..."
                ></textarea>
              ) : (
                <p className="text-gray-600">
                  {profile?.bio || 'Биографическая информация пока не добавлена.'}
                </p>
              )}
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Ваши сохраненные пункты назначения</h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-600">
                Вы еще не сохранили ни одного пункта назначения. Ознакомьтесь с нашими рекомендациями и сохраните избранное!                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;