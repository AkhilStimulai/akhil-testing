import { RouteDocument } from '@/components/common';
import { LightboxGallery } from '../home/LightboxGallery.jsx';
import { GALLERY_META } from './seo.js';

export function GalleryPage() {
  return (
    <RouteDocument meta={GALLERY_META}>
      <div className="bg-surface-inverse pt-[calc(var(--layout-navbar-height)+1rem)]">
        <LightboxGallery />
      </div>
    </RouteDocument>
  );
}
