import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { marked } from "marked";
import { gsap } from "gsap";
import Navbar from "../Navbar";

const ChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  // voice input
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // upload UI state
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Refs
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const headRef = useRef(null);
  const inputRef = useRef(null);
  const ctaRef = useRef(null);
  const uploadRef = useRef(null);
  const boxRef = useRef(null);
  const tlRef = useRef(null);
  const hiddenFileInputRef = useRef(null);

  // voice input
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN"; // change to "hi-IN" for Hindi
    recognition.continuous = false;
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
      sendMessage(transcript); // auto send after voice input
      setIsListening(false);
    };

    recognition.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setIsListening(false);
    };
  }, []);

  // Professional, lightweight entrance animation
  useLayoutEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) {
      gsap.set(rootRef.current, { opacity: 1 });
      gsap.set(
        [
          cardRef.current,
          headRef.current,
          inputRef.current,
          ctaRef.current,
          uploadRef.current,
          boxRef.current,
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
        }
      );
      return;
    }

    const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
    tlRef.current = tl;

    gsap.set(rootRef.current, { opacity: 0 });
    gsap.set(cardRef.current, { opacity: 0, y: 14, scale: 0.985, transformOrigin: "50% 50%" });
    gsap.set(
      [headRef.current, inputRef.current, ctaRef.current, uploadRef.current, boxRef.current],
      { opacity: 0, y: 14 }
    );

    tl.to(rootRef.current, { opacity: 1 })
      .to(cardRef.current, { opacity: 1, y: 0, scale: 1 }, "-=0.2")
      .to(headRef.current, { opacity: 1, y: 0 }, "-=0.25")
      .to(inputRef.current, { opacity: 1, y: 0 }, "-=0.2")
      .to(ctaRef.current, { opacity: 1, y: 0 }, "-=0.15")
      .to(uploadRef.current, { opacity: 1, y: 0 }, "-=0.15")
      .to(boxRef.current, { opacity: 1, y: 0 }, "-=0.15");

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  // message sending (kept same, but allow param for voice auto-send)
  const sendMessage = async (presetText) => {
    const text = typeof presetText === "string" ? presetText : userInput;
    if (!text.trim()) {
      setResponse("Please enter a message.");
      return;
    }
    setResponse("Loading...");
    try {
      const res = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const markdownText = data.answer || "No response received.";
      // Note: marked does not sanitize; consider DOMPurify in real apps.
      setResponse(marked.parse(markdownText));
      setUserInput("");
    } catch (error) {
      setResponse("Error: " + error.message);
    }
  };

  // helpers
  const humanFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const handleSelectFile = (file) => {
    if (!file) return;
    // accept only .pdf, .docx, .txt (matches the server expectation)
    const allowed = ["application/pdf", 
                     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                     "text/plain"];
    // Some browsers rely on name extension checks for docx
    const nameOk = /\.pdf$|\.docx$|\.txt$/i.test(file.name);
    if (!allowed.includes(file.type) && !nameOk) {
      setResponse("❌ Unsupported file type. Please upload .pdf, .docx, or .txt");
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      setResponse("Please choose a file before uploading.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsUploading(true);
      setResponse("Uploading file...");
      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(`✅ File uploaded successfully! Preview:\n${data.preview}`);
      } else {
        setResponse(`❌ Upload failed: ${data.error}`);
      }
    } catch (e) {
      setResponse(`❌ Upload failed: ${e.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className="min-h-svh grid place-items-center bg-[#0b0f1a] px-4 will-change-transform"
    >
      <Navbar />
      <main
        ref={cardRef}
        className="relative w-[min(720px,96vw)] overflow-visible
                   rounded-[16px] p-6 md:p-8
                   bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))]
                   border border-white/10 backdrop-blur-[8px]
                   shadow-[0_8px_30px_rgba(2,6,23,0.45)]"
      >
        {/* Subtle neon edges */}
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-[16px] opacity-30"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, #00ffe733, #ff00cc33, #7c3aed33, #00ffe733)",
          }}
        />

        {/* Header */}
        <header ref={headRef} className="flex items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div
              className="grid place-items-center w-12 h-12 rounded-[10px]
                         bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]
                         border border-white/15"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="6" fill="url(#gcb)" />
                <defs>
                  <linearGradient id="gcb" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#7c5cff" />
                    <stop offset="1" stopColor="#2bd2ff" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <h1 className="text-[20px] leading-tight text-white">Keyboard Bot</h1>
              <p className="text-[12px] text-white/70">AI powered chat</p>
            </div>
          </div>
        </header>

        {/* Text input */}
        <div ref={inputRef} className="mb-3">
          <input
            type="text"
            placeholder="Enter your question"
            className="w-full px-4 py-3 rounded-[10px]
                       bg-[#0b0f1a]/60 text-white placeholder-white/50
                       border border-white/10 focus:outline-none focus:ring-2 focus:ring-[#00ffe7]/60
                       focus:border-[#00ffe7]/50
                       shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
                       transition-[box-shadow,border,transform] duration-200
                       will-change-transform"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
        </div>

        {/* CTA + Mic */}
        <div ref={ctaRef} className="flex flex-col items-start space-y-2">
          <div className="flex items-center">
            <button
              onClick={() => sendMessage()}
              className="px-5 py-3 rounded-[10px] font-semibold text-sm text-white
                         bg-[linear-gradient(110deg,_#00ffe7_0%,_#7c3aed_50%,_#ff00cc_100%)]
                         hover:bg-[linear-gradient(110deg,_#ff00cc_0%,_#7c3aed_50%,_#00ffe7_100%)]
                         transition-transform duration-200 active:scale-[0.99]
                         ring-1 ring-white/15 hover:text-white"
            >
              Ask!
            </button>

            {/* Mic button */}
            <button
              onClick={() => {
                if (!recognitionRef.current) return;
                if (isListening) {
                  recognitionRef.current.stop();
                  setIsListening(false);
                } else {
                  recognitionRef.current.start();
                  setIsListening(true);
                }
              }}
              className={`ml-3 px-4 py-3 rounded-[10px] text-white font-semibold text-sm
                          transition-all duration-300 transform
                          ${
                            isListening
                              ? "bg-red-600 hover:bg-red-700 shadow-[0_0_15px_3px_rgba(255,0,0,0.5)] scale-105"
                              : "bg-blue-600 hover:bg-blue-700 shadow-[0_0_0_0_rgba(0,0,0,0)]"
                          }`}
            >
              {isListening ? "🛑 Stop" : "🎤 Speak"}
            </button>
          </div>

          {/* Listening indicator */}
          {isListening && (
            <p className="text-white/60 text-sm animate-pulse">🎧 Listening...</p>
          )}
        </div>

        {/* Redesigned Upload Section */}
        <section
          ref={uploadRef}
          className="mt-4"
          aria-label="File upload"
        >
          {/* Dropzone container */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              handleSelectFile(file);
            }}
            className={[
              "group relative w-full rounded-[12px] p-4 md:p-5",
              "bg-[#0b0f1a]/55 backdrop-blur-[8px]",
              "border border-white/10",
              "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
              "transition-colors duration-200",
              isDragging ? "ring-2 ring-[#00ffe7]/60 border-[#00ffe7]/50" : "",
            ].join(" ")}
          >
            {/* subtle gradient edge */}
            <div
              className="pointer-events-none absolute -inset-px rounded-[12px] opacity-25"
              style={{
                background:
                  "linear-gradient(120deg, rgba(124,58,237,0.25), rgba(0,255,231,0.18), rgba(255,0,204,0.18))",
                mask: "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                WebkitMask:
                  "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
              }}
            />

            {/* Content */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 relative">
              <div className="flex items-center gap-3">
                <div
                  className="grid place-items-center w-10 h-10 rounded-[10px]
                             bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]
                             border border-white/15"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className={isDragging ? "animate-pulse" : ""}
                  >
                    <path
                      d="M12 3v12m0 0l-4-4m4 4l4-4M4 17h16"
                      stroke="url(#gup)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient id="gup" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#00ffe7" />
                        <stop offset="1" stopColor="#ff00cc" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="text-white">
                  <p className="text-sm">
                    Drag and drop file here, or choose from device
                  </p>
                  <p className="text-[12px] text-white/60">
                    Allowed: .pdf, .docx, .txt • Max ~25MB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Hidden input */}
                <input
                  ref={hiddenFileInputRef}
                  type="file"
                  accept=".pdf,.docx,.txt"
                  className="hidden"
                  onChange={(e) => handleSelectFile(e.target.files?.[0])}
                />

                {/* Choose file (styled native file input pattern available in Tailwind v3+) */}
                <button
                  type="button"
                  onClick={() => hiddenFileInputRef.current?.click()}
                  className="px-4 py-2 rounded-[10px] text-white text-sm font-semibold
                             bg-[linear-gradient(110deg,_#00ffe7_0%,_#7c3aed_50%,_#ff00cc_100%)]
                             hover:bg-[linear-gradient(110deg,_#ff00cc_0%,_#7c3aed_50%,_#00ffe7_100%)]
                             ring-1 ring-white/15 transition-transform active:scale-[0.99]"
                >
                  Choose file
                </button>

                {/* Upload */}
                <button
                  type="button"
                  onClick={uploadFile}
                  disabled={!selectedFile || isUploading}
                  className={`px-4 py-2 rounded-[10px] text-white text-sm font-semibold
                              border border-white/10 bg-white/5 backdrop-blur
                              hover:bg-white/10 transition-colors
                              ${(!selectedFile || isUploading) ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  {isUploading ? "Uploading…" : "Upload"}
                </button>
              </div>
            </div>

            {/* Selected file info */}
            <div className="mt-3 text-white/80 text-sm">
              {selectedFile ? (
                <div className="flex items-center justify-between">
                  <span className="truncate">{selectedFile.name}</span>
                  <span className="ml-3 shrink-0 text-white/60">
                    {humanFileSize(selectedFile.size)}
                  </span>
                </div>
              ) : (
                <span className="text-white/50">No file selected</span>
              )}
            </div>
          </div>
        </section>

        {/* Response box (scrollable) */}
        <div
          ref={boxRef}
          className="mt-5 p-4 min-h-[90px] rounded-[12px]
                     bg-[#0b0f1a]/55 backdrop-blur-[6px]
                     border border-white/10
                     shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
                     text-white leading-relaxed text-[15px]
                     max-h-[60vh] overflow-y-auto overscroll-contain break-words
                     [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                     will-change-transform"
          dangerouslySetInnerHTML={{ __html: response }}
        />

        {/* Separator */}
        <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </main>
    </div>
  );
};

export default ChatBot;
