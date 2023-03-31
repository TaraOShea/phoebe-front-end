
import Link from "next/link";
import { SanityDocument } from "@sanity/client";

function Header({ categories }: { categories: SanityDocument[] }) {

 return (
   <header id="header" className="hide">
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

   </header>
 );
}

export default Header;