
import Link from "next/link";
import { SanityDocument } from "@sanity/client";
import { useRouter } from 'next/router'; // Import the useRouter hook

function Header({ categories }: { categories: SanityDocument[] }) {
  const router = useRouter();
  const currentPath = router.asPath.replace('/', ''); // Remove trailing slash from router.asPath
 return (
   <header id="header">
        <div className="headerflex twice">
        <Link href="/">Main Feed</Link>
          <ul>
          {categories.map((category) => (  
              <li className={currentPath === category.slug.current ? "active" : ""} key={category._id}>
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