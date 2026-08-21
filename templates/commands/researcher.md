# /bob-researcher

## Descrição

Aciona diretamente o agente Researcher para investigar uma tecnologia,
comparar alternativas, ou validar uma suposição técnica.

## Sintaxe

`/bob-researcher <pergunta>`.

## Pré-condições

`.ai/` já existente, com `.ai/agents/researcher.md` criado.

## Aciona

Agente Researcher (`spec/05-agentes.md`), diretamente.

## Processo

Segue o processo definido em `.ai/agents/researcher.md`, distinguindo
fatos de suposições e citando evidência (documentação oficial,
benchmarks, etc.).

## Saída esperada

Um resumo de achados com recomendação (quando aplicável), citando
fontes.
