import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ImageSection = () => {
  const containerRef = useRef(null);
  const imgRefs = useRef([]);

  // Image URLs
 const imageUrls = [
    "https://images.unsplash.com/photo-1503431128871-cd250803fa41?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGFyayUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFwdG9wfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1515343480029-43cdfe6b6aae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1588546506381-74592e9b8a2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTd8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxsYXB0b3B8ZW58MHx8MHx8fDA%3D",
  ];

  useEffect(() => {
    imgRefs.current.forEach((img) => {
      gsap.fromTo(
        img,
        { opacity: 0, scale: 0.5, x: 100, y: 100 },
        {
          opacity: 1,
          scale: 3,
          x: 0,
          y: 0,
          duration: 1.5,
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            end: "top 50%",
            scrub: true, // Animate once on scroll
            markers: true,
          },
        }
      );
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[250vh]  flex flex-col justify-center items-center space-y-20"
    >
      {imageUrls.map((url, i) => (
        <img
          key={i}
          ref={(el) => (imgRefs.current[i] = el)}
          src={url}
          alt={`img-${i}`}
          className="w-48 h-48 object-cover rounded-lg"
        />
      ))}
    </div>
  );
};

export default ImageSection;
