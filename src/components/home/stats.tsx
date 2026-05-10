import { stats } from "@/content/site-data";
import { Activity, Globe2, ShieldCheck, Warehouse } from "lucide-react";

const icons = [Activity, Globe2, ShieldCheck, Warehouse];

export function Stats() {
  return (
    <section className="container py-20 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 p-10 text-white shadow-2xl shadow-brand-700/20 sm:p-14">
        <div className="absolute inset-0 bg-grid opacity-10" aria-hidden />
        <div
          className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div className="relative grid gap-10 md:grid-cols-2 md:items-end">
          <div>
            <h2 className="text-balance font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              The numbers behind the network
            </h2>
            <p className="mt-3 max-w-md text-pretty text-white/80">
              Built for scale by operators who have moved cargo from Long Beach
              to Lagos at 3 a.m. on a Sunday.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {stats.map((s, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur"
                >
                  <Icon className="h-5 w-5 text-white/80" />
                  <div className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm text-white/75">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
