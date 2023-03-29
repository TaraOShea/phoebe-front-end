import { PreviewSuspense } from "next-sanity/preview";
import { lazy } from "react";
import { SanityDocument } from "@sanity/client";
import { GetStaticPaths, GetStaticProps } from "next";
import { groq } from "next-sanity";

import { client } from "../../lib/sanity.client";
import Post from "../../components/Post";

const PreviewPost = lazy(() => import("../../components/PreviewPost"));
const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  poster,
  overview
}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][]{
      "params": { "slug": slug.current }
    }`
  );

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const queryParams = { slug: params?.slug ?? `` };

  if (preview) {
    return { props: { preview, data: { queryParams } } };
  }

  const post = await client.fetch(query, queryParams);

  return {
    props: {
      preview,
      data: {
        post,
        queryParams: {},
      },
    },
  };
};

export default function Page({
  preview,
  data,
}: {
  preview: Boolean;
  data: {
    post: SanityDocument;
    queryParams: {};
  };
}) {
  return preview ? (
    <PreviewSuspense fallback="Loading...">
      <PreviewPost query={query} queryParams={data.queryParams} />
    </PreviewSuspense>
  ) : (
    <Post post={data.post} />
  );
}