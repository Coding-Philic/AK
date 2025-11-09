import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Navbar from "../Navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const cardRef = useRef(null);
  const brandRef = useRef(null);
  const titleRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);
  const btnsRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(card, { opacity: 1, scale: 1 });
      return;
    }

    gsap.set(card, { opacity: 0, scale: 0.96, transformOrigin: "50% 50%" });
    gsap.set([brandRef.current, titleRef.current, emailRef.current, passRef.current, btnsRef.current], {
      opacity: 0, y: 18
    });

    const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power3.out" } });
    tl.to(card, { opacity: 1, scale: 1 })
      .to(brandRef.current, { opacity: 1, y: 0 }, "-=0.35")
      .to(titleRef.current, { opacity: 1, y: 0 }, "-=0.35")
      .to(emailRef.current, { opacity: 1, y: 0 }, "-=0.25")
      .to(passRef.current, { opacity: 1, y: 0 }, "-=0.25")
      .to(btnsRef.current, { opacity: 1, y: 0 }, "-=0.2");

    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (msg.type === "error" && cardRef.current) {
      gsap.fromTo(cardRef.current, { x: -8 }, { x: 8, repeat: 3, yoyo: true, duration: 0.08, clearProps: "x" });
    }
  }, [msg]);

  const showMessage = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 4500);
  };

  const handleToggle = () => setShowPwd(s => !s);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email))
      return showMessage("Please provide a valid email address", "error");
    if (!pwd || pwd.length < 6)
      return showMessage("Password must be at least 6 characters", "error");

    showMessage("Signing in...", "success");

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: pwd }),
      });

      const data = await res.json();

      if (res.ok) {
        showMessage("Login successful! Redirecting...", "success");
        setTimeout(() => (window.location.href = "/ChatBot"), 900);
      } else {
        showMessage(data.message || "Login failed", "error");
      }
    } catch (err) {
      showMessage("Server error. Try again later.", "error");
    }
  };

  return (
    <div className="min-h-svh grid place-items-center bg-[#0b0f1a] px-4">
      <Navbar />
      <main
        ref={cardRef}
        className="relative overflow-visible w-[min(1100px,96vw)] grid grid-cols-1 md:grid-cols-[1.1fr_520px] gap-8 items-stretch
                   bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))]
                   rounded-[16px] p-8 md:p-10 shadow-[0_12px_48px_rgba(2,6,23,0.6)]
                   border border-white/10 backdrop-blur-[12px]"
      >
        <section ref={brandRef} className="p-8 flex flex-col gap-4 justify-center relative overflow-visible rounded-md">
          <div className="flex items-center gap-3">
            <div className="grid place-items-center w-16 h-16 rounded-[12px]
                            bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]
                            border border-white/15 shadow-[0_6px_18px_rgba(2,6,40,0.5)]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="6" fill="url(#g)" />
                <defs>
                  <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#7c5cff" />
                    <stop offset="1" stopColor="#2bd2ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <h1 className="text-[22px] leading-tight text-white">NeonVault</h1>
              <p className="text-[13px] text-white/70">Sign in • Dark glass theme</p>
            </div>
          </div>

          <div style={{ marginTop: 18, maxWidth: "52ch" }}>
            <p className="m-0 text-white/80">Enter email and password to access NeonVault.</p>
          </div>

          <div className="pointer-events-none absolute right-[-80px] top-[-60px] w-[360px] h-[360px] rounded-full blur-[70px] opacity-80 mix-blend-screen"
               style={{ background: "linear-gradient(135deg,#7c5cff,#2bd2ff)" }} />
          <div className="pointer-events-none absolute left-[-100px] bottom-[-60px] w-[300px] h-[300px] rounded-full blur-[70px] opacity-80 mix-blend-screen"
               style={{ background: "linear-gradient(45deg,#ff7ab6,#ffcf6b)" }} />
        </section>

        <aside className="p-7 rounded-lg bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] border border-white/15 backdrop-blur-[10px] flex flex-col gap-4">
          <div ref={titleRef} className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-[19px] m-0 text-white">Sign in</h2>
              <p className="text-[13px] text-white/70">Use email and password</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <small className="text-[13px] text-white/70">New here? <a className="underline" href="/signup">Create account</a></small>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div ref={emailRef}>
              <label htmlFor="email" className="block text-[13px] text-white/70 mb-[6px]">Email</label>
              <div className="flex items-center p-3 rounded-[10px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-3 opacity-90">
                  <path d="M3 8.5L12 13l9-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  id="email"
                  type="email"
                  required
                  className="flex-1 bg-transparent border-0 text-[15px] outline-none text-white placeholder:text-white/50"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div ref={passRef}>
              <label htmlFor="password" className="block text-[13px] text-white/70 mb-[6px]">Password</label>
              <div className="flex items-center p-3 rounded-[10px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-3 opacity-90">
                  <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  minLength={6}
                  required
                  className="flex-1 bg-transparent border-0 text-[15px] outline-none text-white"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  placeholder="••••••"
                />
                <button type="button" className="ml-2 p-1 text-white/80 hover:text-white" onClick={handleToggle} aria-label={showPwd ? "Hide password" : "Show password"}>
                  {showPwd ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.2" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div ref={btnsRef} className="flex gap-3 items-center">
              <button type="submit" className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[10px] font-semibold text-sm bg-white/90 text-black hover:bg-white">Sign in</button>
              <a href="/signup" className="inline-flex items-center gap-2 px-5 py-3.5 rounded-[10px] text-white/80 border border-white/15 hover:text-white">Create account</a>
            </div>

            <div className={`p-3 rounded-md text-sm ${msg.type === "error" ? "bg-[rgba(255,107,107,0.12)] text-[#ff6b6b] border border-[rgba(255,107,107,0.25)]" : msg.type === "success" ? "bg-[rgba(40,199,111,0.12)] text-[#28c76f] border border-[rgba(40,199,111,0.25)]" : "hidden"}`} role="status" aria-live="polite">
              {msg.text}
            </div>
          </form>
        </aside>
      </main>
    </div>
  );
}
