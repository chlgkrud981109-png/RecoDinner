import React, { useState } from 'react';
import { Heart, MessageSquare, Send } from 'lucide-react';

interface Post {
  id: number;
  content: string;
  author: string;
  likes: number;
  timestamp: string;
}

const Community: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, content: "오늘의 힘듦은 내일의 거름이 될 거예요.", author: "익명", likes: 15, timestamp: "1시간 전" },
    { id: 2, content: "지나간 일에 너무 마음 쓰지 마세요. 우리에겐 더 빛나는 내일이 있으니까요.", author: "희망이", likes: 42, timestamp: "3시간 전" },
    { id: 3, content: "커피 한 잔의 여유가 필요한 오후네요. 다들 화이팅!", author: "일상러", likes: 8, timestamp: "5시간 전" },
  ]);
  const [newPost, setNewPost] = useState('');

  const handleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: Date.now(),
      content: newPost,
      author: "나",
      likes: 0,
      timestamp: "방금 전"
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="community-page" style={{ 
      width: '100%', 
      height: '100%', 
      overflowY: 'auto', 
      padding: '20px',
      paddingTop: '60px',
      paddingBottom: '100px',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        fontFamily: 'var(--mincho-font)', 
        color: 'var(--text-main)',
        marginBottom: '20px',
        fontSize: '1.5rem'
      }}>명언 광장</h2>
      
      <p style={{ 
        textAlign: 'center', 
        fontSize: '0.85rem', 
        color: 'var(--text-date)',
        marginBottom: '30px'
      }}>
        좋아요 50개를 넘으면 오늘의 명언 후보가 됩니다!
      </p>

      {/* 포스트 작성 창 */}
      <form onSubmit={handleSubmit} style={{ 
        background: 'var(--pastel-card)', 
        padding: '15px', 
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        marginBottom: '30px'
      }}>
        <textarea 
          placeholder="당신의 명언을 나누어 주세요..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          style={{ 
            width: '100%', 
            minHeight: '80px', 
            border: 'none', 
            background: 'transparent',
            fontFamily: 'var(--mincho-font)',
            fontSize: '1rem',
            resize: 'none',
            outline: 'none',
            color: 'var(--text-main)'
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button type="submit" style={{ 
            background: 'var(--accent-color)', 
            color: 'white', 
            border: 'none', 
            padding: '8px 16px', 
            borderRadius: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.9rem'
          }}>
            <Send size={16} /> 보내기
          </button>
        </div>
      </form>

      {/* 포스트 리스트 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {posts.map(post => (
          <div key={post.id} style={{ 
            background: 'var(--pastel-card)', 
            padding: '20px', 
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            borderLeft: post.likes >= 40 ? `4px solid var(--accent-color)` : 'none'
          }}>
            <div style={{ marginBottom: '15px', fontSize: '1.1rem', lineHeight: '1.6' }}>
              "{post.content}"
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-date)' }}>
                {post.author} · {post.timestamp}
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button 
                  onClick={() => handleLike(post.id)}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '4px',
                    color: post.likes >= 40 ? 'var(--accent-color)' : 'var(--text-date)'
                  }}
                >
                  <Heart size={18} fill={post.likes >= 40 ? 'var(--accent-color)' : 'none'} />
                  {post.likes}
                </button>
                <button style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  color: 'var(--text-date)'
                }}>
                  <MessageSquare size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
