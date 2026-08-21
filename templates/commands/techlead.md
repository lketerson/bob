# /bob-techlead

## Descrição

Aciona o Techlead — ponto de entrada padrão para uma demanda de
engenharia não trivial. Analisa a demanda, decompõe por área, aciona os
agentes especializados apropriados, e sempre termina acionando o
Reviewer.

## Sintaxe

`/bob-techlead <demanda>` — descreva a feature, bugfix ou refactor
desejado.

## Pré-condições

`.ai/` já existente, com os agentes especializados necessários já
criados.

## Aciona

Agente Techlead (`spec/05-agentes.md`), que por sua vez aciona os demais
agentes conforme a demanda (`spec/11-adaptadores.md`, "Suporte a
multiagentes").

## Processo

Segue `.ai/workflows/feature.md`, `bugfix.md` ou `refactor.md` (conforme
a natureza da demanda), com o Techlead decompondo por área, delegando a
cada agente apropriado, e acionando o Reviewer ao final.

## Saída esperada

A demanda implementada e revisada, com um resumo consolidado do trabalho
por área.
