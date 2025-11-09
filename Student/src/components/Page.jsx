import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollMin from "./ScrollMin";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Debug helpers: show markers while you debug (turn false later)
    const debugMarkers = false;

    // Ensure sections are found after render
    const sections = gsap.utils.toArray(".section");

    // If there's a background video, refresh ScrollTrigger when it's ready
    const video = document.querySelector(".bg-video");
    if (video) {
      const onMeta = () => {
        ScrollTrigger.refresh();
        video.removeEventListener("loadedmetadata", onMeta);
      };
      video.addEventListener("loadedmetadata", onMeta);
    }

    // Setup animations
    sections.forEach((sec) => {
      // ensure transform origin and performance hint
      gsap.set(sec, { transformOrigin: "center center", willChange: "transform, opacity" });

      gsap.fromTo(
        sec,
        { opacity: 0, scale: 1 }, // start bigger & invisible
        {
          opacity: 1,
          scale: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sec,
            start: "top 20%",
            end: "top top",
            scrub: true,
            // markers: true, // enable for debugging
            markers: true,
            // If you use a custom scroller (smooth-scroll lib), set scroller: container
            // scroller: container,
          },
        }
      );

      // Pin first two
      if (sec.classList.contains("pin")) {
        ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end: "+=610", // length to pin; adjust
          pin: true,
          pinSpacing: true,
          scrub: true,
          markers: debugMarkers,
          // If your scroller container is transformed (smooth-scroll), you may need:
          // pinType: "transform" or "fixed" depending on setup
        });
      }
    });

    // final refresh to compute everything
    ScrollTrigger.refresh();

    // cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.killTweensOf(sections);
    };
  }, []);

  return (
    <>
    

      <div ref={containerRef} style={{ position: "relative", zIndex: 1 }}>
       <section className="section pin" style={sectionStyle}>
  <div style={cardStyle}>
    <h1>Feature Page 1</h1>
    <p>This is some descriptive text inside the card.</p>
  </div>
</section>

          <section className="section pin" style={sectionStyle}>
  <div style={cardStyle}>
    <h1>Feature Page 1</h1>
    <p>This is some descriptive text inside the card.</p>
  </div>
</section>
        <section className="section pin" style={sectionStyle}>About Us</section>
        <section className="section pin " style={{...sectionStyle, display:'flex', justifyContent: "space-between", backgroundColor : "red"}}>
          <div style={{ flex: 1 }}>Your Text Here</div>
  <div style={{ flex: 1 }} className="">
     <ScrollMin />
  </div>
          </section>
        <section className="section pin" style={{sectionStyle,marginTop:"-10vh"}}>Contact</section>
      </div>
    </>
  );
};

const sectionStyle = {
  height: "100vh",
  display: "flex",
  alignItems: "center",          // vertically center
  justifyContent: "flex-start",  // align to left
  paddingLeft: "5vw",            // space from left edge
  fontSize: "3rem",
  color: "white",
  position: "relative",
  zIndex: 1,
  transformOrigin: "center center",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.1)", // semi-transparent
  backdropFilter: "blur(10px) saturate(180%)",
  WebkitBackdropFilter: "blur(10px) saturate(180%)", // Safari
  borderRadius: "20px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.25)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  padding: "2rem",
  maxWidth: "400px",
  textAlign: "left",
  color: "white",
};


// const sectionStyle = {
//   height: "100vh",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   fontSize: "3rem",
//   color: "white",
//   position: "relative",
//   zIndex: 1, // ensures sections are above the video
//   transformOrigin: "center center",
// };

export default Page;
