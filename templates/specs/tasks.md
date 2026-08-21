# Tasks: <Nome da Feature>

> **Spec de origem:** <!-- caminho para spec.md -->
> **Última atualização:** <!-- AAAA-MM-DD -->

## Plano de Execução

<!--
Fases de execução e a dependência entre elas, ex.: T1 -> T2 -> T4,
T3 -> T4 (T4 depende de T2 e T3).
-->

## Detalhamento de Tarefas

<!--
Uma subseção por tarefa. Preencha todos os campos — "Arquivos relevantes"
e "Critérios de aceite" são específicos DESTA tarefa, não apenas os da
spec inteira.

Título da tarefa: sempre no formato "[TIPO] descrição curta", ex.:
"[FRONT] Adicionar botão à tela de login". TIPO é uma tag curta de
área/camada (ex.: FRONT, BACK, INFRA, DB) — o vocabulário exato de tags
fica a critério do projeto, não é uma lista fechada.
-->

### T<N>. [TIPO] <Título da tarefa>

* **O que:**
* **Onde:** <!-- diretório/módulo principal -->
* **Arquivos relevantes:** <!-- arquivos que esta tarefa provavelmente vai tocar ou precisa conhecer -->
* **Critérios de aceite:** <!-- específicos desta tarefa -->
* **Depende de:** <!-- T<N> ou "nenhuma" -->
* **Reaproveita:** <!-- código/abstração existente a reaproveitar -->
* **Requisito:** <!-- ID da User Story em spec.md -->
* **Concluído quando:**
  - [ ]
* **Testes:** <!-- títulos no formato "DEVE <comportamento esperado> QUANDO <condição/cenário>" -->
* **Gate:** <!-- o que precisa passar antes de considerar concluída (lint, testes, revisão) -->
* **Branch:** <!-- preenchido ao iniciar a implementação, quando o projeto usa branch dedicada (18-board-e-branch.md) -->
* **PR/Commit(s):** <!-- preenchido ao final da implementação — link do PR ou hash(es) do(s) commit(s) que a implementaram, mesmo sem PR -->

## Mapa de Execução Paralela

<!-- Quais tarefas podem rodar em paralelo (sem dependência entre si). -->

## Verificação Cruzada Diagrama-Definição

<!-- Confirma que as dependências declaradas em cada tarefa batem com a ordem do Plano de Execução. -->

## Validação de Co-localização de Testes

<!-- Para cada tipo de mudança nas tarefas acima, confirma que o tipo de teste exigido em `.ai/context/testing.md`/`instructions/testing.md` foi contemplado. -->
