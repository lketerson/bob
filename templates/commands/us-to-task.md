# /bob-us-to-task

## Descrição

Quebra a spec aprovada em cards (tasks), priorizando paralelização e
minimizando dependência entre eles — Fase 3 de
`spec/17-sdd-workflow.md`, com os campos enriquecidos de
`spec/21-us-e-cards.md`.

## Sintaxe

`/bob-us-to-task <slug-da-user-story>`

## Pré-condições

`.ai/specs/features/<slug>/spec.md` aprovado.

## Aciona

Criação de `.ai/specs/features/<slug>/tasks.md`, a partir de
`templates/specs/tasks.md` (incluindo os campos opcionais de card).

## Processo

1. Seguir a Fase 3 de `spec/17-sdd-workflow.md` (formato de título
   `[TIPO] descrição`, formato de teste `DEVE... QUANDO...`).
2. Minimizar dependência entre cards; se uma task for grande demais,
   a primeira deve entregar base sólida para as demais.
3. Preencher os campos opcionais de card quando fizer sentido para a
   task (Exemplo de implementação, Contrato, Esforço/Risco,
   Referência à spec).
4. Gerar o preview em `us-to-task.temp.md`.
5. Aguardar aprovação explícita.

## Saída esperada

`.ai/specs/features/<slug>/tasks.md` criado, pronto para
`/bob-us-task-implement`.
