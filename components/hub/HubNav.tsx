"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/hub", label: "Overview" },
  { href: "/hub/properties", label: "Properties" },
  { href: "/hub/cars", label: "Cars" },
  { href: "/hub/money", label: "Income & Expenses" },
  { href: "/hub/monthly", label: "Monthly" },
  { href: "/hub/journal", label: "Journal" },
];

export default function HubNav() {
  const pathname = usePathname() ?? "/hub";
  return (
    <nav aria-label="Hub sections" className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
      <ul className="flex min-w-max items-stretch gap-7">
        {LINKS.map((l) => {
          const active = l.href === "/hub" ? pathname === "/hub" : pathname === l.href || pathname.startsWith(`${l.href}/`);
          return (
            <li key={l.href} className="flex">
              <Link
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex items-center whitespace-nowrap pb-3 pt-2.5 text-[13.5px] transition-colors",
                  active ? "font-medium text-ink" : "text-ink-muted hover:text-ink"
                )}
              >
                {l.label}
                <span
                  aria-hidden
                  className={cn("absolute inset-x-0 -bottom-px h-[2px] transition-colors", active ? "bg-brass" : "bg-transparent")}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
