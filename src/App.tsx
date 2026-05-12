/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronRight, ArrowRight, MousePointer2, ExternalLink, Sparkles, ShoppingBag, Globe, User } from 'lucide-react';

// --- Types ---
type Category = 'AIGC' | 'DOMESTIC' | 'CROSS_BORDER';
type AIGCSubCategory = 'MODELS' | 'SCENES';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  subCategory?: AIGCSubCategory;
  imageUrl: string;
}

// --- Mock Data ---
const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // AIGC Models (12 items)
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `ai-mod-${i}`,
    title: `AI Model Portfolio ${i + 1}`,
    description: 'Hyper-realistic AI fashion models for high-end boutique styling.',
    category: 'AIGC' as Category,
    subCategory: 'MODELS' as AIGCSubCategory,
    imageUrl: `https://images.unsplash.com/photo-${[
      '1515886657613-9f3515b0c78f', '1542382257-80dedb735bab', '1539109132314-d09f91d3b561',
      '1485230895905-ec40ba36b9bc', '1494790108377-be9c29b29330', '1501196354995-cbb51c65aaea',
      '1492562080023-ab3db95bfbce', '1507003211169-0a1dd7228f2d', '1506794778202-cad84cf45f1d',
      '1531746020798-e6953c6e8e04', '1554151228-14d9def656e4', '1488161628813-f4460f892d9f'
    ][i % 12]}?auto=format&fit=crop&q=80&w=1000`,
  })),
  // AIGC Scenes (12 items)
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `ai-scene-${i}`,
    title: `AI Scene Concept ${i + 1}`,
    description: 'Architectural AI scene generation for premium furniture showcases.',
    category: 'AIGC' as Category,
    subCategory: 'SCENES' as AIGCSubCategory,
    imageUrl: `https://images.unsplash.com/photo-${[
      '1524758631624-e2822e304c36', '1441986300917-64674bd600d8', '1497366216548-37526070297c',
      '1486406146926-c627a92ad1ab', '1433360405326-e50f909805b3', '1519710164239-da123dc03ef4',
      '1554995207-c18c203602cb', '1502672260266-1c1ef2d93688', '1513694203232-719a280e022f',
      '1518710843675-2540dd79065c', '1497366811353-6870744d04b2', '1497366754035-f200968a6e72'
    ][i % 12]}?auto=format&fit=crop&q=80&w=1000`,
  })),
  // Domestic (12 items)
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `dom-${i}`,
    title: `Domestic Project ${i + 1}`,
    description: 'Modernizing the digital footprint for home decor leaders.',
    category: 'DOMESTIC' as Category,
    imageUrl: `https://images.unsplash.com/photo-${[
      '1607082348824-0a96f2a4b9da', '1556742502-ec7c0e9f34b1', '1523474251958-d384ca6c3823',
      '1611132623530-23bb27327097', '1556740738-b6a63e27c4df', '1556740758-90de374c12ad',
      '1556741533-64c39dc92b9b', '1556742044-3c52d6e88102', '1556742111-a301076d9d18',
      '1556742205-e10c9486e506', '1556742502-ec7c0e9f34b1', '1556742307-28d844c8034d'
    ][i % 12]}?auto=format&fit=crop&q=80&w=1000`,
  })),
  // Cross-border (12 items)
  ...Array.from({ length: 12 }).map((_, i) => ({
    id: `cb-${i}`,
    title: `Global Campaign ${i + 1}`,
    description: 'Optimization of product listings and A+ content for western markets.',
    category: 'CROSS_BORDER' as Category,
    imageUrl: `https://images.unsplash.com/photo-${[
      '1523474251958-d384ca6c3823', '1611132623530-23bb27327097', '1523474438810-79c27725967b',
      '1523474251958-d384ca6c3823', '1523474251958-d384ca6c3823', '1523474251958-d384ca6c3823',
      '1523474251958-d384ca6c3823', '1523474251958-d384ca6c3823', '1523474251958-d384ca6c3823',
      '1523474251958-d384ca6c3823', '1523474251958-d384ca6c3823', '1523474251958-d384ca6c3823'
    ][i % 12]}?auto=format&fit=crop&q=80&w=1000`,
  })),
];

// --- Components ---

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass rounded-none border-t-0 border-x-0 border-b border-white/5 mx-0">
      <div className="max-w-screen-xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="#" className="font-bold text-lg hover:opacity-70 transition-opacity tracking-tight">LIAM DESIGN</a>
          <div className="hidden md:flex gap-8 text-[11px] font-medium text-white/50 tracking-widest uppercase">
            <a href="#work" className="hover:text-white transition-colors">Works</a>
            <a href="#about" className="hover:text-black transition-colors">About</a>
            <a href="#contact" className="hover:text-black transition-colors">Process</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
        <button className="bg-white text-black text-[11px] px-5 py-1.5 rounded-full font-bold hover:bg-gray-100 transition-colors uppercase tracking-tight">
          Get in touch
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden apple-gradient text-white">
      <div className="absolute inset-0 hero-glow" />
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
      </motion.div>

      <div className="relative z-10 text-center px-4">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
           style={{ y: textY }}
        >
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 opacity-10 text-[180px] font-black tracking-tighter select-none">DESIGN</div>
          <span className="inline-block text-[10px] md:text-xs font-semibold tracking-[0.4em] uppercase mb-8 text-blue-400 opacity-80">
            Visionary Creative Agency
          </span>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.95]">
            重塑数字<br/>
            <span className="text-white/40">设计的边界。</span>
          </h1>
          <p className="max-w-md mx-auto text-white/50 text-base md:text-xl font-light leading-relaxed mb-10">
            专注于 AIGC 与电商视觉的深度融合，<br className="hidden md:block"/>用技术赋能审美新范式。
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-black px-10 py-4 rounded-full text-xs font-bold hover:scale-105 transition-all flex items-center group uppercase tracking-widest">
              View Work <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{ delay: 1.2, duration: 2 }}
        className="absolute bottom-12 flex flex-col items-center gap-3"
      >
        <div className="w-[1px] h-16 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 64] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-0 w-full h-1/2 bg-blue-400"
          />
        </div>
      </motion.div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 md:py-48 bg-black relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-x-1/2" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* Left: Designer Stats Module with Effects */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
             className="lg:col-span-5 space-y-6"
          >
            <div className="glass p-1 h-fit overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000"
                alt="Studio Profile"
                className="w-full aspect-[4/5] object-cover rounded-[22px] mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Right: Detailed Info */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none flex flex-wrap items-baseline gap-4">
                <span>张伟华</span>
                <span className="text-sm md:text-2xl font-light tracking-tighter text-white uppercase opacity-80">Viva丶Zhang</span>
              </h2>
              <div className="text-blue-400 text-lg md:text-2xl font-light tracking-wide pt-2">
                电商视觉总监 / AIGC 技术探索者
              </div>
            </motion.div>
            
            <div className="space-y-8">
              {[
                { title: 'AI 赋能生产力', text: '不再局限于传统的像素对齐，我们正通过自有的 AIGC 工作流，将创意周期缩短 70% 以上，为品牌提供更具爆发力的视觉表达。', color: 'bg-blue-500', delay: 0.4 },
                { title: '全球化商业叙事', text: '深耕跨境电商多年，精准洞察不同文化背景下的消费心理，用具有国际化视野的视觉语言助力品牌出海。', color: 'bg-purple-500', delay: 0.5 }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: item.delay, duration: 0.8 }}
                  className="flex gap-8 items-start border-l border-white/10 pl-8 relative group"
                >
                  <div className={`absolute left-0 top-0 w-px h-0 ${item.color} group-hover:h-full transition-all duration-700`} />
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">{item.title}</h3>
                    <p className="text-white/50 text-lg font-light leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-6">
              {['Cinema 4D', 'Photoshop', 'Illustrator', 'Gemini', 'ChatGPT'].map((tag, i) => (
                <motion.span 
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="px-5 py-2 glass bg-white/5 text-[11px] font-bold rounded-xl text-white/50 tracking-wider hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('AIGC');
  const [activeSub, setActiveSub] = useState<AIGCSubCategory>('MODELS');
  
  const filteredItems = PORTFOLIO_ITEMS.filter(item => {
    if (item.category !== activeCategory) return false;
    if (activeCategory === 'AIGC' && item.subCategory !== activeSub) return false;
    return true;
  });

  const categories = [
    { id: 'AIGC', label: 'AIGC 赋能', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'DOMESTIC', label: '国内电商', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'CROSS_BORDER', label: '跨境电商', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <section id="work" className="py-32 bg-black min-h-screen relative">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-screen-xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Selected Projects</span>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-white">作品选集.</h2>
          </motion.div>
          <div className="flex space-x-1.5 mb-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === 1 ? 'w-8 bg-blue-500' : 'w-2 bg-white/10'}`} />
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as Category)}
              className={`relative overflow-hidden p-8 rounded-[32px] text-left transition-all duration-500 group border text-white ${
                activeCategory === cat.id 
                ? 'glass bg-blue-500/5 border-blue-500/30 shadow-[0_0_40px_rgba(37,99,235,0.1)]' 
                : 'glass border-transparent hover:border-white/10 hover:bg-white/5'
              }`}
            >
              <div className={`mb-8 p-5 rounded-2xl w-fit transition-all duration-500 ${
                activeCategory === cat.id 
                ? 'bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.6)] scale-110' 
                : 'bg-white/5 text-white/20 group-hover:bg-white/10 group-hover:text-white/40'
              }`}>
                {cat.id === 'AIGC' && <Sparkles className="w-8 h-8" />}
                {cat.id === 'DOMESTIC' && <ShoppingBag className="w-8 h-8" />}
                {cat.id === 'CROSS_BORDER' && <Globe className="w-8 h-8" />}
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-2 tracking-tight transition-colors duration-500 ${
                  activeCategory === cat.id ? 'text-white' : 'text-white/30 group-hover:text-white/50'
                }`}>
                  {cat.label}
                </h3>
                <div className="flex items-center gap-2">
                  <p className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-colors duration-500 ${
                    activeCategory === cat.id ? 'text-blue-400' : 'text-white/10 group-hover:text-white/20'
                  }`}>
                    {activeCategory === cat.id ? 'Viewing Category' : 'View Projects'}
                  </p>
                  {activeCategory === cat.id && <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}><ChevronRight className="w-3 h-3 text-blue-400" /></motion.div>}
                </div>
              </div>
              
              <div className={`absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity ${activeCategory === cat.id ? 'opacity-10' : ''}`}>
                <div className="text-8xl font-black tracking-tighter select-none uppercase -mr-4 -mt-4">
                  {cat.id.charAt(0)}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* AIGC Subcategories */}
        {activeCategory === 'AIGC' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex gap-14 mb-16 border-b border-white/5 pb-7"
          >
            {[
              { id: 'MODELS', label: 'AI 模特' },
              { id: 'SCENES', label: 'AI 场景' }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveSub(sub.id as AIGCSubCategory)}
                className={`text-xl font-bold tracking-[0.2em] uppercase transition-all ${
                  activeSub === sub.id ? 'text-blue-400' : 'text-white/20 hover:text-white/50'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (index % 12) * 0.05 }}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden border border-white/10 glass mb-6">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                </div>

                <div className="px-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-2 block">
                    {item.subCategory || item.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                  <p className="text-white/40 text-sm font-light max-w-sm line-clamp-1 group-hover:text-white/60 transition-colors">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <footer id="contact" className="py-24 apple-gradient border-t border-white/5">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Ready to elevate your vision?</h2>
        <p className="text-white/40 mb-12 max-w-lg mx-auto">Let's collaborate on your next design project or AI-driven commerce initiative.</p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
           <a href="mailto:hello@example.com" className="w-full md:w-auto bg-white text-black px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform uppercase tracking-widest text-xs">
             Start a Project
           </a>
           <div className="flex gap-4">
              {['Instagram', 'Linkedin', 'Dribbble'].map(social => (
                <a key={social} href="#" className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center glass hover:bg-blue-500 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
                  <ExternalLink className="w-4 h-4 text-white" />
                </a>
              ))}
           </div>
        </div>
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold gap-4">
          <span>&copy; {new Date().getFullYear()} LIAM DESIGN STUDIO. All Rights Reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="selection:bg-black selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <PortfolioSection />
        <Contact />
      </main>
    </div>
  );
}

