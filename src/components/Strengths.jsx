import { motion } from 'framer-motion';
import { Factory, BarChart3, Layers, Globe2 } from 'lucide-react';

const strengths = [
  {
    icon: Factory,
    title: 'AIGC 工业级落地',
    desc: '不止于效果图，三段商业实习证明 ComfyUI 工作流可直接集成进企业 AIGC 产品线，降本增效立竿见影。',
    tags: ['ComfyUI 工作流', 'LoRA 定制训练', '企业级部署'],
  },
  {
    icon: BarChart3,
    title: '品牌视觉策略',
    desc: '从封面转化率到电商测款效率，每一个视觉决策都以商业目标为导向，懂设计也懂生意逻辑。',
    tags: ['封面 CTR 提升', '测款素材量产', '品牌一致性'],
  },
  {
    icon: Layers,
    title: '跨界空间审美',
    desc: '同济 × 维也纳建筑双修赋予极强的空间构成感与光影敏感度，让 AI 生成画面天然具有高级建筑美学气质。',
    tags: ['空间构成', '光影美学', '建筑图学'],
  },
  {
    icon: Globe2,
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
      className="rounded-3xl p-8 flex flex-col gap-5 relative overflow-hidden"
      style={{
        background: '#FFFFFF',
        boxShadow: '0 2px 20px 0 rgba(0,0,0,0.05), 0 1px 4px 0 rgba(0,0,0,0.03)',
        border: '1px solid rgba(0,0,0,0.04)',
      }}
    >
      {/* Subtle gloss */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-3xl"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(120deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%)',
        }}
      />

      {/* Background number */}
      <span
        className="absolute top-6 right-8 text-6xl font-black leading-none select-none"
        style={{ color: 'rgba(0,0,0,0.025)' }}
      >
        0{i + 1}
      </span>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: 'rgba(30,64,53,0.08)' }}
      >
        <Icon size={24} style={{ color: '#1E4035' }} />
      </div>

      {/* Text */}
      <div>
        <h3
          className="text-xl font-bold mb-2 tracking-tight"
          style={{ color: '#141414', letterSpacing: '-0.01em' }}
        >
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: '#5C5C60' }}>
          {item.desc}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: 'rgba(30,64,53,0.06)',
              color: '#1E4035',
              border: '1px solid rgba(30,64,53,0.12)',
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
    <section id="strengths" className="py-24" style={{ background: '#EDEAE4' }}>
      <div className="max-w-[1700px] mx-auto px-8">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#1E4035' }}>
            Why Me
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: '#141414', letterSpacing: '-0.02em' }}
          >
            四大核心优势，
            <br className="hidden sm:block" />
            构成不可替代的竞争壁垒
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
