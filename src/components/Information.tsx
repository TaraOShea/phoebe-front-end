import type { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import React, { MouseEvent, useRef, useEffect } from 'react';

export default function Information({ info }: { info: SanityDocument[] }) {
   
   const video = React.useRef<HTMLVideoElement>(null);
   const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      document.getElementById("information")?.classList.remove("fadein");
      document.getElementById("information")?.classList.add("fadeout");

      setTimeout(() =>{
          document.getElementById("information")?.classList.remove("show");
          video.current?.pause();
      }, 350);
   }

   React.useEffect(() => {
      if (video.current) {
        console.log(`hookRef div width: ${video.current.clientWidth}`);
      }
    }, []);

   return (
    <div id="information">
         <video id="info-video" ref={video} loop muted style={{ width: '100vw', height: '100vh', position: 'absolute', top: '0', right: '0', objectFit: 'cover' }}>
            <source src={info[0].video.asset.url} />
         </video>
         <div className="info-content">
            <PortableText value={info[0].overview} />
         </div> 
         <button id="close-info" onClick={handleMouseEvent}>Close</button>
    </div>
 );
}