import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import BottomNav from './components/BottomNav';
import Archive from './components/Archive';
import Community from './components/Community';
import { Sun, Moon } from 'lucide-react';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [archive, setArchive] = useState<any[]>(() => {
    const saved = localStorage.getItem('archive');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('archive', JSON.stringify(archive));
  }, [archive]);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleTear = (quote: any) => {
    setArchive(prev => [...prev, quote]);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Calendar onTear={handleTear} archiveCount={archive.length} />;
      case 'archive':
        return <Archive archive={archive} />;
      case 'community':
        return <Community />;
      case 'settings':
        return (
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--mincho-font)' }}>설정</h2>
            <div style={{ 
              marginTop: '40px', 
              background: 'var(--pastel-card)', 
              padding: '20px', 
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>다크 모드</span>
              <button 
                onClick={() => setIsDark(!isDark)}
                style={{
                  background: 'var(--pastel-bg)',
                  border: '1px solid var(--text-date)',
                  borderRadius: '20px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--text-main)'
                }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                {isDark ? '라이트 모드' : '다크 모드'}
              </button>
            </div>
            <div style={{ marginTop: '20px', color: 'var(--text-date)', fontSize: '0.8rem' }}>
              버전 1.0.0
            </div>
          </div>
        );
      default:
        return <Calendar onTear={handleTear} archiveCount={archive.length} />;
    }
  };

  return (
    <div className="App">
      <main className="main-content">
        {renderContent()}
      </main>
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
}

export default App;

