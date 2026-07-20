import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES, SITE_CONFIG } from '@/constants';
import { cn } from '@/utils';

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

const initialValues = {
  name: '',
  email: '',
  company: '',
  message: '',
};

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

const inputClass =
  'w-full rounded-none border-0 border-b border-text-inverse/16 bg-transparent px-0 py-space-12 font-body text-body-m text-text-inverse outline-none transition-ui duration-medium ease-luxury placeholder:text-text-inverse/34 focus-visible:border-accent focus-visible:shadow-none disabled:opacity-disabled';

function validate(values) {
  const nextErrors = {};

  if (!values.name.trim()) {
    nextErrors.name = 'Enter your name.';
  }

  if (!values.email.trim()) {
    nextErrors.email = 'Enter your email.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    nextErrors.email = 'Enter a valid email address.';
  }

  if (!values.message.trim()) {
    nextErrors.message = 'Tell us what you want to build.';
  }

  return nextErrors;
}

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
      className="h-full border border-text-inverse/10 bg-text-inverse/[0.035] p-6 shadow-elevated md:p-8"
      variants={revealItem}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-body text-label font-medium uppercase tracking-[0.35em] text-accent">Contact</p>

          <p className="mt-space-8 font-heading text-heading-s font-bold text-text-inverse">
            {SITE_CONFIG.name}
          </p>
        </div>

        <SocialLinks />
      </div>

      {/* Contact Details */}
      <div className="mt-8 grid gap-6">
        {contactDetails.map(({ href, icon: Icon, label, value }) => (
          <a
            key={label}
            href={href}
            target={label === "Office" ? "_blank" : undefined}
            rel={label === "Office" ? "noreferrer" : undefined}
            className="group grid grid-cols-[auto_1fr] gap-4 border-t border-text-inverse/12 pt-5"
          >
            <Icon className="mt-1 size-icon-20 text-accent transition-transform duration-medium group-hover:scale-110" />

            <span>
              <span className="block font-body text-caption font-medium text-text-inverse/44 uppercase tracking-wider">
                {label}
              </span>

              <span className="mt-space-4 block font-body text-body-small font-normal text-text-inverse/72 transition-colors duration-medium group-hover:text-text-inverse">
                {value}
              </span>
            </span>
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
      className="group relative h-full min-h-[360px] overflow-hidden border border-text-inverse/10 bg-surface-inverse lg:min-h-[420px]"
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
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">

        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10 transition-transform duration-300 group-hover:scale-110">
          <MapPin className="size-icon-28 text-accent" />
        </div>

        <h3 className="mt-space-24 font-heading text-heading-s font-bold text-text-inverse">
          Visit Our Office
        </h3>

        <p className="mt-space-16 max-w-xs font-body text-body-small font-normal text-text-inverse/72">
          Arcadia, South City II
          <br />
          Sector 49
          <br />
          Gurugram, Haryana
        </p>

        <span className="mt-space-32 inline-flex rounded-full border border-accent px-space-24 py-space-8 font-body text-caption font-medium text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white uppercase tracking-wider">
          Open in Google Maps →
        </span>

      </div>
    </motion.a>
  );
}
export function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  function updateField(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) {
        return current;
      }

      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function getFieldProps(name) {
    const error = errors[name];

    return {
      'aria-describedby': error ? `contact-${name}-error` : undefined,
      'aria-invalid': error ? 'true' : undefined,
      className: cn(inputClass, error && 'border-error text-error placeholder:text-error/60'),
      id: `contact-${name}`,
      name,
      onChange: updateField,
      value: values[name],
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setIsSuccess(false);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setValues(initialValues);
    }, 700);
  }
}

export function ContactSection() {
  return (
    <section
      aria-labelledby="home-contact-title"
      className="relative isolate min-h-screen overflow-x-hidden bg-surface-inverse px-container-sm pt-[calc(var(--layout-navbar-height)+2rem)] pb-space-48 text-text-inverse md:px-container-md lg:px-container-lg md:flex md:items-center md:pt-navbar"
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

      <motion.div
        className="mx-auto w-full max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.24 }}
        variants={revealContainer}
      >
        {/* Heading */}
        <motion.div variants={revealItem}>
          <p className="font-body text-label font-medium uppercase tracking-[0.35em] text-accent">
            Connect
          </p>

          <h2
            id="home-contact-title"
            className="
              mt-space-16
              max-w-5xl
              font-display
              text-text-inverse
              text-heading-xl
              md:text-display-m
              lg:text-display-l
            "
          >
            Let's Build The Future Together.
          </h2>

          <p className="mt-space-16 max-w-2xl font-body text-body-l font-normal text-text-inverse/68">
            Innovators, partners, customers and researchers are invited
            to connect with STIMULAI to shape intelligent engineering
            into real systems.
          </p>
        </motion.div>

        {/* Contact + Map */}
        <motion.div
          variants={revealItem}
          className="mt-space-40 grid grid-cols-1 gap-space-24 lg:grid-cols-2"
        >
          <ContactCard />
          <ContactMap />
        </motion.div>
      </motion.div>
    </section>
  );
}
