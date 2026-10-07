# Comandos do Framework

## O que é o AI Engineering Framework

Um conjunto de arquivos, canonicamente localizado em `.ai/`, que serve
como fonte única de verdade de engenharia para este projeto —
independente de qual ferramenta de IA está sendo usada. Ele organiza o
conhecimento em constituição (princípios imutáveis), instruções
(comportamento de engenharia), agentes (papéis), skills (conhecimento
especializado), specs (o que construir), workflows (como executar
tarefas comuns), comandos (como acionar tudo isso) e contexto
(conhecimento específico deste projeto). Ferramentas de IA específicas
(Claude, Copilot, etc.) recebem apenas adaptadores mínimos que apontam
de volta para `.ai/`, nunca cópias divergentes.

## Como usar

1. No primeiro uso neste projeto, digite `/bob-start`. Se `.ai/` ainda
   não existir, isso dispara o bootstrap interativo completo — o agente
   pergunta idioma, ferramentas de IA a configurar, board, guardrails, agentes, skills e MCPs antes de
   criar qualquer arquivo definitivo, sempre mostrando um preview em
   `start.temp.md` para aprovação antes de gravar. Se já existir um
   `.ai/` com estrutura diferente desta (criado por outra
   ferramenta/processo), `/bob-start` pergunta se você deseja
   reorganizá-lo para esta estrutura em vez de assumir isso
   silenciosamente.
2. Depois que `.ai/` existir (nesta estrutura), use `/bob-start` a
   qualquer momento para ver o estado atual do framework e esta mesma
   lista de comandos.
3. Para tarefas específicas, use o comando correspondente diretamente
   (ex.: `/bob-map-codebase` para atualizar o contexto do projeto,
   `/bob-create-spec` para começar uma feature nova).
4. Todo comando que cria ou altera arquivo (exceto `/bob-map-codebase` e
   `/bob-concerns`, que só produzem documentação e reportam um resumo ao
   final) mostra um preview em `[slug].temp.md` antes de gravar qualquer
   coisa — revise e aprove antes de continuar.

## Comandos disponíveis

| Comando | O que faz |
|---|---|
| `/bob-start` | Inicia o BoB: configura o .ai/ na primeira vez, ou mostra o estado atual e os comandos disponíveis. |
| `/bob-map-codebase` | Mapeia o repositório e atualiza o contexto do projeto em .ai/context/. |
| `/bob-concerns` | Audita o código em busca de violações de SOLID, duplicação e problemas de nomenclatura. |
| `/bob-create-agent` | Cria um novo papel de agente para o projeto. |
| `/bob-create-skill` | Cria uma skill nova, do zero, com conhecimento especializado do projeto. |
| `/bob-add-skill` | Instala uma skill pronta de um marketplace. |
| `/bob-add-mcp` | Configura um novo servidor MCP a partir de um link. |
| `/bob-create-spec` | Cria a especificação de uma nova feature (spec e tasks). |
| `/bob-validate` | Verifica se o .ai/ está completo e consistente, sem alterar nada. |
| `/bob-update` | Atualiza o BoB e aplica as novas regras neste repositório. |
| `/bob-adr` | Registra uma decisão técnica como ADR, a partir de uma instrução ou de perguntas. |
| `/bob-onboarding` (opcional) | Guia um novo dev pelo repositório com um roteiro de estudo. |
| `/bob-onboarding-abort` (opcional) | Interrompe e limpa o onboarding a qualquer momento. |

`/bob-onboarding` e `/bob-onboarding-abort` só existem se o agente
Onboarding foi aprovado durante o bootstrap.

## Comandos de agente

| Comando | Aciona |
|---|---|
| `/bob-techlead` | Recebe uma demanda, divide por área e aciona os agentes certos, terminando com revisão. |
| `/bob-architect` | Planeja a implementação e compara alternativas técnicas. |
| `/bob-developer` | Implementa uma tarefa pontual, sem orquestração. |
| `/bob-reviewer` | Revisa uma mudança já implementada. |
| `/bob-tester` | Define a estratégia e os casos de teste de uma área. |
| `/bob-researcher` | Pesquisa e compara opções técnicas. |
| `/bob-security` | Analisa a segurança de uma mudança ou área (segredos, injeção, spoofing). |

Use estes comandos diretamente quando quiser um papel específico sem
passar pela orquestração do `/bob-techlead`, ou quando a ferramenta de IA
em uso não suportar invocação nativa de múltiplos agentes.

## Comandos de US/Cards (opcional)

Só existem se o projeto adotou o fluxo de `21-us-e-cards.md`: formaliza
a User Story num artefato próprio (`us.md`) antes da spec técnica, e
enriquece as tasks com o formato de card.

| Comando | O que faz |
|---|---|
| `/bob-us-create` | Cria a User Story (us.md) com o happy path. |
| `/bob-us-edge-cases` | Completa a User Story com os edge cases, via perguntas. |
| `/bob-us-plan` | Gera a spec técnica a partir da User Story aprovada. |
| `/bob-us-to-task` | Quebra a spec em cards de tarefa. |
| `/bob-us-task-implement` | Implementa uma task/card. |
| `/bob-us-task-pr` | Abre o PR de uma task/card para a branch da User Story. |
| `/bob-us-sync-pr` | Abre o PR que junta várias entregas da User Story. |
| `/bob-us-pr-review` | Faz uma revisão consultiva de um PR. |
| `/bob-us-pr-adjust` | Aplica os ajustes pedidos na revisão de um PR. |

## Estrutura de um comando (e como adicionar um novo)

Todo comando é um arquivo `.ai/commands/bob-<nome>.md`, seguindo:

```text
# /bob-<nome>

## Descrição
## Sintaxe
## Pré-condições
## Aciona
## Processo
## Saída esperada
```

Cada comando tem também um adaptador mínimo na ferramenta de IA em uso
(ex.: `.claude/commands/bob-<nome>.md` para Claude Code), apontando para
o arquivo canônico acima — nunca duplicando o conteúdo.
