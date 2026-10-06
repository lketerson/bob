---
description: Gera a spec técnica a partir da User Story aprovada.
---

# /bob-us-plan

## Descrição

Produz `spec.md` (Fase 2 — Spec, de `spec/17-sdd-workflow.md`) a
partir do `us.md` já aprovado, obtendo contexto adicional da
aplicação e, quando necessário, perguntando interativamente ao
usuário — conforme `spec/21-us-e-cards.md`.

## Sintaxe

`/bob-us-plan <slug-da-user-story>`

## Pré-condições

`.ai/specs/features/<slug>/us.md` aprovado (happy path + edge cases).

## Aciona

Criação/atualização de `.ai/specs/features/<slug>/spec.md`, a partir
de `templates/specs/spec.md` e do conteúdo de `us.md`.

## Processo

1. Seguir a Fase 2 de `spec/17-sdd-workflow.md` (gates de decisão de
   negócio e técnica incluídos), usando `us.md` como insumo em vez de
   partir do zero.
2. Buscar contexto técnico relevante no código e em `.ai/context/`;
   perguntar ao usuário quando a informação não estiver disponível.
3. Preencher a seção "Handoff" no topo de `spec.md`
   (`spec/07-specs.md`).
4. Gerar o preview em `us-plan.temp.md`.
5. Aguardar aprovação explícita.

## Saída esperada

`.ai/specs/features/<slug>/spec.md` criado, pronto para
`/bob-us-to-task`.
