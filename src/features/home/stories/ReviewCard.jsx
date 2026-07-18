import { forwardRef, memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  forwardRef(function ReviewCard({ review }, ref) {
    const isArray = Array.isArray(review.productImage);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

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
    const isLongText = reviewText.length > 240;

    const truncatedText = isLongText
      ? (() => {
          const sub = reviewText.slice(0, 240);
          const lastSpace = sub.lastIndexOf(' ');
          return lastSpace > 180 ? sub.slice(0, lastSpace) : sub;
        })()
      : reviewText;

    return (
      <motion.article
        ref={ref}
        className="group flex flex-col border border-text-inverse/10 bg-text-inverse/[0.035] transition-ui duration-medium ease-luxury hover:border-accent/40 hover:bg-text-inverse/[0.055] shadow-elevated h-full overflow-hidden"
        variants={cardVariants}
      >
        {review.productImage && (
          <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-text-inverse/10 group/img">
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-8 rounded-full border border-text-inverse/10 bg-surface-inverse/70 text-text-inverse opacity-0 group-hover/img:opacity-100 hover:bg-surface-inverse/90 transition-all duration-medium focus:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-8 rounded-full border border-text-inverse/10 bg-surface-inverse/70 text-text-inverse opacity-0 group-hover/img:opacity-100 hover:bg-surface-inverse/90 transition-all duration-medium focus:opacity-100"
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
                      className={`size-1.5 rounded-full transition-all duration-medium ${
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
        <div className="flex flex-col p-space-24 flex-1">
          <h3 className="font-heading text-heading-s text-text-inverse transition-colors duration-medium ease-luxury group-hover:text-accent mb-space-12">
            {review.name}
          </h3>
          {review.tagline && (
            <p className="font-heading text-body-small text-accent font-semibold tracking-wider mb-space-12 italic">
              "{review.tagline}"
            </p>
          )}
          <p className="font-body text-body-m text-text-inverse/76 leading-relaxed">
            {isLongText ? (isExpanded ? reviewText : `${truncatedText}...`) : reviewText}
            {isLongText && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
                className="text-accent hover:text-accent/80 font-medium ml-2 transition-colors duration-medium focus:outline-none focus:underline"
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </p>
        </div>
      </motion.article>
    );
  })
);
