'use client';

import { lazy } from "react";
import { groq } from "next-sanity";
import type { SanityDocument } from "@sanity/client";
import Head from "next/head";
import { client } from "../lib/sanity.client";
import Intro from '../components/Intro'
import Header from '../components/Header'
import Headeroverlay from '../components/Headeroverlay'
import Logo from "@/components/Logo";
import Posts from "../components/Posts";
import { PreviewSuspense } from "next-sanity/preview";
import Information from "@/components/Information";

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
      description,
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
    'intro': *[_type == "page" && slug.current == 'intro']{
      _id,
      name, 
      slug,
      video {
        asset->
      }
    },
    'info': *[_type == "page" && slug.current == 'information']{
      _id,
      name, 
      slug,
      overview,
      video {
        asset->
      }
    },
  }
  `);

  var posts = data.posts;
  var cats = data.categories;
  var intro = data.intro;
  var info = data.info;

  return { props: { preview, posts, cats, intro, info } };
  
};

export default function Home({
  preview,
  posts,
  cats,
  intro,
  info
}: {
  preview: Boolean;
  posts: SanityDocument[];
  cats: SanityDocument[];
  intro: SanityDocument[];
  info: SanityDocument[]; 
}) {

  // PreviewSuspense shows while data is being fetched
  // The fetch happens inside PreviewPosts
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PreviewPosts query={query} />
    </PreviewSuspense>
  ) : (
    <>
      <Head>
        <title>Phoebe Lettuce - Creative Director, Consultant and Fashion Stylist.</title>
      </Head>
    <div className="container">
      <Logo />
      <Header categories={cats} />
      <Headeroverlay categories={cats} />
      <Intro intro={intro}/>
      <Posts posts={posts} />
      <Information info={info}/>
    </div>
    </>
  );
}