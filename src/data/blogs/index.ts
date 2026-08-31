import { BlogPostData } from "@/types/blog.types";
import { indianLentilsPost } from "./indian-lentils-guide";
import { bestIndianSnacksPost } from "./best-indian-snacks";
import { garamMasalaPost } from "./garam-masala-guide";

export const allBlogPosts: BlogPostData[] = [
  garamMasalaPost,
  bestIndianSnacksPost,
  indianLentilsPost,
];
