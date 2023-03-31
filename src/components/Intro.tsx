import type { SanityDocument } from "@sanity/client";
import React, { MouseEvent } from 'react';
import IntroLogo from "@/components/Intrologo";

export default function Intro({ intro }: { intro: SanityDocument[] }) {
  
  const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementsByTagName('body')[0].classList.remove("overflow-hidden"); 
    document.getElementById("intrologo")?.classList.add("faded");
    document.getElementById("enterbtn")?.classList.add("hidden");
    document.getElementById("content")?.scrollIntoView({ behavior: 'smooth' });
    
    document.getElementById("header")?.classList.remove("hide");
    document.getElementById("header")?.classList.add('show');
    document.getElementById("description")?.classList.remove("hide");
    document.getElementById("description")?.classList.add('show');
    
    setTimeout(() =>{
        // document.getElementById("intro")?.classList.add("hidden");
        document.getElementById("intro")?.remove()
    }, 1000);
  }

  
   return (
    <div id="intro">
      <video autoPlay loop muted style={{ width: '100vw', height: '100vh', position: 'absolute', top: '0', right: '0', objectFit: 'cover' }}>
        <source src={intro[0].video.asset.url} />
      </video>
        <IntroLogo />
        <button id="enterbtnhidden" onClick={handleMouseEvent}></button>
        <button id="enterbtn" onClick={handleMouseEvent}>Click to Enter</button>
    </div>
 );
}