import { useEffect, useRef, useState } from 'react';

/**
 * A hook that uses IntersectionObserver to determine which section is currently active
 * based on scroll position.
 *
 * @param {Array<{ id: string, path: string }>} sections - The sections to track
 * @param {Object} options - IntersectionObserver options
 * @returns {string|null} - The path of the active section
 */
export function useScrollSpy(
  sections,
  options = { rootMargin: '-20% 0px -50% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
) {
  const [activePath, setActivePath] = useState(null);
  const observerRef = useRef(null);

  // Listen for explicit section change events from FullPageScroll (e.g. on homepage)
  useEffect(() => {
    const handleActiveSectionChange = (e) => {
      const activeId = e.detail;
      if (activeId) {
        const section = sections.find((s) => s.id === activeId);
        if (section) setActivePath(section.path);
      }
    };

    window.addEventListener('activeSectionChange', handleActiveSectionChange);

    // Initial check for hash or home hero
    if (window.location.hash) {
      const cleanHash = window.location.hash.replace('#', '');
      const section = sections.find((s) => s.id === cleanHash);
      if (section) setActivePath(section.path);
    } else if (window.location.pathname === '/') {
      const section = sections.find((s) => s.id === 'home-hero');
      if (section) setActivePath(section.path);
    }

    return () => window.removeEventListener('activeSectionChange', handleActiveSectionChange);
  }, [sections]);

  useEffect(() => {
    // We maintain a map of how much of each tracked section is currently intersecting
    const visibleElements = new Map();

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const targetId = entry.target.id || entry.target.getAttribute('data-section-id');
        if (!targetId) return;

        if (entry.isIntersecting) {
          visibleElements.set(targetId, entry);
        } else {
          visibleElements.delete(targetId);
        }
      });

      let maxRatio = 0;
      let activeId = null;

      for (const [id, entry] of visibleElements.entries()) {
        const ratio = entry.intersectionRatio;
        const rect = entry.boundingClientRect;

        // If an element is very tall, it might take up the whole screen but have a low intersection ratio.
        // We consider it active if its top is above the middle of the screen and its bottom is below it.
        const viewportHeight = window.innerHeight;
        const isCoveringViewport = rect.top <= viewportHeight * 0.4 && rect.bottom >= viewportHeight * 0.6;

        if (isCoveringViewport) {
          activeId = id;
          break; // This takes precedence
        }

        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeId = id;
        }
      }

      if (activeId) {
        const section = sections.find((s) => s.id === activeId);
        if (section) setActivePath(section.path);
      }
    }, options);

    sections.forEach(({ id }) => {
      const el = document.getElementById(id) || document.querySelector(`[data-section-id="${id}"]`);
      if (el) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [sections, options.rootMargin, options.threshold]);

  return activePath;
}
