import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import { Sun, Moon } from 'lucide-react';

function App() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="App">
      <button 
        onClick={() => setIsDark(!isDark)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 100,
          background: 'var(--pastel-card)',
          border: '1px solid var(--text-date)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-main)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <Calendar />
    </div>
  );
}

export default App;

