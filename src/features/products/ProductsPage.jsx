import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { RouteDocument } from '@/components/common';
import { ROUTES } from '@/constants';
import { cn } from '@/utils';
import { PRODUCTS_META } from './seo.js';
import rcxImage from '@/assets/images/featured-rcx.jpg';

// ─── Data ────────────────────────────────────────────────────────────────────

const hardwareSpecs = [
  { label: 'Frame Set', value: 'Carbon Fibre T800', detail: 'Ultra-light, aerodynamic' },
  { label: 'Drive Train', value: 'Shimano Di2 Ready', detail: '11/12 speed electronic' },
  { label: 'Wheelset', value: 'Carbon Ceramic', detail: 'H 50, W 21/22, 1780g' },
  { label: 'Braking', value: 'Hydraulic Disc', detail: '160mm centre locking' },
  { label: 'Tires', value: 'Schwalbe Pro One', detail: 'Tubeless ready, 700C' },
  { label: 'Module Weight', value: '2070 Grams', detail: 'Frame, fork, bar, post' },
];

const smartSpecs = [
  { label: 'Security', value: 'AI Theft Prevention', detail: 'Intelligent lockdown' },
  { label: 'Navigation', value: 'Integrated GPS', detail: 'Turn-by-turn on dash' },
  { label: 'Tracking', value: 'Geo-Fencing', detail: 'With digital odometer' },
  { label: 'Connectivity', value: '4G & Wi-Fi', detail: 'Bluetooth & ANT+ sync' },
  { label: 'Ecosystem', value: 'Smart Sensors', detail: 'Real-time rider analytics' },
  { label: 'Updates', value: 'OTA Ready', detail: 'Over-the-air firmware' },
];

const tabs = [
  { id: 'hardware', label: 'Technical Specs', data: hardwareSpecs, accentOnLabel: true },
  { id: 'smart', label: 'Smart Features', data: smartSpecs, accentOnLabel: false },
];

// ─── Animation Variants ─────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function SpecCard({ item, accentOnLabel }) {
  return (
    <motion.div className="flex flex-col" variants={gridItemVariants}>
      <span
        className={cn(
          'font-body text-caption font-bold uppercase tracking-[0.2em] mb-space-4',
          accentOnLabel ? 'text-accent' : 'text-text-inverse',
        )}
      >
        {item.label}
      </span>
      <span
        className={cn(
          'font-heading text-heading-s font-semibold',
          accentOnLabel ? 'text-text-inverse' : 'text-accent',
        )}
      >
        {item.value}
      </span>
      <span className="text-text-inverse/50 font-body text-caption mt-space-4">{item.detail}</span>
    </motion.div>
  );
}

function VerticalSidebar() {
  return (
    <div className="absolute right-0 top-0 h-full w-16 md:w-20 z-50 hidden lg:flex flex-col uppercase font-body text-caption font-bold tracking-[0.6em] text-text-inverse/40 text-center border-l border-text-inverse/5 bg-black/40 backdrop-blur-md">
      <div className="h-1/2 flex items-center justify-center transition-colors hover:bg-accent/10 cursor-pointer group border-b border-text-inverse/5">
        <span
          className="group-hover:text-accent transition-colors"
          style={{ writingMode: 'vertical-lr', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
        >
          Concept
        </span>
      </div>
      <div className="h-1/2 flex items-center justify-center transition-colors hover:bg-text-inverse/5 cursor-pointer group">
        <span
          className="group-hover:text-text-inverse transition-colors"
          style={{ writingMode: 'vertical-lr', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
        >
          Design
        </span>
      </div>
    </div>
  );
}

function HeroImageContainer() {
  return (
    <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-[55%] max-w-full lg:max-w-[900px] z-30 pointer-events-none flex justify-center lg:justify-end mt-6 lg:mt-0">
      <div className="w-full max-w-[500px] lg:max-w-[800px] aspect-[2/1] border border-accent/20 rounded-3xl overflow-hidden bg-gradient-to-tr from-black/80 to-transparent backdrop-blur-sm shadow-2xl relative">
        {/* Subtle grid background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgb(255 255 255 / 0.15) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <img
          alt="RCX smart bicycle concept view"
          className="size-full object-contain md:object-cover object-center"
          decoding="async"
          fetchpriority="high"
          src={rcxImage}
        />
        {/* Overlay vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_64%_34%,transparent_0%,rgb(0_0_0/0.15)_42%,rgb(0_0_0/0.5)_100%)]"
        />
      </div>
    </div>
  );
}

function SpecsDashboard() {
  const [activeTab, setActiveTab] = useState('hardware');
  const activeTabData = tabs.find((t) => t.id === activeTab);

  return (
    <div className="w-full z-40 flex flex-col md:flex-row gap-6 bg-text-inverse/[0.02] border border-text-inverse/5 rounded-3xl p-6 backdrop-blur-md shadow-2xl relative">
      {/* Left Sidebar (Tabs) */}
      <div className="w-full md:w-1/4 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-text-inverse/10 pb-4 md:pb-0 md:pr-4">
        <p className="text-text-inverse/40 font-body text-caption font-bold uppercase tracking-[0.2em] mb-space-8 pl-space-16">
          System Analysis
        </p>

        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              'w-full text-left px-space-16 py-space-12 rounded-r-lg font-heading font-semibold text-body-small tracking-wide transition-all flex items-center justify-between group',
              activeTab === tab.id
                ? 'text-accent border-l-[3px] border-accent bg-accent/10'
                : 'text-text-inverse/50 border-l-[3px] border-transparent hover:text-text-inverse hover:bg-text-inverse/5',
            )}
            onClick={() => setActiveTab(tab.id)}
            type="button"
          >
            <span>{tab.label}</span>
            <span
              className={cn(
                'transition-all',
                activeTab === tab.id
                  ? 'text-accent opacity-100 translate-x-0'
                  : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1',
              )}
            >
              →
            </span>
          </button>
        ))}
      </div>

      {/* Right Content Area (Dynamic Grid) */}
      <div className="w-full md:w-3/4 pl-0 md:pl-6 relative min-h-[200px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="grid grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 w-full"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={gridVariants}
          >
            {activeTabData.data.map((item) => (
              <SpecCard key={item.label} item={item} accentOnLabel={activeTabData.accentOnLabel} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export function ProductsPage() {
  return (
    <RouteDocument meta={PRODUCTS_META}>
      <main className="relative isolate min-h-screen lg:h-screen w-full overflow-y-auto lg:overflow-hidden bg-surface-inverse text-text-inverse">
        {/* Background Accents */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-text-inverse/5 rounded-full blur-[120px] pointer-events-none"
        />

        {/* Huge Background Text */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 left-0 w-full flex justify-center z-0 pointer-events-none select-none"
        >
          <h1 className="text-[20vw] font-display font-black text-text-inverse/[0.03] leading-none tracking-tighter">
            RCX
          </h1>
        </div>

        {/* Scan-line Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgb(255 255 255 / 0.16) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)',
            backgroundSize: '3px 3px',
          }}
        />

        {/* Vertical Sidebar */}
        <VerticalSidebar />

        {/* Main Content Wrapper */}
        <div className="relative w-full min-h-screen lg:h-full max-w-container mx-auto flex flex-col justify-between pt-navbar pb-section-sm px-container-sm md:px-container-md lg:px-container-lg lg:pr-space-120 2xl:pr-container-lg z-10 gap-space-48 lg:gap-space-24">
          {/* Top Half: Hero & Image */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full relative flex-1 min-h-0 gap-space-40 lg:gap-0">
            {/* Left Copy Section */}
            <motion.div
              className="flex flex-col z-20 max-w-md"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }}
            >
              <motion.p
                className="font-body text-label font-bold tracking-[0.5em] text-accent uppercase mb-space-16"
                variants={fadeUp}
                custom={0}
              >
                The Next Evolution
              </motion.p>
              <motion.h2
                className="font-display text-display-m md:text-display-l lg:text-display-xl text-text-inverse mb-space-16"
                variants={fadeUp}
                custom={1}
              >
                FUTURE
              </motion.h2>
              <motion.p
                className="text-text-inverse/50 font-body text-body-l mb-space-40 max-w-xs"
                variants={fadeUp}
                custom={2}
              >
                Symmetry in motion. Precision engineered for the modern rider.
              </motion.p>
              <motion.div variants={fadeUp} custom={3}>
                <Link
                  className="group inline-flex items-center gap-space-12 bg-accent hover:bg-accent-hover text-text-inverse font-body text-button font-bold py-space-16 px-space-40 rounded-full w-max uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(183,24,43,0.4)] transition-all duration-300 transform hover:scale-105"
                  to={ROUTES.CONTACT}
                >
                  Pre-Order Now
                  <ArrowRight
                    aria-hidden="true"
                    className="size-icon-16 transition-transform duration-medium ease-luxury group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <HeroImageContainer />
          </div>

          {/* Bottom Half: Interactive Specs Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpecsDashboard />
          </motion.div>
        </div>
      </main>
    </RouteDocument>
  );
}
