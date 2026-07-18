import { useCallback, useEffect, useState } from 'react';

import { Menu } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/utils';
import { Logo } from './Logo.jsx';
import { MobileMenu } from './MobileMenu.jsx';
import { PRIMARY_NAV_ITEMS } from './navigation.js';

function useNavbarScrollState() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;

    function update() {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 12);
      lastY = currentY;
      frame = 0;
    }

    function handleScroll() {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return isScrolled;
}

function getIsNavItemActive(item, isActive, location) {
  if (item.hash) {
    return location.pathname === '/' && location.hash === item.hash;
  }

  if (item.to === '/') {
    return location.pathname === '/' && !location.hash;
  }

  return isActive;
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isScrolled = useNavbarScrollState();
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-sticky h-navbar border-b-0 md:border-b text-text-inverse transition-surface duration-medium ease-luxury',
          isScrolled
            ? 'border-transparent md:border-text-inverse/10 bg-surface-inverse/90 shadow-none md:shadow-hairline backdrop-blur-[var(--motion-blur-soft)]'
            : 'border-transparent bg-surface-inverse/40',
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-container items-center justify-between px-6 lg:px-12">
          <Logo inverse />

          <div className="ml-auto flex items-center">
            <nav aria-label="Primary navigation" className="hidden lg:block">
              <ul className="flex items-center gap-8 xl:gap-10">
                {PRIMARY_NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      className="font-body text-navigation text-text-inverse/70 transition-ui duration-medium ease-luxury hover:text-text-inverse focus-visible:outline-none focus-visible:shadow-focus"
                      end={item.to === '/'}
                      style={({ isActive }) =>
                        getIsNavItemActive(item, isActive, location)
                          ? {
                            color: 'rgb(183, 24, 43)',
                            textShadow: '0 0 12px rgba(183,24,43,0.7), 0 0 28px rgba(183,24,43,0.35)',
                          }
                          : undefined
                      }
                      to={item.to}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-space-8">

              <button
                aria-controls="mobile-navigation"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="relative inline-flex size-control-md items-center justify-center rounded-full border border-text-inverse/10 text-text-inverse transition-ui duration-medium ease-luxury hover:bg-text-inverse/10 focus-visible:outline-none focus-visible:shadow-focus lg:hidden"
                onClick={() => setIsMenuOpen((value) => !value)}
                type="button"
              >
                <Menu
                  aria-hidden="true"
                  className={cn(
                    'size-icon-20 transition-transform duration-medium ease-luxury',
                    isMenuOpen && 'rotate-90 scale-active',
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} items={PRIMARY_NAV_ITEMS} onClose={closeMenu} />
    </>
  );
}
