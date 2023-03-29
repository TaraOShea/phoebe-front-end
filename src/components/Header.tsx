
import React from "react";
import Link from "next/link";
import { SanityDocument } from "@sanity/client";

function Header({ categories }: { categories: SanityDocument[] }) {
    console.log(categories)
 return (
   <header className="header">
        <div>Main Feed</div>
        <ul>
        {/* {categories.map((category) => (  
            <li key={category._id}>
                 <Link href={category.slug.current} >
                    {category.name}
                </Link>
            </li>
        ))} */}
        </ul>
        <button>Information</button>
   </header>
 );
}

export default Header;