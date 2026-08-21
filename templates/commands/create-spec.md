# /bob-create-spec

## Descrição

Cria uma nova especificação de feature em
`.ai/specs/features/<slug>/`, seguindo `spec/07-specs.md` e o fluxo de
SDD (`spec/17-sdd-workflow.md`).

## Sintaxe

`/bob-create-spec <nome-da-feature>`.

## Pré-condições

`.ai/` já existente, com `.ai/specs/` criado.

## Aciona

Criação de `.ai/specs/features/<slug>/spec.md` e
`.ai/specs/features/<slug>/tasks.md`, a partir de `templates/specs/spec.md`
e `templates/specs/tasks.md`, e o fluxo de fases descrito em
`spec/17-sdd-workflow.md` (User Story → descoberta → spec → tasks →
implementação, com gates de decisão).

## Processo

1. Seguir as fases e gates definidos em `spec/17-sdd-workflow.md`,
   incluindo a regra local-first-then-sync quando houver board
   (`spec/18-board-e-branch.md`).
2. Preencher `spec.md` com a seção "Handoff" obrigatória
   (`spec/07-specs.md`) no topo.
3. Gerar o preview em `create-spec.temp.md` antes de gravar os arquivos
   definitivos.
4. Aguardar aprovação explícita.

## Saída esperada

`.ai/specs/features/<slug>/spec.md` e `tasks.md` criados, prontos para a
fase de implementação.
