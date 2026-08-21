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
   pergunta idioma, board, guardrails, agentes, skills e MCPs antes de
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
| `/bob-start` | Entrypoint. Bootstrap completo (primeira vez), orientação/menu, ou confirmação de reorganização de um `.ai/` pré-existente não-framework. |
| `/bob-map-codebase` | Mapeia (ou atualiza) `.ai/context/` com evidência real do repositório. |
| `/bob-concerns` | Auditoria retrospectiva: violações de camada/SOLID, duplicação de código, convenção de nomenclatura, injeção de dependências. |
| `/bob-create-agent` | Cria um novo papel de agente além dos 8 padrão. |
| `/bob-create-skill` | Cria uma skill técnica nova, do zero. |
| `/bob-add-skill` | Instala uma skill já existente de um marketplace/registro externo. |
| `/bob-add-mcp` | Configura um novo servidor MCP a partir de um link de documentação ou do pacote. |
| `/bob-create-spec` | Cria uma nova especificação de feature (`.ai/specs/features/<slug>/`). |
| `/bob-validate` | Roda o checklist de validação de `.ai/` — apenas leitura. |
| `/bob-onboarding` (opcional) | Guia um novo desenvolvedor pelo repositório via um roteiro de estudo. |
| `/bob-onboarding-abandonar` (opcional) | Interrompe e limpa o processo de onboarding a qualquer momento. |

`/bob-onboarding` e `/bob-onboarding-abandonar` só existem se o agente
Onboarding foi aprovado durante o bootstrap.

## Comandos de agente

| Comando | Aciona |
|---|---|
| `/bob-techlead` | Entrada/orquestrador — decompõe a demanda e delega aos agentes certos, terminando sempre com o Reviewer. |
| `/bob-architect` | Plano de implementação / avaliação de alternativas arquiteturais. |
| `/bob-developer` | Implementação de uma tarefa pontual, sem orquestração. |
| `/bob-reviewer` | Revisão de uma mudança já implementada. |
| `/bob-tester` | Estratégia e casos de teste para uma área. |
| `/bob-researcher` | Investigação e comparação técnica. |
| `/bob-security` | Análise de segurança focada (segredos, injeção, spoofing). |

Use estes comandos diretamente quando quiser um papel específico sem
passar pela orquestração do `/bob-techlead`, ou quando a ferramenta de IA
em uso não suportar invocação nativa de múltiplos agentes.

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
