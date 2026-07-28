import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils';
import { Logo } from './Logo.jsx';

function getIsMenuItemActive(item, isActive, location, activePath) {
  if (location.pathname === '/' && activePath) {
    return activePath === item.to;
  }

  if (item.hash) {
    return location.pathname === '/' && location.hash === item.hash;
  }

  if (item.to === '/') {
    return location.pathname === '/' && !location.hash;
  }

  return isActive;
}

export function MobileMenu({ isOpen, items, onClose, activePath }) {
  const closeButtonRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    onClose();
  }, [location.hash, location.pathname, onClose]);

  const scrollSpySections = [
    { id: 'home-hero', path: '/' },
    { id: 'home-domains', path: '/domains' },
    { id: 'home-rcx', path: '/rcx' },
    { id: 'home-gallery', path: '/gallery' },
    { id: 'home-reviews', path: '/reviews' },
    { id: 'home-contact', path: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          id="mobile-navigation"
          aria-modal="true"
          className="fixed inset-0 z-modal lg:hidden"
          initial={{ opacity: 0 }}
          role="dialog"
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
        >
          <button
            aria-label="Close navigation overlay"
            className="absolute inset-0 size-full bg-overlay/60"
            onClick={onClose}
            type="button"
          />
          <motion.div
            className="absolute right-0 top-0 flex h-dvh w-full max-w-[28rem] flex-col border-l bg-surface-inverse/95 px-container-sm py-space-24 text-text-inverse shadow-elevated backdrop-blur-[var(--motion-blur-soft)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between">
              <Logo inverse />
              <button
                ref={closeButtonRef}
                aria-label="Close navigation menu"
                className="inline-flex size-control-md items-center justify-center rounded-full border border-text-inverse/10 text-text-inverse transition-ui duration-medium ease-luxury hover:bg-text-inverse/10 focus-visible:outline-none focus-visible:shadow-focus"
                onClick={onClose}
                type="button"
              >
                <X aria-hidden="true" className="size-icon-20" />
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="mt-space-64">
              <ul className="grid gap-space-4">
                {items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      className={({ isActive }) =>
                        cn(
                          'block border-b border-text-inverse/10 py-space-16 font-heading text-heading-s text-text-inverse transition-ui duration-medium ease-luxury hover:text-accent focus-visible:outline-none focus-visible:shadow-focus',
                          getIsMenuItemActive(item, isActive, location, activePath) && 'text-accent',
                        )
                      }
                      end={item.to === '/'}
                      onClick={(e) => {
                        if (item.to === '/' && location.pathname === '/') {
                          e.preventDefault();
                          window.history.pushState(null, '', '/');
                          window.dispatchEvent(new CustomEvent('sectionNavigate', { detail: 'home-hero' }));
                        }
                        onClose();
                      }}
                      to={item.to}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
