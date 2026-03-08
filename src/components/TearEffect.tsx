import React from 'react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';

interface TearEffectProps {
  children: React.ReactNode;
  onTear: () => void;
}

const TearEffect: React.FC<TearEffectProps> = ({ children, onTear }) => {
  const y = useMotionValue(0);
  const controls = useAnimation();

  // 드래그 양에 따른 부드러운 회전 및 투명도 변화
  const rotate = useTransform(y, [0, -200], [0, -8]);
  const skewX = useTransform(y, [0, -200], [0, 4]);
  const opacity = useTransform(y, [0, -400], [1, 0]);

  const handleDragEnd = async (event: any, info: PanInfo) => {
    // 150px 이상 위로 드래그 시 찢기 성공
    if (info.offset.y < -150) {
      await controls.start({
        y: -1000,
        rotate: -20,
        scale: 0.9,
        transition: { duration: 0.6, ease: [0.32, 0, 0.67, 0] }
      });
      onTear();
      // 위치 초기화 (새 카드가 나타날 때를 대비)
      y.set(0);
      controls.set({ y: 0, rotate: 0, scale: 1, opacity: 1 });
    } else {
      // 제자리로 탄성 있게 복귀 (Spring Physics)
      controls.start({ 
        y: 0, rotate: 0, skewX: 0,
        transition: { type: 'spring', stiffness: 300, damping: 20 } 
      });
    }
  };

  return (
    <motion.div
      drag="y"
      dragConstraints={{ bottom: 0 }}
      dragElastic={0.6}
      style={{ y, rotate, skewX, opacity, cursor: 'grab', position: 'absolute', width: '100%', height: '100%' }}
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
