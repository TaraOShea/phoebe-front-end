
import Link from "next/link";
import { SanityDocument } from "@sanity/client";

function Header({ categories }: { categories: SanityDocument[] }) {

 return (
   <header id="header" className="hide">
        <div className="headerflex twice">
        <button className="information-hover">Information</button>
          <ul>
          {categories.map((category) => (  
              <li key={category._id}>
                  <Link href={category.slug.current} >
                      {category.name}
                  </Link>
              </li>
          ))}
          <li>
          <Link className="moving-hover" href="/">MOVING IMAGE</Link>
          </li>
          </ul>
          <Link className="contact-hover" href="mailto:studio@phoebeletticethompson.com">contact</Link>
     
        </div>

   </header>
 );
}

export default Header;