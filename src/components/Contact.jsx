import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Halo, ScriptNote, Confetti } from './Decor';

function QRModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        style={{ background: 'rgba(20,20,25,0.55)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-3xl overflow-hidden flex flex-col items-center p-8 gap-5"
          style={{
            background: '#fff',
            maxWidth: 320,
            width: '100%',
            boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.06)' }}
          >
            <X size={15} style={{ color: '#5C5C60' }} />
          </button>

          <p className="text-sm font-semibold" style={{ color: '#141414' }}>
            扫码添加微信
          </p>
          <img
            src="/wechat-qr.png"
            alt="微信二维码"
            className="w-full rounded-2xl"
            style={{ maxWidth: 240 }}
          />
          <p className="text-xs text-center" style={{ color: '#A8A8AE' }}>
            燃烧不落之翼 · 期待与您合作
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ContactItem({ icon: Icon, label, value, href, accent }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="flex flex-col items-center gap-3 rounded-3xl p-6 group cursor-pointer text-center min-w-0"
      style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.9)',
        boxShadow: '0 16px 40px -20px rgba(20,20,30,0.16)',
        textDecoration: 'none',
      }}
    >
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${accent}1A` }}
      >
        <Icon size={20} style={{ color: accent }} />
      </div>
      <p className="text-[11px] font-bold tracking-[0.2em] uppercase display-font" style={{ color: '#B0B0B8' }}>
        {label}
      </p>
      <p className="text-sm font-semibold leading-snug break-all" style={{ color: '#1A1A1E' }}>
        {value}
      </p>
    </motion.a>
  );
}

export default function Contact() {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      {showQR && <QRModal onClose={() => setShowQR(false)} />}

      <section id="contact" className="relative overflow-hidden" style={{ background: '#F1F0F3' }}>
        <Halo size={680} colors={['rgba(255,90,60,0.16)', 'rgba(255,201,168,0.08)']} style={{ top: '-6%', right: '-8%' }} />
        <Halo size={520} colors={['rgba(43,122,91,0.13)', 'rgba(168,224,199,0.06)']} style={{ bottom: '10%', left: '-10%' }} />
        <Confetti className="absolute inset-x-0 top-16 max-w-4xl mx-auto" seed={7} />

        <div className="max-w-[1700px] mx-auto px-8 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-xs font-bold tracking-[0.3em] uppercase mb-6 display-font"
              style={{ color: '#FF5A3C' }}
            >
              Let&apos;s Create Together
            </motion.p>

            <motion.h2
              initial={{ y: 32, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-bold leading-[1.1] mb-6 tracking-tight relative inline-block"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#1A1A1E',
                letterSpacing: '-0.02em',
              }}
            >
              期待与您打造
              <br />
              <span style={{ color: '#FF5A3C' }}>下一个爆款视觉</span>
              <ScriptNote className="absolute -right-20 -bottom-12 text-4xl rotate-[-8deg] hidden md:block whitespace-nowrap">
                一起搞点大的～
              </ScriptNote>
            </motion.h2>

            <motion.p
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg mb-14 mx-auto leading-relaxed"
              style={{ color: '#6C6C74', maxWidth: 520 }}
            >
              无论是电商素材量产、品牌视觉升级，还是 AIGC 工作流定制，欢迎随时联系探讨。
            </motion.p>

            <motion.div
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex justify-center mb-16"
            >
              <motion.button
                onClick={() => setShowQR(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-bold text-white cursor-pointer"
                style={{ backgroundColor: '#FF5A3C', border: 'none', boxShadow: '0 16px 36px -12px rgba(255,90,60,0.5)' }}
              >
                <MessageCircle size={18} />
                添加微信
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ y: 32, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
            >
              <ContactItem icon={Mail} label="Email" value="claudiazhang0408@sina.com" href="mailto:claudiazhang0408@sina.com" accent="#FF5A3C" />
              <ContactItem icon={Phone} label="Phone" value="150 2658 3263" href="tel:15026583263" accent="#2B7A5B" />
              <ContactItem icon={MapPin} label="Location" value="上海 · 远程均可" href="#" accent="#2B6BC4" />
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t py-6" style={{ borderColor: 'rgba(20,20,30,0.07)' }}>
          <div className="max-w-[1700px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-sm font-bold display-font" style={{ color: '#1A1A1E' }}>
              张芸涵<span style={{ color: '#FF5A3C' }}>.</span>
            </p>
            <p className="text-xs" style={{ color: '#A8A8AE' }}>
              © 2025 张芸涵 · AI 视觉兼品牌设计师
            </p>
            <p className="text-xs" style={{ color: '#A8A8AE' }}>
              同济大学 × 维也纳工业大学
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
