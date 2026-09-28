# /bob-us-task-implement

## Descrição

Implementa uma task/card específica de `tasks.md` — Fase 4 de
`spec/17-sdd-workflow.md`.

## Sintaxe

`/bob-us-task-implement <task-id | link-da-task>`

## Pré-condições

`.ai/specs/features/<slug>/tasks.md` existente, com a task
referenciada.

## Aciona

Implementação de código seguindo os papéis `developer`/`tester`/
`reviewer` (`05-agentes.md`) e a task especificada.

## Processo

1. Ler a task/card em `tasks.md` (escopo, critérios de aceite,
   dependências, contrato, testes).
2. Verificar pastas de lógica compartilhada antes de implementar
   (`spec/17-sdd-workflow.md`, Fase 4).
3. Implementar teste-primeiro.
4. Ao concluir, marcar o status da task e preencher os campos
   `Branch` e `PR/Commit(s)` em `tasks.md`.

## Saída esperada

Task implementada, testada, e `tasks.md` atualizado com o rastro da
implementação. Não requer preview — é implementação de código, mesma
natureza de `/bob-developer`.
