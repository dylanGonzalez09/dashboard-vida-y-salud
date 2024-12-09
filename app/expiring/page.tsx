"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { cn, getExpirationColor } from "@/lib/utils";
import { useLocalStorage, type InventoryItem } from "@/hooks/use-local-storage";

interface ExpiringItemDisplay {
  id: number;
  name: string;
  purchaseDate: string;
  expiry: string;
  daysLeft: number;
}

export default function ExpiringPage() {
  const [inventory] = useLocalStorage<InventoryItem[]>("inventory", []);
  const [expiringItems, setExpiringItems] = useState<ExpiringItemDisplay[]>([]);

  const calculateDaysLeft = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const isExpiringSoon = (purchaseDate: string, expiryDate: string) => {
    const purchase = new Date(purchaseDate);
    const expiry = new Date(expiryDate);
    const oneMonthLater = new Date(purchase);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    return expiry <= oneMonthLater;
  };

  useEffect(() => {
    const filtered = inventory
      .filter((item) => isExpiringSoon(item.purchaseDate, item.expiry))
      .map((item) => ({
        id: item.id,
        name: item.name,
        purchaseDate: item.purchaseDate,
        expiry: item.expiry,
        daysLeft: calculateDaysLeft(item.expiry),
      }))
      .sort((a, b) => a.daysLeft - b.daysLeft);

    setExpiringItems(filtered);
  }, [inventory]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Medicamentos por Expirar
        </h2>
        <p className="text-muted-foreground">
          Medicamentos próximos a vencer en el siguiente mes desde su fecha de
          compra
        </p>
      </div>

      {expiringItems.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Atención</AlertTitle>
          <AlertDescription>
            Hay {expiringItems.length} productos que expirarán pronto. Por
            favor, revisa el inventario.
          </AlertDescription>
        </Alert>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Fecha de Compra</TableHead>
            <TableHead>Fecha de Expiración</TableHead>
            <TableHead>Días Restantes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expiringItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.purchaseDate}</TableCell>
              <TableCell>{item.expiry}</TableCell>
              <TableCell
                className={cn("font-medium", {
                  "text-red-500": item.daysLeft <= 20,
                  "text-orange-500": item.daysLeft >= 21 && item.daysLeft <= 35,
                })}
              >
                {item.daysLeft} días
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
