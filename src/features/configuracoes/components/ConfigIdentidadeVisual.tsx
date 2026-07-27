import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Save, Paintbrush, Monitor, LayoutTemplate } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';

export function ConfigIdentidadeVisual() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Identidade Visual</h2>
          <p className="text-muted-foreground mt-1">Personalize as cores, tipografia e temas da interface.</p>
        </div>
        <Button className="gap-2" onClick={() => toast.success("Configurações salvas com sucesso!")}>
          <Save className="w-4 h-4" /> Salvar Alterações
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Cores */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Paintbrush className="w-5 h-5 text-primary" /> Paleta de Cores</CardTitle>
            <CardDescription>Cores padrão da sua marca na plataforma.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#f97316] border shadow-sm"></div>
              <div className="flex-1 space-y-1">
                <Label>Cor Primária (Hex)</Label>
                <Input defaultValue="#f97316" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1e293b] border shadow-sm"></div>
              <div className="flex-1 space-y-1">
                <Label>Cor Secundária (Hex)</Label>
                <Input defaultValue="#1e293b" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#3b82f6] border shadow-sm"></div>
              <div className="flex-1 space-y-1">
                <Label>Cor de Destaque / Links (Hex)</Label>
                <Input defaultValue="#3b82f6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tema e Estilo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Monitor className="w-5 h-5 text-primary" /> Temas</CardTitle>
            <CardDescription>Preferências de Dark Mode e iconografia.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base cursor-pointer" onClick={() => toggleTheme()}>Forçar Tema Escuro (Dark Mode)</Label>
                <p className="text-xs text-muted-foreground">Habilita ou desabilita o tema escuro na aplicação.</p>
              </div>
              <Switch 
                checked={isDark} 
                onCheckedChange={(checked) => {
                  toggleTheme(checked);
                  toast.success(checked ? "Tema Escuro ativado!" : "Tema Claro ativado!");
                }} 
              />
            </div>
            <div className="space-y-2">
              <Label>Estilo de Ícones</Label>
              <Select defaultValue="lucide">
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="lucide">Minimalista (Lucide)</SelectItem>
                  <SelectItem value="solid">Preenchido (Solid)</SelectItem>
                  <SelectItem value="duotone">Duas cores (Duotone)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipografia (Fonte)</Label>
              <Select defaultValue="inter">
                <SelectTrigger><SelectValue/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="inter">Inter (Recomendado)</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="outfit">Outfit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Densidade de Interface */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><LayoutTemplate className="w-5 h-5 text-primary" /> Densidade da Interface</CardTitle>
            <CardDescription>Ajuste o tamanho de fontes, tabelas e botões para todos os usuários.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                <div className="h-16 bg-muted/50 rounded flex items-center justify-center mb-3">
                  <div className="w-3/4 h-2 bg-muted-foreground/30 rounded"></div>
                </div>
                <h3 className="font-semibold text-sm text-center">Compacta</h3>
                <p className="text-xs text-muted-foreground text-center mt-1">Mais informações na tela (Ideal para Notebooks)</p>
              </div>
              <div className="border border-primary bg-primary/5 rounded-lg p-4 cursor-pointer transition-colors relative">
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary"></div>
                <div className="h-16 bg-muted/50 rounded flex flex-col items-center justify-center gap-2 mb-3">
                  <div className="w-3/4 h-2 bg-muted-foreground/30 rounded"></div>
                  <div className="w-1/2 h-2 bg-muted-foreground/30 rounded"></div>
                </div>
                <h3 className="font-semibold text-sm text-center">Padrão (Confortável)</h3>
                <p className="text-xs text-muted-foreground text-center mt-1">Equilíbrio perfeito (Recomendado)</p>
              </div>
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                <div className="h-16 bg-muted/50 rounded flex flex-col items-center justify-center gap-3 mb-3 p-2">
                  <div className="w-full h-3 bg-muted-foreground/30 rounded"></div>
                  <div className="w-3/4 h-3 bg-muted-foreground/30 rounded"></div>
                </div>
                <h3 className="font-semibold text-sm text-center">Espaçosa</h3>
                <p className="text-xs text-muted-foreground text-center mt-1">Fontes maiores e mais respiro visual</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
