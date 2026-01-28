import { useEffect, useState } from "react";

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

const SLIDES = [
  "/images/slideimg1.png",
  "/images/slideimg2.png",
  "/images/slideimg3.png",
  "/images/slideimg4.png",
];
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export default function GGVHome() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="w-full bg-white text-black min-h-screen ">
      {/*  TOP DECORATIVE BAR  */}
      <div className="bg-gradient-to-r from-teal-500 via-blue-600 to-teal-500 h-1"></div>

      {/*  HEADER  */}
      <header
        className="relative bg-white border-b border-gray-300 overflow-hidden"
        style={{ height: window.innerWidth >= 768 ? "110px" : "auto" }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex justify-between gap-8 ">
          {/* LEFT LOGO */}
          <div className="flex-shrink-0 pt-1">
            <img
              src="/images/logo.png"
              alt="GGV Logo"
              style={{
                height: "88px",
                width: "88px",
                objectFit: "contain",
                paddingLeft: "50px",
                marginTop: "auto",
              }}
            />
          </div>

          {/* CENTER TEXT */}
          <div className=" flex-1 text-left scale-[0.95]">
            <h1
              style={{
                fontFamily: "Noto Sans Devanagari, serif",
                fontSize: "20px",
                fontWeight: 800,
                lineHeight: "1.15",
                marginBottom: "2px",
                color: "#1f2937",
              }}
            >
              गुरु घासीदास विश्वविद्यालय, बिलासपुर
            </h1>
            <h2
              style={{
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "0.5",
                marginBottom: "2px",
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
                marginBottom: "2px",
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
          <p
            style={{
              position: "absolute",
              left: "55%",
              transform: "translateX(-50%)",
              top: "18px",

              fontFamily: "'Dancing Script', cursive",
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
        </div>
        <div
          style={{
            position: window.innerWidth < 768 ? "static" : "absolute",
            right: window.innerWidth < 768 ? "auto" : "10px",
            top: window.innerWidth < 768 ? "auto" : "50%",
            transform:
              window.innerWidth < 768 ? "none" : "translateY(-50%) scale(0.4)",
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: window.innerWidth < 768 ? "8px" : "0",
          }}
        >
          <img src="/images/babaji.png" style={{ height: "150px" }} />
          <img src="/images/NAACA.png" style={{ height: "150px" }} />
          <img src="/images/vba.png" style={{ height: "150px" }} />
        </div>
      </header>

      {/* NAVBAR SWITCHER */}
      {isMobile ? (
        /*  MOBILE NAVBAR  */
        <nav
          className="sticky top-0 z-50"
          style={{ backgroundColor: "#1e5a73" }}
        >
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
          className="sticky top-0 z-50 border-b border-gray-300"
          style={{ backgroundColor: "#1e5a73" }}
        >
          <div className="max-w-7xl mx-auto">
            <ul className="flex items-center px-6 text-sm font-medium list-none">
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

      {/*  SLIDER  */}
      <section className="max-w-7xl mx-auto px-4 mt-0 pt-0">
        <div className="relative overflow-hidden">
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

          {/* Slide Indicators */}
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

      {/*  MARQUEE  */}
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
          {/* DISCLAIMER HEADING */}
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

          {/* NOTICE AREA */}
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

      {/* Custom Marquee Animation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Our Project Info Section */}
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

            {/* CONTENT */}
            <p
              style={{
                fontSize: "14.5px",
                lineHeight: "1.7",
                color: "#374151",
                marginBottom: "10px",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </section>
      {/* Mid section */}
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
          <div
            style={{
              width: "100%",
              height: "55vh",
              minHeight: "400px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              backgroundImage: "url('/images/mid.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          <div
            style={{
              width: "100%",
              height: "50vh",
              minHeight: "420px",
              // borderRadius: "12px",
              overflow: "hidden",
              backgroundImage: "url('/images/mid1.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
        <div
          style={{
            width: "100%",
            height: "40vh",
            minHeight: "300px",
            // borderRadius: "12px",
            overflow: "hidden",
            backgroundImage: "url('/images/mid3.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      </section>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#0f172a",
          color: "#e5e7eb",
          marginTop: "60px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "50vh",
            minHeight: "350px",
            // borderRadius: "12px",
            overflow: "hidden",
            backgroundImage: "url('/images/mid2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
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
              style={{ fontSize: "13px", lineHeight: "1.6", color: "#cbd5f5" }}
            >
              A Central University established by the Central Universities Act,
              2009. Bilaspur, Chhattisgarh, India.
            </p>
          </div>

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
              style={{ fontSize: "13px", lineHeight: "1.6", color: "#cbd5f5" }}
            >
              Bilaspur, Chhattisgarh
              <br />
              Phone: 07752 - 260209
              <br />
              Email: centraluniv@ggu.ac.in
            </p>
          </div>
        </div>

        {/* FOOTER BOTTOM BAR */}
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
    </div>
  );
}
