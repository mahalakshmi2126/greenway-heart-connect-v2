import React from 'react';

import logo1 from '@/assets/logos/11.jpg';
import logo2 from '@/assets/logos/Aara.png';
import logo3 from '@/assets/logos/Corpwings Logo.png';
import logo4 from '@/assets/logos/Dr REddys.png';
import logo5 from '@/assets/logos/Karigiri Logos.png';
import logo6 from '@/assets/logos/Mano Social Welfare.png';
import logo7 from '@/assets/logos/New Vision.jpg';
import logo8 from '@/assets/logos/SSK.jpg';
import logo9 from '@/assets/logos/Sathya Jeevan.jpg';
import logo10 from '@/assets/logos/TAF.jpg';
import logo11 from '@/assets/logos/The Give Foundation trust_20250203_225205_0000_page-0001.jpg';
import logo12 from '@/assets/logos/Vasavi Clubs.png';
import logo13 from '@/assets/logos/Vellore Vega.png';
import logo14 from '@/assets/logos/Youth4jobs.png';
import logo15 from '@/assets/logos/pa fOOTWEAR.jpg';

const logos = [
  { src: logo1, className: "" },
  { src: logo2, className: "" },
  { src: logo3, className: "scale-[3] invert hue-rotate-180 brightness-75 contrast-125" },
  { src: logo4, className: "" },
  { src: logo5, className: "" },
  { src: logo6, className: "" },
  { src: logo7, className: "" },
  { src: logo8, className: "" },
  { src: logo9, className: "" },
  { src: logo10, className: "" },
  { src: logo11, className: "" },
  { src: logo12, className: "" },
  { src: logo13, className: "" },
  { src: logo14, className: "" },
  { src: logo15, className: "" }
];

const OurPartners = () => {
  return (
    <section className="pt-4 pb-20 bg-white overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-4 mb-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Partners</h2>
          <p className="mt-4 text-lg text-gray-600">
            Collaborating with leading organizations to create a better future.
          </p>
        </div>
      </div>
      
      <div className="relative w-full overflow-hidden flex">
        <div className="flex w-max animate-marquee items-center gap-16 px-8">
          {logos.map((logo, index) => (
            <img 
              key={`logo1-${index}`} 
              src={logo.src} 
              alt={`Partner ${index + 1}`} 
              className={`w-40 h-24 object-contain ${logo.className}`} 
            />
          ))}
          {logos.map((logo, index) => (
            <img 
              key={`logo2-${index}`} 
              src={logo.src} 
              alt={`Partner ${index + 1}`} 
              className={`w-40 h-24 object-contain ${logo.className}`} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
