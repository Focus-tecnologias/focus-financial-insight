import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, User, Globe, Phone, Mail, Linkedin } from 'lucide-react';
import { useCrmStore } from '../hooks/useCrmStore';

export function EmpresasContatosView() {
  const { empresas, contatos } = useCrmStore();

  return (
    <div className="space-y-6 animate-fade-in pt-2">
      {/* CADASTRO DE EMPRESAS */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" /> Cadastro B2B de Empresas (ClickUp Synced)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden bg-card text-xs">
            <table className="w-full">
              <thead className="bg-muted/50 border-b text-left">
                <tr>
                  <th className="p-3">Razão Social / Nome Fantasia</th>
                  <th className="p-3">CNPJ</th>
                  <th className="p-3">Segmento</th>
                  <th className="p-3">Localização</th>
                  <th className="p-3">Website</th>
                  <th className="p-3 text-right">Responsável</th>
                </tr>
              </thead>
              <tbody>
                {empresas.map(emp => (
                  <tr key={emp.id} className="border-b hover:bg-muted/30">
                    <td className="p-3">
                      <div className="font-semibold text-primary">{emp.razaoSocial}</div>
                      <div className="text-[10px] text-muted-foreground">{emp.nomeFantasia}</div>
                    </td>
                    <td className="p-3 font-mono text-muted-foreground">{emp.cnpj}</td>
                    <td className="p-3"><Badge variant="outline">{emp.segmento}</Badge></td>
                    <td className="p-3 text-muted-foreground">{emp.cidade} / {emp.estado}</td>
                    <td className="p-3">
                      <a href={emp.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                        <Globe className="w-3 h-3" /> Website
                      </a>
                    </td>
                    <td className="p-3 text-right font-medium">{emp.responsavel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* DIRETÓRIO DE CONTATOS DECISORES */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-5 h-5 text-purple-500" /> Diretório de Decisores & Contatos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden bg-card text-xs">
            <table className="w-full">
              <thead className="bg-muted/50 border-b text-left">
                <tr>
                  <th className="p-3">Nome / Cargo</th>
                  <th className="p-3">Empresa Vinculada</th>
                  <th className="p-3">E-mail</th>
                  <th className="p-3">Telefone / WhatsApp</th>
                  <th className="p-3 text-right">LinkedIn</th>
                </tr>
              </thead>
              <tbody>
                {contatos.map(cnt => (
                  <tr key={cnt.id} className="border-b hover:bg-muted/30">
                    <td className="p-3">
                      <div className="font-semibold text-primary">{cnt.nome}</div>
                      <div className="text-[10px] text-muted-foreground">{cnt.cargo}</div>
                    </td>
                    <td className="p-3 font-medium text-foreground">{cnt.empresa}</td>
                    <td className="p-3 text-muted-foreground">{cnt.email}</td>
                    <td className="p-3 font-mono">{cnt.telefone}</td>
                    <td className="p-3 text-right">
                      {cnt.linkedin && (
                        <a href={`https://${cnt.linkedin}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 justify-end">
                          <Linkedin className="w-3 h-3" /> Perfil
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
