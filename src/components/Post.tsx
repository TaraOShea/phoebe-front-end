import React, { useRef, useEffect } from 'react';
import type { SanityDocument } from "@sanity/client";
import Image from "next/image";
import Next from './Next';
import Prev from './Prev';
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../lib/sanity.client";
import { useInView, InView } from 'react-intersection-observer';
import { PortableText } from "@portabletext/react";
import { Swiper, SwiperSlide } from 'swiper/react';

const builder = imageUrlBuilder(client);



export default function Post({ description, poster, images, title }: { description: string[], poster: SanityDocument[] | SanityDocument, images?: any[], title: any }) {

  const { ref, inView, entry } = useInView({
    threshold: 0.4,
  });
  

  const { ref: secondRef, inView: secondInView } = useInView({
    threshold: 1,
    rootMargin: '1% 0px 1% 0px', // Adjust the rootMargin to determine when to trigger "is-pinned"

  });

  const handleMouseEvent = (inView: any, description: any) => {
    let myContainer = document.getElementById('description') as HTMLInputElement;
    inView == true ? 
      myContainer.innerHTML = description 
    : null;
  }

  // Settings for the swiper
  const swiperSettings = {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 10,
    loop: false, // Enable infinite loop
    grabCursor: true // Show draggable cursor
  };

  const totalSlides = (Array.isArray(poster) ? poster.length : 1) + (images?.length || 0);

  return (
    <div className="slide" ref={ref}>
      <div ref={secondRef} className={`slide-content ${secondInView ? 'is-pinned' : ''}`}>
      <InView as="div" className="slide-content slide-content-mobile" onChange={(inView, entry) => handleMouseEvent(inView, description)} data-desc={description}>
        <Swiper  loop >
          {Array.isArray(poster) ? (
            poster.map((item, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={builder.image(item).width(1200).url()}
                  width={1000}
                  height={1000}
                  alt={title}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <Image
                src={builder.image(poster).width(1200).url()}
                width={1000}
                height={1000}
                alt={title}
              />
            </SwiperSlide>
          )}
          {images?.map((image, index) => (
            <SwiperSlide key={index}>
              <Image
                src={builder.image(image).width(1200).url()}
                width={1000}
                height={1000}
                alt={title}
              />
            </SwiperSlide>
          ))}
 {totalSlides > 1 && (
        <>
          <Prev />
          <Next />
        </>
      )}
        </Swiper>
        <div id="description-mobile">{description}</div>
      </InView>
      </div>
    </div>
  );
}
