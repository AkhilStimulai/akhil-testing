import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils';

import {
  galleryImages,
  getLoopedIndex,
  getPrefersReducedMotion,
} from './gallery.data.js';

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
    y: 24,
    filter: 'blur(var(--motion-blur-soft))',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0)',
    transition: {
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function GalleryCarousel() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const mediaRefs = useRef([]);
  const imageRefs = useRef([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = galleryImages.length;

  const setActiveGalleryIndex = useCallback((index) => {
    const nextIndex = getLoopedIndex(index, totalImages);

    if (activeIndexRef.current === nextIndex) {
      return;
    }

    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  }, [totalImages]);

  const applyParallaxEffect = useCallback(() => {
    const viewportCenter = window.innerWidth * 0.5;

    imageRefs.current.forEach((image) => {
      const parent = image?.parentElement;

      if (!image || !parent) {
        return;
      }

      const rect = parent.getBoundingClientRect();
      const elementCenter = rect.left + rect.width * 0.5;
      const distanceFromCenter = (elementCenter - viewportCenter) / viewportCenter;
      const clampedDistance = clamp(distanceFromCenter, -1, 1);
      const shift = -clampedDistance * 10;

      image.style.transform = `translate3d(${shift}%, 0, 0)`;
    });
  }, []);

  const updateActiveFromNativeScroll = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return;
    }

    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    const viewportCenter = viewport.scrollLeft + viewport.clientWidth * 0.5;

    mediaRefs.current.forEach((media, index) => {
      if (!media) {
        return;
      }

      const mediaCenter = media.offsetLeft + media.offsetWidth * 0.5;
      const distance = Math.abs(mediaCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveGalleryIndex(closestIndex);
  }, [setActiveGalleryIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) {
      return undefined;
    }

    let frame = 0;

    function updateGalleryFrame() {
      applyParallaxEffect();
      updateActiveFromNativeScroll();
      frame = 0;
    }

    function requestGalleryFrame() {
      if (!frame) {
        frame = window.requestAnimationFrame(updateGalleryFrame);
      }
    }

    requestGalleryFrame();
    window.addEventListener('resize', requestGalleryFrame);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', requestGalleryFrame);
    };
  }, [applyParallaxEffect, updateActiveFromNativeScroll]);

  function moveToGalleryIndex(index) {
    const nextIndex = getLoopedIndex(index, totalImages);
    const viewport = viewportRef.current;
    const targetMedia = mediaRefs.current[nextIndex];
    const prefersReducedMotion = getPrefersReducedMotion();

    setActiveGalleryIndex(nextIndex);

    if (viewport && targetMedia) {
      viewport.scrollTo({
        left: targetMedia.offsetLeft - (viewport.clientWidth - targetMedia.clientWidth) * 0.5,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveToGalleryIndex(activeIndexRef.current - 1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveToGalleryIndex(activeIndexRef.current + 1);
    }
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="home-gallery-title"
      className="relative isolate min-h-screen overflow-hidden scroll-mt-[var(--layout-navbar-height)] bg-surface-inverse text-text-inverse"
      data-section-id="home-gallery"
      onKeyDown={handleKeyDown}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-base bg-[radial-gradient(circle_at_14%_22%,rgb(183_24_43/0.12),transparent_27%),radial-gradient(circle_at_82%_60%,rgb(255_255_255/0.07),transparent_30%)]"
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
        className="flex min-h-screen flex-col pb-space-48 pt-[calc(var(--layout-navbar-height)+var(--space-32))]"
        initial="hidden"
        variants={revealContainer}
        viewport={{ once: true, amount: 0.18 }}
        whileInView="visible"
      >
        <div className="mx-auto grid w-full max-w-container gap-space-24 pb-space-32 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end px-container-sm md:px-container-md lg:px-container-lg">
          <motion.header className="max-w-[52rem]" variants={revealItem}>
            <p className="font-body text-label text-accent">Gallery</p>
            <h2
              className="mt-space-16 font-display text-heading-s sm:text-heading-xl text-text-inverse md:text-display-m"
              id="home-gallery-title"
            >
              Inside the StimulAI Build.
            </h2>
            <p className="mt-space-20 max-w-prose font-body text-body-l text-text-inverse/68">
              Move through a horizontal parallax wall of RCX, engineering domains and product development.
            </p>
          </motion.header>

          <motion.div
            aria-label="Gallery navigation controls"
            className="flex items-center gap-space-12 lg:justify-end"
            variants={revealItem}
          >
            <button
              aria-label="Previous gallery image"
              className="inline-flex size-control-md items-center justify-center rounded-full border border-text-inverse/14 bg-text-inverse/[0.035] text-text-inverse transition-ui duration-medium ease-luxury hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:shadow-focus"
              onClick={() => moveToGalleryIndex(activeIndexRef.current - 1)}
              type="button"
            >
              <ChevronLeft aria-hidden="true" className="size-icon-20" />
            </button>
            <p
              aria-live="polite"
              className="min-w-[4.5rem] text-center font-body text-caption text-text-inverse/58"
            >
              {String(activeIndex + 1).padStart(2, '0')} / {String(totalImages).padStart(2, '0')}
            </p>
            <button
              aria-label="Next gallery image"
              className="inline-flex size-control-md items-center justify-center rounded-full border border-text-inverse/14 bg-text-inverse/[0.035] text-text-inverse transition-ui duration-medium ease-luxury hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:shadow-focus"
              onClick={() => moveToGalleryIndex(activeIndexRef.current + 1)}
              type="button"
            >
              <ChevronRight aria-hidden="true" className="size-icon-20" />
            </button>
          </motion.div>
        </div>

        <motion.div
          ref={viewportRef}
          aria-label="StimulAI horizontal parallax gallery"
          aria-roledescription="carousel"
          className="relative mt-space-40 flex-1 touch-pan-y overflow-x-hidden overflow-y-hidden mx-auto w-full max-w-container px-container-sm pb-space-16 md:px-container-md lg:px-container-lg"
          onScroll={() => {
            applyParallaxEffect();
            updateActiveFromNativeScroll();
          }}
          tabIndex={0}
          variants={revealItem}
        >
          <div
            ref={trackRef}
            className="flex h-full min-h-[16rem] w-max items-center gap-space-24 will-change-transform md:min-h-[22rem]"
          >
            {galleryImages.map((image, index) => (
              <article
                ref={(node) => {
                  mediaRefs.current[index] = node;
                }}
                aria-current={activeIndex === index ? 'true' : undefined}
                className={cn(
                  'group relative h-[42vh] max-h-[24rem] min-h-[15rem] w-[72vw] shrink-0 overflow-hidden border bg-text-inverse/[0.035] text-text-inverse shadow-hairline transition-ui duration-medium ease-luxury md:h-[20rem] md:w-auto md:aspect-[4/3]',
                  activeIndex === index
                    ? 'border-accent/70 shadow-[0_28px_72px_rgb(0_0_0/0.34)]'
                    : 'border-text-inverse/10 opacity-[0.78] hover:border-text-inverse/28 hover:opacity-100',
                )}
                key={image.title}
              >
                <img
                  ref={(node) => {
                    imageRefs.current[index] = node;
                  }}
                  alt={image.alt}
                  className="absolute -left-[12.5%] top-0 h-full w-[125%] max-w-none object-contain md:object-cover object-center will-change-transform"
                  decoding="async"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  onLoad={applyParallaxEffect}
                  sizes="(min-width: 1024px) 46vw, (min-width: 768px) 62vw, 78vw"
                  src={image.src}
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.04)_18%,rgb(0_0_0/0.72)_100%)]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-space-24 p-space-20">
                  <div>
                    <p className="font-body text-caption text-accent">{image.category}</p>
                    <h3 className="mt-space-8 font-heading text-heading-s text-text-inverse">
                      {image.title}
                    </h3>
                  </div>
                  <span className="font-body text-caption text-text-inverse/46">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
