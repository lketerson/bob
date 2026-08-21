# /bob-reviewer

## Descrição

Aciona diretamente o agente Reviewer para revisar uma mudança já
implementada, fora da orquestração completa do Techlead.

## Sintaxe

`/bob-reviewer [escopo opcional]` — sem argumento, revisa as mudanças
pendentes/não commitadas; com um caminho ou referência, restringe a
revisão.

## Pré-condições

`.ai/` já existente, com `.ai/agents/reviewer.md` criado.

## Aciona

Agente Reviewer (`spec/05-agentes.md`), diretamente.

## Processo

Segue `.ai/workflows/code-review.md`, incluindo a etapa de segurança
conduzida pelo agente Security (`08-workflows.md`).

## Saída esperada

Um relatório de achados priorizado por severidade — nenhuma correção é
aplicada automaticamente.
