import React, { useState, useEffect, Component } from 'react'

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

import HomePage from './Components/home.jsx'
import LevelSelect from './Components/LevelSelect.jsx'
import FreeTheKey from './Components/free.jsx'
import './App.css'

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
    <ErrorBoundary>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
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
            onWin={() => handleWin(levelIdx)}
            onNext={() => {
              // Check BEFORE handleWin — is this a replay or first-time clear?
              const isReplay = completedLevels.includes(levelIdx);
              handleWin(levelIdx);
              if (isReplay) {
                // Replay: Next level locked rakhvo — Level Select par moko
                setScreen('levelSelect');
              } else {
                // First-time clear: next level unlock karo ane advance karo
                setLevelIdx(prev => prev + 1);
              }
            }}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App