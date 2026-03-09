import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TearEffect from './TearEffect';
import QuoteCard from './QuoteCard';
import '../styles/global.css';

const MOCK_QUOTES = [
  { id: 1, quote: "Life is short. Smile while you still have teeth.", author: "Anonymous" },
  { id: 2, quote: "Never put off till tomorrow what you can do the day after tomorrow.", author: "Mark Twain" },
  { id: 3, quote: "I'm not lazy, I'm on energy-saving mode.", author: "Anonymous" },
  { id: 4, quote: "My bed and I have a special relationship. We're perfect for each other.", author: "Anonymous" },
  { id: 5, quote: "I like hashtags because they look like waffles.", author: "Anonymous" },
  { id: 6, quote: "Stressed spelled backwards is desserts. Coincidence? I think not!", author: "Anonymous" },
  { id: 7, quote: "I'm not superstitious, but I am a little stitious.", author: "Michael Scott" },
  { id: 8, quote: "I'm on a seafood diet. I see food and I eat it.", author: "Anonymous" },
  { id: 9, quote: "If at first you don't succeed, then skydiving definitely isn't for you.", author: "Anonymous" },
  { id: 10, quote: "Always remember that you are absolutely unique. Just like everyone else.", author: "Margaret Mead" },
  { id: 11, quote: "I'm writing a book. I've got the page numbers done.", author: "Steven Wright" },
  { id: 12, quote: "The only thing I throw back on Thursdays is a good coffee.", author: "Anonymous" },
  { id: 13, quote: "You don't have to be crazy to hang out with me. I can train you.", author: "Anonymous" },
  { id: 14, quote: "The early bird gets the worm, but the second mouse gets the cheese.", author: "Anonymous" },
  { id: 15, quote: "I'm not saying I'm Superman, but no one has ever seen me and Superman in the same room together.", author: "Anonymous" },
];

const Calendar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [archive, setArchive] = useState<any[]>([]);
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setTodayDate(today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));

    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    setCurrentIndex(dayOfYear % MOCK_QUOTES.length);
  }, []);

  const handleTear = () => {
    const tornQuote = MOCK_QUOTES[currentIndex];
    setArchive(prev => [...prev, tornQuote]);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % MOCK_QUOTES.length);
    }, 100);
  };

  return (
    <div className="calendar-container">
      {/* 상단 제본부 */}
      <div className="calendar-binding">
        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', letterSpacing: '2px' }}>
          DAILY QUOTES
        </div>
      </div>

      {/* 배경 카드 (중첩 레이어 느낌) */}
      <div className="paper-stack" style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.5 }}>
        <QuoteCard 
          date={todayDate}
          quote={MOCK_QUOTES[(currentIndex + 1) % MOCK_QUOTES.length].quote}
          author={MOCK_QUOTES[(currentIndex + 1) % MOCK_QUOTES.length].author}
        />
      </div>

      {/* 찢어지는 효과가 적용된 현재 카드 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        >
          <TearEffect onTear={handleTear}>
            <div className="paper-stack" style={{ width: '100%', height: '100%' }}>
              <QuoteCard 
                date={todayDate}
                quote={MOCK_QUOTES[currentIndex].quote}
                author={MOCK_QUOTES[currentIndex].author}
              />
            </div>
          </TearEffect>
        </motion.div>
      </AnimatePresence>

      <div style={{ 
        position: 'absolute', 
        bottom: '-60px', 
        width: '100%', 
        textAlign: 'center',
        color: 'var(--text-date)',
        fontSize: '0.8rem'
      }}>
        아래로 찢어서 오늘을 보관하세요 ({archive.length}개 보관됨)
      </div>
    </div>
  );
};

export default Calendar;
