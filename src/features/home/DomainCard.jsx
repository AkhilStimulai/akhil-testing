import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function DomainCard({ domain }) {
  const Icon = domain.icon;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.45 }}
      className="group relative overflow-hidden rounded-[10px] sm:rounded-[22px] border border-white/10 bg-[#0B0B0B] h-full w-full sm:aspect-[2/1] lg:aspect-auto"
    >
      {/* Full card clickable overlay */}
      <Link
        to={domain.href}
        aria-label={`Explore ${domain.title}`}
        className="absolute inset-0 z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-[10px] sm:rounded-[22px]"
      />

      {/* Background Image */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8 }}
          src={domain.image}
          alt={domain.title}
          className="h-full w-full object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        {/* Bottom Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

        {/* Hover Glow */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_left,rgba(183,24,43,.28),transparent_45%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 pointer-events-none flex h-full flex-col justify-between p-2 sm:p-space-24 lg:p-4 2xl:p-6">

        {/* Number & Icon */}
        <div className="flex items-center gap-1.5 sm:gap-4">

          <span className="font-display text-[12px] sm:text-heading-l lg:text-heading-m 2xl:text-heading-l font-extrabold leading-none text-accent">
            {domain.number}
          </span>

          <div className="h-px w-4 sm:w-12 bg-white/20" />

          <Icon
            className="size-3 sm:size-5 text-accent"
          />

        </div>

        {/* Bottom */}
        <div className="max-w-[280px]">

          <h3 className="font-heading text-[11px] sm:text-heading-s lg:text-body-l 2xl:text-heading-s text-text-inverse font-bold sm:font-normal leading-tight">
            {domain.title}
          </h3>

          {domain.subtitle && (
            <p className="mt-0.5 font-body text-[9px] sm:text-body-small lg:text-[10px] 2xl:text-body-small font-normal text-text-inverse/70 line-clamp-1 sm:line-clamp-2 lg:line-clamp-3">
              {domain.subtitle}
            </p>
          )}

          <span
            className="mt-0.5 sm:mt-space-16 inline-flex items-center gap-0.5 sm:gap-space-12 font-body text-[8px] sm:text-caption font-medium uppercase tracking-[0.12em] sm:tracking-[0.22em] text-text-inverse/90 transition-colors duration-200 group-hover:text-accent"
          >
            Explore Domain

            <ArrowUpRight
              className="size-2.5 sm:size-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </span>

        </div>

      </div>

      {/* Border */}
      <div className="pointer-events-none absolute inset-0 rounded-[14px] sm:rounded-[22px] ring-1 ring-inset ring-white/5 transition-[box-shadow] duration-300 group-hover:ring-accent/40" />
    </motion.article>
  );
}