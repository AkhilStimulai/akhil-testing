

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

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
    <section data-section-id="home-domains" className="relative isolate w-full h-screen-dvh flex flex-col justify-center overflow-hidden bg-surface-inverse text-text-inverse py-4 lg:py-0 pt-navbar lg:pt-[calc(var(--layout-navbar-height)+1rem)] 2xl:pt-[calc(var(--layout-navbar-height)+3rem)]">

      {/* Background Glow (Desktop only, hidden on mobile to remove shadow overlay) */}
      <div
        aria-hidden
        className="hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(183,24,43,.18),transparent_28%),radial-gradient(circle_at_90%_70%,rgba(255,255,255,.04),transparent_35%)]"
      />

      {/* MOBILE VIEW (Frame 2) — 100dvh strictly fitting without overflow */}
      <div className="flex md:hidden flex-col justify-between w-full h-screen-dvh pt-[calc(var(--layout-navbar-height)+0.25rem)] pb-3 px-container-sm overflow-hidden relative z-10 text-left bg-surface-inverse">
        {/* Header with normal site Tag and Statement */}
        <div className="shrink-0 mb-1">
          <p className="font-body text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">
            Engineering Domains
          </p>
          <h2 className="mt-0.5 font-display text-[clamp(1.15rem,4.8vw,1.45rem)] font-bold text-text-inverse leading-tight">
            Engineering for Today.
            <br />
            Solutions for <span className="text-accent">Tomorrow.</span>
          </h2>
        </div>

        {/* 2x2 Grid of Domain Cards for Mobile */}
        <div className="flex-1 min-h-0 grid grid-cols-2 gap-1.5 mt-1">
          {domains.map((domain) => (
            <div key={domain.id} className="min-h-0 overflow-hidden">
              <DomainCard domain={domain} />
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:flex relative mx-auto w-full max-w-container flex-1 flex-col justify-between px-container-sm md:px-container-md lg:px-container-lg pb-4 lg:pb-6 2xl:pb-12">

        {/* Header */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-space-12 sm:mb-space-24 lg:mb-space-8 grid gap-2 lg:grid-cols-2 lg:items-end"
        >

          <div>

            <motion.p
              variants={itemVariants}
              className="font-body text-[10px] sm:text-label font-medium uppercase tracking-[0.25em] sm:tracking-[0.35em] text-accent"
            >
              Engineering Domains
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="mt-1 sm:mt-space-16 lg:mt-space-4 font-display text-heading-s sm:text-heading-xl md:text-display-m lg:text-heading-xl text-text-inverse leading-tight"
            >
              Engineering for Today.
              <br className="hidden sm:inline" />
              {' '}Solutions for
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
          className="flex-1 min-h-0 grid grid-cols-2 gap-2 sm:gap-space-16 lg:gap-4 2xl:gap-8 mt-2 lg:mt-0"
        >
          {domains.map((domain) => (
            <motion.div
              key={domain.id}
              variants={itemVariants}
              className="min-h-0 h-full"
            >
              <DomainCard domain={domain} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}