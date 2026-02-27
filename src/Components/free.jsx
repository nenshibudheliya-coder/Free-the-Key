import { useState, useCallback, useEffect, useRef } from "react";

const COLS = 6;
const ROWS = 6;
const GAP = 3;

{/* ALL LEVELS */ }
const LEVELS = [
    {
        level: 1,
        pieces: [
            { id: "key", row: 2, col: 1, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 0, length: 2, isHorizontal: true },
            { id: "b", row: 1, col: 0, length: 3, isHorizontal: false },
            { id: "c", row: 1, col: 3, length: 3, isHorizontal: false },
            { id: "d", row: 0, col: 5, length: 3, isHorizontal: false },
            { id: "e", row: 4, col: 0, length: 2, isHorizontal: false },
            { id: "f", row: 4, col: 4, length: 2, isHorizontal: true },
            { id: "g", row: 5, col: 2, length: 3, isHorizontal: true },
        ],
    },
    {
        level: 2,
        pieces: [
            { id: "key", row: 2, col: 1, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 2, col: 3, length: 3, isHorizontal: false },
            { id: "b", row: 3, col: 1, length: 2, isHorizontal: true },
            { id: "c", row: 3, col: 5, length: 3, isHorizontal: false },
            { id: "d", row: 4, col: 1, length: 2, isHorizontal: false },
            { id: "e", row: 5, col: 2, length: 2, isHorizontal: true },
        ],
    },
    {
        level: 3,
        pieces: [
            { id: "key", row: 2, col: 1, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 0, length: 3, isHorizontal: false },
            { id: "b", row: 0, col: 3, length: 3, isHorizontal: false },
            { id: "c", row: 3, col: 2, length: 2, isHorizontal: false },
            { id: "d", row: 3, col: 3, length: 3, isHorizontal: true },
            { id: "e", row: 4, col: 5, length: 2, isHorizontal: false },
            { id: "f", row: 5, col: 2, length: 3, isHorizontal: true },
        ],
    },
    {
        level: 4,
        pieces: [
            { id: "key", row: 2, col: 1, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 0, length: 2, isHorizontal: true },
            { id: "b", row: 0, col: 3, length: 3, isHorizontal: false },
            { id: "c", row: 0, col: 5, length: 2, isHorizontal: false },
            { id: "d", row: 1, col: 0, length: 3, isHorizontal: false },
            { id: "e", row: 1, col: 4, length: 3, isHorizontal: false },
            { id: "f", row: 3, col: 1, length: 3, isHorizontal: true },
            { id: "h", row: 4, col: 0, length: 2, isHorizontal: false },
            { id: "i", row: 4, col: 4, length: 2, isHorizontal: true },
            { id: "j", row: 5, col: 4, length: 2, isHorizontal: true },
        ],
    },
    {
        level: 5,
        pieces: [
            { id: "key", row: 2, col: 1, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 0, length: 2, isHorizontal: true },
            { id: "b", row: 0, col: 2, length: 2, isHorizontal: true },
            { id: "c", row: 0, col: 4, length: 2, isHorizontal: true },
            { id: "d", row: 1, col: 0, length: 2, isHorizontal: false },
            { id: "e", row: 4, col: 2, length: 2, isHorizontal: false }, // Moved away from Key overlap at 2,2
            { id: "f", row: 1, col: 5, length: 3, isHorizontal: false },
            // { id: "g", row: 3, col: 0, length: 3, isHorizontal: true },
            { id: "h", row: 4, col: 1, length: 2, isHorizontal: false },
            { id: "i", row: 4, col: 3, length: 2, isHorizontal: true },
            { id: "j", row: 5, col: 3, length: 3, isHorizontal: true },
        ],
    },
    {
        level: 6,
        pieces: [
            { id: "key", row: 2, col: 0, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 2, length: 3, isHorizontal: false },
            { id: "b", row: 0, col: 3, length: 3, isHorizontal: false },
            { id: "d", row: 3, col: 0, length: 2, isHorizontal: true },
            { id: "e", row: 4, col: 0, length: 2, isHorizontal: false },
            { id: "f", row: 4, col: 2, length: 2, isHorizontal: true },
            { id: "g", row: 3, col: 4, length: 2, isHorizontal: true },
        ],
    },
    {
        level: 7,
        pieces: [
            { id: "key", row: 2, col: 1, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 0, length: 3, isHorizontal: false },
            { id: "b", row: 0, col: 1, length: 2, isHorizontal: true },
            { id: "c", row: 0, col: 3, length: 3, isHorizontal: false },
            { id: "d", row: 1, col: 4, length: 3, isHorizontal: false },
            { id: "e", row: 3, col: 0, length: 2, isHorizontal: true },
            { id: "f", row: 4, col: 2, length: 2, isHorizontal: false },
            { id: "g", row: 5, col: 3, length: 3, isHorizontal: true },
        ],
    },
    {
        level: 8,
        pieces: [
            { id: "key", row: 2, col: 0, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 2, length: 3, isHorizontal: false },
            { id: "b", row: 0, col: 4, length: 2, isHorizontal: true },
            { id: "c", row: 1, col: 0, length: 2, isHorizontal: true },
            { id: "d", row: 1, col: 5, length: 3, isHorizontal: false },
            { id: "e", row: 3, col: 2, length: 3, isHorizontal: true },
            { id: "f", row: 4, col: 0, length: 2, isHorizontal: false },
            { id: "g", row: 5, col: 1, length: 3, isHorizontal: true },
        ],
    },
    {
        level: 9,
        pieces: [
            { id: "key", row: 2, col: 2, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 0, length: 3, isHorizontal: true },
            { id: "b", row: 1, col: 0, length: 2, isHorizontal: false },
            { id: "c", row: 0, col: 4, length: 3, isHorizontal: false },
            { id: "d", row: 3, col: 1, length: 2, isHorizontal: false },
            { id: "e", row: 3, col: 4, length: 2, isHorizontal: true },
            { id: "f", row: 4, col: 3, length: 2, isHorizontal: false },
            { id: "g", row: 5, col: 0, length: 3, isHorizontal: true },
        ],
    },
    {
        level: 10,
        pieces: [
            { id: "key", row: 2, col: 1, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 0, length: 3, isHorizontal: false },
            { id: "b", row: 0, col: 2, length: 2, isHorizontal: true },
            { id: "c", row: 0, col: 4, length: 3, isHorizontal: false },
            { id: "d", row: 0, col: 1, length: 2, isHorizontal: false },
            { id: "e", row: 3, col: 3, length: 3, isHorizontal: true },
            { id: "f", row: 4, col: 0, length: 2, isHorizontal: true },
            { id: "g", row: 5, col: 4, length: 2, isHorizontal: true },
            { id: "h", row: 4, col: 2, length: 2, isHorizontal: false },
        ],
    },
    {
        level: 11,
        pieces: [
            { id: "key", row: 2, col: 1, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 0, length: 2, isHorizontal: true },
            { id: "b", row: 1, col: 0, length: 2, isHorizontal: true },
            // { id: "c", row: 0, col: 2, length: 2, isHorizontal: false },
            { id: "d", row: 0, col: 3, length: 2, isHorizontal: false },
            { id: "e", row: 3, col: 0, length: 2, isHorizontal: true },
            { id: "f", row: 4, col: 0, length: 2, isHorizontal: false },
            { id: "g", row: 3, col: 2, length: 2, isHorizontal: false },
            { id: "h", row: 2, col: 3, length: 3, isHorizontal: false },
            { id: "i", row: 1, col: 4, length: 3, isHorizontal: false },
            { id: "j", row: 1, col: 5, length: 3, isHorizontal: false },
            { id: "k", row: 5, col: 3, length: 3, isHorizontal: true },
        ],
    },
    {
        level: 12,
        pieces: [
            { id: "key", row: 2, col: 1, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 1, length: 2, isHorizontal: false },
            { id: "b", row: 0, col: 2, length: 3, isHorizontal: true },
            { id: "c", row: 0, col: 5, length: 2, isHorizontal: false },
            { id: "d", row: 1, col: 4, length: 2, isHorizontal: false },
            { id: "e", row: 2, col: 5, length: 2, isHorizontal: false },
            { id: "f", row: 3, col: 2, length: 3, isHorizontal: true },
            { id: "g", row: 4, col: 4, length: 2, isHorizontal: false },
            { id: "h", row: 4, col: 2, length: 2, isHorizontal: true },
        ],
    },
    {
        level: 13,
        pieces: [
            { id: "key", row: 2, col: 0, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 0, length: 3, isHorizontal: false },
            { id: "b", row: 0, col: 2, length: 2, isHorizontal: true },
            { id: "c", row: 1, col: 3, length: 3, isHorizontal: false },
            { id: "d", row: 0, col: 5, length: 3, isHorizontal: false },
            { id: "e", row: 3, col: 1, length: 2, isHorizontal: true },
            { id: "f", row: 4, col: 2, length: 2, isHorizontal: false },
            { id: "g", row: 5, col: 3, length: 3, isHorizontal: true },
        ],
    },
    {
        level: 14,
        pieces: [
            { id: "key", row: 2, col: 0, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 2, length: 3, isHorizontal: false },
            { id: "b", row: 3, col: 0, length: 2, isHorizontal: true },
            { id: "c", row: 0, col: 3, length: 2, isHorizontal: false },
            { id: "d", row: 2, col: 3, length: 2, isHorizontal: true },
            { id: "e", row: 0, col: 5, length: 3, isHorizontal: false },
            { id: "f", row: 4, col: 2, length: 2, isHorizontal: false },
            { id: "g", row: 3, col: 3, length: 3, isHorizontal: false },
            { id: "h", row: 5, col: 4, length: 2, isHorizontal: true },
            { id: "i", row: 4, col: 4, length: 2, isHorizontal: true },
        ],
    },
    {
        level: 15,
        pieces: [
            { id: "key", row: 2, col: 0, length: 2, isHorizontal: true, isKey: true },
            { id: "a", row: 0, col: 2, length: 3, isHorizontal: false },
            { id: "b", row: 0, col: 0, length: 2, isHorizontal: true },
            { id: "c", row: 3, col: 0, length: 2, isHorizontal: true },
            { id: "d", row: 4, col: 0, length: 2, isHorizontal: false },
            { id: "e", row: 0, col: 3, length: 3, isHorizontal: false },
            { id: "f", row: 4, col: 1, length: 2, isHorizontal: false },
            { id: "g", row: 3, col: 2, length: 2, isHorizontal: false },
            { id: "h", row: 5, col: 2, length: 2, isHorizontal: true },
            { id: "i", row: 0, col: 4, length: 2, isHorizontal: false },
            { id: "j", row: 2, col: 4, length: 2, isHorizontal: true },
            { id: "k", row: 3, col: 4, length: 3, isHorizontal: false },
            { id: "l", row: 0, col: 5, length: 2, isHorizontal: false },
            { id: "m", row: 3, col: 5, length: 3, isHorizontal: false },
        ],
    },
];



{/* board ma kai cell par kai piece che e batave che */ }
function buildOccupied(pieces) {
    const occ = {};
    for (const p of pieces) {
        for (let i = 0; i < p.length; i++) {
            const r = p.isHorizontal ? p.row : p.row + i;
            const c = p.isHorizontal ? p.col + i : p.col;
            occ[`${r},${c}`] = p.id;
        }
    }
    return occ;
}

{/* move karva devu ke nai e chech kare che */ }
function canMove(piece, delta, pieces) {
    const occ = buildOccupied(pieces); {/* call */ }
    for (let i = 0; i < piece.length; i++) {
        const r = piece.isHorizontal ? piece.row : piece.row + i;
        const c = piece.isHorizontal ? piece.col + i : piece.col;
        delete occ[`${r},${c}`];
    }
    if (piece.isHorizontal) {
        if (delta < 0) {
            for (let d = -1; d >= delta; d--) {
                const c = piece.col + d;
                if (c < 0 || occ[`${piece.row},${c}`]) return false;
            }
        } else {
            for (let d = 1; d <= delta; d++) {
                const c = piece.col + piece.length - 1 + d;
                const limit = piece.isKey ? COLS + 2 : COLS;
                if (c >= limit || occ[`${piece.row},${c}`]) return false;
            }
        }
    } else {
        if (delta < 0) {
            for (let d = -1; d >= delta; d--) {
                const r = piece.row + d;
                if (r < 0 || occ[`${r},${piece.col}`]) return false;
            }
        } else {
            for (let d = 1; d <= delta; d++) {
                const r = piece.row + piece.length - 1 + d;
                if (r >= ROWS || occ[`${r},${piece.col}`]) return false;
            }
        }
    }
    return true;
}

// Stone color palettes
const STONE_PALETTES = [
    { face: "#b87a52", top: "#d49a6a", side: "#7a4a28", crack: "#5a3018" },
    { face: "#a06840", top: "#c08858", side: "#6a3e20", crack: "#4a2810" },
    { face: "#c08860", top: "#e0a878", side: "#8a5830", crack: "#6a3820" },
    { face: "#986040", top: "#b88058", side: "#684028", crack: "#482818" },
    { face: "#b07048", top: "#d09068", side: "#7a4828", crack: "#5a3018" },
    { face: "#a87850", top: "#c89870", side: "#785030", crack: "#583020" },
];

{ /* key icon */ }
function KeySVGIcon({ size }) {
    const s = size || 32;
    return (
        <svg width={s} height={s} viewBox="0 0 32 32" fill="none">
            <defs>
                <linearGradient id="keyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2AF" />
                    <stop offset="50%" stopColor="#FFD700" />
                    <stop offset="100%" stopColor="#B8860B" />
                </linearGradient>
                <filter id="keyGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="1.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>
            {/* Main Key Body */}
            <circle cx="9" cy="16" r="7" stroke="url(#keyGrad)" strokeWidth="2.5" />
            <circle cx="9" cy="16" r="3" stroke="url(#keyGrad)" strokeWidth="1" />
            <rect x="15" y="14" width="12" height="3" rx="1" fill="url(#keyGrad)" />
            {/* Teeth */}
            <rect x="21" y="17" width="2" height="4" rx="0.5" fill="url(#keyGrad)" />
            <rect x="25" y="17" width="2" height="3" rx="0.5" fill="url(#keyGrad)" />
            {/* Shiny highlight */}
            <circle cx="7" cy="14" r="1.5" fill="#fff" opacity="0.6" />
        </svg>
    );
}

{ /* stone block */ }
function StoneBlockSVG({ piece, isActive, onPointerDown, cell }) {
    const CELL = cell;
    const w = piece.isHorizontal ? piece.length * CELL + (piece.length - 1) * GAP : CELL;
    const h = piece.isHorizontal ? CELL : piece.length * CELL + (piece.length - 1) * GAP;
    const x = piece.col * (CELL + GAP);
    const y = piece.row * (CELL + GAP);
    const isV = !piece.isHorizontal;
    const pid = piece.id;

    if (piece.isKey) {
        return (
            <div
                onPointerDown={onPointerDown}
                style={{
                    position: "absolute", left: x, top: y, width: w, height: h,
                    cursor: "ew-resize", zIndex: isActive ? 10 : 5,
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                    transition: isActive ? "none" : "transform 0.1s",
                    touchAction: "none",
                }}
            >
                <svg width={w} height={h} style={{ display: "block" }}>
                    <defs>
                        <linearGradient id="goldPlate" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#FFD363" />
                            <stop offset="30%" stopColor="#DBAA25" />
                            <stop offset="100%" stopColor="#876600" />
                        </linearGradient>
                        <linearGradient id="goldBevel" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#FFE08C" />
                            <stop offset="100%" stopColor="#6E4F00" />
                        </linearGradient>
                    </defs>
                    {/* Shadow */}
                    <rect x="2" y="4" width={w - 4} height={h - 4} rx="6" fill="#000" opacity="0.4" />
                    {/* Beveled base */}
                    <rect x="0" y="0" width={w} height={h} rx="6" fill="url(#goldBevel)" />
                    {/* Main gold face */}
                    <rect x="4" y="4" width={w - 8} height={h - 8} rx="4" fill="url(#goldPlate)" />
                    {/* Top shine */}
                    <rect x="6" y="6" width={w - 12} height="20%" rx="2" fill="#fff" opacity="0.2" />
                    {/* Border accent */}
                    <rect x="4" y="4" width={w - 8} height={h - 8} rx="4" fill="none" stroke="#6E4F00" strokeWidth="1" opacity="0.4" />
                </svg>
                {/* Key Icon */}
                <div style={{
                    position: "absolute", inset: 0, display: "flex",
                    alignItems: "center", justifyContent: "center",
                }}>
                    <KeySVGIcon size={Math.min(w * 0.6, h * 0.7)} />
                </div>
            </div>
        );
    }

    const pal = STONE_PALETTES[pid.charCodeAt(0) % STONE_PALETTES.length];
    return (
        <div
            onPointerDown={onPointerDown}
            style={{
                position: "absolute", left: x, top: y, width: w, height: h,
                cursor: isV ? "ns-resize" : "ew-resize",
                zIndex: isActive ? 10 : 1,
                transform: isActive ? "scale(1.02)" : "scale(1)",
                transition: isActive ? "none" : "transform 0.1s",
                touchAction: "none",
            }}
        >
            <svg width={w} height={h} style={{ display: "block" }}>
                <defs>
                    <filter id={`stoneTexture${pid}`}>
                        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise" />
                        <feColorMatrix type="saturate" values="0" />
                        <feBlend in="SourceGraphic" in2="noise" mode="multiply" opacity="0.2" />
                    </filter>
                    <linearGradient id={`grad${pid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={pal.top} />
                        <stop offset="100%" stopColor={pal.side} />
                    </linearGradient>
                </defs>
                {/* Main block */}
                <rect x="0" y="0" width={w} height={h} rx="4" fill={`url(#grad${pid})`} />
                <rect x="0" y="0" width={w} height={h} rx="4" filter={`url(#stoneTexture${pid})`} opacity="0.4" />

                {/* Bevel/3D effect */}
                <path d={`M0 0 L${w} 0 L${w - 6} 6 L6 6 Z`} fill="#fff" opacity="0.2" />
                <path d={`M${w} 0 L${w} ${h} L${w - 6} ${h - 6} L${w - 6} 6 Z`} fill="#000" opacity="0.2" />
                <path d={`M0 ${h} L${w} ${h} L${w - 6} ${h - 6} L6 ${h - 6} Z`} fill="#000" opacity="0.3" />
                <path d={`M0 0 L0 ${h} L6 ${h - 6} L6 6 Z`} fill="#fff" opacity="0.1" />

                {/* Random cracks */}
                <path d={`M${w * 0.3} 0 L${w * 0.35} ${h * 0.4} L${w * 0.28} ${h}`}
                    stroke={pal.crack} strokeWidth="1.5" fill="none" opacity="0.4" />
                {piece.length > 2 && (
                    <path d={`M0 ${h * 0.6} L${w * 0.4} ${h * 0.65} L${w} ${h * 0.55}`}
                        stroke={pal.crack} strokeWidth="1" fill="none" opacity="0.3" />
                )}

                {/* Rough edges */}
                <rect x="0" y="0" width={w} height={h} rx="4" fill="none" stroke="#000" strokeWidth="2" opacity="0.2" />
            </svg>
        </div>
    );
}


function useWindowSize() {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    useEffect(() => {
        const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    return size;
}

function computeCell(width, height) {
    // Available space for board (minus padding, heading, controls)
    const isPortrait = height > width;
    // how much vertical space the board can use
    const vPad = isPortrait ? 220 : 160; // heading + controls + margins
    const hPad = 80; // frame + exit arrow + side padding

    const maxFromH = Math.floor((height - vPad) / (ROWS + (ROWS - 1) * (GAP / 68)));
    const maxFromW = Math.floor((width - hPad) / (COLS + (COLS - 1) * (GAP / 68)));

    // Formula: BOARD = COLS * CELL + (COLS-1)*GAP  => CELL = (BOARD - (COLS-1)*GAP) / COLS
    // We want: COLS * CELL + (COLS-1)*GAP <= maxW
    const cellFromW = Math.floor((width - hPad - (COLS - 1) * GAP) / COLS);
    const cellFromH = Math.floor((height - vPad - (ROWS - 1) * GAP) / ROWS);

    let cell = Math.min(cellFromW, cellFromH);
    cell = Math.max(cell, 38); // minimum cell size
    cell = Math.min(cell, 90); // maximum cell size
    return cell;
}

export default function FreeTheKey({ levelIdx: initialLevelIdx = 0, onHome, onWin, onNext }) {
    const [levelIdx, setLevelIdx] = useState(initialLevelIdx);
    const [pieces, setPieces] = useState(() => LEVELS[initialLevelIdx].pieces.map(p => ({ ...p })));
    const [moves, setMoves] = useState(0);
    const [won, setWon] = useState(false);
    const [escaping, setEscaping] = useState(false); // Triggers the unique animation sequence
    const [dragging, setDragging] = useState(null);
    const { width, height } = useWindowSize();

    useEffect(() => {
        setLevelIdx(initialLevelIdx);
        setPieces(LEVELS[initialLevelIdx].pieces.map(p => ({ ...p })));
        setMoves(0);
        setWon(false);
        setEscaping(false);
    }, [initialLevelIdx]);

    const CELL = computeCell(width, height);
    const BOARD = COLS * CELL + (COLS - 1) * GAP;

    const loadLevel = useCallback((idx) => {
        setLevelIdx(idx);
        setPieces(LEVELS[idx].pieces.map(p => ({ ...p })));
        setMoves(0);
        setWon(false);
        setEscaping(false);
    }, []);

    const handlePointerDown = (e, id) => {
        if (won) return;
        e.preventDefault();
        const piece = pieces.find(p => p.id === id);
        setDragging({ id, startX: e.clientX, startY: e.clientY, startCol: piece.col, startRow: piece.row });
    };

    const handlePointerMove = useCallback((e) => {
        if (!dragging) return;
        const piece = pieces.find(p => p.id === dragging.id);
        if (!piece) return;
        const dx = e.clientX - dragging.startX;
        const dy = e.clientY - dragging.startY;

        if (piece.isHorizontal) {
            const delta = Math.round(dx / (CELL + GAP));
            if (delta === 0) return;
            const maxCol = piece.isKey ? COLS + 2 : COLS;
            const clamp = delta > 0
                ? Math.min(delta, maxCol - piece.col - piece.length)
                : Math.max(delta, -piece.col);
            if (clamp !== 0 && canMove(piece, clamp, pieces)) {
                const newCol = dragging.startCol + clamp;
                const newPieces = pieces.map(p => p.id === dragging.id ? { ...p, col: newCol } : p);
                setPieces(newPieces);
                setMoves(m => m + Math.abs(clamp));
                setDragging(d => ({ ...d, startX: dragging.startX + clamp * (CELL + GAP), startCol: newCol }));
                const key = newPieces.find(p => p.isKey);
                if (key && key.col >= COLS && !escaping) {
                    setEscaping(true);
                    if (onWin) onWin();
                    // Sequential animation: 2 Flips (1.2s) -> Shrink/Enter (0.6s) -> Unlock/Rumble (1s)
                    setTimeout(() => {
                        setWon(true);
                    }, 2800);
                }
            }
        } else {
            const delta = Math.round(dy / (CELL + GAP));
            if (delta === 0) return;
            const clamp = delta > 0
                ? Math.min(delta, ROWS - piece.row - piece.length)
                : Math.max(delta, -piece.row);
            if (clamp !== 0 && canMove(piece, clamp, pieces)) {
                const newRow = dragging.startRow + clamp;
                const newPieces = pieces.map(p => p.id === dragging.id ? { ...p, row: newRow } : p);
                setPieces(newPieces);
                setMoves(m => m + Math.abs(clamp));
                setDragging(d => ({ ...d, startY: dragging.startY + clamp * (CELL + GAP), startRow: newRow }));
            }
        }
    }, [dragging, pieces, CELL]);

    const handlePointerUp = useCallback(() => setDragging(null), []);

    useEffect(() => {
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);
        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [handlePointerMove, handlePointerUp]);

    // Key piece row for exit arrow positioning
    const keyPiece = pieces.find(p => p.isKey);
    const keyRow = keyPiece ? keyPiece.row : 2;
    const arrowTop = keyRow * (CELL + GAP) + (CELL - 28) / 2;

    // Responsive layout
    const isSmall = width < 480;
    const isMedium = width >= 480 && width < 900;
    const framepadding = isSmall ? 8 : isMedium ? 12 : 14;
    const exitArrowRight = isSmall ? -26 : -34;
    const cornerStuds = (BOARD + framepadding * 2 + 4);

    return (
        <div style={{
            height: "100%",
            width: "100%",
            background: "radial-gradient(ellipse at 50% 10%, #241000 0%, #0d0500 80%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            fontFamily: "Georgia, serif", userSelect: "none",
            padding: isSmall ? "12px 0" : "20px 0",
            boxSizing: "border-box",
            overflow: "hidden",
            position: "relative",
        }}>
            <style>{`
                @keyframes fadeIn{from{opacity:0}to{opacity:1}}
                @keyframes popIn{from{transform:scale(0.5);opacity:0}to{transform:scale(1);opacity:1}}
                @keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}}
                @keyframes winGlow{0%,100%{box-shadow:0 0 40px #DAA52055}50%{box-shadow:0 0 80px #DAA520aa}}
                @keyframes keyMagicalFlip {
                    0% { transform: scale(1) rotate(0); filter: drop-shadow(0 0 0 gold); }
                    30% { transform: scale(1.3) rotate(180deg); filter: drop-shadow(0 0 15px gold); }
                    60% { transform: scale(1.3) rotate(360deg); filter: drop-shadow(0 0 15px gold); }
                    85% { transform: scale(0.6) translate(120px, 0); opacity: 1; }
                    100% { transform: scale(0) translate(180px, 0); opacity: 0; }
                }
                @keyframes lockRumble {
                    0%, 100% { transform: translate(0,0); }
                    25% { transform: translate(-3px, 2px); }
                    50% { transform: translate(3px, -2px); }
                    75% { transform: translate(-3px, -2px); }
                }
                @keyframes flare {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(2); opacity: 0.8; }
                    100% { transform: scale(4); opacity: 0; }
                }
                @keyframes dustRise {
                    0% { transform: scale(0.5); opacity: 0; }
                    50% { opacity: 0.8; }
                    100% { transform: scale(4) translateY(-100px); opacity: 0; }
                }
                .unique-key-anim { animation: keyMagicalFlip 1.8s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards; }
                .screen-rumble { animation: lockRumble 0.1s infinite; }
                .light-flare { 
                    position: absolute; width: 40px; height: 40px; 
                    background: radial-gradient(circle, #fff 0%, #ffd700 40%, transparent 70%);
                    border-radius: 50%; pointer-events: none;
                    animation: flare 0.8s ease-out forwards;
                }
                .temple-dust {
                    position: absolute; border-radius: 50%;
                    background: radial-gradient(circle, #5b3a1a 0%, transparent 70%);
                    filter: blur(20px); pointer-events: none;
                }
                * { box-sizing: border-box; }
            `}</style>

            {/* Header Header with Home, Stats, and Reset */}
            <div style={{
                width: BOARD + (isSmall ? 16 : 24) + (isSmall ? 16 : 24),
                maxWidth: "96vw",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: isSmall ? 12 : 16,
                zIndex: 50
            }}>
                <Btn onClick={onHome} small={isSmall}>⇠ Home</Btn>

                <div style={{ textAlign: "center", flex: 1 }}>
                    <p style={{
                        color: "#A87850", margin: 0, fontSize: isSmall ? 15 : 16,
                        letterSpacing: isSmall ? 2 : 4, textTransform: "uppercase",
                        fontWeight: "bold"
                    }}>
                        Level {levelIdx + 1} &nbsp;•&nbsp; Moves: {moves}
                    </p>
                </div>

                <Btn onClick={() => loadLevel(levelIdx)} small={isSmall}>↺ Reset</Btn>
            </div>

            {/* Temple border frame */}
            <div style={{
                position: "relative",
                background: "linear-gradient(135deg, #4d2600, #2b1400)",
                borderLeft: `${isSmall ? 8 : 12}px solid #7a4412`,
                borderTop: `${isSmall ? 8 : 12}px solid #7a4412`,
                borderBottom: `${isSmall ? 8 : 12}px solid #7a4412`,
                borderRadius: 10,
                padding: framepadding,
                boxShadow: "0 0 60px rgba(0,0,0,0.8), inset 0 0 30px rgba(0,0,0,0.5)",
            }}>
                {/* Right border with opening */}
                <div style={{
                    position: "absolute", right: isSmall ? -8 : -12, top: 0, bottom: 0,
                    width: isSmall ? 8 : 12, display: "flex", flexDirection: "column"
                }}>
                    <div style={{ height: framepadding + keyRow * (CELL + GAP), background: "#7a4412" }} />
                    <div style={{ height: CELL, background: "transparent" }} />
                    <div style={{ flex: 1, background: "#7a4412", borderBottomRightRadius: 10 }} />
                </div>
                {/* Carved border details */}
                <svg style={{ position: "absolute", inset: -12, width: `calc(100% + 24px)`, height: `calc(100% + 24px)`, pointerEvents: "none" }}>
                    <defs>
                        <pattern id="carving" width="30" height="30" patternUnits="userSpaceOnUse">
                            <circle cx="15" cy="15" r="8" fill="none" stroke="#5a3018" strokeWidth="1" opacity="0.3" />
                            <rect x="5" y="5" width="20" height="20" fill="none" stroke="#5a3018" strokeWidth="0.5" transform="rotate(45 15 15)" opacity="0.2" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#carving)" fillOpacity="0.4" />
                </svg>



                {/* Exit arrow - aligned with key row
                <div style={{
                    position: "absolute",
                    right: exitArrowRight - 10,
                    top: framepadding + arrowTop,
                    animation: "pulse 1.4s ease-in-out infinite",
                    zIndex: 20,
                    filter: "drop-shadow(0 0 10px #FFD700)",
                }}>
                    <svg width={isSmall ? 28 : 36} height={isSmall ? 28 : 36} viewBox="0 0 32 32">
                        <polygon points="4,10 20,10 20,4 30,16 20,28 20,22 4,22" fill="#FFD700" />
                    </svg>
                </div> */}

                {/* Board */}
                <div style={{
                    position: "relative", width: BOARD, height: BOARD,
                    borderRadius: 4, overflow: "hidden",
                    boxShadow: "inset 0 0 40px #000",
                    background: "#1a0f00",
                }}>
                    {/* Dark stone floor with tiles */}
                    <svg style={{ position: "absolute", inset: 0 }} width={BOARD} height={BOARD}>
                        <defs>
                            <pattern id="floorTile" width={CELL + GAP} height={CELL + GAP} patternUnits="userSpaceOnUse">
                                <rect width={CELL} height={CELL} fill="#241505" />
                                <rect width={CELL} height={CELL} fill="url(#stoneNoise)" opacity="0.1" />
                                <path d={`M0 0 L${CELL} 0 L${CELL} ${CELL} L0 ${CELL} Z`} fill="none" stroke="#000" strokeWidth="2" opacity="0.3" />
                            </pattern>
                            <filter id="stoneNoise">
                                <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" />
                                <feColorMatrix type="saturate" values="0" />
                            </filter>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#floorTile)" />

                        {/* Grid glow */}
                        {Array.from({ length: ROWS }).map((_, r) =>
                            Array.from({ length: COLS }).map((_, c) => (
                                <rect key={`${r},${c}`}
                                    x={c * (CELL + GAP) + 2} y={r * (CELL + GAP) + 2}
                                    width={CELL - 4} height={CELL - 4}
                                    fill={(r + c) % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent"}
                                    rx="2"
                                />
                            ))
                        )}
                    </svg>

                    {/* Exit guide glow */}
                    <div style={{
                        position: "absolute", right: 0,
                        top: keyRow * (CELL + GAP),
                        width: CELL * 2, height: CELL,
                        background: "linear-gradient(90deg, transparent, rgba(255,215,0,0.1))",
                        pointerEvents: "none",
                        transition: "top 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    }} />

                    {/* Render all pieces */}
                    {pieces.map(p => (
                        <StoneBlockSVG
                            key={p.id}
                            piece={p}
                            isActive={dragging?.id === p.id}
                            onPointerDown={(e) => handlePointerDown(e, p.id)}
                            cell={CELL}
                        />
                    ))}
                </div>
            </div>



            <p style={{
                color: "#4a2a10", fontSize: isSmall ? 9 : 11,
                marginTop: 8, letterSpacing: 2, textAlign: "center",
            }}>
                {/* DRAG STONE BLOCKS · SLIDE KEY TO EXIT → */}
            </p>

            {/* Win overlay */}
            {won && (
                <div style={{
                    position: "fixed", inset: 0, background: "#000000aa",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 100, animation: "fadeIn 0.4s ease",
                    padding: "16px",
                }}>
                    <div style={{
                        background: "linear-gradient(145deg,#3d1a00,#1a0800)",
                        border: "4px solid #DAA520",
                        borderRadius: 20,
                        padding: isSmall ? "20px 24px" : "32px 40px",
                        textAlign: "center",
                        boxShadow: "0 0 80px #DAA52055",
                        animation: "popIn 0.45s cubic-bezier(0.175,0.885,0.32,1.275), winGlow 2s ease-in-out infinite 0.5s",
                        maxWidth: "85vw",
                    }}>
                        <div style={{ fontSize: isSmall ? 36 : 48, marginBottom: 6 }}>
                            <KeySVGIcon size={isSmall ? 40 : 56} />
                        </div>
                        <h2 style={{
                            color: "#DAA520",
                            fontSize: isSmall ? 18 : 24,
                            margin: "0 0 4px",
                            letterSpacing: 2, fontVariant: "small-caps",
                        }}>
                            {levelIdx === LEVELS.length - 1 ? "All Expeditions Complete!" : "Key Escaped!"}
                        </h2>
                        <p style={{ color: "#a07040", margin: "0 0 16px", fontSize: isSmall ? 11 : 13 }}>
                            {levelIdx === LEVELS.length - 1
                                ? "You have mastered every challenge in the temple."
                                : `Solved in ${moves} moves`}
                        </p>
                        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                            <Btn onClick={() => loadLevel(levelIdx)} small={isSmall}>Replay</Btn>
                            {levelIdx < LEVELS.length - 1 ? (
                                <Btn active onClick={onNext} small={isSmall}>Next Level →</Btn>
                            ) : (
                                <Btn active onClick={onHome} small={isSmall}>Back to Village</Btn>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Btn({ children, onClick, active, small }) {
    const [hover, setHover] = useState(false);
    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                padding: small ? "6px 12px" : "8px 18px",
                background: active
                    ? "linear-gradient(135deg,#8B5E14,#5a3a08)"
                    : hover
                        ? "linear-gradient(135deg,#4a2200,#280f00)"
                        : "linear-gradient(135deg,#3a1800,#200e00)",
                border: `2px solid ${active ? "#DAA520" : hover ? "#9a6a20" : "#6b3c10"}`,
                borderRadius: 8, color: "#DAA520",
                fontSize: small ? 11 : 13,
                cursor: "pointer", letterSpacing: 1,
                fontFamily: "Georgia,serif",
                boxShadow: active
                    ? "0 2px 12px #DAA52044"
                    : "0 2px 8px #00000066",
                transition: "all 0.18s ease",
                transform: hover ? "translateY(-1px)" : "none",
                whiteSpace: "nowrap",
            }}
        >
            {children}
        </button>
    );
}