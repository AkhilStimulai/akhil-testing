import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { RouteFallback } from '@/components/common';
import {
  BackToTop,
  Footer,
  GlobalCursor,
  Navbar,
  PageTransition,
  ScrollProgress,
  ScrollRestoration,
  SkipLink,
} from '@/components/layout';

export function RootLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink />
      <ScrollRestoration />
      <ScrollProgress />
      <GlobalCursor />
      <Navbar />

      <main
        id="main-content"
        className="flex-1 bg-background text-text-primary"
        tabIndex={-1}
      >
        <Suspense fallback={<RouteFallback />}>
          <PageTransition />
        </Suspense>
      </main>

      {!isHomePage && <Footer />}
      <BackToTop />
    </div>
  );
}
