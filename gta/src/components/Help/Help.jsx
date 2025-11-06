import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import gsap from "gsap";

/* Flow preserved exactly */
const chatbotFlow = {
  start: {
    msg: "Hi! How can I help you today?",
    options: { account: "Account", password: "Password", support: "Support", services: "Services" }
  },
  account: {
    msg: "What do you want to know about Account?",
    options: { create: "Create Account", delete: "Delete Account" }
  },
  password: {
    msg: "Password help:",
    options: { reset: "Reset Password", change: "Change Password" }
  },
  support: {
    msg: "Support options:",
    options: { email: "Email Support", call: "Call Support" }
  },
  services: { msg: "We offer web solutions, tutorials, and 24/7 support.", feedback: true },
  create: { msg: "To create an account, go to Sign Up page and fill your details.", feedback: true },
  delete: { msg: "To delete account, go to settings > delete account.", feedback: true },
  reset: { msg: "Click on 'Forgot Password' at login screen to reset password.", feedback: true },
  change: { msg: "Go to settings > Change Password.", feedback: true },
  email: { msg: "You can email us at support@mywebsite.com", feedback: true },
  call: { msg: "Call us at +91-9876543210", feedback: true }
};

/* Utility: entrance animation for a node via timeline */
function useEnterTimeline(ref, deps = []) {
  const tlRef = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
        .from(ref.current, { autoAlpha: 0, y: 8, duration: 0.35 });
      tlRef.current.play(0);
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return tlRef;
}

function ChatMessage({ text, sender }) {
  const ref = useRef(null);
  useEnterTimeline(ref, [text, sender]);
  return <div ref={ref} className={`message ${sender}`}>{text}</div>;
}

/* Options with reveal timeline + per-button hover/press timelines */
function Options({ options, onSelect }) {
  const wrapRef = useRef(null);
  const tlRevealRef = useRef(null);
  const hoverTLs = useRef(new WeakMap());
  const pressTLs = useRef(new WeakMap());
  const mmRef = useRef(null);

  useLayoutEffect(() => {
    if (!wrapRef.current) return;

    const ctx = gsap.context(() => {
      const buttons = Array.from(wrapRef.current.querySelectorAll("button"));

      // Reserve space to avoid clipping during entrance
      const cols = Math.max(1, Math.floor(wrapRef.current.clientWidth / 210)); // ~200px button + gap
      const rows = Math.ceil(buttons.length / (cols || 1));
      wrapRef.current.style.minHeight = `${rows * 56}px`;

      // Reduced-motion aware reveal
      const mm = gsap.matchMedia();
      mmRef.current = mm;

      mm.add(
        { reduceMotion: "(prefers-reduced-motion: reduce)" },
        ({ conditions }) => {
          const reduce = conditions.reduceMotion;

          tlRevealRef.current = gsap.timeline({
            paused: true,
            defaults: { ease: "power2.out" }
          })
            .set(wrapRef.current, { willChange: "opacity,transform" }, 0)
            .from(buttons, {
              autoAlpha: reduce ? 1 : 0,
              scale: reduce ? 1 : 0.96,
              duration: reduce ? 0.01 : 0.22,
              stagger: reduce ? 0 : { each: 0.06, from: "start" },
              transformOrigin: "50% 50%"
            }, 0)
            .add(() => { wrapRef.current.style.willChange = "auto"; });

          tlRevealRef.current.play(0);

          // Per-button micro-interactions
          buttons.forEach((btn) => {
            // Hover timeline
            const hoverTL = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } })
              .to(btn, { scale: 1.04, filter: "brightness(1.15)", duration: 0.16 }, 0);
            hoverTLs.current.set(btn, hoverTL);

            // Press timeline
            const pressTL = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } })
              .to(btn, { y: 1, scale: 0.98, duration: 0.12 }, 0);
            pressTLs.current.set(btn, pressTL);

            // Handlers
            const onEnter = () => hoverTL.play();
            const onLeave = () => {
              hoverTL.reverse();
              pressTL.tweenTo(0, { ease: "power2.out" });
            };
            const onDown = () => pressTL.play(0);
            const onUpOrCancel = () => pressTL.reverse();

            btn.addEventListener("mouseenter", onEnter);
            btn.addEventListener("mouseleave", onLeave);
            btn.addEventListener("mousedown", onDown);
            btn.addEventListener("mouseup", onUpOrCancel);
            btn.addEventListener("mouseleave", onUpOrCancel);
            btn.addEventListener("touchstart", onDown, { passive: true });
            btn.addEventListener("touchend", onUpOrCancel);
            btn.addEventListener("touchcancel", onUpOrCancel);

            btn._cleanup = () => {
              btn.removeEventListener("mouseenter", onEnter);
              btn.removeEventListener("mouseleave", onLeave);
              btn.removeEventListener("mousedown", onDown);
              btn.removeEventListener("mouseup", onUpOrCancel);
              btn.removeEventListener("mouseleave", onUpOrCancel);
              btn.removeEventListener("touchstart", onDown);
              btn.removeEventListener("touchend", onUpOrCancel);
              btn.removeEventListener("touchcancel", onUpOrCancel);
            };
          });
        }
      );
    }, wrapRef);

    return () => {
      if (tlRevealRef.current) tlRevealRef.current.kill();
      const buttons = wrapRef.current ? Array.from(wrapRef.current.querySelectorAll("button")) : [];
      buttons.forEach((btn) => {
        const hoverTL = hoverTLs.current.get(btn);
        const pressTL = pressTLs.current.get(btn);
        if (hoverTL) hoverTL.kill();
        if (pressTL) pressTL.kill();
        if (btn._cleanup) btn._cleanup();
        hoverTLs.current.delete(btn);
        pressTLs.current.delete(btn);
      });
      if (mmRef.current) mmRef.current.revert();
      ctx.revert();
    };
  }, [options]);

  return (
    <div className="options" ref={wrapRef}>
      {Object.keys(options).map((k) => (
        <button key={k} className="btn" onClick={() => onSelect(k, options[k])}>
          {options[k]}
        </button>
      ))}
    </div>
  );
}

function Feedback({ onYes, onNo }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ paused: true, defaults: { ease: "power2.out" } })
        .from(ref.current, { autoAlpha: 0, y: 6, duration: 0.22 })
        .from(ref.current.querySelectorAll(".btn"), {
          autoAlpha: 0,
          y: 6,
          duration: 0.18,
          stagger: 0.06
        }, "<0.02")
        .play(0);
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div className="feedback" ref={ref}>
      <button className="btn success" onClick={onYes}>Yes</button>
      <button className="btn danger" onClick={onNo}>No</button>
    </div>
  );
}

function InputBox({ onSend }) {
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    if (!boxRef.current || !inputRef.current) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ paused: true, defaults: { ease: "power2.out" } })
        .from(boxRef.current, { autoAlpha: 0, y: 6, duration: 0.22 })
        .from(inputRef.current, { scale: 0.97, autoAlpha: 0, duration: 0.2 }, "<0.02")
        .play(0);
    }, boxRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="input-box" ref={boxRef}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type your problem..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const val = e.currentTarget.value.trim();
            if (val) onSend(val);
          }
        }}
      />
      <button
        className="btn"
        onClick={() => {
          const val = inputRef.current.value.trim();
          if (val) onSend(val);
        }}
      >
        Send
      </button>
    </div>
  );
}

export default function NeonGlassProChatbot() {
  const [messages, setMessages] = useState([]);
  const [currentOptions, setCurrentOptions] = useState(null);
  const [awaitingFeedback, setAwaitingFeedback] = useState(false);
  const [awaitingInput, setAwaitingInput] = useState(false);
  const chatRef = useRef(null);


  

  useEffect(() => {
    const first = chatbotFlow.start;
    addMessage(first.msg, "bot");
    setCurrentOptions(first.options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addMessage(text, sender = "bot") {
    setMessages((prev) => [...prev, { text, sender }]);
  }

  function handleOption(key, text) {
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setTimeout(() => {
      const step = chatbotFlow[key];
      addMessage(step.msg, "bot");
      if (step.options) {
        setCurrentOptions(step.options);
        setAwaitingFeedback(false);
        setAwaitingInput(false);
      } else if (step.feedback) {
        setCurrentOptions(null);
        setAwaitingFeedback(true);
        setAwaitingInput(false);
      }
    }, 160);
  }

  function onFeedbackYes() {
    addMessage("Yes", "user");
    setTimeout(() => addMessage("Glad I could help!", "bot"), 160);
    setAwaitingFeedback(false);
  }

  function onFeedbackNo() {
    addMessage("No", "user");
    setTimeout(() => {
      addMessage("Oh no , what type of problem you faced?", "bot");
      setAwaitingInput(true);
    }, 160);
    setAwaitingFeedback(false);
  }

// 💌 EmailJS helper function
async function sendFeedbackEmail(message) {
  // Replace with your actual IDs from EmailJS
  const SERVICE_ID = "service_syf4t1j";
  const TEMPLATE_ID = "template_i1kfdj7";
  const PUBLIC_KEY = "qGWiPSGTKXMma9XNv";

  const params = {
    message,
    page: window.location.href,
    date: new Date().toLocaleString(),
  };

  try {
    const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
    console.log("✅ Email sent successfully", res.status, res.text);
    return true;
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    return false;
  }
}


  async function onSendProblem(value) {
  addMessage(value, "user");
  setAwaitingInput(false);

  // small “sending…” note
  setTimeout(() => addMessage("Sending your feedback via email...", "bot"), 160);

  const ok = await sendFeedbackEmail(value);

  if (ok) {
    setTimeout(() => addMessage("Thanks for your feedback 🙏 We'll work on it!", "bot"), 300);
  } else {
    setTimeout(
      () =>
        addMessage(
          "Sorry 😔 couldn't send the email right now, but your feedback is noted.",
          "bot"
        ),
      300
    );
  }
}


  /* Auto-scroll */
  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, currentOptions, awaitingFeedback, awaitingInput]);

  return (
    <div className="page">
      <div className="chat-container neon-outline">
        <div className="header">
          <div className="dot dot-cyan" />
          <div className="dot dot-purple" />
          <div className="title">Support Assistant</div>
        </div>
        <div className="chat-box" ref={chatRef}>
          {messages.map((m, i) => <ChatMessage key={i} text={m.text} sender={m.sender} />)}

          {currentOptions && (
            <div className="message bot">
              <Options options={currentOptions} onSelect={handleOption} />
            </div>
          )}

          {awaitingFeedback && (
            <div className="message bot">
              <div className="bot-text">Was this helpful?</div>
              <Feedback onYes={onFeedbackYes} onNo={onFeedbackNo} />
            </div>
          )}

          {awaitingInput && (
            <div className="message bot">
              <InputBox onSend={onSendProblem} />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        :root{
          --bg:#06080d;
          --panel:#0b0f19;
          --glass:rgba(12,18,30,0.78);
          --text:#eaf2ff;
          --muted:#9fb0cc;
          --border:rgba(255,255,255,0.14);
          --cyan:#00e5ff;
          --purple:#9a6bff;
          --green:#15ffc8;
          --red:#ff5577;
          --shadow:0 18px 40px rgba(0,0,0,0.55);
        }

        *{box-sizing:border-box}
        .page{
          min-height:100dvh;
          display:grid;
          place-items:center;
          background:
            radial-gradient(900px 600px at 15% 10%, rgba(0,229,255,0.10), transparent 60%),
            radial-gradient(900px 520px at 85% 90%, rgba(154,107,255,0.10), transparent 60%),
            linear-gradient(180deg, #04060a 0%, #06080d 60%, #06080d 100%);
          color:var(--text);
          padding:20px;
        }

        .chat-container{
          width:min(900px,95vw);
          height:min(82vh,820px);
          border-radius:18px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)) padding-box, var(--panel);
          border:1px solid var(--border);
          box-shadow: var(--shadow), 0 0 24px rgba(0,229,255,0.18), 0 0 24px rgba(154,107,255,0.16) inset;
          overflow:hidden;
          position:relative;
        }

        .neon-outline::before{
          content:"";
          position:absolute; inset:0;
          border-radius:18px;
          padding:1px;
          background:linear-gradient(135deg, rgba(0,229,255,0.35), rgba(154,107,255,0.35));
          -webkit-mask:
            linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events:none;
        }

        .header{
          display:flex; align-items:center; gap:10px;
          padding:14px 16px;
          background: rgba(8,12,20,0.85);
          backdrop-filter: blur(16px) saturate(120%);
          -webkit-backdrop-filter: blur(16px) saturate(120%);
          border-bottom:1px solid var(--border);
          position:relative;
          z-index:2;
        }
        .dot{width:10px; height:10px; border-radius:50%;}
        .dot-cyan{ background:var(--cyan); box-shadow:0 0 10px rgba(0,229,255,0.85);}
        .dot-purple{ background:var(--purple); box-shadow:0 0 10px rgba(154,107,255,0.85);}
        .title{ margin-left:6px; font-weight:600; letter-spacing:0.3px; color:var(--text);}

        .chat-box{
          height:100%;
          overflow:auto;
          padding:18px;
          display:flex; flex-direction:column; gap:12px;
          position:relative;
          z-index:2;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0)),
            radial-gradient(1200px 800px at 50% 0%, rgba(0,229,255,0.06), transparent 65%),
            radial-gradient(1100px 800px at 50% 100%, rgba(154,107,255,0.06), transparent 65%),
            var(--panel);
        }

        .message{
          max-width:84%;
          padding:12px 14px;
          border-radius:14px;
          line-height:1.35;
          color:var(--text);
          border:1px solid rgba(255,255,255,0.16);
          background: var(--glass);
          backdrop-filter: blur(18px) saturate(140%);
          -webkit-backdrop-filter: blur(18px) saturate(140%);
          text-shadow: 0 0 6px rgba(0, 229, 255, 0.18);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 10px 28px rgba(0,0,0,0.45);
        }
        .message.bot{
          align-self:flex-start;
          border-left:2px solid rgba(0,229,255,0.6);
        }
        .message.user{
          align-self:flex-end;
          background: linear-gradient(135deg, rgba(21,255,200,0.16), rgba(0,229,255,0.12));
          border:1px solid rgba(21,255,200,0.55);
          box-shadow: 0 0 18px rgba(21,255,200,0.2), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        .options, .feedback, .input-box{
          display:flex; gap:10px; flex-wrap:wrap; margin-top:8px;
          position:relative; z-index:3;
        }

        .btn{
          padding:10px 14px;
          border-radius:12px;
          color:var(--text);
          background: rgba(20,26,40,0.8);
          border:1px solid rgba(255,255,255,0.18);
          cursor:pointer;
          transition: transform 0.18s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          height:50px;
          width:200px;
          text-shadow: 0 0 6px rgba(0,229,255,0.22);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 0 12px rgba(0,229,255,0.16);
          white-space: nowrap;
        }
        .btn:hover{
          transform: translateY(-1px);
          border-color: rgba(0,229,255,0.65);
          background: rgba(26,32,52,0.9);
          box-shadow: 0 0 18px rgba(0,229,255,0.28), 0 6px 18px rgba(0,0,0,0.35);
        }
        .btn:focus-visible{
          outline:none;
          box-shadow: 0 0 0 3px rgba(0,229,255,0.28), 0 0 18px rgba(154,107,255,0.22);
        }
        .btn.success{ border-color: rgba(21,255,200,0.6); box-shadow:0 0 12px rgba(21,255,200,0.24); }
        .btn.danger{ border-color: rgba(255,85,119,0.6); box-shadow:0 0 12px rgba(255,85,119,0.24); }

        .input-box input{
          flex:1; min-width:240px;
          padding:10px 12px;
          border-radius:12px;
          border:1px solid rgba(255,255,255,0.18);
          background: rgba(8,12,20,0.82);
          color:var(--text);
          outline:none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .input-box input::placeholder{ color:var(--muted); }
        .input-box input:focus{
          border-color: rgba(0,229,255,0.7);
          box-shadow: 0 0 0 3px rgba(0,229,255,0.16), 0 0 16px rgba(154,107,255,0.16);
        }

        /* Scrollbar */
        .chat-box::-webkit-scrollbar{ width:10px; }
        .chat-box::-webkit-scrollbar-track{ background: rgba(255,255,255,0.06); border-radius:10px; }
        .chat-box::-webkit-scrollbar-thumb{
          background: linear-gradient(180deg, rgba(0,229,255,0.75), rgba(154,107,255,0.75));
          border-radius:10px; border:2px solid rgba(6,8,13,0.7);
          box-shadow: 0 0 10px rgba(0,229,255,0.35), 0 0 18px rgba(154,107,255,0.28);
        }

        @media (prefers-reduced-motion: reduce){
          * { animation: none !important; transition: none !important; }
        }

        @media (max-width:640px){
          .message{ max-width:92%; }
          .chat-container{ height:86vh; }
        }
      `}</style>
    </div>
  );
}
