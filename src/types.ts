export type CategoryType = '전체' | '베이커리' | '카페/디저트' | '편의점/마트' | '도시락/샐러드';

export interface Product {
  id: number;
  storeName: string;
  storeCategory: string;
  productName: string;
  category: '베이커리' | '카페/디저트' | '편의점/마트' | '도시락/샐러드';
  deadlineText: string;
  deadlineMinutes: number;
  stock: number;
  initialStock: number;
  originalPrice: number;
  discountPrice: number;
  image: string;
  distance: string;
  distanceMeters: number;
  address: string;
  tags: string[];
  carbonSavedKg: number;
  description: string;
}

export interface Reservation {
  id: string;
  productId: number;
  productName: string;
  storeName: string;
  price: number;
  originalPrice: number;
  pickupTime: string;
  reservedAt: string;
  status: '예약완료' | '픽업완료';
  image: string;
  carbonSavedKg: number;
  pickupCode: string;
}
