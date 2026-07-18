import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  Cpu,
  Factory,
  Navigation,
  RadioTower,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from '@/components/animations';
import { ROUTES } from '@/constants';
import { cn } from '@/utils';
import rcxImage from '@/assets/images/featured-rcx.jpg';



const timeline = ['Research', 'Prototype', 'Engineering', 'Testing', 'RCX'];

const highlights = [
  { title: 'Artificial Intelligence', icon: BrainCircuit },
  { title: 'Embedded Sensors', icon: Cpu },
  { title: 'Navigation', icon: Navigation },
  { title: 'Connected Platform', icon: RadioTower },
  { title: 'Performance Analytics', icon: Activity },
  { title: 'Precision Manufacturing', icon: Factory },
];

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

export function EngineeringTimeline({ activeStage, progressRef }) {
  return (
    <motion.div
      id="rcx-engineering-story"
      className="mt-section-sm pt-space-40"
      variants={revealItem}
    >
    </motion.div >
  );
}

export function HighlightItem({ title, icon: Icon, index }) {
  return (
    <motion.li
      className="group border-t border-text-inverse/12 py-space-24"
      variants={revealItem}
    >
      <div className="grid gap-space-16 md:grid-cols-[4rem_1fr_auto] md:items-center">
        <Icon aria-hidden="true" className="size-icon-24 text-accent" />
        <h3 className="font-heading text-heading-s text-text-inverse">{title}</h3>
        <span className="font-body text-caption text-text-inverse/36 transition-colors duration-medium ease-luxury group-hover:text-accent">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </motion.li>
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
      ref={sectionRef}
      aria-labelledby="featured-innovation-title"
      className="relative isolate lg:min-h-screen lg:h-screen overflow-hidden bg-surface-inverse text-text-inverse [--rcx-spotlight-x:48%] pb-10 lg:pb-0"
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

      <motion.div
        className="mx-auto grid min-h-full max-w-container px-6 lg:px-12 gap-8 lg:gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-center pt-10 lg:pt-navbar"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.24 }}
        variants={revealContainer}
      >
        <div className="max-w-prose">
          <motion.p className="text-xs font-medium uppercase tracking-[0.35em] text-accent leading-[1.2]" variants={revealItem}>
            Featured Innovation
          </motion.p>
          <motion.p
            className="mt-4 font-display text-3xl text-text-inverse md:text-5xl font-extrabold leading-[1.1]"
            variants={revealItem}
          >
            RCX
          </motion.p>
          <h2
            className="mt-2 font-display text-heading-xl text-text-inverse md:text-display-m font-extrabold leading-[1.1]"
            id="featured-innovation-title"
          >
            <span className="block overflow-hidden">
              <motion.span className="block" variants={revealItem}>
                The First Expression
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block" variants={revealItem}>
                of STIMULAI
              </motion.span>
            </span>
          </h2>
          <motion.p className="mt-4 font-body text-base font-normal leading-[1.6] text-text-inverse/70" variants={revealItem}>
            RCX combines intelligent engineering, artificial intelligence, connected
            systems and precision design into a cycling experience shaped by the
            way people move, decide and perform.
          </motion.p>
          <div className="mt-6">
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
