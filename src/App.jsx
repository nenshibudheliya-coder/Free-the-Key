import React, { useState, useEffect, Component } from 'react'
import SideAdsLayout from "./Components/SideAdsLayout"; // Google Ads //

import HomePage from './Components/home.jsx';
import LevelSelect from './Components/LevelSelect.jsx';
import FreeTheKey from './Components/free.jsx';

// Mini loading component (Kept for reference if needed elsewhere)
const TempleLoading = () => (
  <div style={{
    height: '100vh', width: '100vw', display: 'flex', alignItems: 'center',
    justifyContent: 'center', background: '#1c0800', color: '#DAA520',
    fontFamily: 'Georgia, serif'
  }}>
    <div style={{ textAlign: 'center' }}>
      {/* <h2 style={{ letterSpacing: '4px', animation: 'pulse 1.5s infinite' }}>ENTERING TEMPLE...</h2> */}
    </div>
  </div>
);

import './App.css'
import { LEVELS } from './data/levels.js'


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) { return { hasError: true }; }
  componentDidCatch(error, errorInfo) { console.error("Game Error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: '#DAA520', background: '#240a00', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2>Oops! The temple collapsed.</h2>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', background: '#8b6508', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Restart Map</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'levelSelect' | 'game'
  const [levelIdx, setLevelIdx] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(() => {
    const saved = localStorage.getItem('unlockedCount');
    return saved ? parseInt(saved) : 1;
  });
  const [completedLevels, setCompletedLevels] = useState(() => {
    const saved = localStorage.getItem('completedLevels');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('unlockedCount', unlockedCount);
  }, [unlockedCount]);

  useEffect(() => {
    localStorage.setItem('completedLevels', JSON.stringify(completedLevels));
  }, [completedLevels]);

  const startLevel = (idx) => {
    setLevelIdx(idx);
    setScreen('game');
  }

  const handleWin = (idx) => {
    const nextToUnlock = idx + 2;
    if (nextToUnlock > unlockedCount) {
      setUnlockedCount(nextToUnlock);
    }
    if (!completedLevels.includes(idx)) {
      setCompletedLevels(prev => [...prev, idx]);
    }
  }

  return (
    <SideAdsLayout showAds={true}> {/* Google Ads */}
      <ErrorBoundary>
        <style>{`
        @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @media (max-width: 900px) and (orientation: landscape) {
          .global-landscape-warning {
            display: flex !important;
          }
        }
      `}</style>

        {/* Global Landscape Warning Overlay */}
        <div className="global-landscape-warning" style={{
          position: "fixed", inset: 0, zIndex: 9999,
          background: "radial-gradient(circle at center, #2b1400 0%, #0d0500 100%)",
          display: "none", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          textAlign: "center", padding: "20px", color: "#DAA520",
          fontFamily: "Georgia, serif"
        }}>
          <div style={{ marginBottom: "20px", animation: "pulse 2s infinite" }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </div>
          <h2 style={{ margin: "0 0 10px", fontSize: "20px", letterSpacing: "2px", fontWeight: "bold" }}>PORTRAIT MODE REQUIRED</h2>
          <p style={{ color: "#a87850", fontSize: "14px", maxWidth: "250px", lineHeight: "1.5" }}>
            {/* Please rotate your device to the temple's upright position to continue your expedition. */}
          </p>
        </div>

        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
          {/* Instant loading without Suspense */}
          {screen === 'home' && (
            <HomePage onStart={() => setScreen('levelSelect')} />
          )}

          {screen === 'levelSelect' && (
            <LevelSelect
              onPlay={startLevel}
              onBack={() => setScreen('home')}
              unlockedCount={unlockedCount}
              completedLevels={completedLevels}
            />
          )}

          {screen === 'game' && (
            <FreeTheKey
              levelIdx={levelIdx}
              onHome={() => setScreen('levelSelect')}
              onNext={() => {
                handleWin(levelIdx);
                if (levelIdx < LEVELS.length - 1) {
                  setLevelIdx(prev => prev + 1);
                } else {
                  setScreen('levelSelect');
                }
              }}
            />
          )}
        </div>
      </ErrorBoundary>
    </SideAdsLayout> // Google Ads //
  )
}

export default App