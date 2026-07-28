import { useCallback, useEffect, useState } from 'react';

import { Menu } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/utils';
import { useScrollSpy } from '@/hooks';
import { Logo } from './Logo.jsx';
import { MobileMenu } from './MobileMenu.jsx';
import { PRIMARY_NAV_ITEMS } from './navigation.js';

function useNavbarScrollState() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    function update() {
      setIsScrolled(window.scrollY > 12);
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

const scrollSpySections = [
  { id: 'home-hero', path: '/' },
  { id: 'home-domains', path: '/domains' },
  { id: 'home-rcx', path: '/rcx' },
  { id: 'home-gallery', path: '/gallery' },
  { id: 'home-reviews', path: '/reviews' },
  { id: 'home-contact', path: '/contact' },
];

function getIsNavItemActive(item, isActive, location, activePath) {
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

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isScrolled = useNavbarScrollState();
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const activePath = useScrollSpy(scrollSpySections);

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
        <div className="mx-auto flex h-full w-full max-w-container items-center justify-between px-container-sm md:px-container-md lg:px-container-lg">
          <Logo inverse />

          <div className="ml-auto flex items-center">
            <nav aria-label="Primary navigation" className="hidden lg:block">
              <ul className="flex items-center gap-8 xl:gap-10">
                {PRIMARY_NAV_ITEMS.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      className="font-body text-navigation text-text-inverse/70 transition-ui duration-medium ease-luxury hover:text-text-inverse focus-visible:outline-none focus-visible:shadow-focus"
                      end={item.to === '/'}
                      onClick={(e) => {
                        if (item.to === '/' && location.pathname === '/') {
                          e.preventDefault();
                          window.history.pushState(null, '', '/');
                          window.dispatchEvent(new CustomEvent('sectionNavigate', { detail: 'home-hero' }));
                        }
                      }}
                      style={({ isActive }) =>
                        getIsNavItemActive(item, isActive, location, activePath)
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

      <MobileMenu isOpen={isMenuOpen} items={PRIMARY_NAV_ITEMS} onClose={closeMenu} activePath={activePath} />
    </>
  );
}
