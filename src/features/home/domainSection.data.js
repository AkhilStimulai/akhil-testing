// import advancedMobilityImage from '@/assets/images/domain-advanced-mobility.webp';
// import roboticsImage from '@/assets/images/domain-automation-robotics.webp';
// import sustainabilityImage from '@/assets/images/domain-environmental-sustainability.webp';
// import sportsImage from '@/assets/images/domain-sports-engineering.webp';

// export const DOMAIN_SECTION_ITEMS = Object.freeze([
//   {
//     id: 'sports-engineering',
//     eyebrow: 'Sports Engineering',
//     title: 'Engineering Human Performance.',
//     description:
//       'Develop intelligent products that enhance athletic performance using sensors, data intelligence, biomechanics and precision engineering.',
//     meta: ['Smart Bicycle', 'Cycling Computer', 'Performance Sensors', 'Wearables', 'Smart Helmets'],
//     image: sportsImage,
//     imageAlt:
//       'Cyclist undergoing motion analysis in a dark performance testing lab with precision sensors.',
//   },
//   {
//     id: 'advanced-mobility',
//     eyebrow: 'Advanced Mobility',
//     title: 'Engineering Future Mobility.',
//     description:
//       'Design intelligent mobility platforms that connect hardware, software and artificial intelligence for safer and smarter transportation.',
//     meta: ['RCX Smart Bicycle', 'Smart Navigation', 'Connected Vehicles', 'Mobility Platforms', 'Route Intelligence'],
//     image: advancedMobilityImage,
//     imageAlt:
//       'Night urban mobility test environment with connected transportation traces and engineering hardware.',
//   },
//   {
//     id: 'automation-robotics',
//     eyebrow: 'Automation & Robotics',
//     title: 'Engineering Autonomous Systems.',
//     description:
//       'Create robotic and automated systems capable of sensing, learning and making intelligent decisions.',
//     meta: ['Industrial Robotics', 'AI Vision', 'Automation', 'Embedded Systems', 'Robotic Intelligence'],
//     image: roboticsImage,
//     imageAlt:
//       'Industrial robotic arm and AI vision system operating inside a dark robotics lab.',
//   },
//   {
//     id: 'environmental-sustainability',
//     eyebrow: 'Environmental Sustainability',
//     title: 'Engineering a Sustainable Future.',
//     description:
//       'Build intelligent technologies that help industries monitor, optimise and preserve environmental resources.',
//     meta: ['Smart Monitoring', 'Renewable Energy', 'Environmental Intelligence', 'IoT', 'Sustainability Platforms'],
//     image: sustainabilityImage,
//     imageAlt:
//       'Environmental sensor station in a dark renewable energy landscape with remote monitoring traces.',
//   },
// ]);


 // new code
 import {
  Bike,
  CarFront,
  Bot,
  Leaf,
} from "lucide-react";

import sportsImg from "@/assets/images/domains/sports.webp";
import mobilityImg from "@/assets/images/domains/mobility.webp";
import roboticsImg from "@/assets/images/domains/robotics.webp";
import sustainabilityImg from "@/assets/images/domains/sustainability.webp";

export const domains = [
  {
    id: 1,
    number: "01",
    title: "Sports Engineering",

    subtitle:
      "High-performance equipment enhanced with sensors, AI and data analytics.",

    image: sportsImg,

    icon: Bike,

    href: "/domains/sports-engineering",
  },

  {
    id: 2,
    number: "02",
    title: "Advanced Mobility",

    subtitle:
      "Intelligent mobility solutions integrating electronics, software and industrial design.",

    image: mobilityImg,

    icon: CarFront,

    href: "/domains/advanced-mobility",
  },

  {
    id: 3,
    number: "03",
    title: "Automation & Robotics",

    subtitle:
      "Precision robotics, industrial automation and intelligent manufacturing systems.",

    image: roboticsImg,

    icon: Bot,

    href: "/domains/automation-robotics",
  },

  {
    id: 4,
    number: "04",
    title: "Environmental Sustainability",

    subtitle:
      "Engineering solutions for energy efficiency and sustainable technologies.",

    image: sustainabilityImg,

    icon: Leaf,

    href: "/domains/environmental-sustainability",
  },
];

export const DOMAIN_SECTION_ITEMS = domains;