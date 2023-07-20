import React from 'react';
import type { SanityDocument } from "@sanity/client";
import Post from './Post';

export default function Posts({ posts }: { posts: SanityDocument[] }) { 
  return (
    <div id="content">
      <div className="slides">
        {posts.map((post) => (
          <Post 
            key={post._id} 
            title={post.title}
            description={post.description}
            poster={post.poster}
            images={post.images} // Assuming you also have the 'images' field in the Sanity schema for each post
          />
        ))}
      </div>
      <div id="description"></div>
    </div>
  );
}