import client from "../lib/sanity.client";
import { groq } from "next-sanity";

export async function getItemsByCategory(slug: string) {
  const query = groq`*[_type == "post" && defined(slug.current) && references("${slug}")]{
    _id,
    title, 
    slug,
    poster,
    'post_category': post_category[]{
      ...,
      category_list->
    },
  }`;
  
  const response = await client.fetch(query);
  
  return response;
}