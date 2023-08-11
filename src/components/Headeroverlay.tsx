import React, { MouseEvent, useState, useEffect } from 'react';
import Link from "next/link";
import { SanityDocument } from "@sanity/client";
import { useRouter } from 'next/router';

function Headeroverlay({ categories }: { categories: SanityDocument[] }) {
    const router = useRouter();
    const currentPath = router.asPath.replace('/', '');
    const [isContactHovered, setIsContactHovered] = useState(false);
    const [isInformationHovered, setIsInformationHovered] = useState(false);
    const [hoveredCategorySlug, setHoveredCategorySlug] = useState("");

    const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        document.getElementById("information")?.classList.add("show");

        setTimeout(() => {
            document.getElementById("information")?.classList.add("fadein");
        }, 200);
    }

    if (typeof document !== 'undefined') {
        document.body.classList.toggle('contact-now-hovered', isContactHovered);
        document.body.classList.toggle('information-is-hovered', isInformationHovered);
    }

    useEffect(() => {
        if (typeof document !== 'undefined') {
            const categoryClass = hoveredCategorySlug !== "" ? `${hoveredCategorySlug}-is-hovered` : "";
            if (categoryClass) {
                document.body.classList.toggle(categoryClass, true);
            }
            document.body.classList.toggle('information-is-hovered', isInformationHovered);
    
            return () => {
                if (categoryClass) {
                    document.body.classList.toggle(categoryClass, false);
                }
                document.body.classList.toggle('information-is-hovered', false);
            };
        }
    }, [hoveredCategorySlug, isInformationHovered]);


    return (
        <div className="headeroverlay">
            <div className="headerflex twix">
                <button
                    className='information-hover'
                    onClick={handleMouseEvent}
                    onMouseEnter={() => setIsInformationHovered(true)}
                    onMouseLeave={() => setIsInformationHovered(false)}
                >
                    Information
                </button>
                <ul>
                    {categories.map((category) => (
                        <li
                            className={currentPath === category.slug.current ? "active" : ""}
                            key={category._id}
                            onMouseEnter={() => setHoveredCategorySlug(category.slug.current)}
                            onMouseLeave={() => setHoveredCategorySlug("")}
                        >
                            <Link href={category.slug.current}>
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link
                    className='contact-hover'
                    href="mailto:studio@phoebeletticethompson.com"
                    onMouseEnter={() => setIsContactHovered(true)}
                    onMouseLeave={() => setIsContactHovered(false)}
                >
                    Contact
                </Link>
            </div>
        </div>
    );
}

export default Headeroverlay;