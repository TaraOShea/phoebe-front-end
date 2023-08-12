
import Link from "next/link";
import { SanityDocument } from "@sanity/client";
import { useRouter } from 'next/router'; // Import the useRouter hook

function Header({ categories }: { categories: SanityDocument[] }) {
  const router = useRouter();
  const currentPath = router.asPath.replace('/', ''); // Remove trailing slash from router.asPath
 return (
   <header id="header">
        <div className="headerflex twice">
        <button className="information-hover">Information</button>
          <ul>
          {categories.map((category) => (  
              <li className={currentPath === category.slug.current ? "active" : ""} key={category._id}>
                  <Link href={category.slug.current} >
                      {category.name}
                  </Link>
              </li>
          ))}
           <li>
          <Link className="moving-hover" href="/">MOVING IMAGE</Link>
          </li>
          </ul>
          <Link className="contact-hover" href="mailto:studio@phoebeletticethompson.com">Contact</Link>
        </div>

   </header>
 );
}

export default Header;