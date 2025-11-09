import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextSection = () => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);


  useEffect(() => {
    const texts = containerRef.current.querySelectorAll(".line");

    // Fade-in each line on scroll
    texts.forEach((text) => {
      gsap.fromTo(
        text,
        { opacity: 0, y: 0, },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            end: "top 20%",
            scrub: true,
            
          },
        }
      );

      // Animate gradient for this line
      gsap.to(text, {
        backgroundPosition: "100% center",
        ease: "none",
        scrollTrigger: {
          trigger: text,
          start: "top 100%",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, []);

  useEffect(() => {
    elementsRef.current.forEach((el) => {
      gsap.to(el, {
        y: () => Math.random() * 200 - 100,   // move up/down randomly
        x: () => Math.random() * 200 - 100,   // move left/right randomly
        rotation: () => Math.random() * 360,  // random rotation
        scale: () => Math.random() * 0.5 + 0.5, // random scale
        opacity: () => Math.random() * 0.4 + 0.2, // random opacity
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
          end: "200%",
          scrub: true,
          markers : true
        },
      });
    });
},[])


  return (
    <>
   <div
  ref={containerRef}
  className="relative h-[200vh] flex flex-col justify-start items-center p-20 text-6xl font-bold"
>
  {/* Gradient text lines */}
  <div className="line mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto]">
    First amazing line of text
  </div>
  <div className="line mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto]">
    Second fascinating line appears
  </div>
  <div className="line mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto]">
    third fascinating line appears
  </div>
  <div className="line mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto]">
    fourth fascinating line appears
  </div>
  <div className="line mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto]">
    fifth fascinating line appears
  </div>
  <div className="line mb-10 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent bg-[length:200%_auto]">
    sixth fascinating line appears
  </div>
  {/* ...other lines */}

  {/* Floating elements only in TextSection */}
  <div className="absolute inset-0 pointer-events-none">
    {[...Array(10)].map((_, i) => (
      <div
        key={i}
        ref={(el) => (elementsRef.current[i] = el)}
        className="absolute w-10 h-10 bg-yellow-400 rounded-full"
        style={{
          top: `${Math.random() * 80 + 10}vh`,
          left: `${Math.random() * 80 + 10}vw`,
          bottom: `${Math.random() * 80 + 10}vw`,
          right: `${Math.random() * 80 + 10}vw`,
        }}
      />
    ))}
  </div>
 <div className="absolute inset-0 pointer-events-none">
  {[...Array(20)].map((_, i) => (
    <div
      key={i}
      ref={(el) => (elementsRef.current[i] = el)}
      className={`absolute w-10 h-10 ${
        i % 2 === 0 ? "bg-yellow-400 rounded-full" : "bg-green-400 rounded-xl"
      }`}
      style={{
        top: `${Math.random() * 80 + 10}vh`,
        left: `${Math.random() * 80 + 10}vw`,
      }}
    />
  ))}
</div>

</div>

    </>
  );
};

export default TextSection;
