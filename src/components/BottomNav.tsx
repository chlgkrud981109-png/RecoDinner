import React from 'react';
import { Home, Users, BookHeart, Settings } from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'community', icon: Users, label: '커뮤니티' },
    { id: 'archive', icon: BookHeart, label: '나의 명언 모음집' },
    { id: 'settings', icon: Settings, label: '설정' },
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} />
            <span className="nav-label">{item.label}</span>
            {isActive && <div className="nav-indicator" />}
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
