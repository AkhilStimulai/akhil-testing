import { RouteDocument } from '@/components/common';
import { DOMAINS_META } from './seo.js';
import { DomainsSection } from '../home/DomainsSection.jsx';

export function DomainsPage() {
  return (
    <RouteDocument meta={DOMAINS_META}>
      <div className="bg-surface-inverse pt-[calc(var(--layout-navbar-height)+1rem)]">
        <DomainsSection />
      </div>
    </RouteDocument>
  );
}