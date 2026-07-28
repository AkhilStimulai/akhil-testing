import { motion } from 'framer-motion';
import {
  ArrowRight,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES, SITE_CONFIG } from '@/constants';
import { Footer } from '@/components/layout';

const contactDetails = [
  {
    label: 'Email',
    value: SITE_CONFIG.contact.email,
    href: `mailto:${SITE_CONFIG.contact.email}`,
    icon: Mail,
  },
  {
    label: 'Phone',
    value: SITE_CONFIG.contact.phone,
    href: `tel:${SITE_CONFIG.contact.phone.replace(/\s/g, '')}`,
    icon: Phone,
  },
  {
    label: 'Office',
    value: SITE_CONFIG.contact.address,
    href: SITE_CONFIG.contact.mapUrl,
    icon: MapPin,
  },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: SITE_CONFIG.social.linkedin,
    icon: Linkedin,
  },
  {
    label: 'Instagram',
    href: SITE_CONFIG.social.instagram,
    icon: Instagram,
  },
];


const revealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};



export function CTAGroup() {
  return (
    <motion.div
      className="flex flex-col items-stretch gap-space-12 sm:flex-row sm:items-center"
      variants={revealItem}
    >
      <Link
        className="group inline-flex h-control-lg items-center justify-center gap-space-12 rounded-full border border-text-inverse bg-text-inverse px-space-24 font-body text-button text-text-primary transition-ui duration-medium ease-luxury hover:bg-transparent hover:text-text-inverse focus-visible:outline-none focus-visible:shadow-focus"
        to={ROUTES.CONTACT}
      >
        Contact Us
        <ArrowRight
          aria-hidden="true"
          className="size-icon-16 transition-transform duration-medium ease-luxury group-hover:translate-x-space-4"
        />
      </Link>
      <Link
        className="inline-flex h-control-lg items-center justify-center rounded-full border border-text-inverse/24 bg-text-inverse/5 px-space-24 font-body text-button text-text-inverse transition-ui duration-medium ease-luxury hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:shadow-focus"
        to={ROUTES.PRODUCTS}
      >
        Explore Products
      </Link>
    </motion.div>
  );
}

export function SocialLinks() {
  return (
    <nav aria-label="Social links" className="flex items-center gap-space-8">
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <a
          aria-label={label}
          className="inline-flex size-control-sm items-center justify-center rounded-full border border-text-inverse/12 text-text-inverse/58 transition-ui duration-medium ease-luxury hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:shadow-focus"
          href={href}
          key={label}
          rel="noreferrer"
          target="_blank"
        >
          <Icon aria-hidden="true" className="size-icon-16" />
        </a>
      ))}
    </nav>
  );
}

export function ContactCard() {
  return (
    <motion.aside
      aria-label="STIMULAI contact information"
      className="size-full border border-text-inverse/10 bg-text-inverse/[0.035] p-2.5 sm:p-6 md:p-8 shadow-elevated flex flex-col justify-between"
      variants={revealItem}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="font-body text-[9px] sm:text-label font-medium uppercase tracking-[0.25em] sm:tracking-[0.35em] text-accent">Contact</p>

          <p className="mt-0.5 sm:mt-space-8 font-heading text-[12px] sm:text-heading-s font-bold text-text-inverse">
            {SITE_CONFIG.name}
          </p>
        </div>

        <SocialLinks />
      </div>

      {/* Contact Details */}
      <div className="mt-1 sm:mt-8 grid gap-0 flex-1 justify-center flex-col">
        {contactDetails.map(({ href, icon: Icon, label, value }) => (
          <a
            key={label}
            href={href}
            target={label === "Office" ? "_blank" : undefined}
            rel={label === "Office" ? "noreferrer" : undefined}
            className="group -mx-2.5 sm:-mx-6 md:-mx-8 border-t border-text-inverse/12"
          >
            <div className="grid grid-cols-[auto_1fr] gap-2 sm:gap-4 items-center px-2.5 sm:px-6 md:px-8 py-1 sm:py-4">
              <Icon className="size-3.5 sm:size-icon-20 text-accent transition-transform duration-medium group-hover:scale-110 shrink-0" />

              <span className="min-w-0">
                <span className="block font-body text-[9px] sm:text-caption font-medium text-text-inverse/44 uppercase tracking-wider leading-none">
                  {label}
                </span>

                <span className="mt-0.5 block font-body text-[10px] sm:text-body-small font-normal text-text-inverse/80 truncate transition-colors duration-medium group-hover:text-text-inverse">
                  {value}
                </span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </motion.aside>
  );
}
export function ContactMap() {
  return (
    <motion.a
      variants={revealItem}
      href={SITE_CONFIG.contact.mapUrl}
      target="_blank"
      rel="noreferrer"
      className="group relative size-full min-h-[100px] overflow-hidden border border-text-inverse/10 bg-surface-inverse flex flex-col items-center justify-center"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_55%_45%,rgb(183_24_43/0.18),transparent_25%),linear-gradient(135deg,rgb(255_255_255/0.05),transparent_45%)]"
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 py-4 sm:py-6 gap-3 sm:gap-4">
        <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 transition-transform duration-200 group-hover:scale-110">
          <MapPin className="size-3.5 sm:size-5 text-accent" />
        </div>

        <div className="flex flex-col items-center gap-1.5 sm:gap-2">
          <h3 className="font-heading text-[12px] sm:text-heading-s font-bold text-text-inverse">
            Visit Our Office
          </h3>

          <p className="max-w-xs font-body text-[10px] sm:text-body-small font-normal text-text-inverse/72 leading-relaxed">
            Arcadia, South City II, Sector 49, Gurugram, Haryana
          </p>
        </div>

        <span className="mt-1 inline-flex rounded-full border border-accent px-2.5 py-0.5 font-body text-[8px] sm:text-[9px] font-medium text-accent transition-[color,background-color,border-color] duration-200 group-hover:bg-accent group-hover:text-white uppercase tracking-wider active:scale-[0.97]">
          Open in Google Maps →
        </span>
      </div>
    </motion.a>
  );
}

export function ContactSection({ showFooter = true }) {
  return (
    <section
      data-section-id="home-contact"
      aria-labelledby="home-contact-title"
      className="relative isolate w-full h-screen-dvh flex flex-col justify-between overflow-hidden bg-surface-inverse text-text-inverse px-0 pt-navbar lg:pt-0"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-base bg-[radial-gradient(circle_at_18%_18%,rgb(183_24_43/0.13),transparent_25%),radial-gradient(circle_at_80%_70%,rgb(255_255_255/0.07),transparent_28%)]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-base opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgb(255 255 255 / 0.16) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* MOBILE VIEW (Frame 6) — 100dvh strictly fitting without overflow */}
      <div className="flex md:hidden flex-col justify-between w-full h-screen-dvh pt-[calc(var(--layout-navbar-height)+0.25rem)] pb-0 px-4 overflow-hidden relative z-10 text-left">
        {/* Header */}
        <div className="shrink-0 mb-1">
          <p className="font-body text-[9px] uppercase tracking-[0.25em] text-accent font-semibold">
            CONNECT
          </p>
          <h2
            id="home-contact-title-mobile"
            className="mt-0.5 font-display text-[clamp(1.1rem,4.5vw,1.38rem)] font-bold text-text-inverse leading-tight"
          >
            Let's Build The Future Together.
          </h2>
          <p className="font-body text-[clamp(0.66rem,2.7vw,0.76rem)] font-normal text-text-inverse/75 leading-snug mt-0.5 max-w-prose">
            Innovators, partners, customers and researchers are invited to connect with STIMULAI to shape intelligent engineering into real systems.
          </p>
        </div>

        {/* ContactCard + ContactMap stacked filling remaining viewport height */}
        <div className="flex-1 min-h-0 flex flex-col justify-between gap-2 my-1.5">
          <div className="flex-1 min-h-0 overflow-hidden">
            <ContactCard />
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            <ContactMap />
          </div>
        </div>

        {/* Compact Footer Bar for 100dvh Mobile Fit */}
        <div className="shrink-0 w-full bg-[#181818] border-t border-white/10 py-1.5 px-4 flex items-center justify-between text-[10px] text-text-inverse/60 -mx-4 w-[calc(100%+2rem)]">
          <span className="font-body">© {new Date().getFullYear()} STIMULAI Inc. All rights reserved.</span>
          <a href="#home-hero" className="font-mono text-[9px] uppercase tracking-wider text-accent hover:underline">
            Back to Top ↑
          </a>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:flex flex-col justify-between w-full h-full">
        <motion.div
          className="mx-auto w-full max-w-container px-container-sm md:px-container-md lg:px-container-lg flex-1 flex flex-col justify-center py-1 sm:py-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.24 }}
          variants={revealContainer}
        >
          {/* Heading */}
          <motion.div variants={revealItem}>
            <p className="font-body text-[10px] sm:text-label font-medium uppercase tracking-[0.25em] sm:tracking-[0.35em] text-accent">
              Connect
            </p>

            <h2
              id="home-contact-title"
              className="
                mt-1 sm:mt-space-8 lg:mt-space-12
                max-w-5xl
                font-display
                text-text-inverse
                text-heading-s
                sm:text-heading-xl
                md:text-display-m
              "
            >
              Let's Build The Future Together.
            </h2>

            <p className="mt-1 sm:mt-space-8 lg:mt-space-12 max-w-2xl font-body text-body-xs sm:text-body-l font-normal text-text-inverse/68 line-clamp-2 sm:line-clamp-none">
              Innovators, partners, customers and researchers are invited
              to connect with STIMULAI to shape intelligent engineering
              into real systems.
            </p>
          </motion.div>

          {/* Contact + Map */}
          <motion.div
            variants={revealItem}
            className="mt-2 sm:mt-space-20 lg:mt-space-28 grid grid-cols-1 gap-2 sm:gap-space-20 lg:grid-cols-2"
          >
            <ContactCard />
            <ContactMap />
          </motion.div>
        </motion.div>

        {showFooter && <Footer />}
      </div>
    </section>
  );
}
