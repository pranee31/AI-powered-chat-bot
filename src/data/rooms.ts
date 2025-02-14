import { RoomCategory } from '../types';

export const roomCategories: RoomCategory[] = [
  {
    id: '1',
    name: 'Single Bedroom',
    description: 'Perfect for solo travelers, our single rooms offer comfort and convenience.',
    rooms: [
      {
        id: 's1',
        type: 'single',
        name: 'Cozy Single Room',
        price: 99,
        description: 'A comfortable single room with modern amenities and city views.',
        images: [
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304',
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39'
        ],
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'],
        rating: 4.5,
        reviews: [
          {
            id: 'r1',
            userName: 'John Doe',
            rating: 5,
            comment: 'Excellent room with great service!',
            date: '2024-02-15'
          }
        ],
        capacity: 1,
        available: true
      }
    ]
  },
  {
    id: '2',
    name: 'Double Bedroom',
    description: 'Spacious rooms ideal for couples or business travelers.',
    rooms: [
      {
        id: 'd1',
        type: 'double',
        name: 'Deluxe Double Room',
        price: 159,
        description: 'Luxurious double room with panoramic views and premium amenities.',
        images: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427',
          'https://images.unsplash.com/photo-1595576508898-0ad5c879a061'
        ],
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service'],
        rating: 4.8,
        reviews: [
          {
            id: 'r2',
            userName: 'Jane Smith',
            rating: 4.8,
            comment: 'Beautiful room with amazing views!',
            date: '2024-02-20'
          }
        ],
        capacity: 2,
        available: true
      }
    ]
  },
  {
    id: '3',
    name: 'Hostel Style',
    description: 'Budget-friendly shared accommodations for backpackers and groups.',
    rooms: [
      {
        id: 'h1',
        type: 'hostel',
        name: '4-Bed Mixed Dorm',
        price: 39,
        description: 'Clean and comfortable shared room with individual lockers.',
        images: [
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b'
        ],
        amenities: ['Wi-Fi', 'Shared Bathroom', 'Lockers', 'Common Area'],
        rating: 4.2,
        reviews: [
          {
            id: 'r3',
            userName: 'Mike Wilson',
            rating: 4.2,
            comment: 'Great value for money and nice atmosphere!',
            date: '2024-02-18'
          }
        ],
        capacity: 4,
        available: true
      }
    ]
  }
];