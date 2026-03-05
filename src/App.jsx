import { useState, useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSuccess, showError, showWarning } from "./helpers/statusChange";
import logo from "./assets/logo.png";
import { Headphones, Music, ShieldCheck, DollarSign } from "lucide-react";
import logoBig from "./assets/logo.png";

function SetPlayLandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const waveGroupRef = useRef(null);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);

  const SHEETDB_URL = "https://sheetdb.io/api/v1/gindb9ovdf5dp";

  useEffect(() => {
    const handleMouseMove = (e) => {
      mx.current = e.clientX;
      my.current = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);

    let animId;
    const animateCursor = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = mx.current + "px";
        cursorRef.current.style.top = my.current + "px";
      }
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = rx.current + "px";
        ringRef.current.style.top = ry.current + "px";
      }
      animId = requestAnimationFrame(animateCursor);
    };
    animateCursor();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  useEffect(() => {
    const interactives = document.querySelectorAll("a, button, input, select");
    const enter = () => {
      if (cursorRef.current)
        cursorRef.current.style.transform = "translate(-50%,-50%) scale(2.5)";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const leave = () => {
      if (cursorRef.current)
        cursorRef.current.style.transform = "translate(-50%,-50%) scale(1)";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
    });
    return () => {
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  });

  useEffect(() => {
    const handleScroll = () => {
      setNavScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wg = waveGroupRef.current;
    if (!wg) return;

    // Create lines
    for (let i = 0; i < 40; i++) {
      const x = i * 20;
      const h = 20 + Math.random() * 140;
      const y1 = 100 - h / 2;
      const y2 = 100 + h / 2;
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line",
      );
      line.setAttribute("x1", x);
      line.setAttribute("x2", x);
      line.setAttribute("y1", y1);
      line.setAttribute("y2", y2);
      line.style.opacity = 0.3 + Math.random() * 0.7;
      line.setAttribute("stroke", i % 2 === 0 ? "#2e8fff" : "#e03c3c");
      line.setAttribute("stroke-width", "1.5");
      line.setAttribute("fill", "none");
      wg.appendChild(line);
    }

    let animId;
    const animateWave = () => {
      const lines = wg.querySelectorAll("line");
      lines.forEach((line, i) => {
        const t = Date.now() / 1000;
        const h = 20 + (Math.sin(t * 2 + i * 0.4) * 0.5 + 0.5) * 140;
        const y1 = 100 - h / 2;
        const y2 = 100 + h / 2;
        line.setAttribute("y1", y1);
        line.setAttribute("y2", y2);
      });
      animId = requestAnimationFrame(animateWave);
    };
    animateWave();

    return () => cancelAnimationFrame(animId);
  }, []);

  const handleWaitlist = async () => {
    const trimmedEmail = email.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      showError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const searchRes = await fetch(
        `${SHEETDB_URL}/search?email=${encodeURIComponent(trimmedEmail)}`,
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
              email: `${trimmedEmail} | ${role || "not specified"}`,
              date: new Date().toISOString(),
            },
          ],
        }),
      });

      if (addRes.ok) {
        showSuccess("Thanks! You've been added to the waitlist.");
        setEmail("");
        setRole("");
      } else {
        showError("Oops! Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      showError("Network error. Please try again later.");
    }

    setLoading(false);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const tickerItems = [
    { text: "PRODUCERS GET HEARD", color: "var(--accent)" },
    { text: "DJS GET PAID", color: "var(--accent2)" },
    { text: "VERIFIED PROOF-OF-PLAY", color: "var(--accent)" },
    { text: "ESCROW PROTECTED", color: "var(--accent2)" },
    { text: "MONTREAL BORN", color: "var(--accent)" },
    { text: "LAUNCHING 2026", color: "var(--accent2)" },
  ];

  const tickerDuplicated = [...tickerItems, ...tickerItems];

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      <nav className={navScrolled ? "scrolled" : ""}>
        <a href="#" className="nav-logo">
          <img
            src={logo}
            alt="SetPlay"
            style={{ height: "44px", width: "auto", display: "block" }}
          />
        </a>
        <button className="nav-cta" onClick={() => scrollTo("waitlist")}>
          Join Waitlist
        </button>
      </nav>

      <section className="hero">
        <div className="hero-bg" />

        <div className="waveform">
          <svg viewBox="0 0 800 200" preserveAspectRatio="none">
            <g ref={waveGroupRef} />
          </svg>
        </div>

        <img
          src={logoBig}
          alt="SetPlay"
          style={{
            width: "clamp(120px, 18vw, 220px)",
            height: "auto",
            mixBlendMode: "lighten",
            opacity: 0,
            animation: "fadeUp 0.8s 0.1s forwards",
            marginBottom: "24px",
            display: "block",
          }}
        />
        <p className="hero-tag">
          Montreal · Music Technology · DJ × Producer Economy
        </p>
        <h1 className="hero-headline">
          Get <span className="accent">Heard.</span>
          <br />
          Get <span style={{ color: "var(--accent2)" }}>Paid.</span>
        </h1>
        <p className="hero-sub">
          SetPlay connects music producers with DJs — producers pay for verified
          live plays, DJs earn for every set. The first platform built for both
          sides of the booth.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo("waitlist")}>
            Join the Waitlist
          </button>
          <button className="btn-ghost" onClick={() => scrollTo("how")}>
            See How It Works
          </button>
        </div>

        <div className="hero-scroll">Scroll</div>
      </section>

      <div className="ticker">
        <div className="ticker-inner">
          {tickerDuplicated.map((item, i) => (
            <span className="ticker-item" key={i}>
              <span style={{ color: item.color }}>★</span> {item.text}
            </span>
          ))}
        </div>
      </div>

      <section className="how" id="how">
        <p className="section-label reveal">How It Works</p>
        <h2
          className="reveal"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(40px, 5vw, 64px)",
            letterSpacing: "2px",
            maxWidth: "600px",
            lineHeight: 1.05,
          }}
        >
          Four steps.
          <br />
          One clean transaction.
        </h2>

        <div className="how-grid">
          {[
            {
              num: "1",
              icon: <Headphones size={28} />,
              numColor: "var(--accent)",
              title: "DJ Posts a Gig",
              desc: "DJs list their upcoming sets — venue, date, and genre. Producers can see who's playing and where, and decide who they want to pitch to.",
            },
            {
              num: "2",
              icon: <Music size={28} />,
              numColor: "var(--accent2)",
              title: "Producer Submits a Track",
              desc: "Producers browse available gigs and submit their track with a bid. The DJ reviews submissions and accepts the ones that fit their set.",
            },
            {
              num: "3",
              icon: <ShieldCheck size={28} />,
              numColor: "var(--accent)",
              title: "Play Gets Verified",
              desc: "SetPlay's proof-of-play system verifies the performance through the recording. No play, no pay — trust is built into the system.",
            },
            {
              num: "4",
              icon: <DollarSign size={28} />,
              numColor: "var(--accent2)",
              title: "Everyone Gets Paid",
              desc: "Funds held in escrow are released to the DJ. The producer gets their SetClip — crowd reaction footage ready for social media.",
            },
          ].map((step) => (
            <div className="how-step reveal" data-num={step.num} key={step.num}>
              <span className="step-icon">{step.icon}</span>
              <div className="step-num" style={{ color: step.numColor }}>
                Step 0{step.num}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="who"
        style={{ background: "var(--black)", padding: "120px 0" }}
      >
        <div style={{ padding: "0 48px" }}>
          <p className="section-label reveal">Built For</p>
          <h2
            className="reveal"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(40px, 5vw, 64px)",
              letterSpacing: "2px",
              lineHeight: 1.05,
              marginBottom: 0,
            }}
          >
            Two sides.
            <br />
            One platform.
          </h2>
        </div>
        <div className="for-who reveal" style={{ marginTop: "64px" }}>
          <div className="for-card">
            <div className="for-card-bg">DJ</div>
            <div className="for-role" style={{ color: "var(--accent)" }}>
              For DJs
            </div>
            <h3 className="for-title">Turn Your Sets Into Income</h3>
            <p className="for-desc">
              You're already behind the decks. SetPlay lets you earn directly
              for the plays you're already making.
            </p>
            <ul className="for-list">
              <li>Get paid per verified play</li>
              <li>Browse tracks that fit your sound</li>
              <li>No agency, no middleman</li>
              <li>Build your reputation on the platform</li>
            </ul>
          </div>
          <div className="for-card">
            <div className="for-card-bg">PRO</div>
            <div className="for-role" style={{ color: "var(--accent2)" }}>
              For Producers
            </div>
            <h3 className="for-title">Real Exposure. Real Rooms.</h3>
            <p className="for-desc">
              Stop hoping for a playlist feature. Get your track played in real
              venues, in front of real crowds — guaranteed.
            </p>
            <ul className="for-list">
              <li>Set your bid and target audience</li>
              <li>Receive verified SetClip footage</li>
              <li>Authentic crowd reactions for social</li>
              <li>Measurable, trackable exposure</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="big-cta">
        <h2 className="big-cta-text reveal">
          The music industry finally works
          <br />
          <span style={{ color: "var(--accent2)" }}>
            for the people making it.
          </span>
        </h2>
        <button
          className="btn-primary reveal"
          onClick={() => scrollTo("waitlist")}
        >
          Get Early Access
        </button>
      </section>

      <section className="waitlist" id="waitlist">
        <div className="waitlist-inner">
          <p className="section-label reveal">Early Access</p>
          <h2 className="reveal">
            Be First
            <br />
            In The <span>Set.</span>
          </h2>
          <p className="waitlist-sub reveal">
            We're launching in Montreal first. Join the waitlist and be among
            the first DJs and producers on the platform. Early members get
            priority access and founding member perks.
          </p>

          <div className="reveal">
            <div className="form-row">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleWaitlist();
                }}
              />
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                aria-label="role"
              >
                <option value="" disabled>
                  I am a...
                </option>
                <option value="dj">DJ</option>
                <option value="producer">Producer</option>
                <option value="both">Both</option>
              </select>
              <button
                className="btn-primary"
                onClick={handleWaitlist}
                disabled={loading}
              >
                {loading ? "JOINING..." : "JOIN →"}
              </button>
            </div>
            <p className="form-note">
              No spam. We'll reach out when beta opens in your city.
            </p>
          </div>

          <div className="stats-row reveal">
            <div className="stat-item">
              <div className="stat-num">
                100<span style={{ color: "var(--accent)" }}>+</span>
              </div>
              <div className="stat-label">DJs targeted at launch</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">
                200<span style={{ color: "var(--accent2)" }}>+</span>
              </div>
              <div className="stat-label">Producers at beta</div>
            </div>
            <div className="stat-item">
              <div className="stat-num">
                10<span style={{ color: "var(--accent)" }}>B+</span>
              </div>
              <div className="stat-label">Global market annually</div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo">
          <img
            src={logo}
            alt="SetPlay"
            fetchPriority="high"
            style={{
              height: "36px",
              width: "auto",
              filter: "brightness(0.9)",
            }}
          />
        </div>
        <div className="footer-links">
          <a href="#how">How It Works</a>
          <a href="#who">For DJs</a>
          <a href="#who">For Producers</a>
          <a href="#waitlist">Join Waitlist</a>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} SetPlay. Montreal, QC. All rights
          reserved.
        </p>
      </footer>

      <div style={{ position: "fixed", top: 0, left: 0, zIndex: 99999, pointerEvents: "none" }}>
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
  </div>
    </>
  );
}

export default SetPlayLandingPage;
