import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, TrendingUp, AlertTriangle, CheckCircle2, Globe, SearchCode } from 'lucide-react';
import { useLocalStorageState } from "@/hooks/useDataStore";

export interface KeywordSeo {
  id: string;
  palavra: string;
  volumeBusca: number;
  dificuldade: number;
  posicaoAtual: number;
  tendencia: 'up' | 'down' | 'stable';
}

export function SeoView() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: keywords } = useLocalStorageState<KeywordSeo>('focus_marketing_seo_keywords', []);


  const filteredKeywords = keywords.filter(k => k.palavra.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Domain Authority</p>
                <h3 className="text-2xl font-bold">42 <span className="text-sm text-emerald-600 font-normal">+2 este mês</span></h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-600">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Páginas Indexadas</p>
                <h3 className="text-2xl font-bold">1,245 <span className="text-sm text-emerald-600 font-normal">Saudável</span></h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-rose-500/5 border-rose-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-500/10 rounded-full text-rose-600">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Erros de Rastreamento (404/500)</p>
                <h3 className="text-2xl font-bold text-rose-600">12 <span className="text-sm font-normal underline cursor-pointer">Ver Relatório</span></h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <SearchCode className="w-5 h-5 text-primary" /> Tracking de Palavras-Chave
            </CardTitle>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar keyword..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button size="icon" variant="outline"><Plus className="w-4 h-4" /></Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-3 font-medium">Palavra-Chave</th>
                  <th className="p-3 font-medium">Posição Atual</th>
                  <th className="p-3 font-medium">Volume (Mensal)</th>
                  <th className="p-3 font-medium">Dificuldade (KD)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredKeywords.map(kw => (
                  <tr key={kw.id} className="hover:bg-muted/50">
                    <td className="p-3 font-medium text-foreground">{kw.palavra}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{kw.posicaoAtual}</span>
                        {kw.tendencia === 'up' && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                        {kw.tendencia === 'down' && <TrendingUp className="w-3 h-3 text-rose-500 transform rotate-180" />}
                        {kw.tendencia === 'stable' && <span className="text-muted-foreground">-</span>}
                      </div>
                    </td>
                    <td className="p-3">{kw.volumeBusca.toLocaleString('pt-BR')}</td>
                    <td className="p-3">
                      <div className="w-full bg-secondary rounded-full h-2 max-w-[100px] mt-1">
                        <div 
                          className={`h-2 rounded-full ${kw.dificuldade > 50 ? 'bg-rose-500' : kw.dificuldade > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${kw.dificuldade}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">{kw.dificuldade}/100</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredKeywords.length === 0 && (
              <div className="text-center p-8 text-muted-foreground">Nenhuma palavra-chave encontrada.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
