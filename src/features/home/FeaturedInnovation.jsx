import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from '@/components/animations';
import { ROUTES } from '@/constants';
import { cn } from '@/utils';
import rcxImage from '@/assets/images/featured-rcx.jpg';



const timeline = ['Research', 'Prototype', 'Engineering', 'Testing', 'RCX'];



const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const revealItem = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(var(--motion-blur-soft))',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0)',
    transition: {
      duration: 0.78,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ctaClass =
  'group inline-flex h-control-lg items-center justify-center gap-space-12 rounded-full border px-space-24 font-body text-button transition-ui duration-medium ease-luxury focus-visible:outline-none focus-visible:shadow-focus motion-reduce:transition-none';

export function CTAGroup() {
  return (
    <motion.div
      className="flex flex-col items-stretch gap-space-12 sm:flex-row sm:items-center"
      variants={revealItem}
    >
      <Link
        className={cn(
          ctaClass,
          'border-text-inverse bg-text-inverse text-text-primary hover:bg-transparent hover:text-text-inverse',
        )}
        to={ROUTES.PRODUCTS}
      >
        Explore RCX
        <ArrowRight
          aria-hidden="true"
          className="size-icon-16 transition-transform duration-medium ease-luxury group-hover:translate-x-space-4"
        />
      </Link>
      <a
        className={cn(
          ctaClass,
          'border-text-inverse/24 bg-text-inverse/5 text-text-inverse hover:border-accent hover:text-accent',
        )}
        href="#rcx-engineering-story"
      >
        Engineering Story
      </a>
    </motion.div>
  );
}





export function ProductReveal({ imageRef }) {
  return (
    <motion.div className="relative" variants={revealItem}>
      <div className="absolute -inset-x-space-64 -top-space-80 h-[24rem] rounded-full bg-accent/10 blur-[80px]" />

      <figure className="relative overflow-hidden border border-text-inverse/10 bg-text-inverse/5 shadow-elevated">
        <div className="aspect-[16/11] overflow-hidden">
          <img
            ref={imageRef}
            alt="RCX smart bicycle presented in a dark studio with soft spotlight."
            className="size-full object-contain md:object-cover object-center"
            decoding="async"
            loading="lazy"
            sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 48vw, 100vw"
            src={rcxImage}
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_64%_34%,transparent_0%,rgb(0_0_0/0.18)_42%,rgb(0_0_0/0.62)_100%)]"
        />
      </figure>
    </motion.div>
  );
}

export function EngineeringTimeline({ activeStage: _activeStage, progressRef: _progressRef }) {
  return (
    <motion.div
      id="rcx-engineering-story"
      className="mt-section-sm pt-space-40"
      variants={revealItem}
    >
    </motion.div >
  );
}



export function RCXShowcase({ imageRef }) {
  return <ProductReveal imageRef={imageRef} />;
}

export function FeaturedInnovation() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const timelineProgressRef = useRef(null);
  const [activeStage, setActiveStage] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || reduceMotion) {
      return undefined;
    }

    const context = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1.08, yPercent: -2 },
          {
            scale: 1,
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          },
        );
      }

      if (timelineProgressRef.current) {
        gsap.fromTo(
          timelineProgressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '#rcx-engineering-story',
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: 0.4,
              onUpdate: (self) => {
                const nextStage = Math.min(
                  timeline.length - 1,
                  Math.floor(self.progress * timeline.length),
                );
                setActiveStage(nextStage);
              },
            },
          },
        );
      }

      gsap.to(sectionRef.current, {
        '--rcx-spotlight-x': '68%',
        duration: 7,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, sectionRef);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <section
      data-section-id="home-rcx"
      ref={sectionRef}
      aria-labelledby="featured-innovation-title"
      className="relative isolate w-full h-screen-dvh flex flex-col justify-center overflow-hidden bg-surface-inverse text-text-inverse [--rcx-spotlight-x:48%] py-4 lg:py-0 pt-navbar lg:pt-0"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-base bg-[radial-gradient(circle_at_var(--rcx-spotlight-x)_28%,rgb(255_255_255/0.12),transparent_30%),radial-gradient(circle_at_18%_74%,rgb(183_24_43/0.12),transparent_28%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-base opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgb(255 255 255 / 0.16) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* MOBILE VIEW (Frame 3: Intro Section) — Equal 50/50 split fitting 100dvh */}
      <div className="flex md:hidden flex-col justify-between w-full h-screen-dvh pt-[calc(var(--layout-navbar-height)+0.25rem)] pb-3 px-4 overflow-hidden relative z-10 text-left gap-2">
        {/* Top Equal Block: Text Content & CTAs */}
        <div className="flex-1 min-h-0 flex flex-col justify-center rounded-xl border border-white/10 bg-[#121212]/80 p-3 relative overflow-hidden">
          <p className="font-body text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">
            Featured Innovation
          </p>
          <h2 className="mt-0.5 font-display text-[clamp(1.2rem,5vw,1.45rem)] font-bold text-text-inverse leading-tight">
            RCX
          </h2>
          <p className="font-heading text-[clamp(0.78rem,3vw,0.9rem)] font-semibold text-text-inverse/90 leading-tight mt-0.5">
            The First Expression of STIMULAI
          </p>
          <p className="font-body text-[clamp(0.64rem,2.4vw,0.72rem)] text-text-inverse/75 leading-relaxed mt-1 max-w-prose">
            RCX combines intelligent engineering, artificial intelligence, connected systems and precision design into a cycling experience shaped by the way people move, decide and perform.
          </p>

          {/* Action Buttons */}
          <div className="mt-2.5 flex flex-row items-center gap-2">
            <Link
              to={ROUTES.PRODUCTS}
              className="inline-flex h-7 items-center justify-center gap-1.5 rounded-full border border-text-inverse bg-text-inverse px-3 font-body text-[9px] font-medium text-text-primary hover:bg-transparent hover:text-text-inverse transition-colors active:scale-95"
            >
              Explore RCX
              <ArrowRight className="size-2.5" />
            </Link>
            <a
              href="#rcx-engineering-story"
              className="inline-flex h-7 items-center justify-center rounded-full border border-text-inverse/24 bg-text-inverse/5 px-3 font-body text-[9px] font-medium text-text-inverse hover:border-accent hover:text-accent transition-colors active:scale-95"
            >
              Engineering Story
            </a>
          </div>
        </div>

        {/* Bottom Equal Block: RCX Showcase Image */}
        <div className="flex-1 min-h-0 w-full rounded-xl bg-[#0B0B0B] border border-white/10 overflow-hidden relative flex items-center justify-center p-2 group">
          {/* Ambient Red Glow Spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(183,24,43,0.25),transparent_65%)]" />

          {/* Bike Image with object-contain for full uncropped view */}
          <img
            src={rcxImage}
            alt="RCX engineering design"
            className="relative z-10 max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <motion.div
        className="hidden md:grid mx-auto w-full max-w-container px-container-sm md:px-container-md lg:px-container-lg gap-3 sm:gap-space-32 lg:gap-space-48 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.24 }}
        variants={revealContainer}
      >
        <div className="max-w-prose">
          <motion.p className="font-body text-[10px] sm:text-label font-medium uppercase tracking-[0.25em] sm:tracking-[0.35em] text-accent" variants={revealItem}>
            Featured Innovation
          </motion.p>
          <motion.p
            className="mt-1 sm:mt-space-16 font-display text-heading-s sm:text-heading-xl md:text-display-m text-text-inverse"
            variants={revealItem}
          >
            RCX
          </motion.p>
          <h2
            className="mt-1 sm:mt-space-8 font-display text-heading-s sm:text-heading-xl text-text-inverse md:text-display-m leading-tight"
            id="featured-innovation-title"
          >
            <span className="block overflow-hidden">
              <motion.span className="block" variants={revealItem}>
                The First Expression of STIMULAI
              </motion.span>
            </span>
          </h2>
          <motion.p className="mt-2 sm:mt-space-16 font-body text-body-s sm:text-body-l font-normal text-text-inverse/70 line-clamp-3 sm:line-clamp-none" variants={revealItem}>
            RCX combines intelligent engineering, artificial intelligence, connected
            systems and precision design into a cycling experience shaped by the
            way people move, decide and perform.
          </motion.p>
          <div className="mt-3 sm:mt-space-32">
            <CTAGroup />
          </div>
        </div>

        <RCXShowcase imageRef={imageRef} />
      </motion.div>

      <motion.div
        className="hidden lg:block mx-auto max-w-container px-container-sm md:px-container-md lg:px-container-lg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        variants={revealContainer}
      >
        <EngineeringTimeline
          activeStage={activeStage}
          progressRef={timelineProgressRef}
        />
      </motion.div>
    </section>
  );
}
