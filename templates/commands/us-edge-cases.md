# /bob-us-edge-cases

## Descrição

Completa um `us.md` já existente (só happy path) perguntando
incansavelmente até não restar ambiguidade sobre o que o usuário pode
e não pode fazer — conforme `spec/21-us-e-cards.md`.

## Sintaxe

`/bob-us-edge-cases <slug-da-user-story>`

## Pré-condições

`.ai/specs/features/<slug>/us.md` já existente, com happy path
preenchido.

## Aciona

Atualização de `.ai/specs/features/<slug>/us.md`.

## Processo

1. Ler o `us.md` atual.
2. Perguntar ao usuário, uma área por vez, até esgotar ambiguidade:
   rotas, tipo de usuário quando indefinido/múltiplo, falha de rede,
   falha de backend, o que acontece ao tentar voltar, o que é
   obrigatório vs. opcional, e qualquer outra área que o agente julgar
   necessária para o domínio.
3. Incorporar as respostas como critérios de aceite e cenários BDD
   adicionais.
4. Gerar o preview em `us-edge-cases.temp.md`.
5. Aguardar aprovação explícita.

## Saída esperada

`.ai/specs/features/<slug>/us.md` atualizado, sem ambiguidade
conhecida, pronto para alimentar a Fase 2 via `/bob-us-plan`.
