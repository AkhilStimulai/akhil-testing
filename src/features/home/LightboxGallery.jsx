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
        className="relative isolate w-full overflow-hidden scroll-mt-[var(--layout-navbar-height)] bg-surface-inverse text-text-inverse py-section-sm lg:py-section-lg"
        id="home-gallery"
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

        <motion.div
          className="mx-auto w-full max-w-container px-container-sm md:px-container-md lg:px-container-lg"
          initial="hidden"
          variants={revealContainer}
          viewport={{ once: true, amount: 0.18 }}
          whileInView="visible"
        >
          {/* Header */}
          <motion.header className="text-left mb-space-48" variants={revealItem}>
            <p className="font-body text-label font-medium uppercase tracking-[0.35em] text-accent">Gallery</p>
            <h2
              className="mt-space-16 font-display text-heading-xl md:text-display-m text-text-inverse"
              id="home-gallery-title"
            >
              Inside the StimulAI Build.
            </h2>
            <p className="mt-space-16 max-w-prose font-body text-body-l font-normal text-text-inverse/68">
              Explore our detailed engineering builds, precision prototypes, and product designs captured during development.
            </p>
          </motion.header>

          {/* Grid wrapper — serves as the positioning context for the lightbox */}
          <div className="relative w-full">
            {/* 4x3 Grid */}
            <motion.div
              aria-label="StimulAI image gallery"
              className={cn(
                'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 w-full transition-[filter,opacity] duration-500',
                isOpen && 'grayscale opacity-30'
              )}
              variants={revealContainer}
            >
              {images.map((image, index) => (
                <motion.button
                  aria-label={`Open ${image.title}`}
                  className="group relative aspect-square overflow-hidden rounded-lg md:rounded-xl border border-text-inverse/10 bg-text-inverse/[0.035] text-left shadow-hairline transition-all duration-300 ease-out hover:border-accent/70 hover:shadow-2xl focus-visible:outline-none focus-visible:shadow-focus"
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
                      className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      decoding="async"
                      draggable="false"
                      loading={index < 4 ? 'eager' : 'lazy'}
                      src={image.src}
                    />
                  </motion.div>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg md:rounded-xl bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
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
                    className="absolute top-4 left-1/2 -translate-x-1/2 z-[110] px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full font-mono text-xs tracking-[0.25em] uppercase backdrop-blur-md border border-white/20 transition-all duration-300 shadow-xl flex items-center gap-2"
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
                    className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-[110] p-3 text-white/50 hover:text-white transition-colors duration-300"
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
                    className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-[110] p-3 text-white/50 hover:text-white transition-colors duration-300"
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
