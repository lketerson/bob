<div align="center">
  <img src="assets/bob-logo.png" alt="BoB" width="180" />

  # BoB

  <em>Build on Base.</em>

  [![CI](https://github.com/lketerson/bob/actions/workflows/ci.yml/badge.svg)](https://github.com/lketerson/bob/actions/workflows/ci.yml)
  [![License](https://img.shields.io/github/license/lketerson/bob)](LICENSE)
  [![GitHub stars](https://img.shields.io/github/stars/lketerson/bob?style=flat)](https://github.com/lketerson/bob/stargazers)
</div>

---

## O que é

BoB é uma especificação que um agente de IA lê para criar e manter `.ai/` — a fonte única de verdade de engenharia de IA de um projeto (constituição, agentes, skills, specs, workflows, comandos e contexto), agnóstica de stack e de provedor de IA. Ferramentas específicas (Claude, Copilot, etc.) recebem só um adaptador mínimo apontando de volta para `.ai/`, nunca uma cópia divergente.

## Motivação

A evolução rápida da IA trouxe um crescimento desenfreado de documentação nos repositórios, sem um padrão comum: cada desenvolvedor acaba montando seu próprio setup, gerando resultados destoantes entre pessoas do mesmo time. BoB nasceu para resolver isso — uma única fonte de verdade de engenharia de IA por projeto, que qualquer agente e qualquer desenvolvedor segue da mesma forma.

## Como funciona

```text
Constituição → princípios imutáveis
Instruções   → comportamento de engenharia
Agentes      → papéis
Skills       → conhecimento especializado
Specs        → o que deve ser construído
Workflows    → como tarefas comuns são executadas
Comandos     → como tarefas são acionadas
Contexto     → conhecimento específico do projeto
Adaptadores  → tornam tudo isso consumível por qualquer ferramenta de IA
```

Detalhes de cada camada em [`spec/`](spec/).

## Quickstart

### Novo projeto

1. Aponte seu agente de IA para este repositório e peça para seguir [`start.md`](start.md).
2. Rode `/bob-start`. Como não há `.ai/` nem histórico de Git prévio, o bootstrap interativo pode adotar a convenção padrão do framework diretamente, sem precisar perguntar sobre convenções já existentes.
3. Responda as perguntas do bootstrap (idioma, ferramentas de IA a configurar — Claude Code, Codex, Cursor, Copilot etc. —, board, agentes, skills, MCPs, barra de status) e aprove o preview em `start.temp.md` antes da gravação definitiva.
4. `.ai/` é criado do zero, já estruturado para o projeto.

### Codebase existente

1. Aponte seu agente de IA para este repositório e peça para seguir [`start.md`](start.md).
2. Rode `/bob-start`. Antes de perguntar qualquer coisa, o framework faz a descoberta do repositório — stack, documentação, convenções de Git e de IA já existentes — para não sobrescrever nada às cegas ([`spec/13`](spec/13-descoberta-e-migracao.md)).
3. Se já existir um `.ai/` (ou equivalente) de outra origem, `/bob-start` mostra o que foi encontrado e pergunta se você quer migrar para esta estrutura — nunca reorganiza silenciosamente. Antes de prosseguir, deixa explícito que pode renomear arquivos e realocar informações, mas nunca alterar o conteúdo já existente, e pede sua confirmação; se o repositório ainda não estiver versionado, recomenda copiar a pasta antes de continuar, para permitir reverter.
4. Segue o mesmo bootstrap interativo do fluxo de projeto novo, com preview em `start.temp.md` antes de gravar.
5. Rode `/bob-map-codebase` para mapear `.ai/context/` com evidência real do repositório.

### Comandos

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

#### Comandos de agente

Invocam um papel específico diretamente, sem passar pela orquestração do `/bob-techlead`.

| Comando | O que faz |
|---|---|
| `/bob-techlead` | Recebe uma demanda, divide por área e aciona os agentes certos, terminando com revisão. |
| `/bob-architect` | Planeja a implementação e compara alternativas técnicas. |
| `/bob-developer` | Implementa uma tarefa pontual, sem orquestração. |
| `/bob-reviewer` | Revisa uma mudança já implementada. |
| `/bob-tester` | Define a estratégia e os casos de teste de uma área. |
| `/bob-researcher` | Pesquisa e compara opções técnicas. |
| `/bob-security` | Analisa a segurança de uma mudança ou área (segredos, injeção, spoofing). |
| `/bob-frontend` (opcional) | Cria ou revisa interface usando o design system e os componentes existentes, sem cara de IA. |

#### Comandos de US/Cards (opcional)

Só existem se o projeto adotou o fluxo de User Story e cards ([`spec/21`](spec/21-us-e-cards.md)).

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

Sintaxe e pré-condições de cada comando, com sintaxe e pré-condições de cada comando, em [`templates/commands/README.md`](templates/commands/README.md).

## Documentação

- [`start.md`](start.md) — entrypoint; diz o que ler para cada tipo de tarefa
- [`spec/`](spec/) — a especificação completa, dividida por tema
- [`templates/`](templates/) — conteúdo pronto para copiar para `.ai/` durante o bootstrap
- [`templates/commands/README.md`](templates/commands/README.md) — lista de comandos `/bob-*`
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — como contribuir com este repositório

## FAQ

**Por que "BoB"?**
**B**uild **o**n **B**ase — o nome do framework e do diretório canônico (`.ai/`) que ele cria em cada projeto.

**Por que a spec é dividida em vários arquivos?**
Um arquivo único cobrindo tudo obrigaria a carregar conteúdo irrelevante para a tarefa atual. `spec/` segue divulgação progressiva: leia só o que a tarefa precisa.

**Qual a diferença entre `spec/` e `templates/`?**
`spec/` define o que cada peça do `.ai/` deve conter e quais regras seguir. `templates/` é o conteúdo já pronto para copiar.

## Licença

[MIT](LICENSE)
