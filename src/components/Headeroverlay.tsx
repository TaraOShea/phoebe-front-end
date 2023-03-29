
import React from "react";
import Link from "next/link";
import { SanityDocument } from "@sanity/client";

function Headeroverlay({ categories }: { categories: SanityDocument[] }) {
 return (
    <div className="headeroverlay">
        <div className="headerflex">
          <div>Main Feed</div>
          <ul>
          {categories.map((category) => (  
              <li key={category._id}>
                  <Link href={category.slug.current} >
                      {category.name}
                  </Link>
              </li>
          ))}
          </ul>
          <button>Information</button>
        </div>
    </div>
 );
}

export default Headeroverlay;