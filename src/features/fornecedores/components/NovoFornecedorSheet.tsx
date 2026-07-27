import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useLocalStorageState } from '@/hooks/useDataStore';
import { Fornecedor } from '../types';

export function NovoFornecedorSheet({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [documento, setDocumento] = useState('');
  const [categoria, setCategoria] = useState('Serviços');
  const [cidade, setCidade] = useState('');

  const { addItem } = useLocalStorageState<Fornecedor>('focus_fornecedores');

  const handleSave = () => {
    if (!razaoSocial && !nomeFantasia) {
      toast.error("Por favor, preencha o Nome Fantasia ou Razão Social.");
      return;
    }
    if (!documento || documento.trim() === '') {
      toast.error("O CNPJ/CPF é obrigatório!");
      return;
    }
    if (!categoria || categoria.trim() === '') {
      toast.error("A Categoria é obrigatória!");
      return;
    }

    const novoFornecedor: Fornecedor = {
      id: `forn-${Date.now()}`,
      codigo: `F-${Math.floor(100 + Math.random() * 900)}`,
      tipo: 'Pessoa Jurídica',
      razaoSocial: razaoSocial || nomeFantasia,
      nomeFantasia: nomeFantasia || razaoSocial,
      documento: documento || '00.000.000/0001-00',
      categoria: categoria || 'Geral',
      segmento: 'Tecnologia',
      porte: 'Médio',
      status: 'Ativo',
      contatos: [
        {
          id: `c-${Date.now()}`,
          nome: 'Contato Principal',
          celular: '(11) 99999-9999',
          whatsapp: true,
          email: 'contato@fornecedor.com',
          principal: true
        }
      ],
      endereco: {
        cep: '00000-000',
        logradouro: 'Rua Principal',
        numero: '100',
        bairro: 'Centro',
        cidade: cidade || 'São Paulo',
        estado: 'SP',
        pais: 'Brasil'
      },
      dadosBancarios: [],
      totalContratado: 0,
      totalPago: 0,
      saldoAberto: 0,
      dataCadastro: new Date().toISOString(),
      ultimaAtualizacao: new Date().toISOString()
    };

    addItem(novoFornecedor);
    toast.success("Fornecedor cadastrado com sucesso!");
    setOpen(false);
    setRazaoSocial('');
    setNomeFantasia('');
    setDocumento('');
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children || (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Fornecedor
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Cadastro de Fornecedor</SheetTitle>
          <SheetDescription>
            Insira os dados principais do novo fornecedor.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome Fantasia *</Label>
            <Input placeholder="Ex: AWS Brasil" value={nomeFantasia} onChange={e => setNomeFantasia(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Razão Social</Label>
            <Input placeholder="Ex: Amazon Web Services Ltda" value={razaoSocial} onChange={e => setRazaoSocial(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>CNPJ / CPF</Label>
            <Input placeholder="00.000.000/0001-00" value={documento} onChange={e => setDocumento(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Input placeholder="Ex: Cloud, TI, Infraestrutura" value={categoria} onChange={e => setCategoria(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Cidade / UF</Label>
            <Input placeholder="Ex: São Paulo" value={cidade} onChange={e => setCidade(e.target.value)} />
          </div>
        </div>

        <SheetFooter className="mt-8">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar Fornecedor</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
