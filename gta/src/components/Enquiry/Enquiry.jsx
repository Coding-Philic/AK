import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../Navbar";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "registration",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);
  const fieldsWrapRef = useRef(null);
  const labelsRef = useRef({});
  const inputsRef = useRef({});
  const btnRef = useRef(null);
  const btnFillRef = useRef(null);
  const btnTextRef = useRef(null);
  const btnIconRef = useRef(null);
  const orbARef = useRef(null);
  const orbBRef = useRef(null);
  const orbCRef = useRef(null);
  const enterTlRef = useRef(null);
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (document.getElementById("enquiry-global-css")) return;
    const style = document.createElement("style");
    style.id = "enquiry-global-css";
    style.innerHTML = `
      .form-grid { display: grid; grid-template-columns: 1fr; gap: clamp(10px, 2vw, 18px); }
      .field--full { grid-column: 1 / -1; }

      @media (min-width: 720px) {
        .form-grid {
          grid-template-columns: 1fr 1fr;
          column-gap: clamp(14px, 3vw, 28px);
          row-gap: clamp(10px, 2vw, 20px);
        }
      }

      @media (min-width: 1200px) { .enquiry-card { max-width: 860px; } }

      @media (max-width: 380px) {
        .form-grid input,
        .form-grid select,
        .form-grid textarea,
        .form-grid button { min-height: 44px; }
      }

      .enquiry-card { container-type: inline-size; }
      @container (width > 580px) { .form-grid { grid-template-columns: 1fr 1fr; } }
      @container (width > 800px) { .form-grid { column-gap: 28px; } }

      .focus-neon:focus-visible {
        outline: 0;
        box-shadow:
          0 0 10px rgba(0,255,255,0.6),
          0 0 20px rgba(0,128,255,0.45),
          0 0 34px rgba(0,128,255,0.35),
          inset 0 0 0 1px rgba(0,255,255,0.25);
        border-color: rgba(0,255,255,0.55);
      }

      button:focus-visible {
        outline: 0;
        box-shadow:
          0 0 14px rgba(0,255,255,0.6),
          0 0 28px rgba(0,123,255,0.5),
          inset 0 0 0 1px rgba(255,255,255,0.08);
        border-color: rgba(0,255,255,0.6);
      }
      button:hover { transform: translateY(-1px); }

      .neon-select-wrap { position: relative; }
      .neon-select {
        appearance: none; -webkit-appearance: none; -moz-appearance: none;
        background-image:
          linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03)),
          url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='%2300e6e6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
        background-repeat: no-repeat, no-repeat;
        background-position: left top, right 14px center;
        background-size: auto, 20px;
        padding-right: 48px;
        color: #eaffff;
        border: 1px solid rgba(0,255,255,0.18);
        border-radius: 12px;
        box-shadow:
          inset 0 0 0 1px rgba(0,255,255,0.06),
          inset 0 2px 10px rgba(0,0,0,0.35);
      }
      .neon-select:hover {
        box-shadow:
          0 0 10px rgba(0,255,255,0.25),
          0 0 18px rgba(0,128,255,0.18),
          inset 0 0 0 1px rgba(0,255,255,0.08);
      }
      .neon-select option { color: #0b1220; }

      @keyframes floatA { from { transform: translateY(0px); } to { transform: translateY(18px); } }
      @keyframes floatB { from { transform: translateY(0px); } to { transform: translateY(-22px); } }
      @keyframes floatC { from { transform: translateY(0px); } to { transform: translateY(14px); } }

      /* Floating label base */
      .float-wrap { position: relative; }
      .float-label {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(200,240,255,0.7);
        pointer-events: none;
        transition: color 0.2s ease;
      }
      .float-active { color: #8ffcff; }
      .btn-inner { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 100%; }
      .btn-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0%; background: rgba(255,255,255,0.18); border-radius: 10px; }
      .btn-icon { display: inline-block; margin-left: 8px; opacity: 0; transform: scale(0.6); }
    `;
    document.head.appendChild(style);
  }, []);

  // Entry reveal timeline
  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      enterTlRef.current = gsap.timeline({ defaults: { ease: "power3.out" } });
      enterTlRef.current
        .from(cardRef.current, { y: 24, autoAlpha: 0, scale: 0.98, duration: 0.5 })
        .from(
          fieldsWrapRef.current.querySelectorAll(".field, .actions"),
          {
            y: 14,
            autoAlpha: 0,
            filter: "blur(6px)",
            duration: 0.35,
            stagger: { each: 0.06, from: "start" },
          },
          "-=0.1"
        )
        .from(btnRef.current, { y: 8, autoAlpha: 0, duration: 0.25 }, "-=0.2");
    }, cardRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Floating labels on focus/value
  const activateLabel = (name) => {
    const label = labelsRef.current[name];
    if (!label) return;
    gsap.to(label, { y: -26, x: 2, scale: 0.82, duration: 0.2, ease: "power2.out" }); // transform-based for smoothness
    label.classList.add("float-active");
  };
  const deactivateLabel = (name) => {
    const input = inputsRef.current[name];
    const label = labelsRef.current[name];
    if (!label) return;
    if (input && input.value) return; // keep floated if has value
    gsap.to(label, { y: 0, x: 0, scale: 1, duration: 0.2, ease: "power2.out" });
    label.classList.remove("float-active");
  };

  // Button micro-interactions: press + progress + success
  const runSubmitProgress = async (action) => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to(btnRef.current, { y: 1, duration: 0.1 })
      .to(btnRef.current, { y: 0, duration: 0.1 })
      .to(btnFillRef.current, { width: "85%", duration: 0.6 })
      .to(btnFillRef.current, { width: "100%", duration: 0.2 });

    try {
      const res = await action();
      // Success tick
      gsap.to(btnTextRef.current, { autoAlpha: 0, y: -6, duration: 0.18 });
      gsap.to(btnIconRef.current, { autoAlpha: 1, scale: 1, duration: 0.22, ease: "back.out(2)" });
      return res;
    } catch (e) {
      // Error shake
      const shake = gsap.timeline();
      shake
        .to(btnRef.current, { x: -6, duration: 0.05 })
        .to(btnRef.current, { x: 6, duration: 0.05 })
        .to(btnRef.current, { x: -4, duration: 0.05 })
        .to(btnRef.current, { x: 0, duration: 0.05 });
      // reset fill
      gsap.to(btnFillRef.current, { width: "0%", duration: 0.3, ease: "power2.inOut" });
      throw e;
    }
  };

  // pointer parallax on orbs
  useEffect(() => {
    if (prefersReducedMotion) return;
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX - w / 2) / w;
      const y = (e.clientY - h / 2) / h;
      gsap.to(orbARef.current, { x: x * 24, y: y * 14, duration: 0.3, ease: "power2.out" });
      gsap.to(orbBRef.current, { x: -x * 28, y: -y * 18, duration: 0.35, ease: "power2.out" });
      gsap.to(orbCRef.current, { x: x * 18, y: -y * 10, duration: 0.32, ease: "power2.out" });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [prefersReducedMotion]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await runSubmitProgress(async () => {
        const res = await fetch("http://localhost:5000/api/auth/Enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        alert(data.message || "Form submitted successfully!");
        return data;
      });
      // Reset progress UI after brief success
      setTimeout(() => {
        gsap.to(btnTextRef.current, { autoAlpha: 1, y: 0, duration: 0.18 });
        gsap.to(btnIconRef.current, { autoAlpha: 0, scale: 0.6, duration: 0.18 });
        gsap.to(btnFillRef.current, { width: "0%", duration: 0.3 });
      }, 1200);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ensure labels are floated if initial values exist
  useEffect(() => {
    ["name", "email", "phone", "type", "message"].forEach((k) => {
      if (formData[k]) activateLabel(k);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <div style={styles.page}>
      <Navbar />
      <div ref={orbARef} style={styles.orbA} />
      <div ref={orbBRef} style={styles.orbB} />
      <div ref={orbCRef} style={styles.orbC} />

      <div ref={cardRef} style={styles.container} className="enquiry-card">
        <h2 style={styles.title}>Registration / Enquiry</h2>

        <form onSubmit={onSubmit} className="form-grid" ref={fieldsWrapRef}>
          <div className="field float-wrap">
            <label
              htmlFor="name"
              className="float-label"
              ref={(el) => (labelsRef.current.name = el)}
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={onChange}
              onFocus={() => activateLabel("name")}
              onBlur={() => deactivateLabel("name")}
              className="focus-neon"
              style={{ ...styles.input, ...styles.neonField, paddingTop: 18 }}
              ref={(el) => (inputsRef.current.name = el)}
            />
          </div>

          <div className="field float-wrap">
            <label
              htmlFor="email"
              className="float-label"
              ref={(el) => (labelsRef.current.email = el)}
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={onChange}
              onFocus={() => activateLabel("email")}
              onBlur={() => deactivateLabel("email")}
              className="focus-neon"
              style={{ ...styles.input, ...styles.neonField, paddingTop: 18 }}
              ref={(el) => (inputsRef.current.email = el)}
            />
          </div>

          <div className="field float-wrap">
            <label
              htmlFor="phone"
              className="float-label"
              ref={(el) => (labelsRef.current.phone = el)}
            >
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={onChange}
              onFocus={() => activateLabel("phone")}
              onBlur={() => deactivateLabel("phone")}
              className="focus-neon"
              style={{ ...styles.input, ...styles.neonField, paddingTop: 18 }}
              ref={(el) => (inputsRef.current.phone = el)}
            />
          </div>

          <div className="field float-wrap">
            <label
              htmlFor="type"
              className="float-label"
              ref={(el) => (labelsRef.current.type = el)}
            >
              Type
            </label>
            <div className="neon-select-wrap">
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={onChange}
                onFocus={() => activateLabel("type")}
                onBlur={() => deactivateLabel("type")}
                className="focus-neon neon-select"
                style={{ ...styles.input, ...styles.neonField, ...styles.selectCompat, paddingTop: 18 }}
                ref={(el) => (inputsRef.current.type = el)}
              >
                <option value="registration">Registration</option>
                <option value="enquiry">Enquiry</option>
              </select>
            </div>
          </div>

          <div className="field field--full float-wrap">
            <label
              htmlFor="message"
              className="float-label"
              ref={(el) => (labelsRef.current.message = el)}
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={onChange}
              onFocus={() => activateLabel("message")}
              onBlur={() => deactivateLabel("message")}
              className="focus-neon"
              style={{ ...styles.input, ...styles.neonField, paddingTop: 18, resize: "vertical" }}
              ref={(el) => (inputsRef.current.message = el)}
            />
          </div>

          <div className="actions field--full">
            <button type="submit" style={styles.button} disabled={loading} ref={btnRef}>
              <span className="btn-inner">
                <span ref={btnFillRef} className="btn-fill" />
                <span ref={btnTextRef}>{loading ? "Submitting..." : "Submit"}</span>
                <span ref={btnIconRef} className="btn-icon">✓</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

// styles unchanged from provided code
const styles = {
  page: {
    position: "relative",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background:
      "radial-gradient(1200px 800px at 10% 0%, #0a0f1f 0%, #05060b 40%, #000 100%)",
    minHeight: "100vh",
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: "clamp(12px, 2vw, 24px)",
  },
  orbA: {
    position: "absolute",
    width: 420,
    height: 420,
    top: -60,
    left: -60,
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 30% 30%, rgba(0,255,255,0.35), rgba(0,255,255,0) 60%)",
    filter: "blur(30px)",
    animation: "floatA 12s ease-in-out infinite alternate",
  },
  orbB: {
    position: "absolute",
    width: 520,
    height: 520,
    bottom: -120,
    right: -100,
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 70% 70%, rgba(0,128,255,0.30), rgba(0,128,255,0) 60%)",
    filter: "blur(35px)",
    animation: "floatB 14s ease-in-out infinite alternate",
  },
  orbC: {
    position: "absolute",
    width: 380,
    height: 380,
    bottom: 60,
    left: -80,
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 50% 50%, rgba(255,0,128,0.18), rgba(255,0,128,0) 60%)",
    filter: "blur(28px)",
    animation: "floatC 16s ease-in-out infinite alternate",
  },
  container: {
    position: "relative",
    width: "min(100%, 720px)",
    padding: "clamp(20px, 3vw, 36px)",
    borderRadius: 22,
    color: "#e7faff",
    background:
      "linear-gradient(180deg, rgba(12,16,28,0.6), rgba(12,16,28,0.35))",
    backdropFilter: "blur(14px) saturate(120%)",
    WebkitBackdropFilter: "blur(14px) saturate(120%)",
    border: "1px solid rgba(0, 255, 255, 0.25)",
    boxShadow:
      "0 0 0 1px rgba(0,255,255,0.06) inset, 0 10px 30px rgba(0,0,0,0.45), 0 0 25px rgba(0, 200, 255, 0.18)",
  },
  title: {
    textAlign: "center",
    marginBottom: "clamp(12px, 2.2vw, 26px)",
    color: "#8ffcff",
    fontWeight: 800,
    letterSpacing: 0.6,
    fontSize: "clamp(18px, 2.2vw, 26px)",
    textShadow:
      "0 0 8px rgba(0,255,255,0.65), 0 0 16px rgba(0,170,255,0.45), 0 0 24px rgba(0,120,255,0.35)",
  },
  label: {
    display: "block",
    margin: "12px 0 8px",
    fontSize: "clamp(12px, 1.6vw, 14px)",
    color: "rgba(200,240,255,0.8)",
    textShadow: "0 0 6px rgba(0,255,255,0.4)",
  },
  input: {
    width: "100%",
    padding: "clamp(10px, 2.2vw, 14px)",
    border: "1px solid rgba(0, 255, 255, 0.18)",
    borderRadius: 12,
    marginBottom: 16,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
    color: "#eaffff",
    boxShadow:
      "inset 0 0 0 1px rgba(0,255,255,0.06), inset 0 2px 10px rgba(0,0,0,0.35)",
    transition: "box-shadow 220ms ease, border-color 220ms ease, transform 120ms ease",
    outline: "none",
    fontSize: "clamp(14px, 2vw, 16px)",
  },
  neonField: {
    boxShadow:
      "inset 0 0 0 1px rgba(0,255,255,0.08), inset 0 2px 10px rgba(0,0,0,0.35), 0 0 0 rgba(0,255,255,0)",
  },
  selectCompat: { backgroundClip: "padding-box" },
  button: {
    width: "100%",
    padding: "clamp(12px, 2.2vw, 16px)",
    border: "1px solid rgba(0, 255, 255, 0.25)",
    borderRadius: 12,
    background:
      "linear-gradient(90deg, rgba(0,230,230,0.85), rgba(0,123,255,0.85))",
    color: "#ffffff",
    fontSize: "clamp(15px, 2.2vw, 17px)",
    cursor: "pointer",
    fontWeight: 800,
    letterSpacing: 0.5,
    textShadow: "0 0 6px rgba(0,0,0,0.6)",
    boxShadow:
      "0 0 14px rgba(0,255,255,0.4), 0 0 28px rgba(0,123,255,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)",
    transition:
      "transform 120ms ease, box-shadow 220ms ease, background 220ms ease",
  },
};
