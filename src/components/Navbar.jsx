import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const navLinks = [
  { label: '亮点', href: '#highlights' },
  { label: '项目', href: '#projects' },
  { label: '能力', href: '#strengths' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 40);
  });

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 pt-4">
        <div
          className="flex items-center justify-between rounded-full pl-6 pr-3 py-2.5 transition-all duration-300"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.4)',
            backdropFilter: 'blur(18px) saturate(180%)',
            WebkitBackdropFilter: 'blur(18px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: scrolled
              ? '0 12px 40px -12px rgba(23,23,28,0.18)'
              : '0 8px 30px -16px rgba(23,23,28,0.12)',
          }}
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.03 }}
            className="font-bold text-lg tracking-tight"
            style={{ color: '#17171C' }}
          >
            张芸涵<span style={{ color: '#FF5A3C' }}>.</span>
          </motion.a>

          <div className="flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ backgroundColor: 'rgba(255,90,60,0.09)', color: '#FF5A3C' }}
                className="hidden sm:inline-flex text-sm font-medium px-4 py-2 rounded-full transition-colors"
                style={{ color: '#63636C' }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, backgroundColor: '#E8452A' }}
              whileTap={{ scale: 0.97 }}
              className="text-sm font-semibold px-5 py-2 rounded-full text-white"
              style={{ backgroundColor: '#FF5A3C' }}
            >
              联系我
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
