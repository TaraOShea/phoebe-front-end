import { lazy } from "react";
import { groq } from "next-sanity";
import type { SanityDocument } from "@sanity/client";
import Head from "next/head";
import { client } from "../lib/sanity.client";
import Header from '../components/Header'
import Logo from "@/components/Logo";
import Posts from "../components/Posts";
import { PreviewSuspense } from "next-sanity/preview";

const PreviewPosts = lazy(() => import("../components/PreviewPosts"));
const query = groq`*[_type == "post" && defined(slug.current)]{
  _id,
  title, 
  slug,
  poster,
  'post_category': post_category[]{
    ...,
    category_list->
  },
}`;


export const getStaticProps = async ({ preview = false }) => {
  if (preview) {
    return { props: { preview } };
  }

  // const data = await client.fetch(query);

  var data = await client.fetch(`
  {
    'posts': *[_type == "post" && defined(slug.current)]{
      _id,
      title, 
      slug,
      poster,
      'post_category': post_category[]{
        ...,
        category_list->
      },
    },
    'categories': *[_type == "category" && defined(slug.current)]{
      _id,
      name, 
      slug,
    },
  }
  `);
  return { props: { preview, data } };
  
};

export default function Home({
  preview,
  data,
}: {
  preview: Boolean;
  data: SanityDocument[];
}) {

  // PreviewSuspense shows while data is being fetched
  // The fetch happens inside PreviewPosts
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PreviewPosts posts={data.posts} />
    </PreviewSuspense>
  ) : (
    <>
      <Head>
        <title>Phoebe Lettuce - Creative Director, Consultant and Fashion Stylist.</title>
      </Head>
    <div className="container">
      <Logo />
      <Header categories={data.categories} />
      <Posts posts={data.posts} />
    </div>
    </>
  );
}