
import React, { MouseEvent } from 'react';
import Link from "next/link";
import { SanityDocument } from "@sanity/client";
import { useRouter } from 'next/router'; // Import the useRouter hook

function Headeroverlay({ categories }: { categories: SanityDocument[] }) {
    const router = useRouter();
    const currentPath = router.asPath.replace('/', ''); // Remove trailing slash from router.asPath
    const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.getElementById("information")?.classList.add("show");

        setTimeout(() =>{
            document.getElementById("information")?.classList.add("fadein");
        }, 200);
    }

 return (
    <div className="headeroverlay">
        <div className="headerflex twix">
        <Link href="/">Main Feed</Link>
          <ul className={currentPath}>
          {categories.map((category) => ( 
             
              <li   className={currentPath === category.slug.current ? "active" : ""} key={category._id}>
                  <Link className={category.slug.current} href={category.slug.current} >
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