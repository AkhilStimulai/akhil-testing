

import { motion } from "framer-motion";

import DomainCard from "./DomainCard";
import { domains } from "./domainSection.data";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function DomainsSection() {
  return (
    <section className="relative lg:min-h-screen lg:h-screen overflow-hidden bg-surface-inverse text-text-inverse py-section-sm lg:py-0">

      {/* Background Glow */}

      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(183,24,43,.18),transparent_28%),radial-gradient(circle_at_90%_70%,rgba(255,255,255,.04),transparent_35%)]"
      />

      <div className="relative mx-auto flex min-h-full max-w-container flex-col justify-center px-container-sm md:px-container-md lg:px-container-lg">

        {/* Header */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-space-24 grid gap-space-24 lg:grid-cols-2 lg:items-end"
        >

          <div>

            <motion.p
              variants={itemVariants}
              className="font-body text-label font-medium uppercase tracking-[0.35em] text-accent"
            >
              Engineering Domains
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="mt-space-16 font-display text-heading-xl md:text-display-m text-text-inverse"
            >
              Engineering for Today.
              <br />
              Solutions for
              <span className="text-accent">
                {" "}
                Tomorrow.
              </span>
            </motion.h2>

          </div>

        </motion.div>

        {/* Cards — 2×2 Grid */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-space-16 mt-space-32 lg:mt-0 flex-1"
        >
          {domains.map((domain) => (
            <motion.div
              key={domain.id}
              variants={itemVariants}
              className="min-h-0"
            >
              <DomainCard domain={domain} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}