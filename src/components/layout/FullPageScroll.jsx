import {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { cn } from '@/utils';

const COOLDOWN_MS = 950;

export const FullPageScroll = forwardRef(
  (
    {
      children,
      onSectionChange,
      initialIndex = 0,
      showDots = true,
      className,
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const animatingRef = useRef(false);
    const touchStartYRef = useRef(null);
    const containerRef = useRef(null);
    const sections = Children.toArray(children);
    const totalSections = sections.length;

    // Measure and set --vh custom CSS property for mobile viewport fallback
    useEffect(() => {
      const updateVh = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      };

      updateVh();
      window.addEventListener('resize', updateVh);
      window.addEventListener('orientationchange', updateVh);

      return () => {
        window.removeEventListener('resize', updateVh);
        window.removeEventListener('orientationchange', updateVh);
      };
    }, []);

    // Detect prefers-reduced-motion OS setting
    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Main section navigation method
    const goTo = useCallback(
      (targetIndex) => {
        if (animatingRef.current) return;
        const clamped = Math.max(0, Math.min(totalSections - 1, targetIndex));

        setCurrentIndex((prev) => {
          if (clamped === prev) return prev;
          animatingRef.current = true;

          const nextChild = sections[clamped];
          const sectionId = nextChild?.props?.id || null;
          onSectionChange?.(clamped, sectionId);

          window.setTimeout(() => {
            animatingRef.current = false;
          }, COOLDOWN_MS);

          return clamped;
        });
      },
      [totalSections, sections, onSectionChange],
    );

    // Expose goTo method via ref
    useImperativeHandle(
      ref,
      () => ({
        goTo,
        currentIndex,
        totalSections,
      }),
      [goTo, currentIndex, totalSections],
    );

    // Helper to check if current panel can scroll internally before triggering section advance
    const canScrollPanel = useCallback(
      (direction) => {
        const container = containerRef.current;
        if (!container) return false;
        const activePanel = container.children[currentIndex];
        if (!activePanel) return false;

        const scrollableEl = activePanel.querySelector('[data-panel-scroll]') || activePanel;
        const { scrollTop, scrollHeight, clientHeight } = scrollableEl;
        const isScrollable = scrollHeight > clientHeight + 5;

        if (!isScrollable) return false;

        if (direction > 0) {
          // Scrolling down: check if not yet at bottom
          return scrollTop + clientHeight < scrollHeight - 10;
        }
        if (direction < 0) {
          // Scrolling up: check if not yet at top
          return scrollTop > 10;
        }

        return false;
      },
      [currentIndex],
    );

    // Wheel event listener for trackpad / mousepad / mousewheel scrolling
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return undefined;

      const handleWheel = (e) => {
        if (animatingRef.current) {
          e.preventDefault();
          return;
        }

        if (Math.abs(e.deltaY) < 10) return;

        const direction = e.deltaY > 0 ? 1 : -1;
        if (canScrollPanel(direction)) {
          return;
        }

        e.preventDefault();
        if (e.deltaY > 0) {
          goTo(currentIndex + 1);
        } else if (e.deltaY < 0) {
          goTo(currentIndex - 1);
        }
      };

      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }, [currentIndex, goTo, canScrollPanel]);

    // Touch events for mobile touch swipe
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return undefined;

      const handleTouchStart = (e) => {
        touchStartYRef.current = e.touches[0].clientY;
      };

      const handleTouchMove = (e) => {
        if (touchStartYRef.current === null || animatingRef.current) return;

        const currentY = e.touches[0].clientY;
        const deltaY = touchStartYRef.current - currentY;

        if (Math.abs(deltaY) > 30) {
          const direction = deltaY > 0 ? 1 : -1;

          if (canScrollPanel(direction)) {
            return;
          }

          if (e.cancelable) {
            e.preventDefault();
          }
          goTo(currentIndex + (deltaY > 0 ? 1 : -1));
          touchStartYRef.current = null;
        }
      };

      const handleTouchEnd = () => {
        touchStartYRef.current = null;
      };

      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }, [currentIndex, goTo, canScrollPanel]);

    // Keyboard navigation (ArrowDown, PageDown, ArrowUp, PageUp, Home, End)
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (animatingRef.current) return;

        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
          e.preventDefault();
          goTo(currentIndex + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          goTo(currentIndex - 1);
        } else if (e.key === 'Home') {
          e.preventDefault();
          goTo(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          goTo(totalSections - 1);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, goTo, totalSections]);

    return (
      <div
        ref={containerRef}
        className={cn(
          'relative h-screen-dvh w-full overflow-hidden bg-surface-inverse text-text-inverse select-none',
          className,
        )}
      >
        {/* Render stacked panels */}
        {sections.map((child, index) => {
          const isActive = index === currentIndex;
          const isPrev = index < currentIndex;

          const transformStyle = isActive
            ? 'translateY(0%)'
            : isPrev
              ? 'translateY(-100%)'
              : 'translateY(100%)';

          return (
            <div
              key={child.key || index}
              className={cn(
                'absolute inset-0 size-full h-screen-dvh will-change-transform overflow-y-auto lg:overflow-hidden touch-pan-y',
                isActive ? 'z-20 pointer-events-auto' : 'z-10 pointer-events-none',
              )}
              style={{
                transform: transformStyle,
                transition: prefersReducedMotion
                  ? 'none'
                  : 'transform 900ms cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            >
              {child}
            </div>
          );
        })}

        {/* Right-Side Dot Navigation Indicator */}
        {showDots && totalSections > 1 && (
          <nav
            aria-label="Section navigation"
            className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-3.5"
          >
            {sections.map((child, index) => {
              const label =
                child.props?.['aria-label'] ||
                child.props?.id ||
                `Section ${index + 1}`;
              const isActive = index === currentIndex;

              return (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to ${label}`}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => goTo(index)}
                  className={cn(
                    'size-2.5 rounded-full border-none p-0 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isActive
                      ? 'scale-150 bg-accent shadow-[0_0_10px_rgba(183,24,43,0.8)]'
                      : 'bg-text-inverse/30 hover:bg-text-inverse/70 hover:scale-125',
                  )}
                />
              );
            })}
          </nav>
        )}
      </div>
    );
  },
);

FullPageScroll.displayName = 'FullPageScroll';
