import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import americaImg from "./america.png";

/* ─── Font Loader ──────────────────────────────────────────────── */
function useFonts() {
  useEffect(() => {
    if (document.getElementById("val-fonts")) return;
    const l = document.createElement("link");
    l.id = "val-fonts";
    l.rel = "stylesheet";
    l.href =
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&family=Dancing+Script:wght@600&display=swap";
    document.head.appendChild(l);
  }, []);
}

/* ─── Background Decor (Elegant Pink & Gold) ─────────────────── */
const BG_ELEMENTS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.8) % 100}%`,
  size: 10 + (i * 3) % 22,
  dur: 15 + (i * 2) % 12,
  delay: (i * 1.1) % 10,
  op: 0.12 + (i * 0.01) % 0.1,
  type: i % 5 === 0 ? "🌸" : i % 5 === 1 ? "✨" : i % 5 === 2 ? "💗" : i % 5 === 3 ? "🌹" : "🎀",
}));

function BackgroundDeco() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        background: "linear-gradient(135deg, #fff5f7 0%, #ffe8ed 100%)",
      }}
    >
      {/* Soft Pink glow blobs */}
      <div style={{ position: "absolute", top: -100, right: -50, width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,182,193,0.25) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", bottom: -150, left: -50, width: 650, height: 650, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,105,180,0.15) 0%, transparent 70%)" }} />

      {/* Floating Elements */}
      {BG_ELEMENTS.map((el) => (
        <motion.span
          key={el.id}
          style={{
            position: "absolute",
            left: el.left,
            bottom: -50,
            fontSize: el.size,
            opacity: el.op,
            userSelect: "none",
            display: "inline-block",
          }}
          animate={{ 
            y: [0, -1100], 
            rotate: [0, 90, -90, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ duration: el.dur, delay: el.delay, repeat: Infinity, ease: "linear" }}
        >
          {el.type}
        </motion.span>
      ))}
    </div>
  );
}

/* ─── Romantic Sparkle Rain ────────────────────────────────────────── */
const EMOJIS = ["✨", "🌸", "💗", "🌹", "🎀", "🕊️", "✨", "🍭"];
const C_COLORS = ["#ffb6c1", "#ff69b4", "#ff1493", "#ffc0cb", "#ffffff"];

function Confetti({ active }) {
  const particles = useRef([]);

  if (active && particles.current.length === 0) {
    particles.current = Array.from({ length: 90 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 2,
      duration: 3.5 + Math.random() * 2,
      size: 12 + Math.random() * 25,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      color: C_COLORS[Math.floor(Math.random() * C_COLORS.length)],
      rotate: Math.random() * 360,
    }));
  }

  if (!active) return null;

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 60, overflow: "hidden" }}>
      {particles.current.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: -50,
            fontSize: p.size,
            color: p.color,
            lineHeight: 1,
            filter: "drop-shadow(0 0 5px rgba(255,182,193,0.5))",
          }}
          animate={{ y: 1150, rotate: p.rotate, opacity: [0, 1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Elegant Pink Envelope ─────────────────────────────── */
function ElegantEnvelopeSVG() {
  return (
    <svg
      width="280"
      height="200"
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="envShadow" x="-15%" y="-15%" width="130%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#ffb6c1" floodOpacity="0.2" />
        </filter>
        <linearGradient id="envGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffafa" />
          <stop offset="100%" stopColor="#fff0f5" />
        </linearGradient>
      </defs>

      {/* Envelope Body */}
      <rect x="5" y="5" width="270" height="190" rx="15" fill="url(#envGrad)" filter="url(#envShadow)" stroke="#ffdee5" strokeWidth="1" />
      
      {/* Flap details */}
      <path d="M5 25 L140 120 L275 25" stroke="#ffdee5" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 185 L120 105" stroke="#ffeef2" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M275 185 L160 105" stroke="#ffeef2" strokeWidth="1.5" strokeLinecap="round" />

      {/* Ribbon Detail */}
      <rect x="110" y="90" width="60" height="40" rx="5" fill="white" stroke="#ff69b4" strokeWidth="1" />
      <text x="140" y="118" textAnchor="middle" fontSize="22">💝</text>
    </svg>
  );
}

/* ─── Stage: Start (Pink & Elegant) ───────────────────────────── */
function StartScreen({ onOpen }) {
  return (
    <motion.div
      key="start"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)" }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 35, zIndex: 10 }}
    >
      <motion.div
        animate={{ 
          y: [0, -12, 0],
          scale: [1, 1.02, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        style={{ cursor: "pointer" }}
      >
        <ElegantEnvelopeSVG />
      </motion.div>

      <div style={{ textAlign: "center" }}>
        <motion.h2
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 36,
            color: "#d81b60",
            margin: 0,
          }}
        >
          Para Diana ✨
        </motion.h2>
        <motion.p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            color: "#ad1457",
            marginTop: 10,
            letterSpacing: 2,
            fontWeight: 500,
            textTransform: "uppercase",
          }}
        >
          Toca para abrir
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ─── Stage: Opening (Pink Mist) ────────────────────────────────── */
function OpeningAnimation() {
  return (
    <motion.div
      key="opening"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{
        scale: [0.5, 1.5, 3],
        opacity: [0, 1, 0],
      }}
      transition={{ duration: 0.8, ease: "circOut" }}
      style={{ 
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 120, 
        zIndex: 100,
      }}
    >
      🎀
    </motion.div>
  );
}

/* ─── Stage: Question (Rose & Elegant) ─────────────────────────── */
function QuestionCard({ onYes }) {
  const [noPos, setNoPos] = useState(null);
  const [isTeleporting, setIsTeleporting] = useState(false);
  const noPosRef = useRef(null);

  const teleport = useCallback(() => {
    const pad = 60;
    const bw = 120, bh = 50;
    const x = pad + Math.random() * (window.innerWidth - pad * 2 - bw);
    const y = pad + Math.random() * (window.innerHeight - pad * 2 - bh);
    const pos = { x, y };
    noPosRef.current = pos;
    setNoPos(pos);
    if (!isTeleporting) setIsTeleporting(true);
  }, [isTeleporting]);

  useEffect(() => {
    if (isTeleporting) {
      const onMove = (e) => {
        const p = noPosRef.current;
        if (!p) return;
        const dist = Math.hypot(e.clientX - (p.x + 60), e.clientY - (p.y + 25));
        if (dist < 85) teleport();
      };
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  }, [teleport, isTeleporting]);

  const buttonStyle = {
    padding: "16px 40px",
    fontSize: 16,
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    cursor: "pointer",
    borderRadius: 50,
    border: "none",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", padding: 25 }}>
      <motion.div
        key="qcard"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderRadius: 35,
          padding: "50px 30px",
          boxShadow: "0 30px 70px rgba(255, 182, 193, 0.3)",
          textAlign: "center",
          width: "100%",
          maxWidth: 440,
          zIndex: 10,
          position: "relative",
          border: "2px solid #fff0f5",
        }}
      >
        <motion.div
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{ fontSize: 60, marginBottom: 20 }}
        >
          🌸
        </motion.div>

        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(22px, 6vw, 28px)",
            color: "#880e4f",
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: 15,
            letterSpacing: -0.5,
          }}
        >
          Diana, me encantaría invitarte a una <span style={{ color: "#c2185b" }}>date</span>...
        </h1>

        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 22,
            color: "#ad1457",
            marginBottom: 20,
          }}
        >
          Seria muy lindo pasar ese rato contigo :))
        </p>

        <motion.img
          src={americaImg}
          alt="Funny surprise"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
          style={{
            width: "100%",
            maxWidth: 180,
            borderRadius: 20,
            marginBottom: 30,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "4px solid white",
          }}
        />

        <div style={{ 
          display: "flex", 
          gap: 15, 
          justifyContent: "center", 
          flexWrap: "wrap",
          alignItems: "center"
        }}>
          <motion.button
            onClick={onYes}
            whileHover={{ scale: 1.05, backgroundColor: "#c2185b", boxShadow: "0 15px 35px rgba(194, 24, 91, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              ...buttonStyle,
              background: "linear-gradient(135deg, #f06292 0%, #d81b60 100%)",
              color: "white",
              boxShadow: "0 10px 25px rgba(240, 98, 146, 0.3)",
              zIndex: 2,
            }}
          >
            ¡Claro que sí! 💗
          </motion.button>

          {!isTeleporting && (
            <motion.button
              onClick={teleport}
              onMouseEnter={teleport}
              whileHover={{ scale: 0.95 }}
              style={{
                ...buttonStyle,
                background: "rgba(255, 255, 255, 0.8)",
                color: "#ffc0cb",
                border: "1px solid #ffe4e1",
                zIndex: 1,
              }}
            >
              Nop 🌸
            </motion.button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isTeleporting && noPos && (
          <motion.button
            key="no-btn"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1, x: noPos.x, y: noPos.y }}
            exit={{ opacity: 0 }}
            onMouseEnter={teleport}
            onTouchStart={teleport}
            style={{
              ...buttonStyle,
              position: "fixed",
              top: 0,
              left: 0,
              background: "rgba(255, 255, 255, 0.6)",
              color: "#ffc0cb",
              border: "1px solid #ffe4e1",
              zIndex: 200,
              userSelect: "none",
              backdropFilter: "blur(5px)",
              padding: "12px 25px",
              fontSize: 14,
            }}
          >
            Nop 🌸
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Stage: Success (Blush & Gold) ────────────────────────────── */
function SuccessCard() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ type: "spring", damping: 20 }}
      style={{
        background: "white",
        borderRadius: 40,
        padding: "65px 45px",
        boxShadow: "0 40px 100px rgba(255, 105, 180, 0.2)",
        textAlign: "center",
        width: "90%",
        maxWidth: 460,
        zIndex: 10,
        position: "relative",
        border: "3px solid #fff0f5",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ fontSize: 85, marginBottom: 25 }}
      >
        💖🌹✨
      </motion.div>

      <h2
        style={{
          fontFamily: "'Dancing Script', cursive",
          fontSize: 48,
          color: "#c2185b",
          margin: "0 0 20px",
        }}
      >
        ¡Increíble! ✨
      </h2>

      <div style={{ background: "linear-gradient(to right, #fff5f7, #fff0f5, #fff5f7)", padding: "30px 25px", borderRadius: 28, marginBottom: 25, border: "1px solid #ffe4e1" }}>
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 18,
            color: "#880e4f",
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          Nos vemos el <span style={{ color: "#d81b60" }}>sábado 23 de mayo</span>
          <br />
          a las <span style={{ color: "#d81b60" }}>9:00 AM</span> en <span style={{ color: "#d81b60" }}>Sismo Café</span>
        </p>
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          color: "#ad1457",
          fontWeight: 400,
          fontStyle: "italic",
          lineHeight: 1.7,
        }}
      >
        (Abierto a cualquier cambio para que sea perfecto para ti 🌸)
      </p>

      <motion.div
        animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        style={{ marginTop: 35, fontSize: 30 }}
      >
        🌸 💗 🌸
      </motion.div>
    </motion.div>
  );
}

/* ─── Root App ─────────────────────────────────────────────────── */
export default function App() {
  useFonts();

  const [stage, setStage] = useState("start");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleOpen = () => {
    setStage("opening");
    setTimeout(() => setStage("question"), 800);
  };

  const handleYes = () => {
    setShowConfetti(true);
    setTimeout(() => setStage("success"), 200);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <BackgroundDeco />
      <Confetti active={showConfetti} />

      <AnimatePresence mode="wait">
        {stage === "start" && (
          <StartScreen key="start" onOpen={handleOpen} />
        )}
        {stage === "opening" && <OpeningAnimation key="opening" />}
        {stage === "question" && (
          <QuestionCard key="question" onYes={handleYes} />
        )}
        {stage === "success" && <SuccessCard key="success" />}
      </AnimatePresence>
    </div>
  );
}
