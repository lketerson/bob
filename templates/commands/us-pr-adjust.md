---
description: Aplica os ajustes pedidos na revisão de um PR.
---

# /bob-us-pr-adjust

## Descrição

Implementa o ajuste de um PR a partir dos achados de
`/bob-us-pr-review` ou de comentários já existentes — sobre o papel
`developer` (`05-agentes.md`).

## Sintaxe

`/bob-us-pr-adjust <pr-id | link-do-pr>`

## Pré-condições

PR aberto com achados/comentários pendentes.

## Aciona

Implementação de código no PR alvo.

## Processo

1. Ler todos os comentários/achados abertos e transformá-los num
   plano único de ajuste.
2. Implementar após confirmação do plano com o usuário.
3. Rodar teste unitário/build/lint diretamente (baixo risco).
4. Responder cada thread endereçada e marcar com o status adequado.

## Saída esperada

PR ajustado, comentários respondidos, testes/lint/build passando. Não
requer preview — é implementação de código, mesma natureza de
`/bob-developer`.
