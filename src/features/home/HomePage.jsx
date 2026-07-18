import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { RouteDocument } from '@/components/common';
//import { DomainSegments } from './DomainSegments.jsx';
import { DomainsSection } from './DomainsSection.jsx';
import { FeaturedInnovation } from './FeaturedInnovation.jsx';
import { Hero } from './Hero.jsx';
import { LightboxGallery } from './LightboxGallery.jsx';
import { HOME_META } from './seo.js';
import { StoriesFromRoad } from './stories/StoriesFromRoad.jsx';

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const scrollToGallery = () => {
      if (
        location.pathname === '/gallery' ||
        location.hash === '#home-gallery'
      ) {
        const gallery = document.getElementById('home-gallery');

        if (gallery) {
          gallery.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    // Wait until the page has rendered
    const timer = setTimeout(scrollToGallery, 100);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <RouteDocument meta={HOME_META}>
      <div className="bg-surface-inverse">
        <Hero />
        <DomainsSection />
        <FeaturedInnovation />
        <LightboxGallery />
        <StoriesFromRoad />
      </div>
    </RouteDocument>
  );
}
