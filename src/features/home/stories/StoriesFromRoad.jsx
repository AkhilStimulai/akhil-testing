import { motion } from 'framer-motion';
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

export function StoriesSection({ reviews = roadStories }) {
  const getGridColsClass = (count) => {
    if (count === 1) return 'lg:grid-cols-1';
    if (count === 2) return 'lg:grid-cols-2';
    if (count === 3) return 'lg:grid-cols-3';
    return 'lg:grid-cols-4';
  };

  const gridColsClass = getGridColsClass(reviews.length);

  return (
    <section
      aria-labelledby="stories-from-road-title"
      className="relative isolate py-section-sm lg:py-section-lg bg-surface-inverse text-text-inverse overflow-hidden"
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

      <motion.div
        className="mx-auto flex w-full max-w-container flex-col px-container-sm md:px-container-md lg:px-container-lg"
        initial="hidden"
        variants={revealContainer}
        viewport={{ once: true, amount: 0.18 }}
        whileInView="visible"
      >
        <div className="w-full pb-space-24">
          <motion.header className="max-w-[48rem]" variants={revealItem}>
            <p className="font-body text-label font-medium uppercase tracking-[0.35em] text-accent">RCX Community</p>
            <h2
               className="mt-space-16 font-display text-heading-xl text-text-inverse md:text-display-m"
              id="stories-from-road-title"
            >
              Stories from the Road
            </h2>
            <p className="mt-space-16 max-w-prose font-body text-body-l font-normal text-text-inverse/68">
              Every ride tells a story.
              <br />
              Every rider inspires the next.
            </p>
          </motion.header>
        </div>

        <motion.div
          className={`mt-space-32 grid grid-cols-1 sm:grid-cols-2 ${gridColsClass} gap-space-24 w-full pb-space-16`}
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
