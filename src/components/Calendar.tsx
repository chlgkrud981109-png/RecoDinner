import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TearEffect from './TearEffect';
import QuoteCard from './QuoteCard';
import '../styles/global.css';

export const MOCK_QUOTES = [
  { 
    id: 1, 
    quote: "가장 큰 위험은 아무런 위험도 감수하지 않는 것이다.", 
    author: "마크 저커버그",
    description: "변화하는 세상에서 반드시 실패하는 유일한 전략은 위험을 감수하지 않는 것입니다. 오늘 작은 도전 하나를 시작해보세요."
  },
  { 
    id: 2, 
    quote: "내일 일을 오늘 걱정하지 마라. 내일은 내일의 태양이 뜬다.", 
    author: "데일 카네기",
    description: "우리가 하는 걱정의 90%는 일어나지 않을 일들에 대한 것입니다. 현재의 순간에 집중하며 마음의 평화를 찾아보세요."
  },
  { 
    id: 3, 
    quote: "행복은 습관이다. 그것을 몸에 익혀라.", 
    author: "허버트 허버드",
    description: "행복은 거창한 사건이 아니라 매일 반복되는 작은 긍정적인 생각들에서 시작됩니다. 지금 이 순간 감사한 것 하나를 떠올려보세요."
  },
  { 
    id: 4, 
    quote: "어제와 똑같은 삶을 살면서 다른 미래를 기대하는 것은 미친 짓이다.", 
    author: "알베르트 아인슈타인",
    description: "삶의 변화를 원한다면 아주 작은 습관부터 바꿔야 합니다. 오늘 당신의 루틴에 아주 작은 변화를 주어보세요."
  },
  { 
    id: 5, 
    quote: "성공은 최종적인 것이 아니며, 실패는 치명적인 것이 아니다. 중요한 것은 지속하는 용기다.", 
    author: "윈스턴 처칠",
    description: "넘어지는 것은 실패가 아닙니다. 다시 일어나지 않는 것이 실패입니다. 당신의 끈기가 결국 결과를 만들어낼 것입니다."
  },
  { 
    id: 6, 
    quote: "자신을 믿는 순간, 어떻게 살아야 할지 알게 된다.", 
    author: "요한 볼프강 폰 괴테",
    description: "타인의 시선이 아닌 내면의 목소리에 귀를 기울여보세요. 당신은 당신이 생각하는 것보다 훨씬 강하고 지혜로운 사람입니다."
  },
  { 
    id: 7, 
    quote: "길을 잃는다는 것은 곧 길을 찾게 된다는 뜻이다.", 
    author: "동양 격언",
    description: "방황은 성장의 과정입니다. 지금 정체되어 있다고 느껴진다면, 그것은 새로운 길을 발견하기 위한 준비 단계일 뿐입니다."
  }
];

interface CalendarProps {
  onTear: (quote: any) => void;
  archiveCount: number;
}

const Calendar: React.FC<CalendarProps> = ({ onTear, archiveCount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
    onTear(tornQuote);
    
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
          description={MOCK_QUOTES[(currentIndex + 1) % MOCK_QUOTES.length].description}
        />
      </div>

      {/* 찢어지는 효과가 적용된 현재 카드 */}
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={false}
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
                description={MOCK_QUOTES[currentIndex].description}
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
        아래로 찢어서 오늘을 보관하세요 ({archiveCount}개 보관됨)
      </div>
    </div>
  );
};

export default Calendar;
