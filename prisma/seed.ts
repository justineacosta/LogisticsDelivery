import { PrismaClient, ServiceType, ShipmentStatus } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  await db.shipment.upsert({
    where: { trackingNumber: "VEL-DEMO-1001" },
    update: {},
    create: {
      trackingNumber: "VEL-DEMO-1001",
      serviceType: ServiceType.OCEAN,
      status: ShipmentStatus.IN_TRANSIT,
      originCity: "Shanghai",
      originCountry: "China",
      destCity: "Long Beach",
      destCountry: "United States",
      weightKg: 18450,
      pieces: 12,
      carrier: "Velocita Ocean Freight",
      estimatedArrival: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8),
      events: {
        create: [
          {
            status: ShipmentStatus.BOOKED,
            location: "Shanghai, CN",
            description: "Booking confirmed",
            occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
          },
          {
            status: ShipmentStatus.PICKED_UP,
            location: "Shanghai Port, CN",
            description: "Cargo loaded onto vessel MV Velocita Pacific",
            occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12),
          },
          {
            status: ShipmentStatus.IN_TRANSIT,
            location: "Pacific Ocean",
            description: "Vessel departed origin port",
            occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11),
          },
          {
            status: ShipmentStatus.IN_TRANSIT,
            location: "Mid-Pacific",
            description: "On schedule, position updated",
            occurredAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
          },
        ],
      },
    },
  });

  await db.blogPost.upsert({
    where: { slug: "future-of-supply-chain-2026" },
    update: {},
    create: {
      slug: "future-of-supply-chain-2026",
      title: "The future of resilient supply chains in 2026",
      excerpt:
        "How predictive routing, electrified fleets, and bonded micro-warehouses are reshaping global logistics.",
      content:
        "# The future of resilient supply chains\n\nGlobal trade lanes are being redrawn...",
      authorName: "Maya Okafor",
      tags: ["supply-chain", "trends", "automation"],
      published: true,
      publishedAt: new Date(),
      coverImage: "/images/blog/supply-chain.jpg",
    },
  });

  await db.jobPosting.upsert({
    where: { slug: "senior-route-optimization-engineer" },
    update: {},
    create: {
      slug: "senior-route-optimization-engineer",
      title: "Senior Route Optimization Engineer",
      department: "Engineering",
      location: "Remote · EMEA",
      type: "Full-time",
      description:
        "Design and ship the algorithms that move 4M+ shipments a year through Velocita's network.",
    },
  });
}

main()
  .then(() => db.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
