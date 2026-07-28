import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, Layers, Cpu, ShieldCheck, Zap } from 'lucide-react';
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
  const Icon = cardData.icon;

  return (
    <RouteDocument meta={domainMeta?.seo ?? DOMAIN_DETAIL_FALLBACK_META}>
      <main className="relative isolate min-h-screen w-full bg-[#0B0B0B] text-text-inverse pb-20 overflow-x-hidden pt-navbar">
        {/* Background Glows */}
        <div aria-hidden="true" className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[160px] pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Bar Navigation */}
        <div className="max-w-container mx-auto px-container-sm md:px-container-md lg:px-container-lg pt-8 pb-4">
          <Link
            to="/#home-domains"
            className="inline-flex items-center gap-2 text-caption font-body uppercase tracking-[0.2em] text-text-inverse/70 hover:text-accent transition-colors duration-200 group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Domains
          </Link>
        </div>

        {/* Hero Section */}
        <section className="max-w-container mx-auto px-container-sm md:px-container-md lg:px-container-lg mt-6 lg:mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info */}
            <div className="lg:col-span-7 flex flex-col z-10">
              <span className="font-body text-caption md:text-label font-bold uppercase tracking-[0.3em] text-accent mb-4">
                {details.eyebrow}
              </span>

              <h1 className="font-heading text-heading-l md:text-display-m lg:text-display-l font-bold text-text-inverse leading-tight mb-6">
                {cardData.title}
              </h1>

              <p className="font-body text-body-m md:text-body-l text-text-inverse/80 leading-relaxed mb-8 max-w-2xl">
                {details.overview}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to={ROUTES.CONTACT}
                  className="inline-flex items-center gap-3 bg-accent hover:bg-accent-hover text-text-inverse font-body text-button font-bold py-4 px-8 rounded-full uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(183,24,43,0.4)] transition-all duration-200 hover:scale-105 active:scale-[0.97]"
                >
                  Start a Project
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Right Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 shadow-2xl group bg-black">
                <img
                  src={cardData.image}
                  alt={cardData.title}
                  className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl">
                  {Icon && <Icon className="size-6 text-accent" />}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Engineering Capabilities Grid */}
        <section className="max-w-container mx-auto px-container-sm md:px-container-md lg:px-container-lg mt-20 lg:mt-32">
          <div className="border-t border-white/10 pt-16">
            <h2 className="font-heading text-heading-m md:text-heading-l font-bold text-text-inverse mb-4">
              Core Engineering Capabilities
            </h2>
            <p className="font-body text-body-m text-text-inverse/60 max-w-xl mb-12">
              Our multidisciplinary engineering approach unites precision hardware with artificial intelligence to deliver mission-critical solutions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {details.capabilities.map((cap, idx) => {
                const CapIcon = cap.icon;
                return (
                  <motion.div
                    key={cap.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-colors duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="size-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                        <CapIcon className="size-6 text-accent" />
                      </div>
                      <h3 className="font-heading text-heading-s font-semibold text-text-inverse mb-3">
                        {cap.title}
                      </h3>
                      <p className="font-body text-body-small text-text-inverse/70 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </RouteDocument>
  );
}
