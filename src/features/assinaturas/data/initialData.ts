import { DocumentoAssinatura, ModeloDocumento, CertificadoDigital } from '../types';

export const INITIAL_DOCUMENTOS_ASSINATURA: DocumentoAssinatura[] = [
  {
    id: 'doc-sign-1',
    codigoValidacao: 'FS-2026-9041',
    titulo: 'Contrato de Prestação de Serviços Tecnológicos - TechCorp',
    descricao: 'Contrato comercial anual de desenvolvimento de software e infraestrutura em nuvem.',
    categoria: 'Contrato Comercial',
    tamanhoKb: 1420,
    dataCriacao: '2026-07-20T10:30:00.000Z',
    dataValidade: '2026-08-05T23:59:59.000Z',
    status: 'Aguardando Assinatura',
    tipoAssinaturaExigida: 'Gov.br (Avançada)',
    hashSHA256Original: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    moduloOrigem: 'Contratos',
    referenciaOrigemId: 'cnt-101',
    assinantes: [
      {
        id: 'ass-1',
        nome: 'Adriano Leal',
        email: 'adriano.leal@focustecnologia.com.br',
        cpf: '344.592.108-90',
        papel: 'Assinante',
        status: 'Assinado',
        ordem: 1,
        dataAssinatura: '2026-07-21T14:22:10.000Z',
        metodoUtilizado: 'Gov.br (Avançada)',
        nivelGovBr: 'Ouro',
        ip: '187.62.190.12',
        dispositivo: 'Chrome - Windows 11'
      },
      {
        id: 'ass-2',
        nome: 'Carlos Eduardo Oliveira',
        email: 'carlos.oliveira@techcorp.com.br',
        cpf: '129.840.402-44',
        papel: 'Assinante',
        status: 'Pendente',
        ordem: 2
      }
    ],
    auditoria: [
      {
        id: 'aud-1',
        dataHora: '2026-07-20T10:30:00.000Z',
        evento: 'Documento Criado',
        ator: 'Adriano Leal',
        emailAtor: 'adriano.leal@focustecnologia.com.br',
        ip: '187.62.190.12',
        dispositivo: 'Chrome - Windows 11',
        metodoAutenticacao: 'Sessão Ativa Focus',
        hashSHA256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        detalhes: 'Documento original carregado e registrado no cofre de hashes.'
      },
      {
        id: 'aud-2',
        dataHora: '2026-07-21T14:22:10.000Z',
        evento: 'Assinatura Registrada (Gov.br)',
        ator: 'Adriano Leal',
        emailAtor: 'adriano.leal@focustecnologia.com.br',
        ip: '187.62.190.12',
        dispositivo: 'Chrome - Windows 11',
        metodoAutenticacao: 'OAuth Gov.br (Nível Ouro)',
        hashSHA256: '4f8a29c1b3d5e7f9a2b4c6d8e0f1a3b5c7d9e1f3a5b7c9d1e3f5a7b9c1d3e5f7',
        detalhes: 'Assinatura digital avançada validada pelo serviço oficial de identidade Gov.br.'
      }
    ]
  },
  {
    id: 'doc-sign-2',
    codigoValidacao: 'FS-2026-4412',
    titulo: 'Termo de Admissão e Confidencialidade (NDA) - Mariana Costa',
    descricao: 'Termo individual de adesão às políticas de segurança e confidencialidade da empresa.',
    categoria: 'Admissão RH',
    tamanhoKb: 850,
    dataCriacao: '2026-07-22T09:15:00.000Z',
    status: 'Assinado',
    tipoAssinaturaExigida: 'Eletrônica Simples',
    hashSHA256Original: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    hashSHA256Assinado: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
    carimboTempo: '2026-07-22T11:04:30.000Z',
    moduloOrigem: 'RH',
    referenciaOrigemId: 'colab-104',
    assinantes: [
      {
        id: 'ass-3',
        nome: 'Mariana Costa',
        email: 'mariana.costa@focustecnologia.com.br',
        cpf: '210.984.711-05',
        papel: 'Assinante',
        status: 'Assinado',
        ordem: 1,
        dataAssinatura: '2026-07-22T11:04:30.000Z',
        metodoUtilizado: 'Eletrônica Simples',
        ip: '177.102.44.89',
        dispositivo: 'Safari - Mobile iOS'
      }
    ],
    auditoria: [
      {
        id: 'aud-3',
        dataHora: '2026-07-22T09:15:00.000Z',
        evento: 'Documento Criado',
        ator: 'RH Sistema',
        emailAtor: 'rh@focustecnologia.com.br',
        ip: '127.0.0.1',
        dispositivo: 'Automação RH',
        metodoAutenticacao: 'Integrador Interno',
        hashSHA256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
        detalhes: 'Documento gerado automaticamente pelo fluxo de admissão RH.'
      },
      {
        id: 'aud-4',
        dataHora: '2026-07-22T11:04:30.000Z',
        evento: 'Documento Assinado',
        ator: 'Mariana Costa',
        emailAtor: 'mariana.costa@focustecnologia.com.br',
        ip: '177.102.44.89',
        dispositivo: 'Safari - Mobile iOS',
        metodoAutenticacao: 'Token por E-mail + Assinatura na Tela',
        hashSHA256: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
        detalhes: 'Assinatura efetuada via aplicativo mobile com confirmação de token de 6 dígitos.'
      }
    ]
  },
  {
    id: 'doc-sign-3',
    codigoValidacao: 'FS-2026-7721',
    titulo: 'Proposta Comercial de Licenciamento ERP - Grupo Soluções',
    descricao: 'Proposta de fornecimento do ecossistema Focus Finance com 50 licenças corporativas.',
    categoria: 'Proposta CRM',
    tamanhoKb: 2150,
    dataCriacao: '2026-07-23T15:00:00.000Z',
    dataValidade: '2026-08-01T23:59:59.000Z',
    status: 'Pendente',
    tipoAssinaturaExigida: 'ICP-Brasil (Qualificada A1/A3)',
    hashSHA256Original: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    moduloOrigem: 'CRM',
    assinantes: [
      {
        id: 'ass-4',
        nome: 'Roberto Mendes',
        email: 'roberto@gruposolucoes.com.br',
        cpf: '098.344.221-12',
        papel: 'Assinante',
        status: 'Pendente',
        ordem: 1
      }
    ],
    auditoria: [
      {
        id: 'aud-5',
        dataHora: '2026-07-23T15:00:00.000Z',
        evento: 'Proposta Enviada para Assinatura',
        ator: 'Comercial Ops',
        emailAtor: 'comercial@focustecnologia.com.br',
        ip: '187.62.190.12',
        dispositivo: 'Chrome - Windows 11',
        metodoAutenticacao: 'Focus IAM',
        hashSHA256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
        detalhes: 'Proposta emitida com exigência de certificado qualificado ICP-Brasil A1/A3.'
      }
    ]
  }
];

export const INITIAL_MODELOS_DOCUMENTOS: ModeloDocumento[] = [
  {
    id: 'mod-1',
    titulo: 'NDA - Acordo de Não Divulgação Padrão',
    categoria: 'Jurídico',
    descricao: 'Modelo padrão para proteção de dados confidenciais em negociações bilaterais.',
    camposVariaveis: ['NOME_PARTNER', 'CNPJ_PARTNER', 'FORO_ELEITO', 'VALIDADE_ANOS'],
    criadoEm: '2026-05-10T10:00:00.000Z',
    usadoVezes: 34
  },
  {
    id: 'mod-2',
    titulo: 'Contrato de Admissão de Colaborador (CLT)',
    categoria: 'RH',
    descricao: 'Minuta de trabalho individual com cláusula de LGPD e autorização de imagem.',
    camposVariaveis: ['NOME_COLABORADOR', 'CPF_COLABORADOR', 'CARGO', 'SALARIO', 'DATA_INICIO'],
    criadoEm: '2026-06-01T14:30:00.000Z',
    usadoVezes: 89
  },
  {
    id: 'mod-3',
    titulo: 'Proposta Comercial de Serviços Financeiros',
    categoria: 'Comercial',
    descricao: 'Modelo corporativo com estimativa de horas, escopo e termos de pagamento.',
    camposVariaveis: ['RAZAO_SOCIAL', 'VALOR_TOTAL', 'CONDIÇÕES_PAGAMENTO'],
    criadoEm: '2026-06-15T09:00:00.000Z',
    usadoVezes: 112
  }
];

export const INITIAL_CERTIFICADOS: CertificadoDigital[] = [
  {
    id: 'cert-1',
    titular: 'FOCUS TECNOLOGIA DA INFORMACAO LTDA',
    cpfCnpj: '48.912.834/0001-99',
    emissor: 'AC SERPRO RFB v5 (ICP-Brasil)',
    tipo: 'A1 (Arquivo)',
    validade: '2027-04-15',
    status: 'Ativo',
    serialNumber: '7B:44:90:A1:FE:22:98:C0'
  },
  {
    id: 'cert-2',
    titular: 'ADRIANO LEAL DE OLIVEIRA',
    cpfCnpj: '344.592.108-90',
    emissor: 'Gov.br Provedor de Identidade Federal',
    tipo: 'Gov.br Cloud',
    validade: '2028-12-31',
    status: 'Ativo',
    serialNumber: 'GBR-2026-OURO-3891'
  }
];
