
import React, { MouseEvent } from 'react';
import Link from "next/link";
import { SanityDocument } from "@sanity/client";

function Headeroverlay({ categories }: { categories: SanityDocument[] }) {
    const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.getElementById("information")?.classList.add("show");

        setTimeout(() =>{
            document.getElementById("information")?.classList.add("fadein");
        }, 200);
    }

 return (
    <div className="headeroverlay">
        <div className="headerflex">
        <Link href="/">Main Feed</Link>
          <ul>
          {categories.map((category) => (  
              <li key={category._id}>
                  <Link href={category.slug.current} >
                      {category.name}
                  </Link>
              </li>
          ))}
          </ul>
          <button onClick={handleMouseEvent}>Information</button>
        </div>
    </div>
 );
}

export default Headeroverlay;