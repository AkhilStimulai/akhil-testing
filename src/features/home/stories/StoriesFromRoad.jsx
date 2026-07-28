import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReviewCard } from './ReviewCard.jsx';
import { roadStories } from './StoriesFromRoad.data.js';

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
      duration: 0.76,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const mobileCardVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 260 : -260,
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -260 : 260,
    opacity: 0,
    scale: 0.92,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function StoriesSection({ reviews = roadStories }) {
  const [[mobileIndex, direction], setMobileIndex] = useState([0, 0]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);

  const mobileReviews = reviews.slice(0, 5);

  const handleMobilePrev = useCallback(() => {
    setIsExpandedMobile(false);
    setMobileIndex(([prev]) => [
      (prev - 1 + mobileReviews.length) % mobileReviews.length,
      -1,
    ]);
  }, [mobileReviews.length]);

  const handleMobileNext = useCallback(() => {
    setIsExpandedMobile(false);
    setMobileIndex(([prev]) => [
      (prev + 1) % mobileReviews.length,
      1,
    ]);
  }, [mobileReviews.length]);

  // Auto-scroll every 5 seconds, pause on user interaction
  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(() => {
      setMobileIndex(([prev]) => [
        (prev + 1) % mobileReviews.length,
        1,
      ]);
    }, 5000);
    return () => clearInterval(autoPlayRef.current);
  }, [isPaused, mobileReviews.length]);

  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);
    clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 10000);
  }, []);

  useEffect(() => {
    return () => clearTimeout(pauseTimeoutRef.current);
  }, []);

  const handleUserNav = useCallback((navFn) => {
    pauseAutoPlay();
    navFn();
  }, [pauseAutoPlay]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      pauseAutoPlay();
      if (diff > 0) handleMobileNext();
      else handleMobilePrev();
    }
  };

  const currentReview = mobileReviews[mobileIndex];
  const currentImage = Array.isArray(currentReview.productImage)
    ? currentReview.productImage[0]
    : currentReview.productImage;

  const getGridColsClass = (count) => {
    if (count === 1) return 'lg:grid-cols-1';
    if (count === 2) return 'lg:grid-cols-2';
    if (count === 3) return 'lg:grid-cols-3';
    return 'lg:grid-cols-4';
  };

  const gridColsClass = getGridColsClass(reviews.length);

  return (
    <section
      data-section-id="home-reviews"
      aria-labelledby="stories-from-road-title"
      className="relative isolate w-full h-screen-dvh flex flex-col justify-center overflow-hidden bg-surface-inverse text-text-inverse py-4 lg:py-0 pt-navbar lg:pt-0"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-base bg-[radial-gradient(circle_at_82%_10%,rgb(183_24_43/0.12),transparent_26%),radial-gradient(circle_at_18%_52%,rgb(255_255_255/0.07),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-base opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgb(255 255 255 / 0.15) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.09) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* ======== MOBILE CAROUSEL VIEW ======== */}
      <div
        className="flex md:hidden flex-col w-full h-screen-dvh pt-[calc(var(--layout-navbar-height)+0.25rem)] pb-2 px-2 overflow-hidden relative z-10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header — minimal spacing */}
        <div className="shrink-0 text-center mb-1.5">
          <p className="font-body text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">
            RCX Community
          </p>
          <h2
            className="mt-0.5 font-display text-[clamp(1.1rem,4.8vw,1.35rem)] font-bold text-text-inverse leading-tight"
            id="stories-from-road-title"
          >
            Stories from the Road
          </h2>
          <p className="font-body text-[clamp(0.6rem,2.4vw,0.7rem)] font-normal text-text-inverse/50 leading-snug mt-0.5">
            Check Why They Keep Coming Back
          </p>
        </div>

        {/* Carousel — takes all remaining height */}
        <div className="flex-1 min-h-0 w-full flex items-stretch relative">
          {/* Left Arrow */}
          <button
            onClick={() => handleUserNav(handleMobilePrev)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-7 rounded-full text-text-inverse/60 hover:text-text-inverse active:scale-90 transition-all duration-200"
            aria-label="Previous review"
          >
            <ChevronLeft className="size-5" strokeWidth={2.5} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => handleUserNav(handleMobileNext)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center size-7 rounded-full text-text-inverse/60 hover:text-text-inverse active:scale-90 transition-all duration-200"
            aria-label="Next review"
          >
            <ChevronRight className="size-5" strokeWidth={2.5} />
          </button>

          {/* Card */}
          <div className="w-full h-full flex items-stretch overflow-hidden px-6">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={mobileIndex}
                custom={direction}
                variants={mobileCardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: 'linear-gradient(165deg, rgba(183,24,43,0.18) 0%, rgba(30,30,32,0.97) 35%, rgba(22,22,24,0.99) 100%)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(183,24,43,0.15) inset, 0 0 80px rgba(183,24,43,0.06) inset',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="flex flex-col items-center flex-1 min-h-0 px-4 pt-3 pb-2.5 overflow-y-auto">
                  {/* Image — large, dominant */}
                  {currentImage && (
                    <div
                      className="w-[48%] aspect-square rounded-2xl overflow-hidden border-[2px] border-accent/30 mb-2 shrink-0"
                      style={{
                        boxShadow: '0 8px 32px rgba(183,24,43,0.2), 0 4px 16px rgba(0,0,0,0.3)',
                      }}
                    >
                      <img
                        src={currentImage}
                        alt={`${currentReview.name}'s ride`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Tagline */}
                  {currentReview.tagline && (
                    <p className="font-heading text-[clamp(0.62rem,2.5vw,0.72rem)] text-accent font-semibold tracking-wider italic text-center mb-1 shrink-0 px-2 line-clamp-2">
                      "{currentReview.tagline}"
                    </p>
                  )}

                  {/* Review Text — truncated, Read more expands */}
                  <div className="w-full mb-1.5 px-1 shrink-0">
                    <p className="font-body text-[clamp(0.68rem,2.7vw,0.76rem)] text-text-inverse/75 font-normal italic text-center leading-relaxed">
                      {(() => {
                        const text = currentReview.review;
                        const limit = 120;
                        if (text.length <= limit || isExpandedMobile) {
                          return `"${text}"`;
                        }
                        const truncated = text.slice(0, text.lastIndexOf(' ', limit) > limit * 0.6 ? text.lastIndexOf(' ', limit) : limit);
                        return (
                          <>
                            "{truncated}..."
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                pauseAutoPlay();
                                setIsExpandedMobile(true);
                              }}
                              className="text-accent hover:text-accent/80 font-semibold not-italic ml-1 text-[clamp(0.68rem,2.7vw,0.76rem)] transition-colors duration-200"
                            >
                              Read more
                            </button>
                          </>
                        );
                      })()}
                    </p>
                  </div>

                  {/* Reviewer Name */}
                  <p className="font-display text-[clamp(0.78rem,3vw,0.88rem)] font-bold text-accent text-center shrink-0">
                    {currentReview.name}
                  </p>

                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1.5 mt-1.5 shrink-0">
                    {mobileReviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          pauseAutoPlay();
                          setIsExpandedMobile(false);
                          setMobileIndex([idx, idx > mobileIndex ? 1 : -1]);
                        }}
                        className={`rounded-full transition-all duration-300 ${
                          idx === mobileIndex
                            ? 'w-4 h-1.5 bg-accent'
                            : 'w-1.5 h-1.5 bg-text-inverse/30 hover:bg-text-inverse/50'
                        }`}
                        aria-label={`Go to review ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ======== DESKTOP VIEW ======== */}
      <motion.div
        className="hidden md:flex mx-auto flex-col w-full max-w-container px-container-sm md:px-container-md lg:px-container-lg"
        initial="hidden"
        variants={revealContainer}
        viewport={{ once: true, amount: 0.18 }}
        whileInView="visible"
      >
        <div className="w-full pb-2 sm:pb-space-24">
          <motion.header className="max-w-[48rem]" variants={revealItem}>
            <p className="font-body text-[10px] sm:text-label font-medium uppercase tracking-[0.25em] sm:tracking-[0.35em] text-accent">RCX Community</p>
            <h2
              className="mt-1 sm:mt-space-16 font-display text-heading-s sm:text-heading-xl text-text-inverse md:text-display-m"
            >
              Stories from the Road
            </h2>
            <p className="mt-1 sm:mt-space-16 max-w-prose font-body text-body-xs sm:text-body-l font-normal text-text-inverse/68 line-clamp-2 sm:line-clamp-none">
              Every ride tells a story. Every rider inspires the next.
            </p>
          </motion.header>
        </div>

        {/* Desktop grid */}
        <motion.div
          className={`mt-2 sm:mt-space-32 grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-3 sm:gap-space-24 w-full pb-2 sm:pb-space-16`}
          variants={revealContainer}
        >
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export function StoriesFromRoad(props) {
  return <StoriesSection {...props} />;
}
