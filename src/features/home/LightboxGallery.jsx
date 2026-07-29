import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/utils';
import { revealContainer, revealItem } from '@/utils';

import {
  galleryImages,
  getLoopedIndex,
} from './gallery.data.js';

const CROSS_FLIGHT_DELAY = 150;
const RETURN_DURATION = 520;

export function LightboxGallery() {
  const reduceMotion = useReducedMotion();
  const closeButtonRef = useRef(null);
  const timersRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Requirement: Enforce exactly 12 images to match the 4x3 grid specification
  const images = galleryImages.slice(0, 12);
  const totalImages = images.length;

  const activeImage = activeIndex === null ? null : images[activeIndex];
  const displayImage = images[displayIndex];

  const sharedTransition = useMemo(
    () =>
      reduceMotion
        ? { duration: 0 }
        : {
          type: 'spring',
          stiffness: 190,
          damping: 25,
          mass: 0.85,
        },
    [reduceMotion],
  );

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const queueTimer = useCallback((callback, delay) => {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
  }, []);

  const openLightbox = useCallback((index) => {
    clearTimers();
    setDisplayIndex(index);
    setIsOpen(true);
    setIsTransitioning(false);
    setActiveIndex(index);
  }, [clearTimers]);

  const closeLightbox = useCallback(() => {
    clearTimers();
    setIsTransitioning(false);
    setActiveIndex(null);
    queueTimer(() => {
      setIsOpen(false);
    }, reduceMotion ? 0 : RETURN_DURATION);
  }, [clearTimers, queueTimer, reduceMotion]);

  const moveLightbox = useCallback(
    (direction) => {
      if (!isOpen || activeIndex === null || isTransitioning || totalImages === 0) {
        return;
      }

      const nextIndex = getLoopedIndex(displayIndex + direction, totalImages);
      const incomingDelay = reduceMotion ? 0 : CROSS_FLIGHT_DELAY;
      const releaseDelay = reduceMotion ? 0 : RETURN_DURATION;

      clearTimers();
      setIsTransitioning(true);
      setDisplayIndex(nextIndex);

      // Cross-flight: send the current image home, then let the next one launch
      // 150ms later while the return animation is still in progress.
      setActiveIndex(null);
      queueTimer(() => {
        setActiveIndex(nextIndex);
      }, incomingDelay);
      queueTimer(() => {
        setIsTransitioning(false);
      }, releaseDelay);
    },
    [
      activeIndex,
      clearTimers,
      displayIndex,
      isOpen,
      isTransitioning,
      queueTimer,
      reduceMotion,
      totalImages,
    ],
  );

  useEffect(() => clearTimers, [clearTimers]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeLightbox();
      }
      if (event.key === 'ArrowLeft') {
        moveLightbox(-1);
      }
      if (event.key === 'ArrowRight') {
        moveLightbox(1);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeLightbox, isOpen, moveLightbox]);

  if (totalImages === 0) {
    return null;
  }

  return (
    <LayoutGroup id="premium-lightbox-gallery">
      <section
        aria-labelledby="home-gallery-title"
        className="relative isolate w-full h-screen-dvh flex flex-col justify-center overflow-hidden scroll-mt-[var(--layout-navbar-height)] bg-surface-inverse text-text-inverse py-4 lg:py-0 pt-navbar lg:pt-[calc(var(--layout-navbar-height)+1rem)] 2xl:pt-[calc(var(--layout-navbar-height)+3rem)]"
        data-section-id="home-gallery"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-base bg-[radial-gradient(circle_at_14%_18%,rgb(183_24_43/0.13),transparent_26%),radial-gradient(circle_at_86%_64%,rgb(255_255_255/0.07),transparent_29%)]"
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

        {/* MOBILE VIEW (Frame 4) — 100dvh strictly fitting without overflow */}
        <div className="flex md:hidden flex-col justify-between w-full h-screen-dvh pt-[calc(var(--layout-navbar-height)+0.25rem)] pb-3 px-container-sm overflow-hidden relative z-10 text-left">
          {/* Header */}
          <div className="shrink-0 mb-1">
            <p className="font-body text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">
              Gallery
            </p>
            <h2 className="mt-0.5 font-display text-[clamp(1.1rem,4.5vw,1.38rem)] font-bold text-text-inverse leading-tight">
              Inside the StimulAI Build.
            </h2>
            <p className="font-body text-[clamp(0.66rem,2.7vw,0.76rem)] text-text-inverse/75 leading-snug mt-0.5 max-w-prose">
              Explore our detailed engineering builds, precision prototypes, and product designs captured during development.
            </p>
          </div>

          {/* Condensed 2-Column Grid filling remaining viewport height */}
          <div className="flex-1 min-h-0 grid grid-cols-2 grid-rows-5 gap-1 mt-1">
            {images.slice(0, 10).map((img, idx) => (
              <div
                key={img.id || idx}
                onClick={() => openLightbox(idx)}
                className="relative rounded bg-[#1C1C1C] border border-white/10 overflow-hidden flex items-center justify-center group cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 size-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <span className="sr-only">{img.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <motion.div
          className="hidden md:flex flex-col flex-1 h-full justify-between mx-auto w-full max-w-container px-container-sm md:px-container-md lg:px-container-lg pb-4 lg:pb-6 2xl:pb-12"
          initial="hidden"
          variants={revealContainer}
          viewport={{ once: true, amount: 0.18 }}
          whileInView="visible"
        >
          {/* Header */}
          <motion.header className="text-left mb-space-12 lg:mb-space-8 2xl:mb-space-12 shrink-0" variants={revealItem}>
            <p className="font-body text-[10px] sm:text-label font-medium uppercase tracking-[0.25em] sm:tracking-[0.35em] text-accent">Gallery</p>
            <h2
              className="mt-1 sm:mt-space-12 font-display text-heading-s sm:text-heading-xl md:text-display-m text-text-inverse"
              id="home-gallery-title"
            >
              Inside the StimulAI Build.
            </h2>
            <p className="mt-1 sm:mt-space-12 max-w-prose font-body text-body-xs sm:text-body-m md:text-body-l font-normal text-text-inverse/68 line-clamp-2 sm:line-clamp-none">
              Explore our detailed engineering builds, precision prototypes, and product designs captured during development.
            </p>
          </motion.header>

          {/* Grid wrapper — serves as the positioning context for the lightbox */}
          <div className="relative w-full flex-1 min-h-0 flex flex-col">
            {/* Grid */}
            <motion.div
              aria-label="StimulAI image gallery"
              className={cn(
                'grid grid-cols-4 gap-1.5 sm:gap-2 md:gap-3 2xl:gap-6 w-full flex-1 min-h-0 transition-[filter,opacity] duration-300',
                isOpen && 'grayscale opacity-30'
              )}
              variants={revealContainer}
            >
              {images.map((image, index) => (
                <motion.button
                  aria-label={`Open ${image.title}`}
                  className="group relative h-full w-full overflow-hidden rounded-md md:rounded-xl border border-text-inverse/10 bg-text-inverse/[0.035] text-left shadow-hairline transition-[box-shadow,border-color] duration-200 ease-out hover:border-accent/70 hover:shadow-2xl focus-visible:outline-none focus-visible:shadow-focus active:scale-[0.98]"
                  key={image.id}
                  onClick={() => openLightbox(index)}
                  type="button"
                  variants={revealItem}
                >
                  <motion.div
                    className="absolute inset-0 overflow-hidden rounded-lg md:rounded-xl"
                    layoutId={`lightbox-gallery-image-${image.id}`}
                    transition={sharedTransition}
                  >
                    <img
                      alt={image.alt}
                      className="size-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-105"
                      decoding="async"
                      draggable="false"
                      loading={index < 4 ? 'eager' : 'lazy'}
                      src={image.src}
                    />
                  </motion.div>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg md:rounded-xl bg-black/0 transition-colors duration-200 group-hover:bg-black/20"
                  />
                </motion.button>
              ))}
            </motion.div>

            {/* Lightbox overlay — positioned exactly over the grid area */}
            <AnimatePresence>
              {isOpen && activeImage ? (
                <div className="absolute inset-0 z-[100] flex items-center justify-center rounded-xl overflow-hidden">
                  {/* Backdrop — covers only the grid */}
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 bg-black/90 rounded-xl"
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    animate={{ opacity: 1 }}
                    onClick={closeLightbox}
                  />

                  {/* Close Button at Center Top */}
                  <motion.button
                    ref={closeButtonRef}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-4 left-1/2 -translate-x-1/2 z-[110] px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-mono text-xs tracking-[0.25em] uppercase backdrop-blur-md border border-white/20 transition-[color,background-color,border-color] duration-200 shadow-xl flex items-center gap-2 active:scale-[0.95]"
                    onClick={closeLightbox}
                    type="button"
                  >
                    <X size={14} />
                    CLOSE
                  </motion.button>

                  {/* Prev Button (Left Edge) */}
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-[110] p-3 text-white/50 hover:text-white transition-colors duration-200 active:scale-[0.95]"
                    onClick={() => moveLightbox(-1)}
                    type="button"
                  >
                    <ChevronLeft size={40} strokeWidth={1} />
                    <span className="sr-only">Previous</span>
                  </motion.button>

                  {/* Active Image — fills the grid overlay area */}
                  <div className="relative z-[105] flex items-center justify-center px-16 py-14" style={{ width: '100%', height: '100%' }}>
                    <motion.figure
                      className="relative flex items-center justify-center w-full h-full"
                      layoutId={`lightbox-gallery-image-${activeImage.id}`}
                      transition={sharedTransition}
                    >
                      <img
                        alt={activeImage.alt}
                        className="max-w-full max-h-full object-contain rounded-md shadow-[0_34px_120px_rgb(0_0_0/0.8)]"
                        decoding="async"
                        draggable="false"
                        loading="eager"
                        src={activeImage.src}
                      />
                      <figcaption className="sr-only" id="lightbox-gallery-title">
                        {activeImage.title}
                      </figcaption>
                    </motion.figure>
                  </div>

                  {/* Next Button (Right Edge) */}
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[110] p-3 text-white/50 hover:text-white transition-colors duration-200 active:scale-[0.95]"
                    onClick={() => moveLightbox(1)}
                    type="button"
                  >
                    <ChevronRight size={40} strokeWidth={1} />
                    <span className="sr-only">Next</span>
                  </motion.button>

                  {/* Bottom metadata */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[110] text-[10px] font-mono tracking-[0.2em] text-white/40 uppercase pointer-events-none"
                  >
                    {String(displayIndex + 1).padStart(2, '0')} / {String(totalImages).padStart(2, '0')} — {displayImage?.title}
                  </motion.div>
                </div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </LayoutGroup>
  );
}
