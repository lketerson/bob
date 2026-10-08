---
description: Cria ou revisa interface usando o design system e os componentes existentes, sem cara de IA.
---

# /bob-frontend

## Descrição

Aciona diretamente o agente Frontend — especialista em UI que parte do
design system e dos componentes já existentes no projeto, evita "AI
slop" e usa (ou propõe instalar) as skills de design `taste-skill` e
`ui-ux-pro-max`.

## Sintaxe

`/bob-frontend <tarefa de interface>` — ex.: `/bob-frontend criar a
tela de configurações do perfil`.

## Pré-condições

`.ai/` já existente, com `.ai/agents/frontend.md` criado (agente
opcional — `spec/16-bootstrap-interativo.md`, Passo 3).

## Aciona

Agente Frontend (`spec/05-agentes.md`,
`templates/agents/frontend.md`), diretamente — fora da orquestração do
Techlead.

## Processo

Segue o processo definido em `.ai/agents/frontend.md`, aplicado à
tarefa informada: descobrir o design system, verificar as skills de
design, procurar componentes existentes, implementar, revisar contra o
checklist anti-slop e verificar visualmente quando possível.

## Saída esperada

UI implementada ou revisada sobre o design system do projeto, com o
resumo do que foi reaproveitado vs. criado, se houve verificação visual,
e as decisões candidatas a ADR.
