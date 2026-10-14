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

### O básico

#### O que é o BoB, na prática?

Uma especificação, não uma biblioteca nem uma CLI. São arquivos Markdown que o seu agente de IA lê para criar e manter o `.ai/` dentro do seu repositório: constituição, instruções, agentes, skills, specs, workflows, comandos e contexto do projeto.

O resultado também é só Markdown: legível por pessoas, versionável no Git e independente de qualquer ferramenta.

#### Por que "BoB"?

**B**uild **o**n **B**ase. A ideia é que todo trabalho com IA no projeto seja construído sobre a mesma base, o `.ai/`, em vez de cada pessoa montar a sua.

#### Preciso instalar alguma coisa?

Não há pacote nem dependência. Você precisa de um agente de IA que leia e escreva arquivos no repositório, e de acesso ao BoB: pelo link do GitHub ou por um clone local.

O clone local é o caminho mais simples para atualizar depois, porque o `/bob-update` faz `git fetch` nele antes de comparar versões.

#### Quais ferramentas de IA funcionam?

Qualquer agente que leia arquivos. No bootstrap você escolhe quais ferramentas o time usa, e só elas recebem adaptador. A spec já descreve Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI e Windsurf ([`spec/11`](spec/11-adaptadores.md)). Para uma ferramenta fora dessa lista, o agente pergunta onde ela lê instruções e comandos.

O `AGENTS.md` é sempre criado, porque várias ferramentas já o leem nativamente. Em ferramentas sem slash commands, basta citar o arquivo de `.ai/commands/` na conversa.

#### Funciona com a minha stack?

Sim. A spec não assume linguagem, framework nem plataforma: serve para mobile, web, backend, desktop, monorepos e bibliotecas. O que é específico do seu projeto vem do `/bob-map-codebase`, que preenche `.ai/context/` com evidência real do código, como arquivos, padrões e convenções encontrados.

#### Em que o BoB difere de outras abordagens?

Muitas soluções resolvem uma parte do problema: um arquivo de instruções para uma ferramenta, ou um fluxo de specs isolado. O BoB organiza o conjunto inteiro em uma fonte canônica e trata cada ferramenta como um adaptador fino. Trocar ou adicionar uma IA não cria uma cópia das regras que diverge com o tempo.

Além disso, o próprio agente mantém o `.ai/` ao longo do projeto, sempre com preview, aprovação e um changelog próprio.

O BoB também vai além das regras para a IA e propõe o processo do time:

* **Gitflow:** uma branch e um PR por tarefa, com gates de code review e de QA antes de chegar a produção ([`spec/18`](spec/18-board-e-branch.md)).
* **Kanban:** um board com estados definidos, de `NEW` a `DONE/PROD`. Um card reprovado volta para o desenvolvimento com o motivo registrado.
* **Nomenclatura de branch:** o padrão `<tipo>/<id>-<slug>`, como `feat/1234-adicionar-botao-login`.
* **Onboarding de novos devs:** um agente opcional que avalia o nível técnico do dev, monta um roteiro de estudo, faz perguntas de verificação e propõe a correção de um bug controlado em uma branch local.
* **Modo Professor:** para devs menos experientes, o agente ensina a stack e a arquitetura ativamente. Ao final, o dev pode pedir que todos os agentes do projeto passem a explicar de forma mais didática.

Se o time já tem convenção própria de Git, board ou branches, ela prevalece. Essas propostas valem só quando não há nada definido.

### No seu projeto

#### O BoB altera meus arquivos sem perguntar?

Não. Toda gravação passa por um preview (`start.temp.md` ou `update.temp.md`) que você revisa e aprova antes de qualquer arquivo definitivo ser escrito.

Em uma migração, ele pode renomear arquivos e realocar informações, mas nunca reescreve nem resume o conteúdo existente. Se o repositório ainda não tem Git, ele recomenda copiar a pasta antes, para que dê para reverter.

#### Já tenho `CLAUDE.md`, regras do Cursor ou docs de IA. E agora?

Antes de perguntar qualquer coisa, o `/bob-start` inspeciona o repositório: stack, documentação, convenções de Git e arquivos de IA que já existem ([`spec/13`](spec/13-descoberta-e-migracao.md)). Ele mostra o que encontrou e pergunta se você quer migrar para a estrutura do BoB. Nada é reorganizado em silêncio, e se você não quiser migrar, nada muda.

#### Devo commitar o `.ai/`?

A recomendação é commitar. O `.ai/` é a fonte de verdade do time: quando está no repositório, todo mundo trabalha com as mesmas regras, e mudanças nele são revisadas em PR como qualquer código.

Isso é só uma recomendação. Cada time pode usar como preferir, inclusive mantendo partes fora do Git.

#### O agente lê tudo a cada tarefa?

Não. O BoB usa divulgação progressiva ([`spec/12`](spec/12-precedencia-e-divulgacao.md)): o agente sempre carrega as instruções gerais e o registro de erros corrigidos, e o resto só quando a tarefa pede. Uma tarefa de banco de dados, por exemplo, carrega a skill de banco, e uma de UI carrega a de UI. Isso economiza contexto e reduz ruído.

Pelo mesmo motivo, a própria spec é dividida em arquivos por tema, e o [`start.md`](start.md) indica o que ler para cada tipo de tarefa.

#### E quando duas regras entram em conflito?

Vale a ordem de precedência: restrições da plataforma, depois a constituição do projeto, as instruções, o papel do agente, as skills, a spec da feature e, por último, o pedido da tarefa. Assim, um pedido pontual não passa por cima de um princípio do projeto sem que isso fique explícito.

#### Preciso usar board, User Stories e cards?

Não. O fluxo de US e cards é opcional, e os comandos `/bob-us-*` só existem se o projeto adotar esse fluxo. Se o time já tem board e convenção de branch, o BoB segue o que existe. Se não tem nada, ele sugere um padrão (GitHub Projects, gratuito).

### Versões e evolução

#### Como recebo as novidades do BoB?

Rode `/bob-update`. Ele busca a versão mais recente do BoB, compara com a versão registrada no topo do `.ai/README.md`, resume em linguagem simples o que mudou e mostra o preview do que seria alterado ([`spec/20`](spec/20-versionamento.md)).

Nada é aplicado sem aprovação, e uma mudança MAJOR nunca entra automaticamente. Se você recusar, o `.ai/` continua funcionando na versão anterior.

#### O projeto é estável?

O BoB já é usado em projetos diferentes, por pessoas diferentes, que propõem mudanças e melhorias o tempo todo. Por isso está em evolução constante. Toda mudança segue SemVer e entra no [`CHANGELOG.md`](CHANGELOG.md).

#### Qual a diferença entre `spec/` e `templates/`?

`spec/` define o que cada peça do `.ai/` deve conter e quais regras seguir. `templates/` traz o conteúdo pronto que o agente copia e adapta durante o bootstrap, como agentes, comandos e os arquivos de contexto.

#### Como contribuo?

Comece por uma issue descrevendo o quê e o porquê. Depois, uma branch por issue (`add`, `remove`, `improve` ou `fix`) e um PR com a entrada no `CHANGELOG.md`. Detalhes em [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Licença

[MIT](LICENSE)
