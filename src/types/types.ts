export type WishContent = {
  id: string;
  [key: string]: any;
};

export type ContentWithRating = {
  id: string;
  category: string;
  [key: string]: any;
  rating: number;
};
