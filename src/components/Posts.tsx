import type { SanityDocument } from "@sanity/client";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../lib/sanity.client";

const builder = imageUrlBuilder(client);

export default function Posts({ posts }: { posts: SanityDocument[] }) {
  return (
      <div id="content">
        <div className="slides">
        {posts.map((post) => (
          <div className="slide" key={post._id}>
            <div className="slide-content">
              <Image
                className=""
                src={builder.image(post.poster).width(1200).url()}
                width={1000}
                height={1000}
                alt={post.title}
              />
            </div>
          </div>
        ))}
        </div>
        <div className="description">desc to go here</div>
      </div>
  );
}