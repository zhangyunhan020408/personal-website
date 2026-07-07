import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import pocketPark from '../assets/pocket-park.png';
import pocketParkHero from '../assets/pocket-park-hero.png';
import character from '../assets/pocket-park-character.png';
import poster from '../assets/pocket-park-poster.png';

const ROWS = 3;
const COLS = 3;
const TOTAL = ROWS * COLS;

const hintStyle = {
  color: '#A8A8AE',
  letterSpacing: '0.02em',
  marginTop: 8,
  marginBottom: 0,
  textAlign: 'center',
  fontSize: 12,
};

export default function PocketParkGrid() {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState([]);
  const [charVisible, setCharVisible] = useState(false);
  const [posterVisible, setPosterVisible] = useState(false);

  useEffect(() => {
    if (!expanded) {
      setVisible([]);
      setCharVisible(false);
      setPosterVisible(false);
      return;
    }
    setVisible([]);
    setCharVisible(false);
    setPosterVisible(false);
    const timers = [];
    for (let i = 0; i < TOTAL; i++) {
      timers.push(
        setTimeout(() => {
          setVisible((prev) => [...prev, i]);
        }, i * 110)
      );
    }
    timers.push(setTimeout(() => setCharVisible(true), TOTAL * 110 + 200));
    return () => timers.forEach(clearTimeout);
  }, [expanded]);

  const handleAreaClick = () => {
    if (!expanded) {
      setExpanded(true);
    } else if (!posterVisible) {
      setExpanded(false);
    }
  };

  const handleCharClick = (e) => {
    e.stopPropagation();
    setPosterVisible((v) => !v);
  };

  const handlePosterClick = (e) => {
    e.stopPropagation();
    setPosterVisible(false);
  };

  const hint = !expanded
    ? '点击创造更多模块'
    : charVisible
    ? '点击小莫互动'
    : '';

  return (
    <div
      onClick={handleAreaClick}
      style={{
        width: '100%',
        background: '#F6F4F0',
        cursor: 'pointer',
        userSelect: 'none',
        padding: '0 0 8px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {!expanded ? (
        /* 默认：图片自然高度 + 文字紧跟下方 */
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}
          >
            <img
              src={pocketParkHero}
              alt="口袋公园总图"
              draggable={false}
              style={{
                width: '118%',
                maxWidth: 'none',
                height: 'auto',
                marginRight: '5%',
                display: 'block',
                mixBlendMode: 'multiply',
              }}
            />
          </motion.div>
          {hint && <p style={hintStyle}>{hint}</p>}
        </>
      ) : (
        /* 展开：九宫格撑满 + 文字在底部 */
        <>
          <div
            style={{
              width: '100%',
              position: 'relative',
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ width: '100%', position: 'relative' }}
            >
              <motion.div
                animate={{
                  filter: posterVisible ? 'blur(6px)' : 'blur(0px)',
                  opacity: posterVisible ? 0.42 : 1,
                }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 6,
                }}
              >
                {Array.from({ length: TOTAL }, (_, i) => {
                  const col = i % COLS;
                  const row = Math.floor(i / COLS);
                  return (
                    <div
                      key={i}
                      style={{
                        position: 'relative',
                        borderRadius: 6,
                        overflow: 'hidden',
                        background: 'rgba(30,64,53,0.06)',
                        aspectRatio: '1 / 1',
                      }}
                    >
                      <AnimatePresence>
                        {visible.includes(i) && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 380, damping: 22, mass: 0.7 }}
                            style={{ position: 'absolute', inset: 0, transformOrigin: 'center center' }}
                          >
                            <div
                              style={{
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url(${pocketPark})`,
                                backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                                backgroundPosition: `${col * 50}% ${row * 50}%`,
                                backgroundRepeat: 'no-repeat',
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>

              <AnimatePresence>
                {charVisible && (
                  <motion.div
                    key="character"
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 60, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    onClick={handleCharClick}
                    style={{
                      position: 'absolute',
                      right: -8,
                      bottom: 0,
                      width: '58%',
                      pointerEvents: 'auto',
                      zIndex: 20,
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={character}
                      alt="小莫"
                      draggable={false}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {posterVisible && (
                  <motion.div
                    key="poster"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                    onClick={handlePosterClick}
                    style={{
                      position: 'absolute',
                      right: '2%',
                      bottom: '12%',
                      width: '46%',
                      zIndex: 15,
                      cursor: 'pointer',
                      borderRadius: 10,
                      overflow: 'hidden',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
                      transformOrigin: '85% 95%',
                    }}
                  >
                    <img
                      src={poster}
                      alt="绿野小奇兵海报"
                      draggable={false}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          {hint && <p style={hintStyle}>{hint}</p>}
        </>
      )}
    </div>
  );
}
