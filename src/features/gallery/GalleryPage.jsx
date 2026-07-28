import { RouteDocument } from '@/components/common';
import { LightboxGallery } from '../home/LightboxGallery.jsx';
import { GALLERY_META } from './seo.js';

export function GalleryPage() {
  return (
    <RouteDocument meta={GALLERY_META}>
      <div className="bg-surface-inverse">
        <LightboxGallery />
      </div>
    </RouteDocument>
  );
}
