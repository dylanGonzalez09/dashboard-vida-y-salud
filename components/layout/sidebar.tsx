"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Package, Clock, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarItems = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: Package, label: "Inventario", href: "/inventory" },
  { icon: Clock, label: "Por expirar", href: "/expiring" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen border-r border-border bg-card",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        <h2 className={cn("font-semibold", collapsed && "hidden")}>
          Farmacia Vida y Salud
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          <ChevronLeft className={cn("h-4 w-4", collapsed && "rotate-180")} />
        </Button>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-2 py-2">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2" : "px-4"
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && (
                  <span className="ml-3">{item.label}</span>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}