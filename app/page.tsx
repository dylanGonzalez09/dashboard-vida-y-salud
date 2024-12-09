import { StatsCards } from "@/components/dashboard/stats-cards";

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Bienvenido al panel de control de la farmacia
        </p>
      </div>
      <StatsCards />
    </div>
  );
}