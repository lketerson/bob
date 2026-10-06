---
description: Faz uma revisão consultiva de um PR.
---

# /bob-us-pr-review

## Descrição

Revisão consultiva de um PR já aberto, sobre o papel `reviewer`
(`05-agentes.md`) — nunca sobre skill de outro plugin/monorepo. Ao
encontrar um problema relevante, entrega uma US descrevendo como o
erro ocorre.

## Sintaxe

`/bob-us-pr-review <pr-id | link-do-pr>`

## Pré-condições

PR aberto e acessível via CLI/MCP.

## Aciona

Revisão seguindo `18-board-e-branch.md`, seção "Revisão": comenta só
achados de severidade Crítica/Alta; decisão sempre consultiva; nunca
aprova nem faz merge.

## Processo

1. Ler o diff e o contexto do PR (descrição, task/card de origem).
2. Levantar achados por severidade.
3. Para achados Crítica/Alta, comentar no PR.
4. Se o achado for grande o suficiente para virar trabalho rastreável
   por si só, gerar uma US (`templates/specs/us.md`) descrevendo como
   o erro ocorre, em vez de só um comentário solto.

## Saída esperada

Comentários de review postados (quando aplicável) e, se necessário,
uma US nova documentando o erro encontrado. Nenhuma aprovação/merge
realizada pelo agente.
