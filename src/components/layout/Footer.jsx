import { Link } from 'react-router-dom';
import { Logo } from './Logo.jsx';
import { Instagram, Linkedin } from 'lucide-react';
import { FOOTER_NAV_ITEMS } from './navigation.js';
import { SITE_CONFIG } from '@/constants';

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t-0 md:border-t border-text-inverse/10 bg-surface-inverse text-text-inverse">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-base bg-[radial-gradient(circle_at_18%_10%,rgb(183_24_43/0.12),transparent_24%),radial-gradient(circle_at_86%_72%,rgb(255_255_255/0.06),transparent_28%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-base opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgb(255 255 255 / 0.16) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.08) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      <div className="mx-auto max-w-container px-container-sm py-section-sm md:px-container-md lg:px-container-lg">

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">

          <div>
            <Logo inverse as="span" />

            <p className="mt-6 max-w-sm font-body text-body-small text-text-inverse/60">
              Engineering Tomorrow's Intelligence.
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 lg:items-end">

            <nav>
              <ul className="flex flex-wrap gap-8 font-body text-body-small">
                {FOOTER_NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-text-inverse/70 hover:text-text-inverse"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-5">

              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-text-inverse/70 transition-all duration-300 hover:border-accent hover:text-accent"
              >
                <Instagram size={18} />
              </a>

              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-text-inverse/70 transition-all duration-300 hover:border-accent hover:text-accent"
              >
                <Linkedin size={18} />
              </a>

            </div>

          </div>

        </div>

        <div className="my-10 h-px bg-text-inverse/10" />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between text-text-inverse/50">

          <p>
            © {new Date().getFullYear()} STIMULAI. All rights reserved.
          </p>

          <Link
            to="/privacy-policy"
            className="hover:text-text-inverse"
          >
            Privacy Policy
          </Link>

        </div>

      </div>
    </footer>
  );
}