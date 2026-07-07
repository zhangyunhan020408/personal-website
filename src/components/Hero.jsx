import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import avatarImg from '../assets/avatar.png';
import { Halo, GhostNumber, ScriptNote, Confetti } from './Decor';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 34, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const stats = [
  { value: '1000+', label: 'LoRA 使用', color: '#FF5A3C' },
  { value: '双硕士', label: '同济 · 维也纳', color: '#2B7A5B' },
  { value: '雅思 7.5', label: '国际视野', color: '#2B6BC4' },
  { value: '3+', label: '商业落地', color: '#C98A2B' },
];

function PhotoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative w-full max-w-[360px] lg:max-w-[420px] flex-shrink-0"
    >
      {/* Pastel glow behind photo */}
      <Halo
        size={480}
        colors={['rgba(255,90,60,0.28)', 'rgba(169,199,255,0.14)']}
        blur={60}
        style={{ top: -40, left: -40, zIndex: 0 }}
      />

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative z-10"
      >
        <div
          style={{
            borderRadius: 36,
            boxShadow: '0 40px 90px -20px rgba(23,23,28,0.28), 0 10px 30px -12px rgba(23,23,28,0.12)',
            aspectRatio: '3/4',
            overflow: 'hidden',
            width: '100%',
            border: '6px solid #fff',
          }}
        >
          <img
            src={avatarImg}
            alt="张芸涵"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
          />
        </div>
      </motion.div>

      {/* Floating badge chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="animate-floaty absolute z-20 flex items-center gap-2 px-4 py-2.5 rounded-2xl"
        style={{
          bottom: 40,
          left: -20,
          background: '#fff',
          boxShadow: '0 16px 40px -12px rgba(23,23,28,0.25)',
          border: '1px solid rgba(23,23,28,0.05)',
        }}
      >
        <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#FFEDE7' }}>
          <Sparkles size={17} style={{ color: '#FF5A3C' }} />
        </span>
        <div>
          <p className="text-sm font-bold leading-tight" style={{ color: '#17171C' }}>AIGC 工作流</p>
          <p className="text-xs" style={{ color: '#A6A6AF' }}>ComfyUI · LoRA</p>
        </div>
      </motion.div>

      {/* Floating award chip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
        className="animate-floaty absolute z-20 px-4 py-2.5 rounded-2xl"
        style={{
          top: 26,
          right: -18,
          background: '#17171C',
          boxShadow: '0 16px 40px -12px rgba(23,23,28,0.35)',
          '--rot': '3deg',
        }}
      >
        <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>DigitalFUTURES</p>
        <p className="text-sm font-bold" style={{ color: '#fff' }}>最佳学术贡献奖</p>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#F1F0F3' }}>
      {/* Background halos + confetti */}
      <Halo size={620} colors={['rgba(157,231,198,0.22)', 'rgba(169,199,255,0.10)']} blur={90} style={{ top: -120, left: -160 }} />
      <Halo size={520} colors={['rgba(255,201,168,0.30)', 'rgba(255,90,60,0.08)']} blur={90} style={{ bottom: -180, right: -120 }} />
      <Confetti />

      {/* Giant ghost word */}
      <GhostNumber
        fill
        className="absolute select-none hidden lg:block"
        style={{ top: 90, left: 40, fontSize: '13rem' }}
      >
        AI
      </GhostNumber>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-16 pt-36 lg:pt-40 pb-24">
          {/* Left: text */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex-1 max-w-2xl">
            <motion.div variants={itemVariants} className="mb-7">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                style={{ background: '#fff', border: '1px solid rgba(23,23,28,0.06)', color: '#17171C', boxShadow: '0 6px 20px -10px rgba(23,23,28,0.2)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#FF5A3C' }} />
                AI 视觉兼品牌设计师 · 开放实习合作
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-bold leading-[1.04] tracking-tight mb-6"
              style={{ fontSize: 'clamp(3rem, 6.5vw, 5.6rem)', color: '#17171C', letterSpacing: '-0.03em' }}
            >
              让 <span style={{ color: '#FF5A3C' }}>AI</span> 赋能
              <br />
              <span className="relative inline-block">
                新商业视觉
                <ScriptNote
                  className="absolute whitespace-nowrap"
                  style={{ fontSize: '1.9rem', right: '-2.6rem', top: '-1.6rem', transform: 'rotate(-8deg)' }}
                >
                  转化率 ↑
                </ScriptNote>
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg leading-relaxed mb-9" style={{ color: '#63636C', maxWidth: 520 }}>
              连接 <strong style={{ color: '#17171C', fontWeight: 600 }}>同济 · 维也纳建筑美学</strong> 与前沿 AIGC，
              以 ComfyUI 工作流和 LoRA 训练重构电商与品牌的视觉转化率。
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-14">
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, backgroundColor: '#E8452A' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: '#FF5A3C', boxShadow: '0 14px 30px -10px rgba(255,90,60,0.6)' }}
              >
                查看精选项目
                <ArrowDown size={15} />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, backgroundColor: '#fff' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold"
                style={{ background: 'rgba(255,255,255,0.6)', color: '#17171C', border: '1px solid rgba(23,23,28,0.08)' }}
              >
                聊聊合作
              </motion.a>
            </motion.div>

            {/* Floating stat chips instead of a rigid bordered row */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl px-5 py-3"
                  style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 10px 26px -16px rgba(23,23,28,0.25)' }}
                >
                  <p className="text-2xl font-bold tracking-tight" style={{ color: stat.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#A6A6AF' }}>{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: photo */}
          <PhotoCard />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ color: '#A6A6AF' }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
}
