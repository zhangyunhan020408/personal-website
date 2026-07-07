import { motion } from 'framer-motion';
import { Lightbulb, Wrench, TrendingUp } from 'lucide-react';
import { Halo } from './Decor';
import Masonry from './Masonry';
import CircularGallery from './CircularGallery';
import SerlioGallery from './SerlioGallery';
import ChromaGrid from './ChromaGrid';
import ImageReveal from './ImageReveal';
import PocketParkGrid from './PocketParkGrid';
import coffeeBefore from '../assets/coffee-before.png';
import coffeeAfter from '../assets/coffee-after.png';
import coffeeRef from '../assets/coffee-ref.png';
import gallery1 from '../assets/gallery1.png';
import gallery2 from '../assets/gallery2.png';
import gallery3 from '../assets/gallery3.png';
import gallery4 from '../assets/gallery4.png';
import gallery5 from '../assets/gallery5.png';
import gallery6 from '../assets/gallery6.png';
import storyboard1 from '../assets/storyboard1.png';
import storyboard2 from '../assets/storyboard2.png';
import storyboard3 from '../assets/storyboard3.png';
import storyboard4 from '../assets/storyboard4.png';
import storyboard5 from '../assets/storyboard5.png';
import storyboard6 from '../assets/storyboard6.png';
import storyboard7 from '../assets/storyboard7.png';

const storyboardItems = [
  { id: '1', img: storyboard1, height: 280 },
  { id: '2', img: storyboard2, height: 320 },
  { id: '3', img: storyboard3, height: 460 },
  { id: '4', img: storyboard4, height: 300 },
  { id: '5', img: storyboard5, height: 480 },
  { id: '6', img: storyboard6, height: 280 },
  { id: '7', img: storyboard7, height: 320 },
];

const circularGalleryItems = [
  { image: gallery1, text: '压花艺术' },
  { image: gallery2, text: '中国民间艺术' },
  { image: gallery3, text: '跟着电影去旅游' },
  { image: gallery4, text: '贵州民族音乐' },
  { image: gallery5, text: '学问海鲜' },
  { image: gallery6, text: '网链上的舞者' },
];
import nianhua1 from '../assets/nianhua1.png';
import nianhua2 from '../assets/nianhua2.png';
import nianhua3 from '../assets/nianhua3.png';
import nianhua4 from '../assets/nianhua4.png';
import nianhua5 from '../assets/nianhua5.png';
import nianhua6 from '../assets/nianhua6.png';

const nianhuaItems = [
  { image: nianhua6, gradient: 'linear-gradient(145deg,#c9392a,#1a0a08)' },
  { image: nianhua2, gradient: 'linear-gradient(145deg,#2c5f8a,#080e14)' },
  { image: nianhua3, gradient: 'linear-gradient(145deg,#3a7d5c,#080f0c)' },
  { image: nianhua4, gradient: 'linear-gradient(145deg,#8a4e2c,#140a04)' },
  { image: nianhua5, gradient: 'linear-gradient(145deg,#7a3060,#120508)' },
  { image: nianhua1, gradient: 'linear-gradient(145deg,#c9392a,#1a0a08)' },
];
import serlio001 from '../assets/serlio/serlio001.jpg';
import serlio046 from '../assets/serlio/serlio046.jpg';
import serlio009 from '../assets/serlio/serlio009.jpg';
import serlio013 from '../assets/serlio/serlio013.jpg';
import serlio017 from '../assets/serlio/serlio017.jpg';
import serlio021 from '../assets/serlio/serlio021.jpg';
import serlio025 from '../assets/serlio/serlio025.jpg';
import serlio029 from '../assets/serlio/serlio029.jpg';
import serlio033 from '../assets/serlio/serlio033.jpg';
import serlio037 from '../assets/serlio/serlio037.jpg';
import serlio041 from '../assets/serlio/serlio041.jpg';
import serlio045 from '../assets/serlio/serlio045.jpg';

const serlioImages = [serlio001,serlio046,serlio009,serlio013,serlio017,serlio021,serlio025,serlio029,serlio033,serlio037,serlio041,serlio045];

const projects = [
  {
    id: 1,
    index: '01',
    company: '智慧树 · AIGC 产品研发部',
    period: '2025.07 — 08',
    title: 'AI 视频分镜四宫格生成工作流',
    tagline: '让每位老师低成本产出电影级视频内容',
    accent: '#FF5A3C',
    accentBg: 'rgba(255,90,60,0.08)',
    tags: ['ReActor 换脸', 'Context 融合', 'ComfyUI', '视频分镜'],
    pain: '专业老师受时间、场地限制无法进行实地专业化视频拍摄；卡通动画外包成本高、迭代周期长，无法快速上线。',
    solution: '真人工作流引入 ReActor 面部重定向技术，实现教师数字人在沙漠、雨林等场景多机位讲解，同时支持环境空镜生成；跑通一致性四宫格分镜，攻克多视角下角色面部一致性难题，大幅降低实拍成本。',
    result: [
      { value: '2 套', label: '商用工作流' },
      { value: '电影级', label: '逼真度' },
      { value: '大幅降低', label: '外包成本' },
    ],
    visual: {
      bg: 'linear-gradient(145deg, #0A1A14 0%, #0F2520 100%)',
      label: 'VIDEO WORKFLOW',
      number: '01',
    },
  },
  {
    id: 2,
    index: '02',
    company: '智慧树 · AIGC 产品研发部',
    period: '2025.07 — 08',
    title: '专属艺术字海报生成器',
    tagline: '一键生成，让教授也能拥有设计师级课程封面',
    accent: '#C98A2B',
    accentBg: 'rgba(201,138,43,0.09)',
    tags: ['ComfyUI 工作流', '提示词工程', '艺术字生成', '课程封面'],
    pain: '高校教授缺乏平面设计知识，却对个人网课封面美观度要求极高；传统设计外包周期长、成本高，难以快速迭代。',
    solution: '基于 ComfyUI 搭建一键生成工作流，实现用户端仅输入课程名称，后台通过提示词针对性扩充，生成有针对性的专属艺术字体和相关元素课程海报，大幅提升封面转化率。',
    result: [
      { value: '一键', label: '操作复杂度' },
      { value: '零门槛', label: '设计知识要求' },
      { value: '显著提升', label: '封面转化率' },
    ],
    visual: {
      bg: 'linear-gradient(145deg, #1A0A14 0%, #251020 100%)',
      label: 'POSTER GENERATOR',
      number: '02',
    },
  },
  {
    id: 3,
    index: '03',
    company: '深圳逐界科技 · AIGC 产品研发部',
    period: '2025.02 — 03',
    title: '电商产品场景迁移工作流',
    tagline: '把拍摄成本砍掉，让上新速度翻倍',
    accent: '#2B6BC4',
    accentBg: 'rgba(43,107,196,0.08)',
    tags: ['场景迁移', 'AI 重打光', '局部重绘', '提示词工程'],
    pain: '电商素材传统拍摄成本高、周期长，频繁上新导致素材供给严重滞后，影响测款效率。',
    solution: '独立搭建包含「抠图 → 提示词工程 → 局部重绘 → AI 重打光 → 调色 → 细节迁移」精细化六步工作流。用户上传商品图与参考图即可无损嵌入高清、无版权风险的广告场景。',
    result: [
      { value: '6 步', label: '精细化工作流' },
      { value: '零版权', label: '素材风险' },
      { value: '大幅提升', label: '测款上新效率' },
    ],
    visual: {
      bg: 'linear-gradient(145deg, #0A1120 0%, #0D1A35 100%)',
      label: 'E-COMMERCE WORKFLOW',
      number: '03',
    },
  },
  {
    id: 4,
    index: '04',
    company: '苏州大学 · 非遗赋能合作',
    period: '2025 年 8 月',
    title: 'AI 赋能非遗艺术通识课',
    tagline: '让千年非遗焕发数字新生命',
    accent: '#2B7A5B',
    accentBg: 'rgba(43,122,91,0.08)',
    tags: ['苏绣风格迁移', 'ControlNet', '木刻上色', '非遗数字化'],
    pain: '传统非遗文化传播门槛高，艺术通识课缺乏 AIGC 专业工具链，难以让学生感受非遗工艺的现代应用价值。',
    solution: '开发「图案转苏绣」精准风格迁移工作流 + 支持局部重绘的可视化编辑模块；利用 ControlNet 与线稿上色流实现非遗木制版画的多色调动态上色模拟。受邀赴苏州大学线下宣讲演示。',
    result: [
      { value: '3 套', label: '非遗 AIGC 工具' },
      { value: '线下', label: '宣讲落地' },
      { value: '受邀', label: '合作邀约' },
    ],
    visual: {
      bg: 'linear-gradient(145deg, #0A1A12 0%, #0D2218 100%)',
      label: 'CULTURAL HERITAGE',
      number: '04',
    },
  },
  {
    id: 5,
    index: '05',
    company: '同济大学 · 课题研究',
    period: '2025.02 — 05',
    title: 'AI 赋能儿童友好口袋公园定制与宣发',
    tagline: 'Liblib 平台近 1000 次使用 · 联合设计答辩一等奖',
    accent: '#FF5A3C',
    accentBg: 'rgba(255,90,60,0.08)',
    tags: ['FLUX LoRA 训练', '角色一致性', '文生图工作流', '活动宣传海报'],
    pain: '口袋公园 IP 形象需在多场景保持角色一致性，传统插画外包周期长；活动宣传海报需快速更新迭代，人工设计难以支撑模块化更新频率。',
    solution: '设计 IP 形象「小莫」并通过视频抽帧工作流实现单角色图到多场景素材的一致性生成；使用高清修复与重绘工作流在半小时内产出活动海报。批量收集 39 张图片数据集，使用 FLUX 底模经 13 轮训练产出轴测插画风 LoRA，并制作文生图在线应用供儿童定制个性化公园模块。',
    result: [
      { value: '1000+', label: 'Liblib LoRA 使用' },
      { value: '一等奖', label: '联合设计终期答辩' },
      { value: '半小时', label: '海报生成周期' },
    ],
    visual: {
      bg: 'linear-gradient(145deg, #0C1A0A 0%, #142210 100%)',
      label: 'POCKET PARK AI',
      number: '05',
    },
  },
  {
    id: 6,
    index: '06',
    company: 'DigitalFUTURES 国际工作营',
    period: '2025.05 — 07',
    title: '生成式 AI：建筑先例的批判性复用',
    tagline: '最佳学术贡献奖 · 荣誉项目',
    accent: '#5A3E7A',
    accentBg: 'rgba(90,62,122,0.06)',
    tags: ['SDXL 微调', 'ControlNet', '历史图纸数据集', '风格迁移'],
    pain: '历史建筑美学难以被现代 AI 模型精准捕捉，风格迁移中存在严重的结构失真与比例扭曲问题。',
    solution: '数字化并清洗 200+ 份《建筑四书》历史图纸，按构件、立面分类标注构建标准数据集；基于 SDXL 训练扩散模型，通过调整词汇标注频率及 ControlNet 精准��制，成功融合出全新风格立面。',
    result: [
      { value: '200+', label: '历史图纸数据集' },
      { value: '最佳奖', label: '学术贡献' },
      { value: '零失真', label: '结构控制' },
    ],
    visual: {
      bg: 'linear-gradient(145deg, #120A1E 0%, #1C102E 100%)',
      label: 'ARCHITECTURE AI',
      number: '06',
    },
  },
];

function ResultTag({ value, label, accent }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold display-font" style={{ color: accent, letterSpacing: '-0.02em' }}>
        {value}
      </p>
      <p className="text-xs mt-1" style={{ color: '#9A9AA2' }}>
        {label}
      </p>
    </div>
  );
}

function ProjectCard({ project, index: idx }) {
  const isEven = idx % 2 === 0;

  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"
    >
      {/* Project index label (always fully visible, above the card) */}
      <div className={`hidden md:flex items-end gap-3 mb-3 ${isEven ? '' : 'justify-end'}`}>
        <span
          className="display-font font-bold leading-none select-none"
          style={{ fontSize: 'clamp(2.6rem, 4.4vw, 4rem)', color: project.accent, opacity: 0.22, letterSpacing: '-0.03em' }}
        >
          NO.{project.index}
        </span>
        <span
          className="mb-2 h-px flex-1 max-w-[120px]"
          style={{ background: `${project.accent}33` }}
        />
      </div>
      {/* Colored halo bleeding behind the visual */}
      <div
        aria-hidden="true"
        className={`absolute top-1/4 ${isEven ? '-left-16' : '-right-16'} w-[380px] h-[380px] rounded-full pointer-events-none z-0`}
        style={{ background: project.accent, opacity: 0.13, filter: 'blur(90px)' }}
      />
      <article
        className={`relative z-[1] flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0 rounded-[28px] overflow-hidden`}
        style={{
          background: 'rgba(255,255,255,0.72)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 20px 60px -24px rgba(20,20,30,0.16)',
          border: '1px solid rgba(255,255,255,0.9)',
        }}
      >
      {/* Visual panel */}
      {project.id === 1 ? (
        <div
          className="lg:w-2/5 xl:w-1/3 relative flex flex-col"
          style={{ background: '#FFFFFF' }}
        >
          <div
            style={{
              flex: 1,
              minHeight: 400,
              maxHeight: 440,
              overflow: 'hidden',
              padding: '8px 4px',
            }}
          >
            <Masonry
              items={storyboardItems}
              columns={2}
              ease="power3.out"
              duration={0.5}
              stagger={0.08}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.95}
              blurToFocus
              autoScroll
              scrollSpeed={26}
            />
          </div>
        </div>
      ) : project.id === 2 ? (
        <div
          className="lg:w-2/5 xl:w-1/3 relative flex flex-col"
          style={{ background: '#FFFFFF' }}
        >
          <div style={{ flex: 1, minHeight: 400, position: 'relative' }}>
            <CircularGallery
              items={circularGalleryItems}
              direction="vertical"
              bend={16}
              showLabels={false}
              borderRadius={0.06}
              scrollSpeed={2}
              scrollEase={0.04}
            />
          </div>
          <p
            className="text-center text-xs py-3 px-4"
            style={{ color: '#A8A8AE', letterSpacing: '0.02em' }}
          >
            上下拖拽或滚轮，浏览课程海报案例
          </p>
        </div>
      ) : project.id === 4 ? (
        // ChromaGrid for 苏州大学非遗 project
        <div
          className="lg:w-2/5 xl:w-1/3 relative flex flex-col"
          style={{ background: '#ffffff' }}
        >
          <div style={{ flex: 1, minHeight: 380, position: 'relative' }}>
            <ChromaGrid
              items={nianhuaItems}
              radius={160}
              damping={0.45}
              fadeOut={0.6}
            />
          </div>
          <p
            className="text-center text-xs py-3 px-4"
            style={{ color: '#A8A8AE', letterSpacing: '0.02em' }}
          >
            将光标移至上方，探索版画上色效果
          </p>
        </div>
      ) : project.id === 3 ? (
        // ImageReveal for 电商场景迁移 project
        <div className="lg:w-2/5 xl:w-1/3 overflow-hidden" style={{ minHeight: 380 }}>
          <ImageReveal
            before={coffeeBefore}
            after={coffeeAfter}
            refImage={coffeeRef}
            hint="移动鼠标，对比场景迁移效果"
          />
        </div>
      ) : project.id === 5 ? (
        // PocketParkGrid for 口袋公园 project
        <div
          className="lg:w-2/5 xl:w-1/3 relative flex flex-col"
          style={{ background: '#F6F4F0' }}
        >
          <PocketParkGrid />
        </div>
      ) : project.id === 6 ? (
        // Serlio scrolling gallery for 建筑先例 project
        <div
          className="lg:w-2/5 xl:w-1/3 relative overflow-hidden"
          style={{ background: '#FFFFFF', height: 440 }}
        >
          <SerlioGallery images={serlioImages} />
        </div>
      ) : (
        // Default: clean white panel with large faint index number
        <div
          className="lg:w-2/5 xl:w-1/3 min-h-[260px] lg:min-h-[360px] flex items-center justify-center relative overflow-hidden"
          style={{ background: '#FFFFFF', borderRight: isEven ? '1px solid #F0EDE8' : 'none', borderLeft: isEven ? 'none' : '1px solid #F0EDE8' }}
        >
          <p
            className="font-black leading-none select-none"
            style={{ fontSize: 'clamp(8rem, 14vw, 14rem)', color: 'rgba(0,0,0,0.04)', letterSpacing: '-0.05em' }}
          >
            {project.visual.number}
          </p>
        </div>
      )}

      {/* Content panel */}
      <div className="flex-1 p-8 lg:p-10 flex flex-col justify-between">
        <div>
          <div className="mb-4">
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: project.accent }}>
              {project.company}
            </p>
            <p className="text-xs" style={{ color: '#A8A8AE' }}>
              {project.period}
            </p>
          </div>

          <h3
            className="text-2xl font-bold mb-2 tracking-tight"
            style={{ color: '#141414', letterSpacing: '-0.01em' }}
          >
            {project.title}
          </h3>
          <p className="text-sm mb-5" style={{ color: '#5C5C60' }}>
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: project.accentBg,
                  color: project.accent,
                  border: `1px solid ${project.accent}20`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: project.accentBg }}
              >
                <Lightbulb size={14} style={{ color: project.accent }} />
              </div>
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: '#A8A8AE' }}>
                  痛点分析
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#5C5C60' }}>
                  {project.pain}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: project.accentBg }}
              >
                <Wrench size={14} style={{ color: project.accent }} />
              </div>
              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: '#A8A8AE' }}>
                  AIGC 解决方案
                </p>
                <p className="text-sm leading-relaxed" style={{ color: '#5C5C60' }}>
                  {project.solution}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={14} style={{ color: project.accent }} />
            <p className="text-xs font-semibold" style={{ color: '#9A9AA2' }}>
              商业结果
            </p>
          </div>
          <div
            className="grid grid-cols-3 gap-3 rounded-2xl py-4"
            style={{ background: project.accentBg }}
          >
            {project.result.map((r) => (
              <ResultTag key={r.label} {...r} accent={project.accent} />
            ))}
          </div>
        </div>
      </div>
      </article>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 overflow-hidden" style={{ background: '#F1F0F3' }}>
      <Halo size={620} colors={['rgba(255,90,60,0.16)', 'rgba(255,201,168,0.08)']} style={{ top: '4%', left: '-8%' }} />
      <Halo size={560} colors={['rgba(43,122,91,0.14)', 'rgba(168,224,199,0.07)']} style={{ top: '55%', right: '-10%' }} />

      <div className="relative max-w-[1700px] mx-auto px-8">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 max-w-3xl"
        >
          <p className="text-xs font-bold tracking-[0.3em] uppercase mb-4 display-font" style={{ color: '#FF5A3C' }}>
            Selected Work
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ color: '#1A1A1E', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            精选项目
          </h2>
          <p className="mt-6 text-base leading-relaxed" style={{ color: '#6C6C74' }}>
            六个 AIGC 落地项目，从教育到电商、从非遗到建筑，每一个都跑通了「痛点 → 方案 → 结果」的完整链路。
          </p>
        </motion.div>

        <div className="flex flex-col gap-24 md:gap-28">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
