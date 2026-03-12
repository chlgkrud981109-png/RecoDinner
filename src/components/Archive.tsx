import React from 'react';
import QuoteCard from './QuoteCard';

interface ArchiveProps {
  archive: any[];
}

const Archive: React.FC<ArchiveProps> = ({ archive }) => {
  return (
    <div className="archive-page" style={{ 
      width: '100%', 
      height: '100%', 
      overflowY: 'auto', 
      padding: '20px',
      paddingTop: '60px',
      paddingBottom: '100px' 
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        fontFamily: 'var(--mincho-font)', 
        color: 'var(--text-main)',
        marginBottom: '30px',
        fontSize: '1.5rem'
      }}>나의 명언 서랍</h2>
      
      {archive.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '100px', 
          color: 'var(--text-date)',
          fontSize: '0.9rem'
        }}>
          아직 보관된 명언이 없습니다.<br/>오늘의 명언을 아래로 찢어서 보관해 보세요.
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '40px',
          justifyItems: 'center'
        }}>
          {[...archive].reverse().map((item, index) => (
            <div key={index} style={{ 
              width: '100%', 
              maxWidth: '320px', 
              transform: `rotate(${Math.random() * 4 - 2}deg)`, // 약간 불규칙한 배치 효과
              transition: 'transform 0.3s ease'
            }}
            className="archive-item"
            >
              <div className="paper-stack" style={{ width: '100%', aspectRatio: '4/5' }}>
                <QuoteCard 
                  date={new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })} // 실제 데이터엔 날짜가 포함되어야 함
                  quote={item.quote}
                  author={item.author}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;
