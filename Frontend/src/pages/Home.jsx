import { useEffect, useState, useRef } from "react";

/*  NAVBAR ITEMS  */

const NAV_ITEMS = [
  { name: "About Us", hasDropdown: true },
  { name: "Administration", hasDropdown: true },
  { name: "Academics", hasDropdown: true },
  { name: "Student Amenities", hasDropdown: true },
  { name: "IQAC", hasDropdown: true },
  { name: "NIRF", hasDropdown: true },
  { name: "R&D Cell", hasDropdown: false },
  { name: "Recruitment", hasDropdown: true },
  { name: "Media", hasDropdown: true },
  { name: "Admission", hasDropdown: false },
];

/*  SLIDER IMAGES  */

const SLIDES = [
  "/images/slideimg1.png",
  "/images/slideimg2.png",
  "/images/slideimg3.png",
  "/images/slideimg4.png",
];

/*  SCROLL TO TOP  */

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/* CHAT HEADER COMPONENT */
const ChatHeader = ({ setChatBoxOpen, setRoboButton }) => {
  return (
    <div className="bg-white rounded-t-3xl">
      <div className="text-black px-4 py-3 border-b-2">
        <div className="flex justify-between px-2">
          {/* Left side: Logo + Title */}
          <div className="flex gap-2">
            <img
              className="w-9 object-cover"
              src="https://gyaanarth.com/wp-content/uploads/2022/07/Guru-Ghasidas-Vishwavidyalaya.logo_-1024x1024.jpg"
              alt="GGV Logo"
            />
            <div>
              <h3 className="text-lg font-semibold mt-1">GGV Dost</h3>
            </div>
          </div>

          {/* Close button */}
          <div className="flex gap-3 mt-2 bg-[#f2ceca] rounded-full w-6 h-6 justify-center items-center">
            <svg
              onClick={() => {
                // Close chatbot and show robot button again
                setChatBoxOpen(false);
                setRoboButton(false);
              }}
              className="w-3 h-3 text-[#a45148] rounded-full cursor-pointer"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/* CHAT BOX COMPONENT
   Handles messages, API calls, typing UI */
const ChatBox = ({ setChatBoxOpen, ChatBoxOpen, setRoboButton }) => {
  // User input text
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [typingDone, setTypingDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollToAns = useRef();

  /* -------- TEXT FORMATTER -------- */

  const formatText = (text) => {
    return text.split("\n").map((line, i) => {
      const boldMatch = line.match(/^\s*[•*]\s*\*\*(.+?):\*\*\s*(.*)/);

      if (boldMatch) {
        return (
          <div key={i} className="mt-2">
            <span className="font-bold">{boldMatch[1]}:</span>{" "}
            <span>{boldMatch[2]}</span>
          </div>
        );
      }

      if (line.startsWith("* ") || line.startsWith("• ")) {
        return (
          <div key={i} className="ml-3">
            • {line.replace(/^(\*|•)\s*/, "")}
          </div>
        );
      }

      if (/^\s*[*•]\s+/.test(line)) {
        return (
          <div key={i} className="ml-4 flex gap-2">
            <span>•</span> <span>{line.replace(/^\s*[*•]\s+/, "")}</span>
          </div>
        );
      }

      return <div key={i}>{line}</div>;
    });
  };

  /*  SEND MESSAGE HANDLER  */
  const handleSendMessage = async () => {
    // Do nothing if input is empty
    if (!question.trim()) return;

    const userMsg = question;

    setLoading(true);

    // Add user's message to chat
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);

    // Clear input box
    setQuestion("");

    try {
      // Send user query to FastAPI backend
      const res = await fetch(
        "https://fast-api-backend-j3dy.onrender.com/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: userMsg }),
        },
      );

      const data = await res.json();

      // Add bot response
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.answer || "No response" },
      ]);

      setLoading(false);

      // Auto-scroll after response
      setTimeout(() => {
        if (scrollToAns.current) {
          scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
        }
      }, 500);
    } catch (err) {
      console.error(err);
      setLoading(false);

      // Error fallback message
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Limit Reached: Contact Developer" },
      ]);
    }
  };

  return (
    <div className="fixed bottom-[13%] right-8 w-80 bg-gray-200 h-4/5 rounded-3xl z-[10000]">
      <ChatHeader
        setRoboButton={setRoboButton}
        setChatBoxOpen={setChatBoxOpen}
        ChatBoxOpen={ChatBoxOpen}
      />

      {/* Chat messages area */}
      <div
        ref={scrollToAns}
        className="flex flex-col overflow-y-auto no-scrollbar h-[70%] px-1"
      >
        {/* Initial typing animation */}
        {messages.length === 0 && !typingDone && (
          <div className="h-[60vh] flex items-center justify-center">
            <h1
              className="typing text-xl font-mono bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 font-semibold"
              onAnimationEnd={() => setTypingDone(true)}
            >
              GGV DOST(Data-Driven OnBoarding Support Tool)
            </h1>
          </div>
        )}

        {/* After typing ends */}
        {messages.length === 0 && typingDone && (
          <h1 className="text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-violet-700 text-2xl font-semibold mt-12">
            Feel free to ask anything about GGV
          </h1>
        )}

        {/* Render all messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl mt-2 mb-1 mx-2 ${
              msg.role === "user"
                ? "bg-purple-500 text-white ml-auto mt-2 max-w-[80%]"
                : "bg-blue-50 text-gray-900 break-words whitespace-pre-wrap w-fit"
            }`}
          >
            {formatText(msg.text)}
          </div>
        ))}

        {/* Loading indicator */}
        {loading && (
          <div className="bg-blue-50 text-gray-700 p-3 rounded-xl mx-2 mt-2 w-fit">
            Thinking...
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="text-black absolute bottom-6 bg-white border-2 border-gray-500 w-[92%] flex justify-between ml-4 py-1 px-4 rounded-xl focus-within:border-[3px] focus-within:border-purple-600 transition-all duration-200">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          className="outline-none w-full text-base font-normal text-gray-900"
          placeholder="Ask something?"
        />
        <button onClick={handleSendMessage}>
          <i className="ri-send-plane-2-line text-gray-700 text-xl"></i>
        </button>
      </div>
    </div>
  );
};

/* MAIN HOME COMPONENT */
export default function GGVHome() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Chatbot visibility
  const [ChatBoxOpen, setChatBoxOpen] = useState(false);
  const [roboButton, setRoboButton] = useState(false);

  /* -------- AUTO SLIDER -------- */
  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 4000);

    return () => clearInterval(id);
  }, []);

  /* -------- WINDOW RESIZE -------- */
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* -------- BACKEND WAKE UP -------- */
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        await fetch("https://fast-api-backend-j3dy.onrender.com/docs", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
      } catch (err) {
        console.log("Backend wake-up call:", err);
      }
    };
    wakeUpBackend();
  }, []);

  return (
    <div className="w-screen bg-white text-black min-h-screen">
      {/* TOP DECORATIVE BAR */}
      {/* Thin gradient bar shown at the very top */}
      <div className="bg-gradient-to-r from-teal-500 via-blue-600 to-teal-500 h-1"></div>

      {/*  HEADER  */}
      <header
        className="relative bg-white border-b border-gray-300 py-3"
        style={{ height: window.innerWidth >= 768 ? "110px" : "auto" }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex flex-wrap justify-between gap-8">
          {/* LEFT: University Logo */}
          <div className="flex-shrink-0 pt-1">
            <img
              src="/images/logo.png"
              alt="GGV Logo"
              style={{
                height: window.innerWidth < 768 ? "70px" : "120px",
                width: window.innerWidth < 768 ? "70px" : "120px",
                objectFit: "contain",
                paddingLeft: window.innerWidth < 768 ? "0" : "50px",
                margin: "0 auto",
              }}
            />
          </div>

          {/* CENTER: University Name */}
          <div className="flex-1 text-left scale-[0.95]">
            <h1
              style={{
                fontFamily: "Noto Sans Devanagari, serif",
                fontSize: "20px",
                fontWeight: 800,
                lineHeight: "1.15",
                marginBottom: "8px",
                color: "#1f2937",
                marginTop: "10px",
              }}
            >
              गुरु घासीदास विश्वविद्यालय, बिलासपुर
            </h1>

            <h2
              style={{
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "0.5",
                marginBottom: "8px",
                color: "#374151",
              }}
            >
              केंद्रीय विश्वविद्यालय अधिनियम 2009 संख्या 25, 2009 द्वारा
              केंद्रीय विश्वविद्यालय
            </h2>

            <h1
              style={{
                fontSize: "20px",
                fontWeight: 800,
                lineHeight: "0.5",
                marginBottom: "8px",
                color: "#1f2937",
              }}
            >
              Guru Ghasidas Vishwavidyalaya, Bilaspur
            </h1>

            <h2
              style={{
                fontSize: "11.5px",
                fontWeight: 500,
                lineHeight: "1.15",
                marginBottom: "4px",
                color: "#4b5563",
              }}
            >
              A Central University established by the Central Universities Act
              2009 No. 25 of 2009
            </h2>
          </div>

          {/* TAGLINE (centered overlay text) */}
          {!isMobile && (
            <p
              style={{
                position: window.innerHeight < 700 ? "static" : "absolute",
                marginTop: window.innerHeight < 700 ? "8px" : undefined,
                left: "55%",
                transform:
                  window.innerHeight < 700 ? "none" : "translateX(-50%)",
                top: "28px",
                fontFamily: "'Pacifico', cursive",
                fontSize: "clamp(14px, 1.6vw, 18px)",
                fontWeight: 600,
                fontStyle: "italic",
                lineHeight: "1.1",
                whiteSpace: "nowrap",
                background: "linear-gradient(90deg, #0066cc, #00cc99, #ff6600)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                pointerEvents: "none",
              }}
            >
              University with a Difference
            </p>
          )}
        </div>

        {/* RIGHT SIDE BADGES / IMAGES */}
        <div
          style={{
            position: "static",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: window.innerWidth < 768 ? "10px" : "12px",
            marginTop: "10px",
            flexWrap: "wrap",
          }}
        >
          <img
            src="/images/babaji.png"
            style={{ height: window.innerWidth < 768 ? "60px" : "150px" }}
            alt="Babaji"
          />
          <img
            src="/images/NAACA.png"
            style={{ height: window.innerWidth < 768 ? "60px" : "150px" }}
            alt="NAAC"
          />
          <img
            src="/images/vba.png"
            style={{ height: window.innerWidth < 768 ? "60px" : "150px" }}
            alt="VBA"
          />
        </div>
      </header>

      {/*  NAVBAR  */}
      {isMobile ? (
        /*  MOBILE NAVBAR  */
        <nav
          className="sticky top-0 z-40"
          style={{ backgroundColor: "#1e5a73" }}
        >
          {/* Hamburger button */}
          <div style={{ padding: "10px 16px" }}>
            <button
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Open menu"
              style={{
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "22px",
                padding: 0,
              }}
            >
              ☰
            </button>
          </div>

          {/* Mobile dropdown menu */}
          {menuOpen && (
            <div style={{ padding: "0 16px 12px" }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {NAV_ITEMS.map((item) => (
                  <li
                    key={item.name}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      color: "white",
                      padding: "10px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      ) : (
        /*  DESKTOP NAVBAR  */
        <nav
          className="sticky top-0 z-40 border-b border-gray-300"
          style={{ backgroundColor: "#1e5a73" }}
        >
          <div className="max-w-7xl mx-auto">
            <ul className="flex items-center px-6 text-sm font-medium list-none">
              {/* Home icon */}
              <li>
                <span style={{ display: "inline-block", marginRight: "16px" }}>
                  <img
                    src="/images/home.png"
                    alt="Home"
                    style={{
                      width: "20px",
                      height: "20px",
                      verticalAlign: "middle",
                      filter: "invert(1)",
                    }}
                  />
                </span>
              </li>

              {/* Navbar items */}
              {NAV_ITEMS.map((item) => (
                <li key={item.name}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px 16px",
                      marginRight: "12px",
                      cursor: "pointer",
                      color: "white",
                      fontWeight: "600",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#facc15")}
                    onMouseLeave={(e) => (e.target.style.color = "white")}
                  >
                    {item.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/*  IMAGE SLIDER  */}
      <section className="w-full px-4 mt-0 pt-0">
        <div className="relative overflow-hidden">
          {/* Sliding container */}
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {SLIDES.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Slide ${i + 1}`}
                className="w-full object-cover flex-shrink-0"
                style={{ height: window.innerWidth < 768 ? "240px" : "480px" }}
              />
            ))}
          </div>

          {/* Slide dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === active ? "bg-white w-8" : "bg-white/60 w-2.5"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/*  DISCLAIMER MARQUEE  */}
      <div
        style={{
          backgroundColor: "#1e5a73",
          overflow: "hidden",
          borderTop: "1px solid #2c6f8a",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          {/* Left label */}
          <div
            style={{
              backgroundColor: "#1e5a73",
              color: "white",
              padding: "10px 24px",
              fontWeight: "700",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              flexShrink: 0,
            }}
          >
            DISCLAIMER
          </div>

          {/* Moving text */}
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              backgroundColor: "white",
              marginLeft: "12px",
            }}
          >
            <div
              className="animate-marquee"
              style={{
                whiteSpace: "nowrap",
                padding: "10px 24px",
                color: "#ff0101ff",
                fontWeight: "700",
                fontSize: "14px",
                display: "inline-block",
              }}
            >
              ⚠️ This is not the offcial website of Guru Ghasidas
              Vishwavidyalaya ⚠️ This is not the offcial website of Guru
              Ghasidas Vishwavidyalaya ⚠️ This is not the offcial website of
              Guru Ghasidas Vishwavidyalaya ⚠️ This is not the offcial website
              of Guru Ghasidas Vishwavidyalaya
            </div>
          </div>
        </div>
      </div>

      {/*  MARQUEE STYLES  */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/*  PROJECT INFO SECTION  */}
      <section
        style={{
          backgroundColor: "#f8fafc",
          padding: "40px 0",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          {/* White info card */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "28px 32px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              borderLeft: "6px solid #1e5a73",
              borderRight: "6px solid #1e5a73",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#1e5a73",
                marginBottom: "12px",
              }}
            >
              HELLO FOLKS!!
            </h2>

            {/* Description text */}
            <p
              style={{
                fontSize: "14.5px",
                lineHeight: "1.7",
                color: "#374151",
                marginBottom: "10px",
              }}
            >
              This website is a demonstration project designed and developed by
              <b> Team Precision Pilots</b> as part of the{" "}
              <b>Hack-X Sprint 2026 </b>
              competition. The website is intended solely for presentation and
              evaluation purposes and does not represent the official website of
              Guru Ghasidas Vishwavidyalaya.
            </p>
          </div>
        </div>
      </section>

      {/*  MID IMAGE SECTIONS  */}
      <section
        style={{
          backgroundColor: "#f8fafc",
          padding: "40px 0",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "0 16px",
          }}
        >
          {/* First large image */}
          <div
            style={{
              width: "100%",
              height: "55vh",
              minHeight: "400px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              backgroundImage: "url('/images/mid.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Second image */}
          <div
            style={{
              width: "100%",
              height: "50vh",
              minHeight: "420px",
              overflow: "hidden",
              backgroundImage: "url('/images/mid1.png')",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Third full-width image */}
        <div
          style={{
            width: "100%",
            height: "40vh",
            minHeight: "300px",
            overflow: "hidden",
            backgroundImage: "url('/images/mid3.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </section>

      {/*  FOOTER  */}
      <footer
        style={{
          backgroundColor: "#0f172a",
          color: "#e5e7eb",
          marginTop: "60px",
        }}
      >
        {/* Footer banner image */}
        <div
          style={{
            width: "100%",
            height: "50vh",
            minHeight: "350px",
            overflow: "hidden",
            backgroundImage: "url('/images/mid2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Footer content grid */}
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: "40px 16px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {/* University info */}
          <div>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 700,
                marginBottom: "12px",
                color: "white",
              }}
            >
              Guru Ghasidas Vishwavidyalaya
            </h3>
            <p
              style={{
                fontSize: "13px",
                lineHeight: "1.6",
                color: "#cbd5f5",
              }}
            >
              A Central University established by the Central Universities Act,
              2009. Bilaspur, Chhattisgarh, India.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "10px",
                color: "white",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, fontSize: "13px" }}>
              <li>About Us</li>
              <li>Academics</li>
              <li>Admissions</li>
              <li>Recruitment</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4
              style={{
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: "10px",
                color: "white",
              }}
            >
              Contact
            </h4>
            <p
              style={{
                fontSize: "13px",
                lineHeight: "1.6",
                color: "#cbd5f5",
              }}
            >
              Bilaspur, Chhattisgarh
              <br />
              Phone: 07752 - 260209
              <br />
              Email: centraluniv@ggu.ac.in
            </p>
          </div>
        </div>

        {/* Footer bottom bar */}
        <div
          style={{
            borderTop: "1px solid #1e293b",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 16px",
            fontSize: "12.5px",
            color: "#94a3b8",
            maxWidth: "80rem",
            margin: "0 auto",
          }}
        >
          <span>
            © {new Date().getFullYear()} Guru Ghasidas Vishwavidyalaya. All
            rights reserved.
          </span>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            style={{
              backgroundColor: "transparent",
              border: "1px solid #334155",
              color: "#e5e7eb",
              padding: "6px 12px",
              borderRadius: "4px",
              fontSize: "12px",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#1e293b")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            ↑ Back to Top
          </button>
        </div>
      </footer>

      {/*  CHATBOT BUTTON  */}
      {!roboButton && (
        <button
          className="fixed bottom-6 right-6 z-[9999] px-4 py-2 bg-lime-400 font-semibold rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110"
          onClick={() => {
            setChatBoxOpen(true);
            setRoboButton(true);
          }}
        >
          <img src="/robo.svg" alt="icon" className="w-7 h-10" />
        </button>
      )}

      {/*  CHATBOT COMPONENT  */}
      {ChatBoxOpen && (
        <ChatBox
          setRoboButton={setRoboButton}
          setChatBoxOpen={setChatBoxOpen}
          ChatBoxOpen={ChatBoxOpen}
        />
      )}
    </div>
  );
}
