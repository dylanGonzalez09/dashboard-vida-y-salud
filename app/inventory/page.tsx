"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InventoryForm } from "@/components/inventory/inventory-form";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLocalStorage, type InventoryItem } from "@/hooks/use-local-storage";

export default function InventoryPage() {
  const [inventory, setInventory] = useLocalStorage<InventoryItem[]>("inventory", [
    {
      id: 1,
      name: "Paracetamol 500mg",
      stock: 150,
      price: 5.99,
      purchaseDate: "2024-01-15",
      laboratory: "Bayer",
      expiry: "2024-12-31",
    },
    {
      id: 2,
      name: "Ibuprofeno 400mg",
      stock: 200,
      price: 7.99,
      purchaseDate: "2024-02-01",
      laboratory: "Pfizer",
      expiry: "2024-10-15",
    },
    {
      id: 3,
      name: "Amoxicilina 500mg",
      stock: 75,
      price: 12.99,
      purchaseDate: "2024-01-20",
      laboratory: "Roche",
      expiry: "2024-08-20",
    },
  ]);

  const handleAdd = (values: Omit<InventoryItem, "id">) => {
    const newItem = {
      ...values,
      id: inventory.length + 1,
    };
    setInventory([...inventory, newItem]);
  };

  const handleEdit = (id: number, values: Omit<InventoryItem, "id">) => {
    setInventory(inventory.map(item => 
      item.id === id ? { ...values, id } : item
    ));
  };

  const handleDelete = (id: number) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Inventario</h2>
        <p className="text-muted-foreground">
          Gestiona el inventario de medicamentos
        </p>
      </div>

      <InventoryForm onSubmit={handleAdd} />
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Fecha de Compra</TableHead>
            <TableHead>Laboratorio</TableHead>
            <TableHead>Fecha de Expiración</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.purchaseDate}</TableCell>
              <TableCell>{item.laboratory}</TableCell>
              <TableCell>{item.expiry}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <InventoryForm
                    onSubmit={(values) => handleEdit(item.id, values)}
                    initialData={item}
                    trigger={
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    }
                    title="Editar Producto"
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará permanentemente el producto del inventario.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(item.id)}>Eliminar</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}