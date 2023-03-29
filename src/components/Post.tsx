import { PortableText } from "@portabletext/react";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { client } from "../lib/sanity.client";
import Head from "next/head";

const builder = imageUrlBuilder(client);

export default function Post({ post }: { post: SanityDocument }) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <main className="container mx-auto prose prose-lg p-4">
        {post?.title ? <h1>{post.title}</h1> : null}
        <Image
          className=""
          src={builder.image(post.poster).width(300).height(300).url()}
          width={300}
          height={300}
          alt={post.title}
        />
        <PortableText value={post.overview} />
      </main>
    </>
  );
}