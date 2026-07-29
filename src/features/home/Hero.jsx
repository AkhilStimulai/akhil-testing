import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from '@/components/animations';
import { ROUTES } from '@/constants';
import { cn } from '@/utils';
import hero1 from '@/assets/images/hero1.jpg';
import hero1Mobile from '@/assets/images/Mobile_Image/hero1-mobile.png';
import hero2 from '@/assets/images/hero2.jpg';
import hero2Mobile from '@/assets/images/Mobile_Image/hero2-mobile.png';
import hero4 from '@/assets/images/hero4.jpg';
import hero4Mobile from '@/assets/images/Mobile_Image/hero4-mobile.png';

const headingLines = ['Engineering', 'Intelligence'];
const heroImagesDesktop = [
  // heroEngineeringImage,
  hero1,
  hero2,
  hero4
];
const heroImagesMobile = [
  // heroEngineeringImage,
  hero1Mobile,
  hero2Mobile,
  hero4Mobile
];
const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.24,
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
      duration: 0.82,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ctaClass =
  'group inline-flex h-control-md md:h-control-lg items-center justify-center gap-space-12 rounded-full border px-space-16 md:px-space-24 font-body text-body-small md:text-button transition-ui duration-medium ease-luxury focus-visible:outline-none focus-visible:shadow-focus motion-reduce:transition-none';

export function Hero() {
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 24, mass: 0.25 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 24, mass: 0.25 });
  const [currentImage, setCurrentImage] = useState(0);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const heroImages = isMobile ? heroImagesMobile : heroImagesDesktop;
  useEffect(() => {
    if (reduceMotion || !imageRef.current || !rootRef.current) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.025 },
        {
          scale: 1.085,
          duration: 22,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        },
      );
    }, rootRef);

    return () => context.revert();
  }, [reduceMotion]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  function handlePointerMove(event) {
    if (reduceMotion || event.pointerType !== 'mouse' || window.innerWidth < 1024) {
      return;
    }

    const bounds = rootRef.current?.getBoundingClientRect();

    if (!bounds) {
      return;
    }

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    pointerX.set(x * 16);
    pointerY.set(y * 10);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      data-section-id="home-hero"
      ref={rootRef}
      aria-labelledby="home-hero-title"
      className="relative isolate flex w-full h-screen-dvh overflow-hidden bg-surface-inverse text-text-inverse items-center justify-center"
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      {/* MOBILE VIEW (Frame 1) — Hero image + text + CTAs strictly fitting 100dvh */}
      <div className="flex md:hidden flex-col justify-end w-full h-screen-dvh pb-10 px-container-sm overflow-hidden text-center relative z-10 bg-black">
        {/* Background Image */}
        <motion.img
          key={`mobile-hero-${currentImage}`}
          src={heroImagesMobile[currentImage] || hero1Mobile}
          alt="StimulAI Hero"
          className="absolute inset-0 size-full object-cover object-center opacity-85"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Content Container */}
        <motion.div
          className="relative z-10 flex flex-col items-center max-w-sm mx-auto"
          initial="hidden"
          animate="visible"
          variants={revealContainer}
        >
          <h1 className="font-display text-[clamp(1.8rem,7vw,2.4rem)] font-bold text-text-inverse leading-[1.1] tracking-tight">
            Engineering<br />Intelligence
          </h1>

          <p className="mt-2 font-body text-[clamp(0.75rem,3.2vw,0.88rem)] text-text-inverse/85 leading-snug">
            Designed for the future. Built to inspire every journey.
          </p>

          <div className="mt-4 flex flex-row items-center justify-center gap-2.5 w-full">
            <Link
              to={ROUTES.DOMAINS}
              className="inline-flex h-9 items-center justify-center rounded-full border border-accent bg-accent px-4 font-body text-[11px] font-medium uppercase tracking-wider text-white transition-all active:scale-95"
            >
              Explore Our Work
            </Link>
            <Link
              to={ROUTES.PRODUCTS}
              className="inline-flex h-9 items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-sm px-4 font-body text-[11px] font-medium uppercase tracking-wider text-text-inverse transition-all active:scale-95"
            >
              Meet RCX
            </Link>
          </div>
        </motion.div>
      </div>

      {/* DESKTOP VIEW */}
      <motion.div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 -z-base w-full h-full -translate-y-[10vh] lg:translate-y-0"
        style={{ x: springX, y: springY }}
      >
        <motion.img
          key={currentImage}
          ref={imageRef}
          src={heroImages[currentImage]}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="size-full object-cover object-center opacity-90"
          initial={{
            opacity: 0,
            scale: 1.08,
          }}
          animate={{
            opacity: 1,
            scale: 1.08,
          }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0 -z-base bg-[linear-gradient(to_bottom,transparent_45%,rgba(0,0,0,0.85)_75%,rgb(0,0,0)_100%)] lg:bg-[linear-gradient(90deg,rgb(0_0_0/0.84)_0%,rgb(0_0_0/0.62)_34%,rgb(0_0_0/0.26)_66%,rgb(0_0_0/0.7)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-base bg-[radial-gradient(circle_at_28%_48%,rgb(255_255_255/0.1),transparent_32%),radial-gradient(circle_at_center,transparent_38%,rgb(0_0_0/0.72)_100%)] hidden lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-base opacity-[0.12] mix-blend-overlay hidden lg:block"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgb(255 255 255 / 0.18) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.12) 1px, transparent 1px)',
          backgroundSize: '3px 3px',
        }}
      />

      <div className="hidden md:flex absolute inset-0 flex-col items-center justify-end pb-[7vh] pt-[calc(var(--layout-navbar-height)+1rem)] px-container-sm md:px-container-md lg:relative lg:inset-auto lg:mx-auto lg:h-full lg:w-full lg:max-w-container lg:flex-col lg:items-start lg:justify-center lg:pb-space-40 lg:pt-navbar lg:px-container-lg">
        <motion.div
          className="w-full max-w-[54rem] text-center lg:text-left flex flex-col items-center lg:items-start"
          initial="hidden"
          animate="visible"
          variants={revealContainer}
        >
          <h1
            id="home-hero-title"
            className="mt-space-8 font-display text-[2.5rem] sm:text-display-l md:text-display-xl text-text-inverse font-bold leading-[1.08] tracking-tight"
          >
            {headingLines.map((line) => (
              <span className="block overflow-hidden pb-2" key={line}>
                <motion.span className="block" variants={revealItem}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-space-12 sm:mt-space-16 max-w-prose font-body text-body-s sm:text-body-m md:text-body-l font-normal text-text-inverse/85"
            variants={revealItem}
          >
            Designed for the future. Built to inspire every journey.
          </motion.p>

          <motion.div
            className="mt-space-16 sm:mt-space-24 w-full flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-space-12"
            variants={revealItem}
          >
            <Link
              className={cn(
                ctaClass,
                'border-accent bg-accent text-white hover:bg-transparent hover:text-white px-4 py-2 sm:px-space-24 sm:py-space-12 text-caption sm:text-button h-auto w-auto',
              )}
              to={ROUTES.DOMAINS}
            >
              Explore Our Work
            </Link>
            <Link
              className={cn(
                ctaClass,
                'border-text-inverse bg-transparent text-text-inverse hover:bg-text-inverse/10 px-4 py-2 sm:px-space-24 sm:py-space-12 text-caption sm:text-button h-auto w-auto',
              )}
              to={ROUTES.PRODUCTS}
            >
              Meet RCX
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-space-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-space-12 text-text-inverse/62 md:flex"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-body text-caption">Scroll</span>
        <span className="relative h-space-48 w-px overflow-hidden bg-text-inverse/18">
          <motion.span
            className="absolute left-0 top-0 h-space-16 w-px bg-accent"
            animate={reduceMotion ? { y: 0 } : { y: ['-100%', '300%'] }}
            transition={{ duration: 1.8, ease: [0.2, 0, 0, 1], repeat: Infinity }}
          />
        </span>
        <ArrowDown aria-hidden="true" className="size-icon-16" />
      </motion.div>
    </section>
  );
}
