import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import BottomNav from './components/BottomNav';
import Archive from './components/Archive';
import Community from './components/Community';
import PrivacyPolicy from './components/PrivacyPolicy';
import { Sun, Moon, Shield, Info, Mail, ChevronLeft } from 'lucide-react';

function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [subView, setSubView] = useState<string | null>(null);
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

  const renderSettings = () => {
    if (subView === 'privacy') {
      return (
        <div>
          <button onClick={() => setSubView(null)} style={backButtonStyle}>
            <ChevronLeft size={20} /> 뒤로가기
          </button>
          <PrivacyPolicy />
        </div>
      );
    }

    if (subView === 'about') {
      return (
        <div style={{ padding: '20px' }}>
          <button onClick={() => setSubView(null)} style={backButtonStyle}>
            <ChevronLeft size={20} /> 뒤로가기
          </button>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2 style={{ fontFamily: 'var(--mincho-font)' }}>About RecoDinner</h2>
            <p style={{ marginTop: '20px', lineHeight: '1.8', color: 'var(--text-main)' }}>
              RecoDinner는 '찢어지는 달력'의 아날로그 감성을 디지털로 재해석한 서비스입니다.<br/>
              매일 새로운 명언과 함께 당신의 하루를 기록하고 보관하세요.<br/>
              우리는 바쁜 일상 속에서 잠시 멈춰 서서 생각할 수 있는 시간을 제공하고자 합니다.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '20px' }}>
        <h2 style={{ fontFamily: 'var(--mincho-font)', textAlign: 'center' }}>설정</h2>
        
        <div style={settingItemStyle}>
          <span>테마 설정</span>
          <button 
            onClick={() => setIsDark(!isDark)}
            style={toggleButtonStyle}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            {isDark ? '라이트 모드' : '다크 모드'}
          </button>
        </div>

        <div style={{ marginTop: '20px' }}>
          <div style={menuLinkStyle} onClick={() => setSubView('about')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Info size={18} /> 서비스 소개
            </div>
          </div>
          <div style={menuLinkStyle} onClick={() => setSubView('privacy')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={18} /> 개인정보처리방침
            </div>
          </div>
          <div style={menuLinkStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={18} /> 문의: chlgkrud981109@gmail.com
            </div>
          </div>
        </div>

        <div style={{ marginTop: '40px', color: 'var(--text-date)', fontSize: '0.8rem', textAlign: 'center' }}>
          버전 1.0.0 | © 2026 RecoDinner
        </div>
      </div>
    );
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
        return renderSettings();
      default:
        return <Calendar onTear={handleTear} archiveCount={archive.length} />;
    }
  };

  return (
    <div className="App">
      <main className="main-content">
        {renderContent()}
      </main>
      <BottomNav currentTab={currentTab} onTabChange={(tab) => {
        setCurrentTab(tab);
        setSubView(null);
      }} />
    </div>
  );
}

const backButtonStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--text-date)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  marginBottom: '15px'
};

const settingItemStyle: React.CSSProperties = {
  marginTop: '20px', 
  background: 'var(--pastel-card)', 
  padding: '20px', 
  borderRadius: '12px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const toggleButtonStyle: React.CSSProperties = {
  background: 'var(--pastel-bg)',
  border: '1px solid var(--text-date)',
  borderRadius: '20px',
  padding: '8px 16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  color: 'var(--text-main)'
};

const menuLinkStyle: React.CSSProperties = {
  padding: '15px',
  borderBottom: '1px solid var(--pastel-card)',
  cursor: 'pointer',
  color: 'var(--text-main)',
  fontSize: '0.95rem'
};

export default App;

