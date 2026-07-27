import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { UploadCloud, File, Plus, X } from 'lucide-react';
import { useDocumentosStore } from '../hooks/useDocumentosStore';
import { FormatoArquivo, ModuloOrigemDMS } from '../types';
import { toast } from 'sonner';

export function DmsUploadSheet({ children }: { children?: React.ReactNode }) {
  const { pastas, uploadDocument } = useDocumentosStore();
  const [open, setOpen] = useState(false);

  const [nome, setNome] = useState('');
  const [extensao, setExtensao] = useState<FormatoArquivo>('pdf');
  const [tamanhoMb, setTamanhoMb] = useState('1.5');
  const [pastaId, setPastaId] = useState<string>(pastas[0]?.id || 'p-fin');
  const [moduloOrigem, setModuloOrigem] = useState<ModuloOrigemDMS>('Financeiro');
  const [categoria, setCategoria] = useState('Comprovantes');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Financeiro', 'Corporativo']);
  const [urlConteudo, setUrlConteudo] = useState<string | undefined>(undefined);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const fileName = file.name;
    const fileExt = fileName.split('.').pop()?.toLowerCase() as FormatoArquivo || 'pdf';
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);

    setNome(fileName);
    setExtensao(fileExt);
    setTamanhoMb(sizeInMb);

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result) {
        setUrlConteudo(evt.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSave = () => {
    if (!nome) {
      toast.error('Informe o nome do documento.');
      return;
    }

    const mb = parseFloat(tamanhoMb) || 1.0;

    uploadDocument({
      nome: nome.includes('.') ? nome : `${nome}.${extensao}`,
      extensao,
      tamanho: `${mb.toFixed(1)} MB`,
      tamanhoBytes: Math.floor(mb * 1024 * 1024),
      pastaId,
      moduloOrigem,
      categoria,
      tags,
      urlConteudo
    });

    toast.success('Documento armazenado centralmente no DMS com sucesso!');
    setOpen(false);
    setNome('');
    setUrlConteudo(undefined);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {children && <SheetTrigger asChild>{children}</SheetTrigger>}
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-primary" /> Upload de Documento no DMS
          </SheetTitle>
          <SheetDescription>
            Armazene o arquivo na Central Unificada. Nenhum módulo duplica dados físicos.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 py-2 text-xs">
          <div className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center bg-muted/20 relative hover:bg-muted/40 transition-colors cursor-pointer group">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <UploadCloud className="w-10 h-10 text-primary opacity-60 group-hover:scale-110 transition-transform mb-2" />
            <p className="font-semibold text-sm">Clique ou Arraste o arquivo aqui</p>
            <p className="text-muted-foreground mt-0.5">Suporta PDF, DOCX, XLSX, XML, PNG, JPG, ZIP, MP4 e mais.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nomeDoc">Nome do Arquivo *</Label>
            <Input 
              id="nomeDoc" 
              placeholder="Ex: Contrato_Aluguel_2026.pdf" 
              value={nome} 
              onChange={e => setNome(e.target.value)} 
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Formato / Extensão</Label>
              <Select value={extensao} onValueChange={(v: any) => setExtensao(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                  <SelectItem value="docx">Word (.docx)</SelectItem>
                  <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                  <SelectItem value="xml">XML (.xml)</SelectItem>
                  <SelectItem value="png">Imagem PNG (.png)</SelectItem>
                  <SelectItem value="jpg">Imagem JPG (.jpg)</SelectItem>
                  <SelectItem value="zip">Arquivo ZIP (.zip)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Pasta de Destino</Label>
              <Select value={pastaId} onValueChange={setPastaId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {pastas.map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.caminhoCompleto}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Módulo de Origem</Label>
              <Select value={moduloOrigem} onValueChange={(v: any) => setModuloOrigem(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Financeiro">Financeiro</SelectItem>
                  <SelectItem value="Contratos">Contratos</SelectItem>
                  <SelectItem value="Clientes">Clientes</SelectItem>
                  <SelectItem value="Projetos">Projetos</SelectItem>
                  <SelectItem value="Fiscal">Fiscal</SelectItem>
                  <SelectItem value="RH">RH</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Categoria</Label>
              <Input 
                placeholder="Ex: Contratos, Boletos, XML" 
                value={categoria} 
                onChange={e => setCategoria(e.target.value)} 
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Etiquetas (Tags)</Label>
            <div className="flex gap-2">
              <Input 
                placeholder="Adicionar tag..." 
                value={tagInput} 
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" variant="outline" onClick={handleAddTag}>Adicionar</Button>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {tags.map(t => (
                <Badge key={t} variant="secondary" className="gap-1 text-[10px]">
                  #{t}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemoveTag(t)} />
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700 text-white">Upload para Central</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
