import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Scroll = ({ totalFrames = 180 }) => {
  const canvasRef = useRef(null);
  const frames = useRef([]);
  const firstFrameLoaded = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const drawFrame = (index) => {
      const img = frames.current[index];
      if (!img || !img.complete) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Preload frames
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
      img.onload = () => {
        if (!firstFrameLoaded.current && i === 1) {
          firstFrameLoaded.current = true;
          drawFrame(0);

          // Start GSAP animation
          const obj = { frame: 0 };
          gsap.to(obj, {
            frame: totalFrames - 1,
            ease: "none",
            scrollTrigger: {
              trigger: canvas.parentElement, // use parent for scroll trigger
              start: "top top",
              end: "bottom top",
              scrub: 0.5,
            },
            onUpdate: () => {
              drawFrame(Math.floor(obj.frame));
            },
          });
        }
      };
      frames.current.push(img);
    }

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [totalFrames]);

  return (
    // Use container div to provide scroll space
    <div style={{ height: "400vh", position: "relative" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "sticky", // sticky instead of fixed
          top: 0,
          width: "100%",
          height: "100vh",
        }}
      />
    </div>
  );
};

export default Scroll;
