# /bob-map-codebase

## Descrição

Aciona o agente Mapper para realizar (ou atualizar) o mapeamento
profundo do codebase real, produzindo/atualizando os 9 documentos de
`.ai/context/`.

## Sintaxe

`/bob-map-codebase [escopo opcional]` — sem argumento, mapeia o
repositório inteiro; com um caminho, restringe o mapeamento a essa área
(mapeamento incremental/parcial).

## Pré-condições

`.ai/` já existente, com `.ai/agents/mapper.md` e
`.ai/workflows/map-codebase.md` criados.

## Aciona

Agente Mapper (`spec/05-agentes.md`) e workflow de mapeamento
(`spec/08-workflows.md`, processo detalhado em
`spec/10-mapeamento-profundo.md`).

## Processo

Segue integralmente o processo descrito em
`.ai/workflows/map-codebase.md` (copiado de
`templates/workflows/map-codebase.md`) — detecção de contexto existente,
decisão entre mapeamento completo ou incremental, exploração por
evidência, escrita/atualização de cada documento de contexto, registro
da referência de mapeamento, e relatório de drift/lacunas encontradas.

## Saída esperada

Documentos de `.ai/context/` criados ou atualizados, com referência de
mapeamento (data/commit) registrada, e um relatório de drift/lacunas
apresentado ao dev ao final. Não requer preview em `[slug].temp.md` — o
próprio relatório final cumpre esse papel de revisão.
