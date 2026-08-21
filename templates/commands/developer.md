# /bob-developer

## Descrição

Aciona diretamente o agente Developer para implementar uma tarefa
pontual, fora da orquestração completa do Techlead.

## Sintaxe

`/bob-developer <tarefa>`.

## Pré-condições

`.ai/` já existente, com `.ai/agents/developer.md` criado.

## Aciona

Agente Developer (`spec/05-agentes.md`), diretamente.

## Processo

Segue o processo definido em `.ai/agents/developer.md`: inspecionar
código existente, reutilizar abstrações (incluindo a skill `ponytail`,
quando instalada), implementar, testar, validar.

## Saída esperada

A tarefa implementada, com testes escritos/atualizados quando aplicável.
