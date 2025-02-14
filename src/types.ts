export interface Room {
  id: string;
  type: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  amenities: string[];
  rating: number;
  reviews: Review[];
  capacity: number;
  available: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface RoomCategory {
  id: string;
  name: string;
  description: string;
  rooms: Room[];
}