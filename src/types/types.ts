// export type ContentWithRating = {
//   id: string;
//   category: string;
//   [key: string]: any;
//   rating: number;
// };

export type Person = {
  id: string;
  profile_path: string;
  name?: string;
  original_name?: string;
  job?: string;
  character?: string;
};

export type Genre = { id: string; name: string };

export interface TMDBContent {
  id: string;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  overview?: string;
  vote_average?: number;
  rating?: number;
  media_type?: string;
  category?: string;
  release_date?: string;
  first_air_date?: string;
  genres?: Genre[];
  origin_country?: string;
  runtime: number;
  credits?: Person[];
}

export type Still = {
  id: string;
  file_path: string;
};

export type CreditsByApi = {
  cast: Person[];
  directors: Person[];
};
