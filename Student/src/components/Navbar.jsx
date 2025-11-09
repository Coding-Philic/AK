import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const linkRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // start menu offscreen
    gsap.set(menuRef.current, { y: "-100%" });
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    gsap.to(menuRef.current, { y: 0, duration: 0.6, ease: "power4.out" });
    gsap.fromTo(
      linkRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, delay: 0.2 }
    );
  };

  const closeMenu = () => {
    gsap.to(menuRef.current, { y: "-100%", duration: 0.6, ease: "power4.in" });
    setIsOpen(false);
  };

  const handleItemClick = (item) => {
    closeMenu();

    // 1) Home: cross-page hash + same-page smooth scroll
    if (item === "Home") {
      if (window.location.pathname !== "/") {
        // Go to landing with hash so it scrolls to #home after navigation
        window.location.href = "http://127.0.0.1:5500/frontend/index.html#[object%20Object]";
      } else {
        const section = document.getElementById("home");
        if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    // 2) Login: client-side routing via React Router
    if (item === "Login") {
      navigate("/login");
      return;
    }
    if (item === "AI ChatBot") {
      navigate("/ChatBot");
      return;
    }
    if (item === "Enquiry") {
      navigate("/Enquiry");
      return;
    }
    if (item === "Help") {
      navigate("/Help");
      return;
    }

    // 3) Default behavior for in-page sections
    const section = document.getElementById(item.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const items = ["Home", "AI ChatBot", "Services", "Enquiry", "Contact", "Help", "Careers", "Login"];

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 z-50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-400 bg-clip-text text-transparent">
         GCRG GROUPS OF INSTITUTION
        </h1>

        {/* Hamburger only */}
        {!isOpen && (
          <div className="cursor-pointer space-y-1" onClick={openMenu}>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
            <div className="w-6 h-1 bg-white"></div>
          </div>
        )}
      </nav>

      {/* Fullscreen Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-95 flex flex-col items-center pt-20 z-50"
      >
        {/* Cross button inside menu */}
        <button
          onClick={closeMenu}
          className="absolute top-6 right-6 text-white text-3xl z-60"
        >
          ✕
        </button>

        <ul className="text-3xl text-white space-y-6 text-center">
          {items.map((item, i) => (
            <li
              key={i}
              ref={(el) => (linkRefs.current[i] = el)}
              className="cursor-pointer hover:text-purple-400 transition"
              onClick={() => handleItemClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
