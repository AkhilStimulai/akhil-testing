import { forwardRef, memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

const cardVariants = {
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
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const ReviewCard = memo(
  forwardRef(function ReviewCard({ review, compact = false }, ref) {
    const isArray = Array.isArray(review.productImage);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    const handlePrevImage = (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) =>
        (prev - 1 + review.productImage.length) % review.productImage.length
      );
    };

    const handleNextImage = (e) => {
      e.stopPropagation();
      setCurrentImageIndex((prev) =>
        (prev + 1) % review.productImage.length
      );
    };

    const reviewText = review.review;
    const maxChars = compact ? 120 : 160;
    const isLongText = reviewText.length > maxChars;

    const truncatedText = isLongText
      ? (() => {
          const sub = reviewText.slice(0, maxChars);
          const lastSpace = sub.lastIndexOf(' ');
          return lastSpace > maxChars * 0.75 ? sub.slice(0, lastSpace) : sub;
        })()
      : reviewText;

    return (
      <motion.article
        ref={ref}
        className="h-full min-h-0 w-full flex flex-col"
        variants={cardVariants}
        style={{ perspective: '1200px' }}
      >
        <div
          className="relative w-full flex-1 min-h-0 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d]"
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* ===== FRONT FACE ===== */}
          <div
            className={`w-full h-full min-h-0 group flex flex-col border border-text-inverse/10 bg-text-inverse/[0.035] transition-[border-color,background-color] duration-medium ease-luxury hover:border-accent/40 hover:bg-text-inverse/[0.055] shadow-elevated overflow-hidden [backface-visibility:hidden] ${isFlipped ? 'absolute inset-0' : 'relative'}`}
          >
            {review.productImage && (
              <div className={`relative w-full overflow-hidden border-b border-text-inverse/10 shrink-0 group/img ${compact ? 'aspect-[16/9]' : 'aspect-[16/10] lg:aspect-auto lg:h-[28%] 2xl:h-[45%]'}`}>
                {isArray ? (
                  <>
                    <div className="absolute inset-0 size-full bg-surface-inverse" />
                    <AnimatePresence mode="popLayout">
                      <motion.img
                        key={currentImageIndex}
                        src={review.productImage[currentImageIndex]}
                        alt={`${review.name}'s ride image ${currentImageIndex + 1}`}
                        className="absolute inset-0 size-full object-cover transition-transform duration-medium ease-luxury group-hover/img:scale-[1.03]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                    
                    {/* Navigation arrows */}
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-8 rounded-full border border-text-inverse/10 bg-surface-inverse/70 text-text-inverse opacity-0 group-hover/img:opacity-100 hover:bg-surface-inverse/90 transition-[opacity,background-color] duration-200 focus:opacity-100 active:scale-[0.95]"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-8 rounded-full border border-text-inverse/10 bg-surface-inverse/70 text-text-inverse opacity-0 group-hover/img:opacity-100 hover:bg-surface-inverse/90 transition-[opacity,background-color] duration-200 focus:opacity-100 active:scale-[0.95]"
                      aria-label="Next image"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                    
                    {/* Indicator dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-surface-inverse/40 px-2 py-1 rounded-full backdrop-blur-sm border border-text-inverse/5">
                      {review.productImage.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImageIndex(idx);
                          }}
                          className={`size-1.5 rounded-full transition-[background-color,width] duration-200 ${
                            idx === currentImageIndex
                              ? 'bg-accent w-3.5'
                              : 'bg-text-inverse/40 hover:bg-text-inverse/70'
                          }`}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <img
                    src={review.productImage}
                    alt={`${review.name}'s ride`}
                    className="size-full object-cover transition-transform duration-medium ease-luxury group-hover:scale-[1.03]"
                  />
                )}
              </div>
            )}
            <div className={`flex flex-col flex-1 min-h-0 overflow-y-auto ${compact ? 'p-2.5' : 'p-3 sm:p-space-24 lg:p-4 2xl:p-6'}`}>
              <h3 className={`font-heading text-text-inverse transition-colors duration-medium ease-luxury group-hover:text-accent font-bold shrink-0 ${compact ? 'text-[13px] mb-0.5' : 'text-body-s sm:text-heading-s lg:text-body-l mb-1 sm:mb-space-12 lg:mb-1'}`}>
                {review.name}
              </h3>
              {review.tagline && (
                <p className={`font-heading text-accent font-semibold tracking-wider italic shrink-0 ${compact ? 'text-[10px] mb-0.5' : 'text-[11px] sm:text-body-small lg:text-[11px] mb-1 sm:mb-space-12 lg:mb-2'}`}>
                  "{review.tagline}"
                </p>
              )}
              <p className={`font-body text-text-inverse/76 leading-relaxed ${compact ? 'text-[11px]' : 'text-body-xs sm:text-body-m lg:text-body-xs 2xl:text-body-m'}`}>
                {isLongText ? `${truncatedText}...` : reviewText}
                {isLongText && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsFlipped(true);
                    }}
                    className="text-accent hover:text-accent/80 font-medium ml-2 transition-colors duration-medium focus:outline-none focus:underline"
                  >
                    Read more
                  </button>
                )}
              </p>
            </div>
          </div>

          {/* ===== BACK FACE ===== */}
          <div
            className={`w-full flex flex-col min-h-0 border border-accent/30 shadow-elevated [backface-visibility:hidden] ${isFlipped ? 'relative h-full' : 'absolute inset-0 h-full'}`}
            style={{
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(165deg, rgba(183,24,43,0.14) 0%, rgba(30,30,32,0.98) 30%, rgba(22,22,24,1) 100%)',
            }}
          >
            {/* Back header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-text-inverse/10 shrink-0">
              <div className="flex items-center gap-3">
                {review.productImage && (
                  <img
                    src={isArray ? review.productImage[0] : review.productImage}
                    alt={review.name}
                    className="size-9 rounded-full object-cover border border-accent/30"
                  />
                )}
                <div>
                  <h3 className="font-heading text-text-inverse font-bold text-body-s sm:text-body-m">
                    {review.name}
                  </h3>
                  {review.tagline && (
                    <p className="font-heading text-accent/80 text-[10px] sm:text-[11px] font-semibold italic tracking-wider line-clamp-1">
                      "{review.tagline}"
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="flex items-center gap-1.5 text-accent hover:text-accent/80 font-medium text-[12px] sm:text-body-small transition-colors duration-medium focus:outline-none focus:underline shrink-0"
                aria-label="Flip back"
              >
                <RotateCcw className="size-3.5" />
                Back
              </button>
            </div>

            {/* Full review text */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 sm:px-5 sm:py-4">
              <p className={`font-body text-text-inverse/80 leading-relaxed whitespace-pre-line ${compact ? 'text-[11px]' : 'text-[12px] sm:text-body-small'}`}>
                {reviewText}
              </p>
            </div>

            {/* Bottom accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-accent/50 to-transparent shrink-0" />
          </div>
        </div>
      </motion.article>
    );
  })
);
