# /bob-architect

## Descrição

Aciona diretamente o agente Architect — para entender requisitos,
avaliar impacto arquitetural e alternativas, e produzir um plano de
implementação, sem implementar código.

## Sintaxe

`/bob-architect <pergunta ou decisão a avaliar>`.

## Pré-condições

`.ai/` já existente, com `.ai/agents/architect.md` criado.

## Aciona

Agente Architect (`spec/05-agentes.md`), diretamente — fora da
orquestração do Techlead.

## Processo

Segue o processo definido em `.ai/agents/architect.md`, aplicado à
pergunta/decisão informada.

## Saída esperada

Um plano de implementação ou uma avaliação de alternativas/riscos —
nunca código implementado (a menos que explicitamente solicitado).
