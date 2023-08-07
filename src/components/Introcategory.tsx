import type { SanityDocument } from "@sanity/client";
import React, { MouseEvent } from 'react';
import IntroLogo from "@/components/Intrologo";

export default function Intro({ intro }: { intro: SanityDocument[] }) {
  
  if (process.browser) {
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
   <div className="hi"></div>
 );
}