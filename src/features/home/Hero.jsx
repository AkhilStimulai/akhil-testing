import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from '@/components/animations';
import { ROUTES } from '@/constants';
import { cn } from '@/utils';
import heroEngineeringImage from '@/assets/images/hero-engineering.webp';
import hero1 from '@/assets/images/hero1.jpg';
import hero2 from '@/assets/images/hero2.jpg';
import hero4 from '@/assets/images/hero4.jpg';

const headingLines = ['Engineering', 'Intelligence'];
const heroImages = [
  heroEngineeringImage,
  hero1,
  hero2,
  hero4
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
  'group inline-flex h-control-lg items-center justify-center gap-space-12 rounded-full border px-space-24 font-body text-button transition-ui duration-medium ease-luxury focus-visible:outline-none focus-visible:shadow-focus motion-reduce:transition-none';

export function Hero() {
  const rootRef = useRef(null);
  const imageRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 24, mass: 0.25 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 24, mass: 0.25 });
  const [currentImage, setCurrentImage] = useState(0);
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
      ref={rootRef}
      aria-labelledby="home-hero-title"
      className="relative isolate flex w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-surface-inverse text-text-inverse lg:h-screen lg:aspect-none lg:flex lg:items-center lg:justify-center"
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-base w-full h-full"
        style={{ x: springX, y: springY }}
      >
        <motion.img
          key={currentImage}
          ref={imageRef}
          src={heroImages[currentImage]}
          alt=""
          decoding="async"
          fetchPriority="high"
          className="size-full object-cover object-right lg:object-center opacity-90"
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
        className="absolute inset-0 -z-base bg-black/50 lg:bg-[linear-gradient(90deg,rgb(0_0_0/0.84)_0%,rgb(0_0_0/0.62)_34%,rgb(0_0_0/0.26)_66%,rgb(0_0_0/0.7)_100%)]"
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

      <div className="absolute inset-0 flex flex-col items-start justify-end px-container-sm pb-space-24 pt-[calc(var(--layout-navbar-height)+1.5rem)] md:px-container-md lg:relative lg:inset-auto lg:mx-auto lg:flex lg:h-full lg:w-full lg:max-w-container lg:flex-col lg:items-start lg:justify-center lg:pb-space-40 lg:pt-navbar lg:px-container-lg">
        <motion.div
          className="w-full max-w-[54rem] text-left"
          initial="hidden"
          animate="visible"
          variants={revealContainer}
        >
          <motion.p
            className="font-body text-label font-medium uppercase tracking-[0.35em] text-text-inverse/76"
            variants={revealItem}
          >
          </motion.p>

          <h1
            id="home-hero-title"
            className="mt-space-12 font-display text-display-m md:text-display-l lg:text-display-xl text-text-inverse"
          >
            {headingLines.map((line) => (
              <span className="block overflow-hidden pb-0.5" key={line}>
                <motion.span className="block" variants={revealItem}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-space-16 max-w-prose font-body text-body-l font-normal text-text-inverse/74 hidden sm:block"
            variants={revealItem}
          >
            Designed for future. Built to inspire every journey.
          </motion.p>

          <motion.div
            className="mt-space-24 flex flex-row items-center justify-start gap-space-12"
            variants={revealItem}
          >
            <Link
              className={cn(
                ctaClass,
                'border-text-inverse bg-text-inverse text-text-primary hover:bg-transparent hover:text-text-inverse',
              )}
              to={ROUTES.DOMAINS}
            >
              Explore Our Work
              <ArrowRight
                aria-hidden="true"
                className="size-icon-16 transition-transform duration-medium ease-luxury group-hover:translate-x-1"
              />
            </Link>
            <Link
              className={cn(
                ctaClass,
                'border-text-inverse/28 bg-text-inverse/5 text-text-inverse backdrop-blur-[var(--motion-blur-soft)] hover:border-text-inverse hover:bg-text-inverse/10',
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
