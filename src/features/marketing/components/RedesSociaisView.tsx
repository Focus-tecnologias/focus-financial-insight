import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Facebook, Instagram, Twitter, Linkedin, Youtube, MoreHorizontal, MessageCircle, Heart, Share2 } from 'lucide-react';
import { useLocalStorageState } from "@/hooks/useDataStore";

export interface PostRedeSocial {
  id: string;
  plataforma: 'Instagram' | 'LinkedIn' | 'Facebook' | 'Twitter' | 'YouTube';
  conteudo: string;
  dataAgendada: string;
  status: 'Agendado' | 'Publicado' | 'Rascunho' | 'Erro';
  metricas?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export function RedesSociaisView() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: posts } = useLocalStorageState<PostRedeSocial>('focus_marketing_sociais', [
    {
      id: 'post-1',
      plataforma: 'Instagram',
      conteudo: 'Lançamento do nosso novo módulo de ERP! Confira as novidades 🚀 #ERP #Gestao',
      dataAgendada: new Date().toISOString().split('T')[0],
      status: 'Publicado',
      metricas: { likes: 124, comments: 12, shares: 5 }
    },
    {
      id: 'post-2',
      plataforma: 'LinkedIn',
      conteudo: 'Como a automação financeira pode salvar o caixa da sua empresa. Artigo completo no blog.',
      dataAgendada: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      status: 'Agendado'
    },
    {
      id: 'post-3',
      plataforma: 'YouTube',
      conteudo: 'Webinar: Tendências de Tecnologia para 2027',
      dataAgendada: new Date(Date.now() + 172800000).toISOString().split('T')[0],
      status: 'Rascunho'
    }
  ]);

  const filteredPosts = posts.filter(p => p.conteudo.toLowerCase().includes(searchTerm.toLowerCase()));

  const platformIcons = {
    'Instagram': <Instagram className="w-5 h-5 text-pink-600" />,
    'LinkedIn': <Linkedin className="w-5 h-5 text-blue-600" />,
    'Facebook': <Facebook className="w-5 h-5 text-blue-800" />,
    'Twitter': <Twitter className="w-5 h-5 text-sky-500" />,
    'YouTube': <Youtube className="w-5 h-5 text-red-600" />
  };

  const statusColors = {
    'Publicado': 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    'Agendado': 'bg-blue-500/10 text-blue-600 border-blue-200',
    'Rascunho': 'bg-slate-500/10 text-slate-600 border-slate-200',
    'Erro': 'bg-rose-500/10 text-rose-600 border-rose-200'
  };

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar publicações..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Nova Publicação
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredPosts.map(post => (
          <Card key={post.id} className="hover:border-primary/50 transition-colors">
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-2 bg-muted rounded-lg shrink-0">
                  {platformIcons[post.plataforma]}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{post.plataforma}</span>
                    <span className="text-xs text-muted-foreground">• {post.dataAgendada}</span>
                    <Badge variant="outline" className={`text-[10px] ${statusColors[post.status]}`}>
                      {post.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground/80 line-clamp-2">{post.conteudo}</p>
                </div>
              </div>

              {post.metricas && (
                <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0 border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-4 mt-4 sm:mt-0 w-full sm:w-auto">
                  <div className="flex items-center gap-1"><Heart className="w-3.5 h-3.5"/> {post.metricas.likes}</div>
                  <div className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5"/> {post.metricas.comments}</div>
                  <div className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5"/> {post.metricas.shares}</div>
                </div>
              )}
              
              <Button variant="ghost" size="icon" className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        {filteredPosts.length === 0 && (
          <div className="text-center p-12 border rounded-lg bg-muted/20">
            <p className="text-muted-foreground">Nenhuma publicação encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}
