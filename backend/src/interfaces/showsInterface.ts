export interface TrendingSchema {
  small: string;
  large: string;
}

export interface Trending extends TrendingSchema {
  _id: string;
}

export interface RegularSchema extends TrendingSchema {
  medium: string;
}

export interface Regular extends RegularSchema {
  _id: string;
}

export interface ShowSchema {
  title: string;
  thumbnail: {
    trending?: TrendingSchema;
    regular: RegularSchema;
  };
  year: number;
  category: string;
  rating: string;
  isTrending: boolean;
}

export interface ShowType extends ShowSchema {
  _id: string;
  thumbnail: {
    trending?: Trending;
    regular: Regular;
  };
}
