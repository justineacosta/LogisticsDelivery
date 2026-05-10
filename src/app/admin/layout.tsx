import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Logo } from "@/components/layout/logo";
import { LayoutDashboard, MessageSquare, Package, FileText } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/quotes", label: "Quotes", icon: FileText },
  { href: "/admin/shipments", label: "Shipments", icon: Package },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login?from=/admin");

  const role = (session.user as { role?: string }).role;
  if (role !== "ADMIN" && role !== "STAFF") redirect("/");

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border bg-background/80 backdrop-blur lg:block">
        <div className="p-6">
          <Logo />
        </div>
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-6 left-0 right-0 px-6 text-xs text-muted-foreground">
          Signed in as{" "}
          <span className="font-medium text-foreground">
            {session.user.email}
          </span>
        </div>
      </aside>
      <div className="lg:ml-64">
        <main className="p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
