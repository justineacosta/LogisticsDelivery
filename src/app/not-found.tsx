import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-bold gradient-text">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold">Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        That route is off the manifest. Let's get you back on a known lane.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/tracking">Track a shipment</Link>
        </Button>
      </div>
    </div>
  );
}
