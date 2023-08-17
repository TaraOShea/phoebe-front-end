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
import Posts from "../components/Postscategory";
import { PreviewSuspense } from "next-sanity/preview";
import Information from "@/components/Information";
import React, { useEffect } from 'react';
import { GetStaticPaths } from 'next';
// import { GetStaticProps } from 'next';
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router'

const PreviewPosts = lazy(() => import("../components/PreviewPosts"));
const query = groq`*[_type == "post" && defined(slug.current)]{
  _id,
  title, 
  slug,
  poster,
  images,
  'post_category': post_category[]{
    ...,
    category_list->
  },
}`;


  
interface Post {
  slug: {
    current: string;
  };
  // Other properties of the Post object
}


// export const getStaticPaths: GetStaticPaths = async () => {
//   const data: Post[] = await client.fetch(groq`*[_type == "post" && defined(slug.current)]{
//     slug
//   }`);

//   const paths = data.map((post: Post) => ({ params: { slug: post.slug.current } }));

//   return {
//     paths,
//     fallback: 'blocking'
//   };
// };

export const getServerSideProps: GetServerSideProps = async ({ preview = false, params }) => {
  if (preview) {
    return { props: { preview } };
  }
  
  const datapost: Post[] = await client.fetch(groq`*[_type == "post" && defined(slug.current)]{
    slug
  }`);

  const paths = datapost.map((post: Post) => ({ params: { slug: post.slug.current } }));


  // Extract the slug from the router object
  const { slug } = params as { slug: string }; 

  var data = await client.fetch(groq`
  {
    'posts': *[_type == "post" && $slug in post_category[].category_list->slug.current] | order(publishDate desc) {
      _id,
      title,
      slug,
      poster,
      images,
      description,
      publishDate,
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

  return {props: { paths, fallback: 'blocking', preview, posts, cats, intro, info } };
  
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
  const router = useRouter();

  useEffect(() => {
    // When the component mounts, add the 'fade-in' class to the page container
    const pageContainer = document.querySelector('.container-slug');
    if (pageContainer) {
      pageContainer.classList.add('fade-in');
    }

    // When the component unmounts, remove the 'fade-in' class from the page container
    return () => {
      if (pageContainer) {
        pageContainer.classList.remove('fade-in');
      }
    };
  }, []);

  useEffect(() => {
    // Function to handle adding the 'fade-in' class when the route change starts
    const handleRouteChangeStart = () => {
      const pageContainer = document.querySelector('.container-slug');
      if (pageContainer) {
        pageContainer.classList.remove('fade-in');
      }
    };

    // Function to handle adding the 'fade-in' class when the route change is complete
    const handleRouteChangeComplete = () => {
      const pageContainer = document.querySelector('.container-slug');
      if (pageContainer) {
        pageContainer.classList.add('fade-in');
      }
    };

    // Subscribe to the routeChangeStart and routeChangeComplete events
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    // Clean up the event listeners when the component unmounts
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  

  // PreviewSuspense shows while data is being fetched
  // The fetch happens inside PreviewPosts
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PreviewPosts query={query} />
    </PreviewSuspense>
  ) : (
    <>
     <div className="page-transition">
      <Head>
        <title>Phoebe Lettice Thompson – Stylist</title>
        <meta property="og:image" content="/imgs/COVER.png" /> {/* Replace with your actual image filename */}
        <meta property="og:url" content="https://www.phoebeletticethompson.com/" /> {/* Replace with the URL of your website */}
        <meta property="og:site_name" content="Phoebe Lettice Thompson  – Stylist" /> {/* Replace with your website name */}
      </Head>
      <Logo />
      <Header categories={cats} />
      <Intro intro={intro}/>
      <Headeroverlay categories={cats} />
      <div className="container-slug">
      <Posts posts={posts} />
      </div>
      <Information info={info}/>
    </div>
    </>
  );
}