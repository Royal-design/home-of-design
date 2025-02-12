import { blogs } from "./assets/data/blogs";
import { data } from "./assets/data/data";

export type ProductType = (typeof data.products)[0];
export type ProductsType = typeof data.products;
export type BlogType = (typeof blogs)[0];
