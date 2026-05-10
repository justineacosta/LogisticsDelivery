import {
  Truck,
  Plane,
  Ship,
  Train,
  Warehouse,
  PackageCheck,
  FileCheck,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "road-freight",
    title: "Road Freight",
    short: "FTL & LTL across 40+ countries",
    description:
      "Full-truckload and less-than-truckload trucking with live GPS, ELD compliance, and bonded cross-border lanes.",
    icon: Truck,
    highlights: ["FTL & LTL", "Cross-border", "Live GPS", "ELD compliant"],
  },
  {
    slug: "air-cargo",
    title: "Air Cargo",
    short: "Time-critical and pharma-grade air",
    description:
      "Express air, charter, and temperature-controlled GDP-certified lanes for high-value and time-critical cargo.",
    icon: Plane,
    highlights: ["Next-flight-out", "GDP pharma", "Charter", "Dangerous goods"],
  },
  {
    slug: "ocean-freight",
    title: "Ocean Freight",
    short: "FCL, LCL, and project cargo",
    description:
      "FCL and LCL bookings on every major trade lane, with reefer, breakbulk, and out-of-gauge project shipping.",
    icon: Ship,
    highlights: ["FCL / LCL", "Reefer", "Breakbulk", "Project cargo"],
  },
  {
    slug: "rail-freight",
    title: "Rail Freight",
    short: "Eurasian and intermodal rail",
    description:
      "Block trains and intermodal containers between Asia, Europe, and North America with carbon-tracked routing.",
    icon: Train,
    highlights: ["Block trains", "Intermodal", "Carbon-tracked"],
  },
  {
    slug: "warehousing",
    title: "Warehousing & 3PL",
    short: "Bonded, climate-controlled fulfillment",
    description:
      "Bonded and climate-controlled warehousing with WMS-integrated pick-pack-ship across 38 distribution hubs.",
    icon: Warehouse,
    highlights: ["Bonded", "Climate control", "WMS API", "38 hubs"],
  },
  {
    slug: "last-mile",
    title: "Last-Mile Delivery",
    short: "Same-day, white-glove, and B2C",
    description:
      "Same-day urban delivery, scheduled white-glove installs, and B2C parcel routing with proof-of-delivery photos.",
    icon: PackageCheck,
    highlights: ["Same-day", "White-glove", "Photo POD", "B2C parcel"],
  },
  {
    slug: "customs-brokerage",
    title: "Customs Brokerage",
    short: "Licensed clearance in 60+ countries",
    description:
      "In-house licensed brokers, AEO/C-TPAT compliance, and duty-drawback recovery for complex international trade.",
    icon: FileCheck,
    highlights: ["AEO / C-TPAT", "Duty drawback", "ISF & ENS", "60+ countries"],
  },
];
