import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { RouteDocument } from '@/components/common';
import { FullPageScroll } from '@/components/layout';
import { DomainsSection } from './DomainsSection.jsx';
import { FeaturedInnovation } from './FeaturedInnovation.jsx';
import { Hero } from './Hero.jsx';
import { LightboxGallery } from './LightboxGallery.jsx';
import { HOME_META } from './seo.js';
import { StoriesFromRoad } from './stories/StoriesFromRoad.jsx';
import { ContactSection } from './ContactSection.jsx';

const SECTION_IDS = [
  'home-hero',
  'home-domains',
  'home-rcx',
  'home-gallery',
  'home-reviews',
  'home-contact',
];

export function HomePage() {
  const location = useLocation();
  const fullPageRef = useRef(null);

  // Sync hash/route with FullPageScroll active index on initial load/navigation
  useEffect(() => {
    let targetIndex = -1;

    if (location.pathname === '/gallery') {
      targetIndex = SECTION_IDS.indexOf('home-gallery');
    } else if (location.pathname === '/reviews') {
      targetIndex = SECTION_IDS.indexOf('home-reviews');
    } else if (location.pathname === '/domains') {
      targetIndex = SECTION_IDS.indexOf('home-domains');
    } else if (location.pathname === '/contact') {
      targetIndex = SECTION_IDS.indexOf('home-contact');
    } else if (location.hash) {
      const cleanHash = location.hash.replace('#', '');
      targetIndex = SECTION_IDS.indexOf(cleanHash);
    }

    if (targetIndex !== -1 && fullPageRef.current) {
      window.scrollTo(0, 0);
      fullPageRef.current?.goTo(targetIndex);

      // Lock scroll at top during transition to defeat native anchor jump
      const preventScroll = () => {
        if (window.scrollY > 0) {
          window.scrollTo(0, 0);
        }
      };
      window.addEventListener('scroll', preventScroll, { passive: true });
      const timer = setTimeout(() => {
        window.removeEventListener('scroll', preventScroll);
        window.scrollTo(0, 0);
      }, 400);

      return () => {
        window.removeEventListener('scroll', preventScroll);
        clearTimeout(timer);
      };
    }
  }, [location]);

  // Listen for custom section navigation from Navbar/MobileMenu
  useEffect(() => {
    const handleSectionNavigate = (e) => {
      const targetId = e.detail;
      const targetIndex = SECTION_IDS.indexOf(targetId);
      if (targetIndex !== -1 && fullPageRef.current) {
        window.scrollTo(0, 0);
        fullPageRef.current.goTo(targetIndex);
      }
    };

    window.addEventListener('sectionNavigate', handleSectionNavigate);
    return () => window.removeEventListener('sectionNavigate', handleSectionNavigate);
  }, []);

  const handleSectionChange = (_index, sectionId) => {
    window.scrollTo(0, 0);
    if (sectionId && window.history.replaceState) {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
    if (sectionId) {
      window.dispatchEvent(new CustomEvent('activeSectionChange', { detail: sectionId }));
    }
  };

  return (
    <RouteDocument meta={HOME_META}>
      <FullPageScroll ref={fullPageRef} onSectionChange={handleSectionChange}>
        <Hero key="hero" aria-label="Hero" id="home-hero" />
        <DomainsSection key="domains" aria-label="Domains" id="home-domains" />
        <FeaturedInnovation key="rcx" aria-label="Featured RCX" id="home-rcx" />
        <LightboxGallery key="gallery" aria-label="Gallery" id="home-gallery" />
        <StoriesFromRoad key="reviews" aria-label="Reviews" id="home-reviews" />
        <ContactSection key="contact" aria-label="Contact" id="home-contact" />
      </FullPageScroll>
    </RouteDocument>
  );
}
