export default function RootLoading() {
  return (
    <div className="container flex min-h-[60vh] items-center justify-center">
      <div className="flex items-center gap-3 text-muted-foreground">
        <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500 [animation-delay:0.15s]" />
        <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500 [animation-delay:0.3s]" />
        <span className="ml-2 text-sm">Loading…</span>
      </div>
    </div>
  );
}
