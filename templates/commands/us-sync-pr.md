---
description: Abre o PR que junta várias entregas da User Story.
---

# /bob-us-sync-pr

## Descrição

Cria o PR de sync que agrega múltiplas entregas (US/epics) já
integradas e aprovadas, para produção/homologação em conjunto —
`18-board-e-branch.md`, seção "Branch de sync de múltiplas entregas
(opcional)".

## Sintaxe

`/bob-us-sync-pr <destino> <lista de entregas>`

## Pré-condições

Cada entrega listada já tem sua própria branch de integração
(`us/<id>-<slug>` ou `epic/<id>-<slug>`) com todos os PRs de card
aprovados.

## Aciona

Criação da branch `sync/<destino>-<slug>` a partir do destino
atualizado, pull das branches das entregas listadas, e abertura do PR
de sync via CLI/MCP.

## Processo

1. Confirmar com o usuário quais entregas entram no sync e o destino
   (padrão: release/main/prod).
2. Criar `sync/<destino>-<slug>`, puxar as branches das entregas.
3. Rodar os testes antes do push. Conflito de merge fica com o
   usuário.
4. Montar o corpo do PR listando cada entrega e os PRs aprovados que
   a compõem (ver exemplo em `spec/21-us-e-cards.md`).
5. Abrir como draft; perguntar reviewer.

## Saída esperada

PR de sync aberto em draft, com a branch `sync/<destino>-<slug>`
publicada e o corpo listando entregas/PRs de origem.
