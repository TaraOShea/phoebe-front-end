'use client';

import { lazy } from "react";
import { groq } from "next-sanity";
import type { SanityDocument } from "@sanity/client";
import Head from "next/head";
import { client } from "../lib/sanity.client";
import Intro from '../components/Introcategory'
import Header from '../components/Headercategory'
import Headeroverlay from '../components/Headeroverlay'
import Logo from "@/components/Logo";
import Posts from "../components/Posts";
import { PreviewSuspense } from "next-sanity/preview";
import Information from "@/components/Information";
import { useRouter } from 'next/router'

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


  



export const getStaticPaths = async () => {
    const data = await client.fetch(groq`*[_type == "post" && defined(slug.current)]{
      slug
    }`);
  
    const paths = data.map((post) => ({ params: { slug: post.slug.current } }));
  
    return {
      paths,
      fallback: 'blocking'
    };
  };

export const getStaticProps = async ({ preview = false, params }) => {
    if (preview) {
      return { props: { preview } };
    }



  // Extract the slug from the router object
  const { slug } = params;

  var data = await client.fetch(groq`
  {
    'posts': *[_type == "post" && $slug in post_category[].category_list->slug.current]{
        _id,
        title,
        slug,
        poster,
        description,
        'post_category': post_category[]{
          ...,
          category_list-> {
            name,
            id
          }
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
`, { slug });

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
      <Intro intro={intro}/>
      <Headeroverlay categories={cats} />
      <Posts posts={posts} />
      <Information info={info}/>
    </div>
    </>
  );
}