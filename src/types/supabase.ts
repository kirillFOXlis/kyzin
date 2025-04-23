export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      destinations: {
        Row: {
          id: number;
          created_at: string;
          name: string;
          description: string;
          image_url: string;
          location: string;
          latitude: number;
          longitude: number;
          rating: number;
        };
        Insert: {
          id?: number;
          created_at?: string;
          name: string;
          description: string;
          image_url: string;
          location: string;
          latitude: number;
          longitude: number;
          rating?: number;
        };
        Update: {
          id?: number;
          created_at?: string;
          name?: string;
          description?: string;
          image_url?: string;
          location?: string;
          latitude?: number;
          longitude?: number;
          rating?: number;
        };
      };
      reviews: {
        Row: {
          id: number;
          created_at: string;
          destination_id: number;
          user_id: string;
          rating: number;
          comment: string;
        };
        Insert: {
          id?: number;
          created_at?: string;
          destination_id: number;
          user_id: string;
          rating: number;
          comment?: string;
        };
        Update: {
          id?: number;
          created_at?: string;
          destination_id?: number;
          user_id?: string;
          rating?: number;
          comment?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          created_at: string;
          username: string;
          avatar_url: string | null;
          bio: string | null;
        };
        Insert: {
          id: string;
          created_at?: string;
          username: string;
          avatar_url?: string | null;
          bio?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          username?: string;
          avatar_url?: string | null;
          bio?: string | null;
        };
      };
    };
  };
}