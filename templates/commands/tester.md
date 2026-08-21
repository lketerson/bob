# /bob-tester

## Descrição

Aciona diretamente o agente Tester para projetar estratégia de testes,
casos de teste e casos extremos para uma área específica.

## Sintaxe

`/bob-tester <área ou funcionalidade>`.

## Pré-condições

`.ai/` já existente, com `.ai/agents/tester.md` criado.

## Aciona

Agente Tester (`spec/05-agentes.md`), diretamente.

## Processo

Segue o processo definido em `.ai/agents/tester.md`, permanecendo
agnóstico ao framework de testes do projeto (`conventions.md`/
`testing.md`).

## Saída esperada

Casos de teste (e, quando solicitado, os testes implementados) cobrindo
o comportamento esperado e casos extremos relevantes.
