import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Secondscroll = ({ totalFrames = 182 }) => {
  const canvasRef = useRef(null);
  const frames = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Draw frame function
    const drawFrame = (index) => {
      const img = frames.current[index];
      if (!img) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Preload all frames first
    const preloadImages = async () => {
      const promises = [];
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.src = `/thirdframes/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
        frames.current.push(img);

        promises.push(
          new Promise((res) => {
            img.onload = res;
          })
        );
      }
      await Promise.all(promises);
    };

    // Start GSAP after all frames loaded
    const initAnimation = async () => {
      await preloadImages();

      // Draw first frame immediately
      drawFrame(0);

      const obj = { frame: 0 };
      gsap.to(obj, {
        frame: totalFrames - 1,
        ease: "none",
        scrollTrigger: {
          trigger: canvas.parentElement,
          start: "top top",
          end: "bottom top",
          scrub: 0, // smooth & responsive
        },
        onUpdate: () => drawFrame(Math.floor(obj.frame)),
      });
    };

    initAnimation();

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [totalFrames]);

  return (
    <div
      style={{
        height: `${totalFrames * 4}vh`, // scroll space proportional to frames
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
        }}
      />
    </div>
  );
};

export default Secondscroll;
