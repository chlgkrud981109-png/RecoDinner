import React from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';

interface TearEffectProps {
  children: React.ReactNode;
  onTear: () => void;
}

const TearEffect: React.FC<TearEffectProps> = ({ children, onTear }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // 드래그 방향에 따른 실감나는 회전 (사선 찢기 느낌)
  const rotate = useTransform([x, y], ([latestX, latestY]: any) => {
    return (latestX / 20) + (latestY / 10);
  });
  
  const opacity = useTransform(y, [0, 400], [1, 0]);

  const handleDragEnd = async (event: any, info: PanInfo) => {
    // 100px 이상 아래나 사선으로 드래그 시 찢기 성공
    if (info.offset.y > 100 || info.offset.x > 100) {
      await controls.start({
        x: info.offset.x > 0 ? 500 : -500,
        y: 800,
        rotate: info.offset.x > 0 ? 45 : -45,
        opacity: 0,
        transition: { duration: 0.5, ease: "easeIn" }
      });
      onTear();
      // 위치 초기화
      x.set(0);
      y.set(0);
      controls.set({ x: 0, y: 0, rotate: 0, opacity: 1 });
    } else {
      // 제자리로 복귀
      controls.start({ 
        x: 0, y: 0, rotate: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 } 
      });
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ top: 0 }}
      dragElastic={0.4}
      style={{ x, y, rotate, opacity, cursor: 'grab', position: 'absolute', width: '100%', height: '100%' }}
      animate={controls}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
    >
      <div className="tear-line" />
      {children}
    </motion.div>
  );
};

export default TearEffect;
