import React, { useRef, useEffect } from 'react';
import type { SanityDocument } from "@sanity/client";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../lib/sanity.client";
import { useInView, InView } from 'react-intersection-observer';

const builder = imageUrlBuilder(client);

export default function Post({ description, poster, title }: { description: SanityDocument[], poster: SanityDocument[], title: SanityDocument[] }) {

  const { ref, inView, entry } = useInView({
    threshold: 0.4,
  });

  const handleMouseEvent = (inView: any, description: any) => {
    let myContainer = document.getElementById('description') as HTMLInputElement;
    inView == true ? 
      myContainer.innerHTML = description 
    : null;
  }

  return (
    <div className="slide" ref={ref}>
        <InView as="div" className="slide-content" onChange={(inView, entry) => handleMouseEvent(inView, description)} data-desc={description}>
            <Image
              src={builder.image(poster).width(1200).url()}
              width={1000}
              height={1000}
              alt={"title"}
            />
            <div id="description-mobile">{description}</div>
        </InView>
    </div>
  );
}