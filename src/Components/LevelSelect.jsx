import { useState } from "react";

const TOTAL_LEVELS = 32;
const PER_PAGE = 12;

export default function LevelSelect({ onPlay, onBack, unlockedCount = 1 }) {
    const [page, setPage] = useState(0);
    const pageCount = Math.ceil(TOTAL_LEVELS / PER_PAGE);

    const levelsOnPage = Array.from({ length: PER_PAGE }, (_, i) => page * PER_PAGE + i).filter(l => l < TOTAL_LEVELS);

    return (
        <div style={{
            height: "100%", width: "100%",
            background: "linear-gradient(135deg, #240a00 0%, #3d1a00 50%, #1a0800 100%)",
            display: "flex", flexDirection: "column", alignItems: "center",
            fontFamily: "Georgia, serif", overflow: "hidden", userSelect: "none",
            position: "relative", padding: "20px"
        }}>
            <style>{`
                @keyframes scaleIn { from{transform:scale(0.8);opacity:0} to{transform:scale(1);opacity:1} }
                @keyframes floatSmall { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
            `}</style>

            {/* Background Texture Overlay */}
            <div style={{
                position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0 L100 0 L100 100 L0 100 Z' fill='none' stroke='%23DAA520' stroke-width='2'/%3E%3C/svg%3E")`,
                backgroundSize: '80px 80px'
            }} />

            {/* Header */}
            <div style={{ height: "15%", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", zIndex: 10 }}>
                <h2 style={{
                    color: "#DAA520",
                    margin: 0,
                    letterSpacing: "6px",
                    fontVariant: "small-caps",
                    fontSize: "clamp(24px, 5vh, 42px)",
                    textShadow: "0 0 20px #DAA52044, 0 2px 4px #000"
                }}>
                    Select Expedition
                </h2>
            </div>

            {/* Level Grid */}
            <div style={{
                flex: 1, display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "12px", width: "100%", maxWidth: "500px", padding: "10px",
                alignContent: "center", zIndex: 10
            }}>
                {levelsOnPage.map((lv) => {
                    const isLocked = lv >= unlockedCount;
                    return (
                        <LevelCard
                            key={lv}
                            num={lv + 1}
                            locked={isLocked}
                            onClick={() => !isLocked && onPlay(lv)}
                        />
                    );
                })}
            </div>

            {/* Pagination Controls */}
            <div style={{ height: "15%", display: "flex", gap: "20px", alignItems: "center", zIndex: 10 }}>
                <button
                    disabled={page === 0}
                    onClick={() => setPage(p => p - 1)}
                    style={{
                        padding: "10px 20px", background: "#DAA52022", border: "1px solid #DAA520",
                        color: "#DAA520", borderRadius: 30, cursor: page === 0 ? "default" : "pointer",
                        opacity: page === 0 ? 0.3 : 1
                    }}
                >
                    PREV
                </button>
                <div style={{ color: "#DAA520", letterSpacing: 3 }}>
                    {page + 1} / {pageCount}
                </div>
                <button
                    disabled={page >= pageCount - 1}
                    onClick={() => setPage(p => p + 1)}
                    style={{
                        padding: "10px 20px", background: "#DAA52022", border: "1px solid #DAA520",
                        color: "#DAA520", borderRadius: 30, cursor: page >= pageCount - 1 ? "default" : "pointer",
                        opacity: page >= pageCount - 1 ? 0.3 : 1
                    }}
                >
                    NEXT
                </button>
            </div>
        </div >
    );
}

function LevelCard({ num, locked, onClick }) {
    const [hover, setHover] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                aspectRatio: "1", cursor: locked ? "default" : "pointer",
                position: "relative", animation: "scaleIn 0.3s ease-out backwards",
                transform: hover && !locked ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}
        >
            {/* Card Background (Stone Block Style) */}
            <div style={{
                position: "absolute", inset: 0,
                background: locked
                    ? "linear-gradient(135deg, #1a0d01, #0d0600)"
                    : hover
                        ? "linear-gradient(135deg, #8b6508, #5c4305)"
                        : "linear-gradient(135deg, #3a1800, #1a0d01)",
                border: locked ? "2px solid #333" : `2px solid ${hover ? "#FFD700" : "#7a4412"}`,
                borderRadius: 12,
                boxShadow: locked ? "none" : hover ? "0 10px 20px #000, 0 0 15px #DAA52044" : "0 5px 10px #000",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s"
            }}>
                {locked ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                ) : (
                    <span style={{
                        fontSize: 22, fontWeight: "bold",
                        color: hover ? "#FFF" : "#DAA520",
                        textShadow: "0 2px 4px #000"
                    }}>
                        {num}
                    </span>
                )}
            </div>

            {/* Decorative Corner */}
            {!locked && (
                <div style={{
                    position: "absolute", top: 8, right: 8,
                    width: 6, height: 6, borderRadius: "50%",
                    backgroundColor: "#DAA520", opacity: 0.5
                }} />
            )}
        </div>
    );
}
