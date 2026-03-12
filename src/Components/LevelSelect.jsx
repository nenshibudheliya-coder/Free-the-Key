{ /* LEVEL SELECT PAGE */ }

import { useState } from "react";
import { LEVELS } from "./free.jsx";
import "./LevelSelect.css";

const TOTAL_LEVELS = LEVELS.length;
const PER_PAGE = 12;

export default function LevelSelect({ onPlay, onBack, unlockedCount = 1, completedLevels = [] }) {
    const [page, setPage] = useState(0);
    const pageCount = Math.ceil(TOTAL_LEVELS / PER_PAGE);

    const levelsOnPage = Array.from({ length: PER_PAGE }, (_, i) => page * PER_PAGE + i).filter(l => l < TOTAL_LEVELS);

    return (
        <div style={{
            height: "100%", width: "100%",
            background: "linear-gradient(135deg, #240a00 0%, #3d1a00 50%, #1a0800 100%)",
            display: "flex", flexDirection: "column", alignItems: "center",
            fontFamily: "Georgia, serif", overflow: "auto", userSelect: "none",
            position: "relative", boxSizing: "border-box",
            padding: "clamp(12px, 2vh, 24px) clamp(16px, 3vw, 40px)"
        }}>
            <style>{`
                @keyframes scaleIn { from{transform:scale(0.8);opacity:0} to{transform:scale(1);opacity:1} }
                @keyframes subtleGlow { 0%,100%{opacity:0.08} 50%{opacity:0.15} }

                /* Aztec pattern bg */
                .ls-bg-pattern {
                    position: absolute; inset: 0; pointer-events: none;
                    background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 8 L48 32 L72 40 L48 48 L40 72 L32 48 L8 40 L32 32 Z' fill='none' stroke='%23DAA520' stroke-width='0.8'/%3E%3Ccircle cx='40' cy='40' r='10' fill='none' stroke='%23DAA520' stroke-width='0.4'/%3E%3C/svg%3E");
                    background-size: clamp(50px, 6vw, 80px) clamp(50px, 6vw, 80px);
                    animation: subtleGlow 4s ease-in-out infinite;
                }

                /* Responsive grid: adapts columns to available space */
                .level-grid {
                    display: grid;
                    gap: clamp(10px, 1.5vw, 20px);
                    width: 100%;
                    align-content: center;
                    justify-content: center;
                }

                /* Level card hover effects */
                .level-card-inner {
                    position: absolute; inset: 0;
                    border-radius: clamp(8px, 1.2vw, 14px);
                    display: flex; align-items: center; justify-content: center;
                    transition: all 0.2s ease;
                }

                /* Pagination button */
                .page-btn {
                    padding: clamp(8px, 1vh, 14px) clamp(18px, 2.5vw, 32px);
                    background: #DAA52022; border: 1.5px solid #DAA520;
                    color: #DAA520; border-radius: 30px; cursor: pointer;
                    font-family: Georgia, serif; font-size: clamp(12px, 1.4vh, 16px);
                    letter-spacing: 2px; transition: all 0.2s;
                }
                .page-btn:not(:disabled):hover {
                    background: #DAA52044; box-shadow: 0 0 12px #DAA52033;
                }
                .page-btn:disabled { opacity: 0.7; cursor: default; filter: grayscale(0.2); }

                @media (max-width: 1024px) {
                    .mobile-margin {
                        margin-top: 15px !important;
                    }
                }
                /* 12-03 Mobile only: absolute position from bottom  */
                @media (max-width: 768px) {
                    .mobile-margin {
                        position: absolute !important;
                        bottom: 80px !important;
                        left: 0 !important;
                        right: 0 !important;
                        display: flex !important;
                        justify-content: center !important;
                        gap: 20px !important;
                        margin: 0 !important;
                    }
                        
                     /* 12-03 mobile view levels card center  set */   
                    .grid-wrapper {
                        padding-bottom: 100px !important;
                    }
                    .level-grid {
                        max-width: 80vw !important;
                    }
                }
                /* 12-03 Tablet only: absolute position from bottom  */
                @media (min-width: 769px) and (max-width: 1024px) {
                    .mobile-margin {
                        position: absolute !important;
                        bottom: 110px !important;
                        left: 50% !important;
                        transform: translateX(-50%) !important;
                        margin: 0 !important;
                    }
                }
                /* 12-03 Tablet Landscape: move buttons even higher  */
                @media (min-width: 769px) and (max-width: 1024px) and (orientation: landscape) {
                    .mobile-margin {
                        bottom: 120px !important;
                    }
                /* 12-03 Tablet Portrait: Bigger numbers & Center Grid */
                @media (min-width: 769px) and (max-width: 1024px) and (orientation: portrait) {
                    .level-num {
                        font-size: clamp(28px, 5vw, 40px) !important;
                    }

                    /* 12-03 Tablet view levels card center  set */   
                    .grid-wrapper {
                        padding-bottom: 120px !important;
                    }
                    .level-grid {
                        max-width: 80vw !important;
                    }
                }
                   
            `}</style>

            {/* Background Pattern */}
            <div className="ls-bg-pattern" />

            {/* Header */}
            <div style={{
                zIndex: 10, textAlign: "center",
                marginTop: "clamp(20px, 4vh, 50px)",
                marginBottom: "clamp(10px, 2vh, 24px)",
                flexShrink: 0
            }}>
                <h2 style={{
                    color: "#DAA520", margin: 0,
                    letterSpacing: "clamp(3px, 0.6vw, 8px)",
                    fontVariant: "small-caps",
                    fontSize: "clamp(22px, 3.5vh, 44px)",
                    textShadow: "0 0 24px #DAA52055, 0 2px 6px #000",
                    lineHeight: 1.2
                }}>
                    ✦ Select Level ✦
                </h2>
                <div style={{
                    width: "clamp(60px, 10vw, 120px)", height: "2px",
                    background: "linear-gradient(90deg, transparent, #DAA520, transparent)",
                    margin: "clamp(6px, 1vh, 12px) auto 0"
                }} />
            </div>

            {/* Level Grid */}
            <div className="grid-wrapper" style={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                zIndex: 10
            }}>
                <div
                    className="level-grid"
                    style={{
                        /* 4 fixed columns: Row1→1-4, Row2→5-8, Row3→9-12 */
                        gridTemplateColumns: "repeat(4, minmax(clamp(60px, 7vw, 100px), 1fr))",
                        maxWidth: "clamp(280px, 48vw, 520px)",
                        width: "100%",
                        alignSelf: "center",
                    }}
                >
                    {levelsOnPage.map((lv) => {
                        const isLocked = lv > 0 && !completedLevels.includes(lv - 1);
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
            </div>

            {/* Pagination */}
            <div className="mobile-margin" style={{
                display: "flex", gap: "clamp(12px, 2vw, 28px)",
                alignItems: "center", zIndex: 10,
                marginTop: "auto",
                paddingTop: "clamp(10px, 2vh, 20px)",
                marginBottom: "clamp(14px, 2.5vh, 28px)",
                flexShrink: 0
            }}>
                <button
                    className="page-btn"
                    disabled={page === 0}
                    onClick={() => setPage(p => p - 1)}
                >
                    ◀ PREV
                </button>
                <div style={{
                    color: "#DAA520", letterSpacing: 3,
                    fontSize: "clamp(12px, 1.4vh, 16px)",
                    minWidth: "60px", textAlign: "center"
                }}>
                    {page + 1} / {pageCount}
                </div>
                <button
                    className="page-btn"
                    disabled={page >= pageCount - 1}
                    onClick={() => setPage(p => p + 1)}
                >
                    NEXT ▶
                </button>
            </div>

            {/*Back Button */}
            {/* <button
                onClick={onBack}
                style={{
                    position: "absolute", top: "clamp(10px, 1.5vh, 20px)", left: "clamp(10px, 1.5vw, 20px)",
                    background: "transparent", border: "1.5px solid #7a4412",
                    color: "#DAA520", borderRadius: 30, cursor: "pointer",
                    padding: "clamp(5px, 0.8vh, 10px) clamp(12px, 1.5vw, 20px)",
                    fontFamily: "Georgia, serif", fontSize: "clamp(11px, 1.3vh, 15px)",
                    letterSpacing: 1, transition: "all 0.2s", zIndex: 20
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#DAA520"; e.currentTarget.style.background = "#DAA52022"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#7a4412"; e.currentTarget.style.background = "transparent"; }}
            >
                ← Back
            </button> */}
        </div>
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
                aspectRatio: "1",
                cursor: locked ? "default" : "pointer",
                position: "relative",
                animation: `scaleIn 0.25s ease-out ${(num % 12) * 0.03}s backwards`,
                transform: hover && !locked ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            }}
        >
            {/* Card Background */}
            <div style={{
                position: "absolute", inset: 0,
                background: locked
                    ? "linear-gradient(135deg, #1a0d01, #0d0600)"
                    : hover
                        ? "linear-gradient(135deg, #a07010, #6b4e08)"
                        : "linear-gradient(135deg, #3a1800, #1a0d01)",
                border: locked
                    ? "1.5px solid #2a2a2a"
                    : `1.5px solid ${hover ? "#FFD700" : "#7a4412"}`,
                borderRadius: "clamp(8px, 1.2vw, 14px)",
                boxShadow: locked
                    ? "none"
                    : hover
                        ? "0 8px 24px #000, 0 0 20px #DAA52055"
                        : "0 4px 12px #0009",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s"
            }}>
                {locked ? (
                    <svg
                        width="clamp(16px, 2.2vw, 28px)"
                        height="clamp(16px, 2.2vw, 28px)"
                        viewBox="0 0 24 24" fill="none"
                        stroke="#3a3a3a" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                ) : (
                    <span className="level-num" style={{
                        fontSize: "clamp(14px, 2vw, 26px)",
                        fontWeight: "bold",
                        color: hover ? "#FFF" : "#DAA520",
                        textShadow: "0 2px 6px #000"
                    }}>
                        {num}
                    </span>
                )}
            </div>

            {/* Decorative dot for unlocked */}
            {!locked && (
                <div style={{
                    position: "absolute", top: "clamp(4px, 0.6vw, 8px)", right: "clamp(4px, 0.6vw, 8px)",
                    width: "clamp(4px, 0.5vw, 7px)", height: "clamp(4px, 0.5vw, 7px)",
                    borderRadius: "50%", backgroundColor: "#DAA520", opacity: 0.6
                }} />
            )}
        </div>
    );
}
