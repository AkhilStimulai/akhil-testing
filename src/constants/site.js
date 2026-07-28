export const SITE_CONFIG = Object.freeze({
  name: 'STIMULAI',
  legalName: 'STIMULAI',
  siteUrl: import.meta.env.VITE_SITE_URL ?? 'https://stimulai.com',
  defaultTitle: 'STIMULAI | AI Engineering Company',
  defaultDescription:
    'STIMULAI engineers AI systems and products across sports engineering, advanced mobility, automation and robotics, and environmental sustainability.',
  defaultOgImage: '/og/stimulai.jpg',
  domains: [
    'Sports Engineering',
    'Advanced Mobility',
    'Automation & Robotics',
    'Environmental Sustainability',
  ],
  contact: {
    email: 'connect@stimulai.in',
    phone: '+91 8860253376',
    address: 'Arcadia, South City II, Sector 49, Gurugram, Haryana',
    mapUrl: 'https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=28.4187059,77.0522897',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/stimulai-tech/',
    instagram: 'https://www.instagram.com/stimulai_tech/',
    github: 'https://github.com',
  },
});
