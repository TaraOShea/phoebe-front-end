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
         //  video.current?.pause();
      }, 350);
   }

   React.useEffect(() => {
      if (video.current) {
        console.log(`${video.current}`);
      }
    }, []);

   return (
    <div id="information">
         <video id="info-video" ref={video} autoPlay loop muted style={{ width: '100vw', height: '100vh', position: 'absolute', top: '0', right: '0', objectFit: 'cover' }}>
            <source src={info[0].video.asset.url} />
         </video>
         <div className="info-backdrop"></div>
         <div className="info-content">
<p>Phoebe Lettice Thompson is a London based Stylist. Often working as multi-disciplinary creative her work spans Photography, Design, and Creative Direction. She works with talent, publications and brands on a global scale.</p>
<p>With over 15 years in the industry Phoebe started her career at numerous high fashion publications working alongside top industry names such as  Sarajane Hoare, Grace Coddington, Patrick Demarchelier,  Mario Testino and Annie Lebovitz.  At age 23 she was appointed Creative Director of Topshop-based East London label, Illustrated People. Over the 4 years Phoebe at the helm of brand she secured exclusive collaborations with Selfridges, Ed hardy and V Files, and talent such as Iris Law, Little Sims, Charli XCX.</p>
<p>During her most recent styling work Phoebe has worked with celebrities including Hailey Bieber, Ciara, Amelia Grey, Pink Pantheress, Addison Rae, Beabadoobee, Gracie Abrams, Zara Larsson and Jesse Jo Stark.</p>
<p>Phoebe worked closely with designers Roberta Einer and Susan Fang on their SS23 and FW23 collections,  she has always supported local young designers and artists throughout her career. Her most recent editorial styling work has been featured in The Greatest Magazine and Vogue Portugal.</p>
         </div> 
         <button id="close-info" onClick={handleMouseEvent}>Close</button>
    </div>
 );
}