import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Boxes, Upload, Save, X, ImagePlus, RefreshCw, Globe, GitBranch, FileText,
} from 'lucide-react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ProdutoFocus, CategoriaProduto, StatusProduto } from '../types';
import { toast } from 'sonner';

// Comprime uma imagem via canvas para garantir que caiba no localStorage
// maxWidth/maxHeight em px, quality 0-1
function compressImage(
  file: File,
  maxWidth = 800,
  maxHeight = 500,
  quality = 0.75
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
    reader.onload = (ev) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Erro ao carregar imagem'));
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Redimensiona mantendo proporção
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Canvas não suportado'));
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

interface EditarProdutoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  produto: ProdutoFocus | null;
  onSave: (id: string, changes: Partial<ProdutoFocus>) => void;
}

export function EditarProdutoModal({ open, onOpenChange, produto, onSave }: EditarProdutoModalProps) {
  const capaInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    nome: '',
    codigo: '',
    categoria: 'ERP & Gestão' as CategoriaProduto,
    status: 'Ativo' as StatusProduto,
    versaoAtual: 'v1.0.0',
    descricaoBreve: '',
    descricaoCompleta: '',
    responsavelPrincipal: '',
    dataLancamento: '',
    siteOficial: '',
    repositorioGit: '',
    documentacaoUrl: '',
    capaUrl: '',
    logoUrl: '',
  });

  const [capaPreview, setCapaPreview] = useState<string>('');
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [uploadingCapa, setUploadingCapa] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Sync form with product when modal opens
  useEffect(() => {
    if (produto && open) {
      setForm({
        nome: produto.nome || '',
        codigo: produto.codigo || '',
        categoria: produto.categoria || 'ERP & Gestão',
        status: produto.status || 'Ativo',
        versaoAtual: produto.versaoAtual || 'v1.0.0',
        descricaoBreve: produto.descricaoBreve || '',
        descricaoCompleta: produto.descricaoCompleta || '',
        responsavelPrincipal: produto.responsavelPrincipal || '',
        dataLancamento: produto.dataLancamento || '',
        siteOficial: produto.siteOficial || '',
        repositorioGit: produto.repositorioGit || '',
        documentacaoUrl: produto.documentacaoUrl || '',
        capaUrl: produto.capaUrl || '',
        logoUrl: produto.logoUrl || '',
      });
      setCapaPreview(produto.capaUrl || '');
      setLogoPreview(produto.logoUrl || '');
    }
  }, [produto, open]);

  const handleCapaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Imagem muito grande! Limite máximo: 10MB.');
      return;
    }
    setUploadingCapa(true);
    try {
      // Comprime para 800x500px, JPEG 75% — resultado ~50-150KB, confortável para localStorage
      const dataUrl = await compressImage(file, 800, 500, 0.75);
      setCapaPreview(dataUrl);
      setForm((prev) => ({ ...prev, capaUrl: dataUrl }));
      toast.success(`Capa carregada e comprimida! (~${Math.round(dataUrl.length / 1024)}KB)`);
    } catch (err) {
      toast.error('Erro ao processar imagem. Tente outro arquivo.');
      console.error(err);
    } finally {
      setUploadingCapa(false);
      // Reset input para permitir selecionar o mesmo arquivo novamente
      if (capaInputRef.current) capaInputRef.current.value = '';
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Logo muito grande! Limite máximo: 5MB.');
      return;
    }
    setUploadingLogo(true);
    try {
      // Logo: 200x200px, PNG-like quality via JPEG 85%
      const dataUrl = await compressImage(file, 200, 200, 0.85);
      setLogoPreview(dataUrl);
      setForm((prev) => ({ ...prev, logoUrl: dataUrl }));
      toast.success('Logo carregado!');
    } catch (err) {
      toast.error('Erro ao processar logo. Tente outro arquivo.');
      console.error(err);
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) logoInputRef.current.value = '';
    }
  };

  const handleRemoverCapa = () => {
    setCapaPreview('');
    setForm((prev) => ({ ...prev, capaUrl: '' }));
    if (capaInputRef.current) capaInputRef.current.value = '';
  };

  const handleRemoverLogo = () => {
    setLogoPreview('');
    setForm((prev) => ({ ...prev, logoUrl: '' }));
    if (logoInputRef.current) logoInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!produto || !form.nome.trim()) return;

    onSave(produto.id, {
      nome: form.nome,
      codigo: form.codigo,
      categoria: form.categoria,
      status: form.status,
      versaoAtual: form.versaoAtual,
      descricaoBreve: form.descricaoBreve,
      descricaoCompleta: form.descricaoCompleta,
      responsavelPrincipal: form.responsavelPrincipal,
      dataLancamento: form.dataLancamento,
      siteOficial: form.siteOficial,
      repositorioGit: form.repositorioGit,
      documentacaoUrl: form.documentacaoUrl,
      capaUrl: form.capaUrl,
      logoUrl: form.logoUrl,
      updatedAt: new Date().toISOString(),
    });

    toast.success(`Produto "${form.nome}" atualizado com sucesso!`);
    onOpenChange(false);
  };

  if (!produto) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[92vh] overflow-y-auto">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-base font-bold flex items-center gap-2">
            <Boxes className="h-5 w-5 text-primary" />
            Editar Produto — <span className="text-primary">{produto.nome}</span>
          </DialogTitle>
          <DialogDescription className="text-xs">
            Atualize as informações do produto, capa visual e logo do catálogo. As alterações são salvas localmente.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-2">

          {/* ── SEÇÃO DE IMAGENS ── */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <ImagePlus className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-foreground tracking-wide uppercase">Identidade Visual do Produto</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px] gap-4">
              {/* CAPA (Banner) */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">Imagem de Capa (Banner do Card)</Label>
                <div
                  className="relative group rounded-xl overflow-hidden border-2 border-dashed border-border hover:border-primary/60 transition-all bg-muted/20 cursor-pointer"
                  style={{ height: '140px' }}
                  onClick={() => capaInputRef.current?.click()}
                >
                  {capaPreview ? (
                    <>
                      <img src={capaPreview} alt="Capa" className="w-full h-full object-cover" />
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <RefreshCw className="w-5 h-5 text-white" />
                        <span className="text-white text-[11px] font-semibold">Trocar imagem</span>
                      </div>
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={(ev) => { ev.stopPropagation(); handleRemoverCapa(); }}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors z-10"
                        title="Remover capa"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                      {uploadingCapa ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          <span className="text-xs">Processando...</span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-6 h-6" />
                          <span className="text-xs font-semibold">Clique para fazer upload da capa</span>
                          <span className="text-[10px] opacity-70">PNG, JPG, WEBP • Máx 5MB</span>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    ref={capaInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCapaUpload}
                    className="hidden"
                  />
                </div>

                {capaPreview && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full text-xs gap-1.5 text-muted-foreground h-7"
                    onClick={() => capaInputRef.current?.click()}
                  >
                    <RefreshCw className="w-3 h-3" /> Trocar Capa
                  </Button>
                )}
              </div>

              {/* LOGO */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-muted-foreground">Logo / Ícone</Label>
                <div
                  className="relative group rounded-xl overflow-hidden border-2 border-dashed border-border hover:border-primary/60 transition-all bg-muted/20 cursor-pointer flex flex-col items-center justify-center"
                  style={{ height: '140px' }}
                  onClick={() => logoInputRef.current?.click()}
                >
                  {logoPreview ? (
                    <>
                      <img src={logoPreview} alt="Logo" className="w-24 h-24 object-contain" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                        <RefreshCw className="w-4 h-4 text-white" />
                        <span className="text-white text-[10px]">Trocar logo</span>
                      </div>
                      <button
                        type="button"
                        onClick={(ev) => { ev.stopPropagation(); handleRemoverLogo(); }}
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors z-10"
                        title="Remover logo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                      {uploadingLogo ? (
                        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Upload className="w-5 h-5" />
                          <span className="text-[10px] font-semibold text-center leading-tight">Upload Logo<br />PNG • Máx 2MB</span>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                </div>

                {logoPreview && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="w-full text-xs gap-1.5 text-muted-foreground h-7"
                    onClick={() => logoInputRef.current?.click()}
                  >
                    <RefreshCw className="w-3 h-3" /> Trocar Logo
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* ── SEÇÃO DE INFORMAÇÕES BÁSICAS ── */}
          <div className="space-y-4 p-4 rounded-xl bg-muted/20 border border-border">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Informações do Produto</span>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Nome do Produto *</Label>
                <Input
                  required
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="text-xs"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Código Identificador</Label>
                <Input
                  value={form.codigo}
                  onChange={(e) => setForm({ ...form, codigo: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Categoria</Label>
                <Select value={form.categoria} onValueChange={(v: CategoriaProduto) => setForm({ ...form, categoria: v })}>
                  <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ERP & Gestão">ERP & Gestão</SelectItem>
                    <SelectItem value="CRM & Vendas">CRM & Vendas</SelectItem>
                    <SelectItem value="Business Intelligence">Business Intelligence</SelectItem>
                    <SelectItem value="Fintech & Pay">Fintech & Pay</SelectItem>
                    <SelectItem value="Logística">Logística</SelectItem>
                    <SelectItem value="Educação / EAD">Educação / EAD</SelectItem>
                    <SelectItem value="Inovação & IA">Inovação & IA</SelectItem>
                    <SelectItem value="Outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Status</Label>
                <Select value={form.status} onValueChange={(v: StatusProduto) => setForm({ ...form, status: v })}>
                  <SelectTrigger className="text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Em Desenvolvimento">Em Desenvolvimento</SelectItem>
                    <SelectItem value="Em Implantação">Em Implantação</SelectItem>
                    <SelectItem value="Manutenção">Manutenção</SelectItem>
                    <SelectItem value="Descontinuado">Descontinuado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Versão Atual</Label>
                <Input
                  value={form.versaoAtual}
                  onChange={(e) => setForm({ ...form, versaoAtual: e.target.value })}
                  className="text-xs"
                  placeholder="v1.0.0"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Descrição Breve (catálogo)</Label>
              <Input
                value={form.descricaoBreve}
                onChange={(e) => setForm({ ...form, descricaoBreve: e.target.value })}
                className="text-xs"
                placeholder="Proposta de valor em uma frase..."
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs font-semibold">Descrição Completa</Label>
              <Textarea
                rows={3}
                value={form.descricaoCompleta}
                onChange={(e) => setForm({ ...form, descricaoCompleta: e.target.value })}
                className="text-xs resize-none"
                placeholder="Detalhamento do escopo, arquitetura e público-alvo..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Responsável Principal (PO/PM)</Label>
                <Input
                  value={form.responsavelPrincipal}
                  onChange={(e) => setForm({ ...form, responsavelPrincipal: e.target.value })}
                  className="text-xs"
                  placeholder="Ex: Carlos Andrade (Head of Product)"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold">Data de Lançamento</Label>
                <Input
                  type="date"
                  value={form.dataLancamento}
                  onChange={(e) => setForm({ ...form, dataLancamento: e.target.value })}
                  className="text-xs"
                />
              </div>
            </div>
          </div>

          {/* ── SEÇÃO DE LINKS ── */}
          <div className="space-y-3 p-4 rounded-xl bg-muted/20 border border-border">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Links & Repositórios</span>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-semibold flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Site Oficial
                </Label>
                <Input
                  value={form.siteOficial}
                  onChange={(e) => setForm({ ...form, siteOficial: e.target.value })}
                  className="text-xs"
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold flex items-center gap-1">
                  <GitBranch className="w-3 h-3" /> Repositório Git
                </Label>
                <Input
                  value={form.repositorioGit}
                  onChange={(e) => setForm({ ...form, repositorioGit: e.target.value })}
                  className="text-xs"
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-semibold flex items-center gap-1">
                  <FileText className="w-3 h-3" /> Documentação
                </Label>
                <Input
                  value={form.documentacaoUrl}
                  onChange={(e) => setForm({ ...form, documentacaoUrl: e.target.value })}
                  className="text-xs"
                  placeholder="https://docs...."
                />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2 flex-row gap-2 sm:justify-between items-center">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Badge variant="outline" className="text-[10px] font-mono">{produto.id}</Badge>
              <span>Última atualização: {new Date(produto.updatedAt).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" size="sm" className="gap-1.5 font-semibold">
                <Save className="h-4 w-4" /> Salvar Alterações
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
