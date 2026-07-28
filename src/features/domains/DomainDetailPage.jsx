import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Cpu, Layers, ShieldCheck, Zap } from 'lucide-react';
import { RouteDocument } from '@/components/common';
import { DOMAIN_DETAIL_FALLBACK_META, getDomainBySlug } from './domain.registry.js';
import { DOMAIN_SECTION_ITEMS } from '@/features/home/domainSection.data.js';
import { ROUTES } from '@/constants';

const DOMAIN_DETAILS_MAP = {
  'sports-engineering': {
    eyebrow: '01 / SPORTS ENGINEERING',
    overview:
      'We combine biomechanics, cutting-edge sensor arrays, and AI-powered data analytics to engineer next-generation athletic performance systems and intelligent sports hardware.',
    capabilities: [
      {
        icon: Cpu,
        title: 'Smart Sensing & Telemetry',
        desc: 'Miniaturized sensor arrays capturing real-time kinematic and biometric data with millisecond precision.',
      },
      {
        icon: Layers,
        title: 'Aerodynamic Composites',
        desc: 'Advanced carbon fiber layup and wind-tunnel optimized structural engineering for maximum efficiency.',
      },
      {
        icon: Zap,
        title: 'AI Performance Analytics',
        desc: 'Embedded edge computing algorithms that translate raw sensor metrics into actionable athlete coaching insights.',
      },
      {
        icon: ShieldCheck,
        title: 'Precision Ergonomics',
        desc: 'Human-centric industrial design tailored for extreme physical endurance, safety, and competitive advantage.',
      },
    ],
  },
  'advanced-mobility': {
    eyebrow: '02 / ADVANCED MOBILITY',
    overview:
      'Pioneering the future of transportation through intelligent mobility platforms that seamlessly unify high-performance electronics, embedded software, and industrial automotive design.',
    capabilities: [
      {
        icon: Cpu,
        title: 'Autonomous Telematics',
        desc: 'Connected V2X communication modules and real-time route optimization algorithms for smart navigation.',
      },
      {
        icon: Layers,
        title: 'Lightweight Chassis Design',
        desc: 'Ultra-rigid structural engineering utilizing aerospace-grade alloys and carbon composites.',
      },
      {
        icon: Zap,
        title: 'Powertrain Integration',
        desc: 'High-density battery management systems and efficient electric drivetrain architecture.',
      },
      {
        icon: ShieldCheck,
        title: 'Active Safety Systems',
        desc: 'Sensor-driven hazard perception and automated failsafe protocols designed for urban mobility.',
      },
    ],
  },
  'automation-robotics': {
    eyebrow: '03 / AUTOMATION & ROBOTICS',
    overview:
      'Engineering autonomous systems, precision robotics, and intelligent manufacturing automation capable of sensing, adapting, and operating in complex physical environments.',
    capabilities: [
      {
        icon: Cpu,
        title: 'Adaptive AI Vision',
        desc: 'Real-time optical inspection and spatial awareness powered by deep learning neural networks.',
      },
      {
        icon: Layers,
        title: 'Precision Kinematics',
        desc: 'High-torque robotic actuation and multi-axis motion control with sub-millimeter accuracy.',
      },
      {
        icon: Zap,
        title: 'Industrial Edge IoT',
        desc: 'Low-latency distributed sensor networks for predictive maintenance and automated workflow orchestration.',
      },
      {
        icon: ShieldCheck,
        title: 'Robust Environmental Shielding',
        desc: 'Industrial-grade enclosure engineering built to withstand extreme vibration, heat, and contaminants.',
      },
    ],
  },
  'environmental-sustainability': {
    eyebrow: '04 / ENVIRONMENTAL SUSTAINABILITY',
    overview:
      'Developing intelligent cleantech and environmental monitoring systems that empower industries to measure, optimize, and preserve vital natural resources with unmatched accuracy.',
    capabilities: [
      {
        icon: Cpu,
        title: 'Remote Resource Monitoring',
        desc: 'Autonomous IoT sensor stations tracking water, air, and soil quality across vast geographical areas.',
      },
      {
        icon: Layers,
        title: 'Eco-Efficient Systems',
        desc: 'Energy-harvesting hardware designs that operate continuously with minimal environmental footprint.',
      },
      {
        icon: Zap,
        title: 'Carbon Telemetry Platforms',
        desc: 'Cloud-synced data ingestion pipelines for real-time ESG compliance and carbon accounting.',
      },
      {
        icon: ShieldCheck,
        title: 'Sustainable Materials',
        desc: 'Pioneering the integration of recyclable composites and non-toxic components in industrial hardware.',
      },
    ],
  },
};

export function DomainDetailPage() {
  const { domainSlug } = useParams();
  const domainMeta = getDomainBySlug(domainSlug);
  
  const cardData = DOMAIN_SECTION_ITEMS.find((d) => d.href.includes(domainSlug)) || DOMAIN_SECTION_ITEMS[0];
  const details = DOMAIN_DETAILS_MAP[domainSlug] || DOMAIN_DETAILS_MAP['sports-engineering'];

  return (
    <RouteDocument meta={domainMeta?.seo ?? DOMAIN_DETAIL_FALLBACK_META}>
      <main className="relative isolate w-full bg-[#0B0B0B] text-text-inverse overflow-hidden min-h-screen lg:h-screen-dvh flex flex-col pt-[calc(var(--layout-navbar-height)+0.5rem)] lg:pt-[calc(var(--layout-navbar-height)+1.5rem)] pb-4 lg:pb-6">
        
        {/* Ambient Glows */}
        <div aria-hidden="true" className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[160px] pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />



        {/* Main 1-Page Layout */}
        <div className="flex-1 min-h-0 w-full max-w-container mx-auto px-container-sm md:px-container-md lg:px-container-lg flex flex-col z-10">
          
          {/* TOP HERO */}
          <div className="shrink-0 flex flex-col lg:flex-row gap-4 lg:gap-8 lg:h-[42%] min-h-[200px]">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex flex-col justify-center lg:pr-8"
            >
              <span className="font-body text-[9px] lg:text-caption font-bold uppercase tracking-[0.3em] text-accent mb-2 lg:mb-3">
                {details.eyebrow}
              </span>

              <h1 className="font-heading text-heading-s md:text-heading-l lg:text-display-m font-bold text-text-inverse leading-tight mb-2 lg:mb-4">
                {cardData.title}
              </h1>

              <p className="font-body text-[11px] md:text-body-m lg:text-body-l text-text-inverse/80 leading-relaxed mb-4 lg:mb-6 line-clamp-3 lg:line-clamp-none max-w-xl">
                {details.overview}
              </p>


            </motion.div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:w-[45%] xl:w-[50%] h-full shrink-0 relative rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 shadow-2xl group bg-black"
            >
              <img
                src={cardData.image}
                alt={cardData.title}
                className="size-full object-cover object-center opacity-80 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* DIVIDER */}
          <div className="shrink-0 w-full h-px bg-white/10 my-4 lg:my-6" />

          {/* BOTTOM CAPABILITIES: Text + 2x2 Grid */}
          <div className="flex-1 min-h-0 flex flex-col pb-2">
            
            <div className="shrink-0 mb-3 lg:mb-5">
              <h2 className="font-heading text-[16px] lg:text-heading-s font-bold text-text-inverse mb-1 lg:mb-2">
                Core Engineering Capabilities
              </h2>
              <p className="font-body text-[11px] lg:text-body-small text-text-inverse/60 max-w-xl line-clamp-2">
                Our multidisciplinary engineering approach unites precision hardware with artificial intelligence to deliver mission-critical solutions.
              </p>
            </div>

            <div className="flex-1 min-h-0 grid grid-cols-2 gap-3 lg:gap-4">
              {details.capabilities.map((cap, idx) => {
                const CapIcon = cap.icon;
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col justify-center p-4 lg:p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-accent/40 hover:bg-white/[0.05] hover:shadow-[0_4px_24px_rgba(183,24,43,0.1)] transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 lg:gap-4 mb-2 lg:mb-3">
                      <div className="size-8 lg:size-10 rounded-lg lg:rounded-xl bg-accent/10 border border-accent/20 flex shrink-0 items-center justify-center group-hover:bg-accent group-hover:shadow-[0_0_15px_rgba(183,24,43,0.5)] transition-all duration-300">
                        <CapIcon className="size-4 lg:size-5 text-accent group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-heading text-[12px] lg:text-[15px] font-bold text-text-inverse line-clamp-1">
                        {cap.title}
                      </h3>
                    </div>
                    
                    <p className="font-body text-[9px] lg:text-[12px] text-text-inverse/60 leading-tight lg:leading-relaxed group-hover:text-text-inverse/80 transition-colors line-clamp-2 lg:line-clamp-3">
                      {cap.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </main>
    </RouteDocument>
  );
}
