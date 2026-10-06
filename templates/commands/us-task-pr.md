---
description: Abre o PR de uma task/card para a branch da User Story.
---

# /bob-us-task-pr

## Descrição

Abre o PR de uma task/card já implementada, em modo draft quando
possível, com destino à branch de integração da US.

## Sintaxe

`/bob-us-task-pr <task-id>`

## Pré-condições

Task implementada (`/bob-us-task-implement` concluído). Branch de
integração da US (`us/<id>-<slug>`) já existente — ver
`18-board-e-branch.md`, seção "Branch de sync (epic ou US,
opcional)"; se ainda não existir, criá-la a partir da branch principal
antes do primeiro PR de card daquela US.

## Aciona

Abertura de PR via CLI/MCP (ordem de preferência em
`16-bootstrap-interativo.md`, Passo 5), seguindo
`18-board-e-branch.md`, seção "Pull Request".

## Processo

1. Rodar os gates do Passo 1 de `templates/workflows/pull-request.md`.
2. Preencher a descrição do PR.
3. Abrir como draft, com destino à branch `us/<id>-<slug>`.
4. Perguntar ao usuário quem deve revisar.

## Saída esperada

PR de card aberto em draft, com destino correto, aguardando review
humano. Não requer preview — segue os gates já existentes de
`18-board-e-branch.md`.
