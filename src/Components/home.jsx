/* HOME PAGE */

import { useState, useEffect } from "react";

export default function HomePage({ onStart }) {
    const [hover, setHover] = useState(false);

    // Some ambient animations using state if needed, but CSS is better
    /* leaf ni position, rotation, size ane speed store kari che.*/
    const leaves = [
        { top: "5%", left: "-2%", rot: -25, w: 60, h: 80, spd: 3.5, dl: 0 },
        { top: "2%", right: "-2%", rot: 40, w: 55, h: 72, spd: 4.2, dl: 0.5 },
        { bottom: "8%", left: "-3%", rot: -40, w: 65, h: 85, spd: 3.8, dl: 1.2 },
        { bottom: "5%", right: "-3%", rot: 28, w: 62, h: 78, spd: 3.2, dl: 0.8 },
    ];

    return (
        <div style={{
            height: "100%", width: "100%", position: "relative",
            background: "linear-gradient(175deg, #1c0800 0%, #2e1104 35%, #1a0700 70%, #0e0400 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            fontFamily: "Georgia, serif", overflow: "hidden", userSelect: "none"
        }}>
            <style>{`
                @keyframes floatLeaf { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-15px)} }
                @keyframes pulseGlow { 0%,100%{opacity:0.6} 50%{opacity:1} }
                @keyframes medalRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
                @keyframes fadeInUp { from{opacity:0; transform:translateY(30px)} to{opacity:1; transform:translateY(0)} }
            `}</style>

            {/* Background Aztec Pattern */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.15 }}>
                <defs>
                    <pattern id="aztecTile" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" fill="none" stroke="#DAA520" strokeWidth="1" />
                        <circle cx="50" cy="50" r="15" fill="none" stroke="#DAA520" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#aztecTile)" />
            </svg>

            {/* Floating Tropical Leaves
            {leaves.map((l, i) => (
                <div key={i} style={{
                    position: "absolute", zIndex: 5, pointerEvents: "none",
                    ...l, animation: `floatLeaf ${l.spd}s ease-in-out ${l.dl}s infinite`
                }}>
                    <svg viewBox="0 0 60 80" width={l.w} height={l.h} style={{ transform: `rotate(${l.rot}deg)`, filter: "drop-shadow(2px 6px 8px #000)" }}>
                        <path d="M30 2 C10 10, 2 35, 8 60 C14 80, 30 78, 30 78 C30 78, 46 80, 52 60 C58 35, 50 10, 30 2Z" fill={i % 2 === 0 ? "#386a20" : "#2d5a27"} />
                        <line x1="30" y1="5" x2="30" y2="75" stroke="#1b3a10" strokeWidth="1.5" opacity="0.4" />
                    </svg>
                </div>
            ))} */}

            {/* Main Ui Content */}
            <div style={{
                position: "relative", zIndex: 10, textAlign: "center", animation: "fadeInUp 0.8s ease-out",
                display: "flex", flexDirection: "column", alignItems: "center", gap: "2vh"
            }}>

                {/* Central Medallion Golden circle */}
                <div style={{ position: "relative", width: "clamp(120px, 25vh, 220px)", height: "clamp(120px, 25vh, 220px)" }}>
                    <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", animation: "medalRotate 30s linear infinite" }}>
                        <defs>
                            <linearGradient id="medalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFD700" />
                                <stop offset="50%" stopColor="#B8860B" />
                                <stop offset="100%" stopColor="#8B4513" />
                            </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="45" fill="none" stroke="url(#medalGrad)" strokeWidth="4" />
                        <circle cx="50" cy="50" r="38" fill="none" stroke="url(#medalGrad)" strokeWidth="1" opacity="0.6" />
                        <path d="M50 15 L55 35 L75 35 L60 48 L65 68 L50 55 L35 68 L40 48 L25 35 L45 35 Z" fill="url(#medalGrad)" transform="translate(0, 8.5)" />
                        {/* Outer dashes */}
                        {Array.from({ length: 12 }).map((_, i) => (
                            <rect key={i} x="48" y="2" width="4" height="6" rx="1" fill="url(#medalGrad)" transform={`rotate(${i * 30} 50 50)`} />
                        ))}
                    </svg>
                    {/* Glowing Aura */}
                    <div style={{
                        position: "absolute", inset: -20, borderRadius: "50%",
                        background: "radial-gradient(circle, #DAA52033 0%, transparent 70%)",
                        animation: "pulseGlow 2s ease-in-out infinite"
                    }} />
                </div>

                {/* Title Section */}
                <div>
                    <h1 style={{
                        color: "#DAA520", fontSize: "clamp(32px, 8vh, 72px)", margin: 0,
                        letterSpacing: 4, textShadow: "0 0 30px #DAA52066, 0 4px 10px #000",
                        fontVariant: "small-caps", fontFamily: "Georgia, serif"
                    }}>
                        Free The Key
                    </h1>
                    <p style={{ color: "#a07040", letterSpacing: 2, fontSize: "clamp(10px, 1.5vh, 14px)", marginTop: 5, opacity: 0.8 }}>
                        ✦ SLIDE TO ESCAPE THE TEMPLE ✦
                    </p>
                </div>

                {/* Start Button */}
                <button
                    onClick={onStart}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    style={{
                        padding: "clamp(12px, 2vh, 20px) clamp(30px, 5vw, 60px)",
                        background: hover ? "linear-gradient(135deg, #DAA520, #8b6508)" : "linear-gradient(135deg, #8b6508, #5c4305)",
                        border: "3px solid #DAA520", borderRadius: 50,
                        color: "white", fontSize: "clamp(16px, 2vh, 22px)", fontWeight: "bold",
                        cursor: "pointer", letterSpacing: 2,
                        boxShadow: hover ? "0 0 40px #DAA52066, 0 10px 20px #000" : "0 5px 15px #000",
                        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        transform: hover ? "scale(1.05)" : "scale(1)",
                        marginTop: "2vh"
                    }}
                >
                    START
                </button>
            </div>

        </div>
    );
}
