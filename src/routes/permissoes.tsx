import React, { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PermissoesDashboard } from "@/features/permissoes/components/PermissoesDashboard";
import { ColaboradoresPermissoesView } from "@/features/permissoes/components/ColaboradoresPermissoesView";
import { MatrizPermissoesView } from "@/features/permissoes/components/MatrizPermissoesView";
import { ShieldCheck, Users, LayoutGrid, RefreshCw, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/permissoes")({
  component: PermissoesPage,
});

function PermissoesPage() {
  const [activeTab, setActiveTab] = useState("colaboradores");

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[1400px] mx-auto w-full animate-fade-in">
      {/* CabeÃ§alho do MÃ³dulo de PermissÃµes */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">PermissÃµes & GovernanÃ§a (RBAC)</h1>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              GestÃ£o de perfis de acesso, matriz de permissÃµes por mÃ³dulo e alteraÃ§Ã£o de setores com sincronizaÃ§Ã£o automÃ¡tica com os mÃ³dulos RH e UsuÃ¡rios.
            </p>
          </div>
        </div>
      </div>

      {/* NavegaÃ§Ã£o por Abas */}
      <Tabs defaultValue="colaboradores" className="space-y-6 mt-2" onValueChange={setActiveTab}>
        <div className="border-b pb-2">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="colaboradores" className="gap-2 text-orange-600 font-semibold">
              <Users className="w-4 h-4" /> Colaboradores & SincronizaÃ§Ã£o de Setor
            </TabsTrigger>
            <TabsTrigger value="matriz" className="gap-2">
              <Lock className="w-4 h-4" /> Matriz de PermissÃµes (RBAC)
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="gap-2">
              <LayoutGrid className="w-4 h-4" /> Dashboard de GovernanÃ§a
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="colaboradores" className="space-y-4 outline-none">
          <ColaboradoresPermissoesView />
        </TabsContent>

        <TabsContent value="matriz" className="space-y-4 outline-none">
          <MatrizPermissoesView />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-4 outline-none">
          <PermissoesDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
