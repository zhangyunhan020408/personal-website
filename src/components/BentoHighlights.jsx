import { motion } from 'framer-motion';
import { GraduationCap, Cpu, Trophy, TrendingUp, Share2 } from 'lucide-react';
import { Halo, GhostNumber, Kicker, ScriptNote } from './Decor';

const cardVariants = {
  hidden: { y: 32, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function Card({ children, className = '', style = {}, custom }) {
  return (
    <motion.div
      custom={custom}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: 'easeOut' } }}
      className={`rounded-[28px] overflow-hidden relative ${className}`}
      style={{
        background: '#fff',
        boxShadow: '0 20px 50px -28px rgba(23,23,28,0.22)',
        border: '1px solid rgba(255,255,255,0.9)',
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

const schools = [
  { tag: '同', name: '同济大学', sub: '建筑学硕士 · 2024–2027 · 保送', accent: '#17171C', badge: '985' },
  { tag: '维', name: '维也纳工业大学', sub: '建筑学硕士 · AI 专项 · 双学位', accent: '#8B1A1A', badge: 'EU' },
  { tag: '本', name: '同济大学本科', sub: '建筑学 · 二等奖学金', accent: '#2B7A5B', badge: null },
];

const techs = [
  { name: 'Stable Diffusion', sub: 'SDXL / FLUX' },
  { name: 'ComfyUI', sub: '工业级工作流' },
  { name: 'LoRA 训练', sub: 'FLUX 底模微调' },
  { name: 'ControlNet', sub: '精准结构控制' },
  { name: 'Adobe 全家桶', sub: 'PS / Pr / Ae' },
  { name: 'Figma', sub: 'UI / 原型设计' },
];

// 学历卡
function CardEducation() {
  return (
    <Card custom={0} className="p-7 flex flex-col lg:col-span-2" style={{ background: '#FBFAFC' }}>
      <GhostNumber className="absolute select-none" style={{ top: -10, right: 18, fontSize: '7rem' }}>
        01
      </GhostNumber>
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: '#FFEDE7' }}>
          <GraduationCap size={21} style={{ color: '#FF5A3C' }} />
        </div>
        <div>
          <Kicker>Education</Kicker>
          <p className="text-lg font-bold mt-1" style={{ color: '#17171C' }}>建筑背景 · 双硕士</p>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        {schools.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-3 rounded-2xl px-4 py-3"
            style={{ background: '#fff', border: '1px solid rgba(23,23,28,0.05)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ background: s.accent }}
            >
              {s.tag}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold flex items-center gap-2" style={{ color: '#17171C' }}>
                {s.name}
                {s.badge && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                    style={{ background: '#FFEDE7', color: '#FF5A3C' }}
                  >
                    {s.badge}
                  </span>
                )}
              </p>
              <p className="text-xs mt-0.5 truncate" style={{ color: '#A6A6AF' }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// 技术栈（深色）
function CardTech() {
  return (
    <Card
      custom={1}
      className="p-7 flex flex-col lg:col-span-2"
      style={{ background: 'linear-gradient(155deg, #17171C 0%, #26262E 100%)', border: 'none' }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,90,60,0.18)' }}>
          <Cpu size={21} style={{ color: '#FF5A3C' }} />
        </div>
        <div>
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.22em', color: '#FF5A3C' }}
          >
            <span className="w-5 h-px" style={{ background: '#FF5A3C', opacity: 0.6 }} />
            Tech Stack
          </span>
          <p className="text-lg font-bold mt-1" style={{ color: '#fff' }}>核心技术能力</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {techs.map((t) => (
          <div
            key={t.name}
            className="rounded-2xl px-4 py-3"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <p className="text-sm font-semibold" style={{ color: '#fff' }}>{t.name}</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{t.sub}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// 大数据卡片
function StatBig({ value, unit, label, icon: Icon, note }) {
  return (
    <div className="relative">
      <div className="flex items-baseline gap-1">
        <span
          className="font-bold tracking-tight"
          style={{ fontSize: '3.4rem', lineHeight: 1, color: '#FF5A3C', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {value}
        </span>
        <span className="text-2xl font-bold" style={{ color: '#FF5A3C' }}>{unit}</span>
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <Icon size={14} style={{ color: '#A6A6AF' }} />
        <p className="text-xs" style={{ color: '#63636C' }}>{label}</p>
      </div>
      {note && (
        <ScriptNote className="absolute" style={{ fontSize: '1.4rem', top: -16, right: 0, transform: 'rotate(-8deg)' }}>
          {note}
        </ScriptNote>
      )}
    </div>
  );
}

function CardImpact() {
  return (
    <Card custom={2} className="p-7 flex flex-col justify-between lg:col-span-3 relative" style={{ background: '#FBFAFC' }}>
      <Halo size={360} colors={['rgba(157,231,198,0.35)', 'rgba(169,199,255,0.10)']} blur={50} style={{ bottom: -120, right: -80 }} />
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: '#E9F7F0' }}>
          <Trophy size={21} style={{ color: '#2B7A5B' }} />
        </div>
        <div>
          <Kicker color="#2B7A5B">Impact</Kicker>
          <p className="text-lg font-bold mt-1" style={{ color: '#17171C' }}>商业价值 · 一目了然</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-12 gap-y-8 relative z-10">
        <StatBig value="1000" unit="+" label="Liblib LoRA 使用次数" icon={TrendingUp} note="持续增长" />
        <StatBig value="10" unit="+" label="用户自发分享次数" icon={Share2} />
      </div>
    </Card>
  );
}

function CardAward() {
  return (
    <Card
      custom={3}
      className="p-7 flex flex-col justify-between lg:col-span-1"
      style={{ background: 'linear-gradient(155deg, #FF5A3C 0%, #E8452A 100%)', border: 'none' }}
    >
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
        <Trophy size={21} style={{ color: '#fff' }} />
      </div>
      <div className="mt-8">
        <p className="text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.75)' }}>DigitalFUTURES 2025 · 上海</p>
        <p className="text-xl font-bold leading-snug" style={{ color: '#fff' }}>最佳学术贡献奖</p>
        <p className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>国际工作营</p>
      </div>
    </Card>
  );
}

export default function BentoHighlights() {
  return (
    <section id="highlights" className="py-28 relative overflow-hidden" style={{ background: '#F1F0F3' }}>
      <Halo size={520} colors={['rgba(169,199,255,0.18)', 'rgba(255,201,168,0.06)']} blur={90} style={{ top: 40, left: -160 }} />

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-2xl"
        >
          <Kicker>Core Highlights</Kicker>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mt-4" style={{ color: '#17171C', letterSpacing: '-0.03em' }}>
            硬核数据，
            <span className="relative inline-block">
              一目了然
              <span className="absolute left-0 -bottom-1 w-full h-2 rounded-full" style={{ background: 'rgba(255,90,60,0.22)' }} />
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <CardEducation />
          <CardTech />
          <CardImpact />
          <CardAward />
        </div>
      </div>
    </section>
  );
}
