import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoHighlights from './components/BentoHighlights';
import Projects from './components/Projects';
import Strengths from './components/Strengths';
import Contact from './components/Contact';

export default function App() {
  return (
    <div style={{ fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', system-ui, sans-serif" }}>
      <Navbar />
      <Hero />
      <BentoHighlights />
      <Projects />
      <Strengths />
      <Contact />
    </div>
  );
}
