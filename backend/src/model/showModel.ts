import { Schema, model, Model } from "mongoose";
import {
  TrendingSchema,
  RegularSchema,
  ShowSchema,
} from "../interfaces/showsInterface";

// CREATE TRENDING SCHEMA
const trendingSchema: Schema = new Schema<TrendingSchema>({
  small: String,
  large: String,
});

// CREATE REGULAR SCHEMA
const regularSchema: Schema = new Schema<RegularSchema>({
  small: { type: String, required: true },
  medium: { type: String, required: true },
  large: { type: String, required: true },
});

// CREATE SHOW SCHEMA
const showSchema: Schema = new Schema<ShowSchema>({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  thumbnail: {
    trending: trendingSchema,
    regular: regularSchema,
  },
  year: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  rating: String,
  isTrending: Boolean,
});

// SHOW SCHEMA
export const Show: Model<ShowSchema> = model<ShowSchema>("Show", showSchema);
