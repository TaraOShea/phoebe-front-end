import React from 'react';
import type { SanityDocument } from "@sanity/client";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../lib/sanity.client";
import { useInView, InView } from "react-intersection-observer";

const builder = imageUrlBuilder(client);


export default function Posts({ posts }: { posts: SanityDocument[] }) { 
  const [descripton, setDescripton] = React.useState<string>();

  React.useEffect(() => {
    console.log("descripton change", descripton)
  }, [descripton]);

  return (
      <div id="content">
        <div className="slides">
        {posts.map((post) => (
          <InView as="div" className="slide" key={post._id} onChange={(inView, entry) => setDescripton(post.description)}>
            <div className="slide-content">
              <Image
                className=""
                src={builder.image(post.poster).width(1200).url()}
                width={1000}
                height={1000}
                alt={post.title}
              />
            </div>
          </InView>
        ))}
        </div>
        <div id="description" className="hide">{descripton}</div>
      </div>
  );
}