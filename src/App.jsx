import { useState } from "react";
import { MotionConfig, color, motion } from "framer-motion";
import {
  PlayCircle,
  Instagram,
  Youtube,
  Music2,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSuccess, showError, showWarning } from "./helpers/statusChange";
import logo from "./assets/logo.png";
import producerSideScreen from "./assets/Upload-a-gig.png";
import payForASlotScreen from "./assets/Pay-for-a-Slot.png";
import setClipsFeedScreen from "./assets/SetClips-Feed.png";

function Button({ style = {}, asChild = false, ...props }) {
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px var(--space-md)",
    borderRadius: "var(--space-sm)",
    fontWeight: 500,
    fontSize: "1rem",
    transition: "all 0.3s ease",
    cursor: "pointer",
    color: "white",
    textDecoration: "none",
    ...style,
  };
  if (asChild) {
    const child = props.children;
    return (
      <child.type
        {...child.props}
        style={{ ...baseStyle, ...child.props.style }}
      >
        {child.props.children}
      </child.type>
    );
  }
  return <button {...props} style={baseStyle} />;
}

function Card({ style = {}, children }) {
  const baseStyle = {
    borderRadius: "var(--space-md)",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(17,17,17,0.5)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
    ...style,
  };
  return <div style={baseStyle}>{children}</div>;
}

function CardContent({ style = {}, children }) {
  return <div style={style}>{children}</div>;
}

function Bullet({ text, icon }) {
  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
      <div
        style={{
          marginTop: "4px",
          height: "20px",
          width: "20px",
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
        }}
      >
        {icon ?? (
          <span
            style={{
              display: "block",
              height: "8px",
              width: "8px",
              borderRadius: "50%",
              background: "white",
            }}
          />
        )}
      </div>
      <div style={{ lineHeight: 1.5, color: "rgba(255,255,255,0.7)" }}>
        {text}
      </div>
    </li>
  );
}

function FaqItem({ q, a }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.1)",
        background: isOpen ? "rgba(0,0,0,0.4)" : "var(--background-color)",
        padding: "20px",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "1.125rem",
          fontWeight: 600,
          color: "var(--primary-color)",
        }}
      >
        <span>{q}</span>

        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ height: "20px", width: "20px" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </div>

      {isOpen && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          style={{
            marginTop: "24px",
            color: "var(--secondary-color)",
            overflow: "hidden",
            marginBottom: 0,
            cursor: "pointer",
          }}
        >
          {a}
        </motion.p>
      )}
    </div>
  );
}

function SmartImage({ title, candidates }) {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const src = candidates[Math.min(idx, candidates.length - 1)];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {!loaded && (
        <div
          style={{
            height: "100%",
            width: "100%",
            background: "#1f2937",
            animation: "pulse 2s infinite",
          }}
          aria-hidden
        />
      )}
      <img
        src={src}
        alt={title}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setIdx((i) => Math.min(i + 1, candidates.length - 1))}
      />
    </div>
  );
}

function PhoneFrame({ title, imageSrc }) {
  return (
    <motion.div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
      }}
      whileHover={{ y: -6 }}
    >
      <div
        style={{
          position: "relative",
          width: "280px",
          height: "560px",
          borderRadius: "36px",
          border: "8px solid #1f2937",
          background: "#101212",
          boxShadow: "0 20px 80px rgba(59,130,246,0.25)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "var(--space-sm)",
            borderRadius: "28px",
            overflow: "hidden",
          }}
        >
          <SmartImage title={title} candidates={[imageSrc]} />
        </div>
      </div>
      <span
        style={{
          marginTop: "12px",
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {title}
      </span>
    </motion.div>
  );
}

function DemoCard({ label, description, src, poster }) {
  return (
    <Card
      style={{
        borderRadius: "var(--space-md)",
        backgroundColor: "var(--background-color)",
        boxShadow: "0 20px 80px rgba(59,130,246,0.25)",
      }}
    >
      <CardContent style={{ padding: "var(--space-md)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--primary-color)",
            }}
          >
            {label}
          </h3>
          <PlayCircle style={{ height: "24px", width: "24px", opacity: 0.7 }} />
        </div>
        <p
          style={{
            color: "var(--secondary-color)",
            marginBottom: "var(--space-sm)",
          }}
        >
          {description}
        </p>
        <video
          style={{
            borderRadius: "var(--space-sm)",
            border: "4px solid #1f2937",
            width: "100%",
          }}
          controls
          poster={poster}
        >
          <source src={src} type="video/mp4" />
        </video>
      </CardContent>
    </Card>
  );
}

function HowList({ title, items }) {
  return (
    <div>
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: 600,
          marginBottom: "var(--space-md)",
          color: "var(--primary-color)",
        }}
      >
        {title}
      </h3>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
        }}
      >
        {items.map(([strong, details, icon], i) => (
          <Bullet
            key={i}
            text={
              <>
                <strong>{strong}:</strong> {details}
              </>
            }
            icon={icon}
          />
        ))}
      </ul>
    </div>
  );
}

function Overlay({ isOpen, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 0.8 : 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#101012",
        zIndex: 9,
        pointerEvents: isOpen ? "auto" : "none",
      }}
      onClick={onClose}
    />
  );
}

function BurgerMenu({ isOpen, onClose, scrollToSection }) {
  const links = [
    { label: "Home", id: "hero" },
    { label: "See How It Works", id: "see-how" },
    { label: "How It Works", id: "how-it-works" },
    { label: "FAQ", id: "faq" },
    { label: "Waitlist", id: "waitlist" },
  ];
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.3 }}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "260px",
        height: "100%",
        background: "var(--background-color)",
        borderLeft: "2px solid rgba(255,255,255,0.1)",
        padding: "24px 20px",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        onClick={onClose}
        style={{
          alignSelf: "flex-end",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        <X size={22} />
      </button>
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => {
            scrollToSection(link.id);
            onClose();
          }}
          style={{
            background: "none",
            border: "none",
            padding: "12px",
            color: "var(--primary-color)",
            fontSize: "1.05rem",
            textAlign: "left",
            cursor: "pointer",
            transition: "background 0.25s, color 0.25s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--background-color-alt)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
        >
          {link.label}
        </button>
      ))}
    </motion.div>
  );
}

function WaitlistForm() {
  const [loading, setLoading] = useState(false);

  const SHEETDB_URL = "https://sheetdb.io/api/v1/gindb9ovdf5dp";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email").trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const searchRes = await fetch(
        `${SHEETDB_URL}/search?email=${encodeURIComponent(email)}`
      );
      const searchData = await searchRes.json();

      if (searchData.length > 0) {
        showWarning("This email is already on the waitlist.");
        setLoading(false);
        return;
      }

      const addRes = await fetch(SHEETDB_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              email: email,
              date: new Date().toISOString(),
            },
          ],
        }),
      });

      if (addRes.ok) {
        showSuccess("Thanks! You've been added to the waitlist.");
        e.target.reset();
      } else {
        showError("Oops! Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      showError("Network error. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "var(--space-xs)",
          flexWrap: "nowrap",
        }}
      >
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          style={{
            flex: "1 1 auto",
            padding: "12px",
            borderRadius: "12px",
            border: "none",
            color: "white",
            background: "var(--background-color-alt)",
            fontSize: "1rem",
            minWidth: "0",
          }}
        />
        <Button
          style={{
            padding: "var(--space-xs) var(--space-md)",
            fontSize: "0.9rem",
            flex: "0 0 auto",
          }}
          id="blueButton"
          type="submit"
          disabled={loading}
        >
          {loading ? "Joining..." : "Join"}
        </Button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default function SetPlayLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "var(--space-sm)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          zIndex: 10,
        }}
      >
        <img src={logo} alt="SetPlay Logo" style={{ height: "40px" }} />
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          <Menu size={22} />
        </button>
      </header>

      <Overlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <BurgerMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        scrollToSection={scrollToSection}
      />

      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          fontFamily: "sans-serif",
          backgroundColor: "#101212",
          color: "white",
        }}
      >
        <div
          style={{
            pointerEvents: "none",
            position: "fixed",
            inset: 0,
            zIndex: -10,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: "-100px",
              left: "-100px",
              height: "420px",
              width: "420px",
              borderRadius: "50%",
              filter: "blur(100px)",
              background:
                "radial-gradient(circle, rgba(37,99,235,0.6), transparent 60%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 2.2, delay: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: "-100px",
              right: "-100px",
              height: "420px",
              width: "420px",
              borderRadius: "50%",
              filter: "blur(100px)",
              background:
                "radial-gradient(circle, rgba(16,185,129,0.55), transparent 60%)",
            }}
          />
        </div>

        <main>
          <section
            id="hero"
            style={{
              textAlign: "center",
              padding: "9.375em var(--space-md) 4.68rem",
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: "3rem",
                fontWeight: 800,
                marginBottom: "var(--space-sm)",
                marginTop: "var(--space-md)",
                color: "var(--primary-color)",
                lineHeight: 1.07143,
                letterSpacing: "-.005em",
              }}
            >
              Music is connection. SetPlay makes it real.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                fontSize: "1.5rem",
                color: "var(--secondary-color)",
                marginBottom: "40px",
                lineHeight: 1.14286,
                letterSpacing: ".007em",
              }}
            >
              Connect and grow in a trusted ecosystem for DJs and Producers.
            </motion.p>

            <motion.div
              style={{
                display: "flex",
                gap: "var(--space-sm)",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button asChild>
                <a
                  id="blueButton"
                  href="#"
                  onClick={() => alert("Not ready yet :(")}
                >
                  Download on App Store
                </a>
              </Button>
              <Button asChild>
                <a
                  id="greenButton"
                  href="#"
                  onClick={() => alert("Not ready yet :(")}
                >
                  Get it on Google Play
                </a>
              </Button>
            </motion.div>

            <motion.nav
              style={{
                marginTop: "var(--space-lg)",
                display: "flex",
                justifyContent: "center",
                gap: "var(--space-md)",
              }}
            >
              <a
                href="https://instagram.com/SetPlay.app"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Instagram
                  style={{
                    height: "24px",
                    width: "24px",
                  }}
                />
              </a>
              <a
                href="https://tiktok.com/@SetPlay.app"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Music2 style={{ height: "24px", width: "24px" }} />
              </a>
              <a
                href="https://youtube.com/@SetPlay-app"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                }}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Youtube style={{ height: "28px", width: "28px" }} />
              </a>
            </motion.nav>
          </section>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--space-lg)",
              maxWidth: "1000px",
              margin: "0 auto",
              padding: "var(--space-lg)",
            }}
          >
            <PhoneFrame title="Upload a Gig" imageSrc={producerSideScreen} />
            <PhoneFrame title="Pay for a Slot" imageSrc={payForASlotScreen} />
            <PhoneFrame title="SetClips Feed" imageSrc={setClipsFeedScreen} />
          </div>

          <section
            id="see-how"
            style={{
              padding: "9.375em var(--space-md)",
              background:
                "linear-gradient(to top, var(--background-color-alt), var(--background-color))",
              alignContent: "center",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "var(--space-xl)",
                color: "var(--primary-color)",
                lineHeight: 1.07143,
                letterSpacing: "-.005em",
              }}
            >
              See How It Works
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "40px",
                maxWidth: "1200px",
                margin: "0 auto",
              }}
            >
              <DemoCard
                label="For DJs"
                description="Upload your gig, play tracks, record the crowd, and get paid."
                src="/videos/dj-demo.mp4"
                poster="/videos/dj-poster.jpg"
              />
              <DemoCard
                label="For Producers"
                description="Submit your track, get played live, and receive verified proof of play."
                src="/videos/producer-demo.mp4"
                poster="/videos/producer-poster.jpg"
              />
            </div>
          </section>

          <section
            id="how-it-works"
            style={{
              padding: "var(--space-xxl) var(--space-md)",
              background:
                "linear-gradient(to top, var(--background-color), var(--background-color-alt))",
              alignContent: "center",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "var(--space-xl)",
                color: "var(--primary-color)",
                lineHeight: 1.07143,
                letterSpacing: "-.005em",
              }}
            >
              How It Works
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "var(--space-xl)",
                maxWidth: "1200px",
                margin: "0 auto",
              }}
            >
              <HowList
                title="For DJs"
                items={[
                  [
                    "Create or Accept a Gig",
                    "Upload gig details and review producer submissions.",
                  ],
                  [
                    "Play & Record",
                    "Record your set through SetPlay's in-app recording system.",
                  ],
                  [
                    "Verification & Payment",
                    "Submit your recording and get paid once verified.",
                    <ShieldCheck />,
                  ],
                  [
                    "Grow Your Audience",
                    "Use SetClips to showcase your gigs and attract fans.",
                  ],
                ]}
              />
              <HowList
                title="For Producers"
                items={[
                  [
                    "Submit Your Track",
                    "Browse gigs and send your track to DJs you like.",
                  ],
                  [
                    "Get Selected & Played",
                    "Pay the DJ's fee to feature your track.",
                  ],
                  [
                    "Verified & Secure Payment",
                    "Get proof your song was played before funds are released.",
                    <ShieldCheck />,
                  ],
                  [
                    "Build Recognition",
                    "Share SetClips to market your track and attract new opportunities.",
                  ],
                ]}
              />
            </div>
          </section>

          <section
            id="faq"
            style={{
              padding: "var(--space-xxl) var(--space-md)",
              background:
                "linear-gradient(to top, var(--background-color-alt), var(--background-color))",
              alignContent: "center",
            }}
          >
            <h2
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                textAlign: "center",
                marginBottom: "var(--space-xl)",
                lineHeight: 1.07143,
                letterSpacing: "-.005em",
              }}
            >
              FAQ
            </h2>
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-sm)",
              }}
            >
              <FaqItem
                q="What is SetPlay?"
                a="SetPlay is where DJs and producers connect. DJs get paid to play new tracks, and producers get verified proof their music is moving crowds."
              />
              <FaqItem
                q="How do DJs get paid?"
                a="When a DJ plays and uploads a verified clip, funds are automatically released to their account."
              />
              <FaqItem
                q="How do producers know their tracks are safe?"
                a="Every submission and play is verified through SetPlay’s system, ensuring transparency and trust."
              />
              <FaqItem
                q="Is my payment secure?"
                a="All transactions are handled through trusted payment providers and securely held until verification."
              />
            </div>
          </section>

          <section
            id="waitlist"
            style={{
              padding: "var(--space-xxl) var(--space-md)",
              background:
                "linear-gradient(to top, var(--background-color), var(--background-color-alt))",
            }}
          >
            <div
              style={{
                maxWidth: "600px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  marginBottom: "var(--space-md)",
                  color: "var(--primary-color)",
                  lineHeight: 1.07143,
                  letterSpacing: "-.005em",
                }}
              >
                Join the Waitlist
              </h2>
              <p
                style={{
                  color: "var(--secondary-color)",
                  marginBottom: "var(--space-lg)",
                  lineHeight: 1.14286,
                  letterSpacing: ".007em",
                }}
              >
                Be among the first to experience SetPlay. Sign up below to join
                our exclusive beta list.
              </p>
              <div
                style={{
                  padding: "2px",
                  borderRadius: "var(--space-sm)",
                  background: "linear-gradient(to right, #2563eb, #059669)",
                  boxShadow: "0 20px 80px rgba(59,130,246,0.25)",
                }}
              >
                <div
                  style={{
                    borderRadius: "14px",
                    background: "var(--background-color)",
                    padding: "var(--space-xs)",
                  }}
                >
                  <WaitlistForm />
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer
          style={{
            padding: "40px",
            textAlign: "center",
            fontSize: "0.875rem",
            color: "var(--secondary-color)",
            borderTop: "2px solid rgba(255,255,255,0.1)",
            backgroundColor: "var(--background-color)",
            letterSpacing: "0.5px",
          }}
        >
          <p>© {new Date().getFullYear()} SetPlay. All rights reserved.</p>
        </footer>
      </div>
    </MotionConfig>
  );
}
