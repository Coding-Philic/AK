import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import Navbar from "../Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Animation refs
  const cardRef = useRef(null);
  const brandRef = useRef(null);
  const headerRef = useRef(null);
  const fieldsRef = useRef(null);
  const ctaRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // If reduced motion, snap elements into place without motion
    if (prefersReduced) {
      gsap.set(card, { opacity: 1, scale: 1 });
      gsap.set([brandRef.current, headerRef.current, fieldsRef.current, ctaRef.current], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    // Build a single timeline and store it in a ref (stable across renders)
    const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power3.out" } });
    tlRef.current = tl;

    // Initial state
    gsap.set(card, { opacity: 0, scale: 0.96, transformOrigin: "50% 50%" });
    gsap.set([brandRef.current, headerRef.current, fieldsRef.current, ctaRef.current], {
      opacity: 0,
      y: 18,
    });

    // Sequence
    tl.to(card, { opacity: 1, scale: 1 })
      .to(brandRef.current, { opacity: 1, y: 0 }, "-=0.35")
      .to(headerRef.current, { opacity: 1, y: 0 }, "-=0.35")
      .to(fieldsRef.current, { opacity: 1, y: 0 }, "-=0.25")
      .to(ctaRef.current, { opacity: 1, y: 0 }, "-=0.2");

    return () => {
      // Clean up the timeline to avoid leaks on unmount
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Try again!");
    }
  };

  return (
    <div className="min-h-svh grid place-items-center bg-[#0b0f1a] px-4">
      <Navbar/>
      <main
        ref={cardRef}
        className="relative overflow-visible w-[min(1100px,96vw)] grid grid-cols-1 md:grid-cols-[1.1fr_520px] gap-8 items-stretch
                   bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))]
                   rounded-[16px] p-8 md:p-10 shadow-[0_12px_48px_rgba(2,6,23,0.6)]
                   border border-white/10 backdrop-blur-[12px]"
      >
        {/* Brand / Left section */}
        <section
          ref={brandRef}
          className="p-8 flex flex-col gap-4 justify-center relative overflow-visible rounded-md"
        >
          <div className="flex items-center gap-3">
            <div
              className="grid place-items-center w-16 h-16 rounded-[12px]
                         bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]
                         border border-white/15 shadow-[0_6px_18px_rgba(2,6,40,0.5)]"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="6" fill="url(#g2)" />
                <defs>
                  <linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#7c5cff" />
                    <stop offset="1" stopColor="#2bd2ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <h1 className="text-[22px] leading-tight text-white">NeonVault</h1>
              <p className="text-[13px] text-white/70">Create account • Dark glass theme</p>
            </div>
          </div>

          <div style={{ marginTop: 18, maxWidth: "52ch" }}>
            <p className="m-0 text-white/80">
              Enter name, email, and password to create a NeonVault account.
            </p>
          </div>

          <div
            className="pointer-events-none absolute right-[-80px] top-[-60px] w-[360px] h-[360px] rounded-full blur-[70px] opacity-80 mix-blend-screen"
            style={{ background: "linear-gradient(135deg,#7c5cff,#2bd2ff)" }}
          />
          <div
            className="pointer-events-none absolute left-[-100px] bottom-[-60px] w-[300px] h-[300px] rounded-full blur-[70px] opacity-80 mix-blend-screen"
            style={{ background: "linear-gradient(45deg,#ff7ab6,#ffcf6b)" }}
          />
        </section>

        {/* Form / Right section */}
        <aside
          className="p-7 rounded-lg bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))]
                     border border-white/15 backdrop-blur-[10px] flex flex-col gap-4"
        >
          <div ref={headerRef} className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-[19px] m-0 text-white">Sign up</h2>
              <p className="text-[13px] text-white/70">Create a new account</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <small className="text-[13px] text-white/70">
                Already a user?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="underline"
                >
                  Login
                </button>
              </small>
            </div>
          </div>

          {message && (
            <p
              className={`text-sm p-3 rounded-md border ${
                /success/i.test(message)
                  ? "bg-[rgba(40,199,111,0.12)] text-[#28c76f] border-[rgba(40,199,111,0.25)]"
                  : "bg-[rgba(255,107,107,0.12)] text-[#ff6b6b] border-[rgba(255,107,107,0.25)]"
              }`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Fields block for timeline */}
            <div ref={fieldsRef} className="flex flex-col gap-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-[13px] text-white/70 mb-[6px]">
                  Full Name
                </label>
                <div className="flex items-center p-3 rounded-[10px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-3 opacity-90">
                    <path d="M12 12a4 4 0 1 0-0.001-8.001A4 4 0 0 0 12 12Z" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="flex-1 bg-transparent border-0 text-[15px] outline-none text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-[13px] text-white/70 mb-[6px]">
                  Email
                </label>
                <div className="flex items-center p-3 rounded-[10px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-3 opacity-90">
                    <path d="M3 8.5L12 13l9-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="flex-1 bg-transparent border-0 text-[15px] outline-none text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-[13px] text-white/70 mb-[6px]">
                  Password
                </label>
                <div className="flex items-center p-3 rounded-[10px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-3 opacity-90">
                    <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="flex-1 bg-transparent border-0 text-[15px] outline-none text-white placeholder:text-white/50"
                  />
                </div>
              </div>
            </div>

            {/* CTA/button row as a block for timeline */}
            <div ref={ctaRef} className="flex flex-col gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[10px] font-semibold text-sm
                           bg-white/90 text-black hover:bg-white transition"
              >
                Signup
              </button>

              <div className="text-center text-sm text-white/70">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-white underline"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </aside>
      </main>
    </div>
  );
};

export default Signup;
