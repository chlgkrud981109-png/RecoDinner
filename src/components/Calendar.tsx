import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TearEffect from './TearEffect';
import QuoteCard from './QuoteCard';
import '../styles/global.css';

const MOCK_QUOTES = [
  { id: 1, date: '2024.03.08', quote: '오늘 걷지 않으면\n내일은 뛰어야 한다.', author: 'Anonymous' },
  { id: 2, date: '2024.03.09', quote: '여백의 미는\n채우지 않음에서 온다.', author: 'Traditional' },
  { id: 3, date: '2024.03.10', quote: '작은 것들이 모여\n커다란 기적을 만든다.', author: 'Seneca' },
];

const Calendar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [archive, setArchive] = useState<any[]>([]);

  const handleTear = () => {
    const tornQuote = MOCK_QUOTES[currentIndex];
    setArchive(prev => [...prev, tornQuote]);
    
    // 다음 명언으로 교체 (마지막이면 처음으로)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_QUOTES.length);
    }, 100);
  };

  return (
    <div className="calendar-container">
      {/* 배경 카드 (현재 카드 뒤에 보일 다음 카드) */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.5 }}>
        <QuoteCard {...MOCK_QUOTES[(currentIndex + 1) % MOCK_QUOTES.length]} />
      </div>

      {/* 찢어지는 효과가 적용된 현재 카드 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={MOCK_QUOTES[currentIndex].id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        >
          <TearEffect onTear={handleTear}>
            <QuoteCard {...MOCK_QUOTES[currentIndex]} />
          </TearEffect>
        </motion.div>
      </AnimatePresence>

      {/* 보관함 버튼 (UI 하단 가이드) */}
      <div style={{ 
        position: 'absolute', 
        bottom: '-60px', 
        width: '100%', 
        textAlign: 'center',
        color: 'var(--text-date)',
        fontSize: '0.8rem'
      }}>
        위로 밀어서 오늘을 찢어보세요 ({archive.length}개 보관됨)
      </div>
    </div>
  );
};

export default Calendar;
