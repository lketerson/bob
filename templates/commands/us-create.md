# /bob-us-create

## Descrição

Cria o artefato `us.md` de uma User Story, cobrindo apenas o caminho
feliz — sem edge cases, sem detalhe técnico. Formaliza a Fase 1
(Descoberta/Pesquisa) de `spec/17-sdd-workflow.md`, conforme
`spec/21-us-e-cards.md`.

## Sintaxe

`/bob-us-create <nome-da-user-story>`

## Pré-condições

`.ai/` já existente, com `.ai/specs/` criado. Time adotou o fluxo de
US/Cards (`spec/21-us-e-cards.md`).

## Aciona

Criação de `.ai/specs/features/<slug>/us.md`, a partir de
`templates/specs/us.md`.

## Processo

1. Inspecionar o sistema de rastreamento de trabalho (via CLI/MCP,
   quando disponível) e o código relevante, igual à Fase 1 de
   `spec/17-sdd-workflow.md`.
2. Preencher `us.md` só com o caminho feliz: Job Story, critério de
   aceite mínimo, um cenário BDD de sucesso.
3. Gerar o preview em `us-create.temp.md`.
4. Aguardar aprovação explícita.

## Saída esperada

`.ai/specs/features/<slug>/us.md` criado, com happy path definido e
pronto para `/bob-us-edge-cases`.
