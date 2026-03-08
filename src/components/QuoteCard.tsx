import React from 'react';

interface QuoteCardProps {
  date: string;
  quote: string;
  author: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ date, quote, author }) => {
  return (
    <div className="paper-texture" style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--pastel-card)',
      padding: '40px 30px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      borderRadius: '2px 2px 10px 10px',
    }}>
      <header style={{ borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
        <h2 style={{ 
          margin: 0, 
          fontSize: '1.2rem', 
          color: 'var(--text-date)',
          fontWeight: 400 
        }}>{date}</h2>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{
          fontSize: '1.5rem',
          lineHeight: '2.2rem',
          textAlign: 'center',
          wordBreak: 'keep-all',
          whiteSpace: 'pre-wrap'
        }}>{quote}</p>
      </main>

      <footer style={{ textAlign: 'right' }}>
        <span style={{ 
          fontSize: '0.9rem', 
          color: 'var(--text-date)',
          fontStyle: 'italic'
        }}>— {author}</span>
      </footer>
    </div>
  );
};

export default QuoteCard;
