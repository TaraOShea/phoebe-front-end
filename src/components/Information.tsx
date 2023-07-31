import type { SanityDocument } from "@sanity/client";
import { PortableText } from "@portabletext/react";
import React, { MouseEvent, useRef, useEffect } from 'react';
import Marquee from "react-fast-marquee";

export default function Information({ info }: { info: SanityDocument[] }) {
   
   const video = React.useRef<HTMLVideoElement>(null);
   const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      document.getElementById("information")?.classList.remove("fadein");
      document.getElementById("information")?.classList.add("fadeout");

      setTimeout(() =>{
          document.getElementById("information")?.classList.remove("show");
         //  video.current?.pause();
      }, 350);
   }

   React.useEffect(() => {
      if (video.current) {
      //   console.log(`${video.current}`);
      }
    }, []);

    console.log(info)
   return (
    <div id="information">
      <div className="m-wrapper">
            <Marquee autoFill direction="right">
            <span className="serif">Clients include:</span>
            <span className="bold">ROBERTA</span>
            <span className="normal">EINER</span>
            <span className="bold">ADIDAS</span>
            <span className="normal">BYREDO</span>
            <span className="bold">BROWNS</span>
            <span className="normal">FARFETCH</span>
            <span className="bold">ELLESSE</span>
            <span className="normal">ED HARDY</span>
            <span className="bold">MERCEDES</span>
            <span className="normal">FLANNELS</span>
</Marquee>
</div>

         <video id="info-video" ref={video} autoPlay playsInline loop muted style={{ width: '100vw', height: '100vh', position: 'absolute', top: '0', right: '0', objectFit: 'cover' }}>
            <source src={info[0].video.asset.url} />
         </video>
         <div className="info-backdrop"></div>
               <div id="infologo"><svg width="1159" height="483" viewBox="0 0 1159 483" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M212.646 104.8H232.646C269.446 104.8 292.046 87.2 292.046 53.6C292.046 20 269.446 2.39999 232.646 2.39999H167.246V146H212.646V104.8ZM212.646 67.2V40H230.246C242.046 40 247.246 45.4 247.246 53.6C247.246 61.8 242.046 67.2 230.246 67.2H212.646Z"></path><path d="M388.64 2.39999V54.6H346.24V2.39999H300.84V146H346.24V92.6H388.64V146H434.04V2.39999H388.64Z"></path><path d="M444.659 74.2C444.659 117.2 474.059 148.4 516.659 148.4C559.259 148.4 588.659 117.2 588.659 74.2C588.659 31.2 559.259 0 516.659 0C474.059 0 444.659 31.2 444.659 74.2ZM542.859 74.2C542.859 96.4 532.259 109.4 516.659 109.4C501.059 109.4 490.459 96.4 490.459 74.2C490.459 52 501.059 39 516.659 39C532.259 39 542.859 52 542.859 74.2Z"></path><path d="M599.277 2.39999V146H707.277V108H643.877V92.2H695.877V55.2H643.877V40.4H707.277V2.39999H599.277Z"></path><path d="M720.957 146H793.557C826.557 146 843.757 130.6 843.757 105C843.757 88.4 833.757 77.2 821.957 71.8C830.357 67.6 839.957 57.2 839.957 42.2C839.957 16.4 822.557 2.39999 790.157 2.39999H720.957V146ZM764.557 57.2V38.8H785.357C792.957 38.8 797.157 42 797.157 48C797.157 54 792.957 57.2 785.357 57.2H764.557ZM764.557 90H788.557C795.757 90 799.957 93.8 799.957 99.6C799.957 105.4 795.757 109.2 788.557 109.2H764.557V90Z"></path><path d="M853.77 2.39999V146H961.77V108H898.37V92.2H950.37V55.2H898.37V40.4H961.77V2.39999H853.77Z"></path><path d="M160.02 313H264.62V275H205.42V169.4H160.02V313Z"></path><path d="M275.84 169.4V313H383.84V275H320.44V259.2H372.44V222.2H320.44V207.4H383.84V169.4H275.84Z"></path><path d="M518.92 207.4V169.4H392.72V207.4H433.12V313H478.52V207.4H518.92Z"></path><path d="M651.537 207.4V169.4H525.337V207.4H565.737V313H611.137V207.4H651.537Z"></path><path d="M708.154 169.4H662.754V313H708.154V169.4Z"></path><path d="M764.282 241.2C764.282 219.4 774.282 206 788.882 206C800.282 206 808.482 214.2 810.282 227.2L853.082 213.4C844.082 185.6 822.882 167 789.082 167C747.882 167 718.682 198.2 718.682 241.2C718.682 284.2 747.882 315.4 789.082 315.4C822.882 315.4 844.082 296.8 853.082 269L810.282 255.2C808.482 268.2 800.282 276.4 788.882 276.4C774.282 276.4 764.282 263 764.282 241.2Z"></path><path d="M860.996 169.4V313H968.996V275H905.596V259.2H957.596V222.2H905.596V207.4H968.996V169.4H860.996Z"></path><path d="M126.927 374.4V336.4H0.727356V374.4H41.1274V480H86.5274V374.4H126.927Z"></path><path d="M225.945 336.4V388.6H183.545V336.4H138.145V480H183.545V426.6H225.945V480H271.345V336.4H225.945Z"></path><path d="M281.963 408.2C281.963 451.2 311.363 482.4 353.963 482.4C396.563 482.4 425.963 451.2 425.963 408.2C425.963 365.2 396.563 334 353.963 334C311.363 334 281.963 365.2 281.963 408.2ZM380.163 408.2C380.163 430.4 369.563 443.4 353.963 443.4C338.363 443.4 327.763 430.4 327.763 408.2C327.763 386 338.363 373 353.963 373C369.563 373 380.163 386 380.163 408.2Z"></path><path d="M531.782 480L554.182 398.4V480H598.582V336.4H535.182L517.982 406.2L500.782 336.4H436.582V480H480.582V398.4L502.982 480H531.782Z"></path><path d="M659.912 438.8H679.912C716.712 438.8 739.312 421.2 739.312 387.6C739.312 354 716.712 336.4 679.912 336.4H614.512V480H659.912V438.8ZM659.912 401.2V374H677.512C689.312 374 694.512 379.4 694.512 387.6C694.512 395.8 689.312 401.2 677.512 401.2H659.912Z"></path><path d="M738.435 461.4C751.035 474.6 779.635 482.4 802.435 482.4C837.435 482.4 865.635 464.6 865.635 432.2C865.635 399.8 837.435 393.2 815.635 389C799.035 385.8 791.235 384.8 791.235 378.8C791.235 373 797.035 370.8 805.235 370.8C818.235 370.8 831.835 375.6 841.835 385.2L864.035 354.2C851.835 343 831.835 334 806.435 334C773.435 334 746.635 352.6 746.635 383.4C746.635 413.2 769.635 421.6 790.235 425.2C812.635 429.2 820.635 430 820.635 436.8C820.635 442.6 814.435 445.6 804.435 445.6C790.635 445.6 773.835 440.2 760.635 427.4L738.435 461.4Z"></path><path d="M870.44 408.2C870.44 451.2 899.84 482.4 942.44 482.4C985.04 482.4 1014.44 451.2 1014.44 408.2C1014.44 365.2 985.04 334 942.44 334C899.84 334 870.44 365.2 870.44 408.2ZM968.64 408.2C968.64 430.4 958.04 443.4 942.44 443.4C926.84 443.4 916.24 430.4 916.24 408.2C916.24 386 926.84 373 942.44 373C958.04 373 968.64 386 968.64 408.2Z"></path><path d="M1158.46 336.4H1115.06V404.4L1069.06 336.4H1025.06V480H1068.46V407L1119.26 480H1158.46V336.4Z"></path></svg></div>

         <div className="info-content">
            <PortableText value={info[0].overview} />
{/* <p>Phoebe Lettice Thompson is a London based Stylist. Often working as multi-disciplinary creative her work spans Photography, Design, and Creative Direction. She works with talent, publications and brands on a global scale.</p>
<p>With over 15 years in the industry Phoebe started her career at numerous high fashion publications working alongside top industry names such as  Sarajane Hoare, Grace Coddington, Patrick Demarchelier,  Mario Testino and Annie Lebovitz.  At age 23 she was appointed Creative Director of Topshop-based East London label, Illustrated People. Over the 4 years Phoebe at the helm of brand she secured exclusive collaborations with Selfridges, Ed hardy and V Files, and talent such as Iris Law, Little Sims, Charli XCX.</p>
<p>During her most recent styling work Phoebe has worked with celebrities including Hailey Bieber, Ciara, Amelia Grey, Pink Pantheress, Addison Rae, Beabadoobee, Gracie Abrams, Zara Larsson and Jesse Jo Stark.</p>
<p>Phoebe worked closely with designers Roberta Einer and Susan Fang on their SS23 and FW23 collections,  she has always supported local young designers and artists throughout her career. Her most recent editorial styling work has been featured in The Greatest Magazine and Vogue Portugal.</p> */}
        <div className="info-contact">
         <span>contact</span>
         <a href="mailto:studio@phoebeletticethompson.com">studio@phoebeletticethompson.com</a>
        </div>
         </div> 
         <button id="close-info" onClick={handleMouseEvent}>Close</button>
    </div>
 );
}