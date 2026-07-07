import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, X, MessageCircle } from 'lucide-react';
import { useState } from 'react';

function QRModal({ onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6"
        style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
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
          {/* Close */}
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

function ContactItem({ icon: Icon, label, value, href }) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex flex-col items-center gap-3 rounded-3xl p-6 group cursor-pointer text-center min-w-0"
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.10)',
        textDecoration: 'none',
      }}
    >
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(61,122,101,0.2)' }}
      >
        <Icon size={20} style={{ color: '#3D7A65' }} />
      </div>
      <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
        {label}
      </p>
      <p
        className="text-sm font-semibold leading-snug break-all"
        style={{ color: '#fff' }}
      >
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

      <section
        id="contact"
        className="relative overflow-hidden"
        style={{ background: '#0A1A14' }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(30,64,53,0.3) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(30,64,53,0.2) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="max-w-[1700px] mx-auto px-8 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: '#3D7A65' }}
            >
              Let's Create Together
            </motion.p>

            <motion.h2
              initial={{ y: 32, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-bold leading-[1.1] mb-6 tracking-tight"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: '#fff',
                letterSpacing: '-0.02em',
              }}
            >
              期待与您打造
              <br />
              <span style={{ color: '#3D7A65' }}>下一个爆款视觉</span>
            </motion.h2>

            <motion.p
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg mb-14 mx-auto"
              style={{ color: 'rgba(255,255,255,0.4)', maxWidth: 520 }}
            >
              无论是电商素材量产、品牌视觉升级，还是 AIGC 工作流定制，欢迎随时联系探讨。
            </motion.p>

            {/* CTA — 添加微信 */}
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="flex justify-center mb-16"
            >
              <motion.button
                onClick={() => setShowQR(true)}
                whileHover={{ scale: 1.05, backgroundColor: '#163328' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-bold text-white cursor-pointer"
                style={{ backgroundColor: '#1E4035', border: 'none' }}
              >
                <MessageCircle size={18} />
                添加微信
              </motion.button>
            </motion.div>

            {/* Contact grid */}
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
            >
              <ContactItem icon={Mail} label="Email" value="claudiazhang0408@sina.com" href="mailto:claudiazhang0408@sina.com" />
              <ContactItem icon={Phone} label="Phone" value="150 2658 3263" href="tel:15026583263" />
              <ContactItem icon={MapPin} label="Location" value="上海 · 远程均可" href="#" />
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t py-6" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="max-w-[1700px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.7)' }}>
              张芸涵<span style={{ color: '#3D7A65' }}>.</span>
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              © 2025 张芸涵 · AI 视觉兼品牌设计师
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
              同济大学 × 维也纳工业大学
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
