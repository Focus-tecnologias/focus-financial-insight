-- ==============================================================================
-- SCRIPT DE CRIAÇÃO DA TABELA PRINCIPAL DO FOCUS FINANCIAL INSIGHT (SUPABASE)
-- Execute este script no SQL Editor do seu projeto no Supabase
-- ==============================================================================

-- 1. Criar a tabela unificada para armazenar o estado das entidades (Document Store JSONB)
CREATE TABLE IF NOT EXISTS focus_app_state (
    table_name TEXT NOT NULL,
    id TEXT NOT NULL,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (table_name, id)
);

-- 2. Criar índice para agilizar buscas por entidade (table_name)
CREATE INDEX IF NOT EXISTS idx_focus_app_state_table ON focus_app_state(table_name);

-- 3. Habilitar a Segurança a Nível de Linha (Row Level Security - RLS)
ALTER TABLE focus_app_state ENABLE ROW LEVEL SECURITY;

-- 4. Criar políticas para permitir leitura e escrita anônima/pública (chave Anon)
DROP POLICY IF EXISTS "Permitir leitura pública em focus_app_state" ON focus_app_state;
CREATE POLICY "Permitir leitura pública em focus_app_state" ON focus_app_state
    FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Permitir escrita pública em focus_app_state" ON focus_app_state;
CREATE POLICY "Permitir escrita pública em focus_app_state" ON focus_app_state
    FOR ALL
    USING (true)
    WITH CHECK (true);
