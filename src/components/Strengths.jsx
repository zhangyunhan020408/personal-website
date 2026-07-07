import { motion } from 'framer-motion';
import { Factory, BarChart3, Layers, Globe2 } from 'lucide-react';
import { Halo } from './Decor';

const strengths = [
  {
    icon: Factory,
    accent: '#FF5A3C',
    accentBg: 'rgba(255,90,60,0.09)',
    title: 'AIGC 工业级落地',
    desc: '不止于效果图，三段商业实习证明 ComfyUI 工作流可直接集成进企业 AIGC 产品线，降本增效立竿见影。',
    tags: ['ComfyUI 工作流', 'LoRA 定制训练', '企业级部署'],
  },
  {
    icon: BarChart3,
    accent: '#C98A2B',
    accentBg: 'rgba(201,138,43,0.10)',
    title: '品牌视觉策略',
    desc: '从封面转化率到电商测款效率，每一个视觉决策都以商业目标为导向，懂设计也懂生意逻辑。',
    tags: ['封面 CTR 提升', '测款素材量产', '品牌一致性'],
  },
  {
    icon: Layers,
    accent: '#2B7A5B',
    accentBg: 'rgba(43,122,91,0.09)',
    title: '跨界空间审美',
    desc: '同济和维也纳的建筑学习经历赋予极强的空间构成感与设计敏感度，让 AIGC 产出有天然的跨界美学气质。',
    tags: ['空间构成', '光影美学', '建筑图学'],
  },
  {
    icon: Globe2,
    accent: '#2B6BC4',
    accentBg: 'rgba(43,107,196,0.09)',
    title: '国际化沟通',
    desc: '雅思 7.5，全国英语竞赛二等奖，基础德语。曾与维也纳工大国际团队协同研究，无障碍融入跨文化工作环境。',
    tags: ['雅思 7.5', '中英双语', '跨文化协作'],
  },
];

function StrengthCard({ item, i }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="rounded-[26px] p-8 flex flex-col gap-5 relative overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 18px 50px -26px rgba(20,20,30,0.18)',
        border: '1px solid rgba(255,255,255,0.9)',
      }}
    >
      {/* Colored halo glow inside card */}
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
        style={{ background: item.accent, opacity: 0.12, filter: 'blur(46px)' }}
      />

      {/* Background number */}
      <span
        className="absolute top-4 right-6 display-font font-bold leading-none select-none pointer-events-none"
        style={{ fontSize: '4.5rem', color: item.accent, opacity: 0.1, letterSpacing: '-0.04em' }}
      >
        0{i + 1}
      </span>

      {/* Icon */}
      <div
        className="relative w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: item.accentBg }}
      >
        <Icon size={24} style={{ color: item.accent }} />
      </div>

      {/* Text */}
      <div className="relative">
        <h3
          className="text-xl font-bold mb-2 tracking-tight"
          style={{ color: '#1A1A1E', letterSpacing: '-0.01em' }}
        >
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#6C6C74' }}>
          {item.desc}
        </p>
      </div>

      {/* Tags */}
      <div className="relative flex flex-wrap gap-2 mt-auto">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: item.accentBg,
              color: item.accent,
              border: `1px solid ${item.accent}22`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Strengths() {
  return (
    <section id="strengths" className="relative py-28 overflow-hidden" style={{ background: '#EDECEF' }}>
      <Halo size={560} colors={['rgba(43,107,196,0.14)', 'rgba(168,199,240,0.07)']} style={{ top: '8%', right: '-6%' }} />
      <Halo size={520} colors={['rgba(255,90,60,0.14)', 'rgba(255,201,168,0.07)']} style={{ bottom: '4%', left: '-8%' }} />

      <div className="relative max-w-[1700px] mx-auto px-8">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 display-font" style={{ color: '#FF5A3C' }}>
            Why Me
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: '#1A1A1E', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            四大核心优势，构成
            <span style={{ color: '#2B6BC4' }}>竞争壁垒</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {strengths.map((item, i) => (
            <StrengthCard key={item.title} item={item} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
