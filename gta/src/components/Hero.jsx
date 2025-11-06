import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const wrapperRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const text = titleRef.current;

    // Pin the Hero section while scaling animation happens
    ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom+=100% top", // adjust how long the section stays pinned
      pin: true,
      pinSpacing: true,
      scrub: 1,
      markers: true,
    });

    // Animate the text scale + opacity
    gsap.fromTo(
      text,
      { opacity: 0, scale: 2000 },
      {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          markers: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="h-[100vh] w-full flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/gta-bg.jpg')" }}
    >
      <h1 ref={titleRef} className="text-white text-6xl font-bold">
        keyboard warrior
      </h1>
    </div>
  );
};

export default Hero;
