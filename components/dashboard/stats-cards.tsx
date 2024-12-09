"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, AlertTriangle, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { ExpiringItem, InventoryItem } from "@/hooks/use-local-storage";

export function StatsCards() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    expiringCount: 0,
    totalValue: 0,
  });

  useEffect(() => {
    const updateStats = () => {
      try {
        const inventory = JSON.parse(localStorage.getItem("inventory") || "[]") as InventoryItem[];
        const expiring = JSON.parse(localStorage.getItem("expiring") || "[]") as ExpiringItem[];
        
        setStats({
          totalProducts: inventory.length,
          expiringCount: expiring.length,
          totalValue: inventory.reduce((acc, item) => acc + (item.price * item.stock), 0),
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      }
    };

    // Initial load
    updateStats();

    // Listen for storage changes
    window.addEventListener('storage', updateStats);
    
    return () => {
      window.removeEventListener('storage', updateStats);
    };
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Productos</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProducts}</div>
          <p className="text-xs text-muted-foreground">
            Productos en inventario
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Por Expirar</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.expiringCount}</div>
          <p className="text-xs text-muted-foreground">
            En los próximos 30 días
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Valor del Inventario</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            Valor total del inventario
          </p>
        </CardContent>
      </Card>
    </div>
  );
}