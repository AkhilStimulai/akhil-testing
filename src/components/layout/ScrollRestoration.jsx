import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

function getStorageKey(pathname, search) {
  return `stimulai:scroll:${pathname}${search}`;
}

function readPosition(key) {
  try {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function writePosition(key) {
  try {
    window.sessionStorage.setItem(
      key,
      JSON.stringify({
        left: window.scrollX,
        top: window.scrollY,
      }),
    );
  } catch {
    return undefined;
  }

  return undefined;
}

function getHashTarget(hash) {
  if (!hash) {
    return null;
  }

  const targetId = hash.slice(1);

  try {
    return document.getElementById(decodeURIComponent(targetId)) || document.querySelector(`[data-section-id="${decodeURIComponent(targetId)}"]`);
  } catch {
    return document.getElementById(targetId) || document.querySelector(`[data-section-id="${targetId}"]`);
  }
}

export function ScrollRestoration() {
  const { hash, pathname, search } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const original = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = original;
    };
  }, []);

  useEffect(() => {
    const key = getStorageKey(pathname, search);

    function handleBeforeUnload() {
      writePosition(key);
    }

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      writePosition(key);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, search]);

  useLayoutEffect(() => {
    if (hash && pathname !== '/') {
      let frame = 0;
      let timeout = 0;
      let attempts = 0;

      function scrollToHashTarget() {
        const target = getHashTarget(hash);

        if (target) {
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

          target.scrollIntoView({
            block: 'start',
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
          return;
        }

        if (attempts < 12) {
          attempts += 1;
          timeout = window.setTimeout(scrollToHashTarget, 50);
        }
      }

      frame = window.requestAnimationFrame(scrollToHashTarget);

      return () => {
        window.cancelAnimationFrame(frame);
        window.clearTimeout(timeout);
      };
    }

    const key = getStorageKey(pathname, search);
    const savedPosition = navigationType === 'POP' ? readPosition(key) : null;

    window.scrollTo({
      left: savedPosition?.left ?? 0,
      top: savedPosition?.top ?? 0,
      behavior: 'auto',
    });
    return undefined;
  }, [hash, navigationType, pathname, search]);

  return null;
}
