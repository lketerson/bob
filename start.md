# AI Engineering Framework — Especificação de Bootstrap

Este arquivo é o **entrypoint** da especificação. Ele não contém as regras em si — contém o objetivo, o princípio de idioma e um índice para os arquivos em [`spec/`](spec/), que detalham cada ponto do framework. Isso aplica à própria especificação o mesmo princípio de divulgação progressiva que ela exige de `.ai/` (ver [`spec/12-precedencia-e-divulgacao.md`](spec/12-precedencia-e-divulgacao.md)): carregue apenas os arquivos relevantes para a tarefa atual, não a especificação inteira.

## Objetivo

Criar, dentro de um repositório, um AI Engineering Framework agnóstico de stack, linguagem, framework, plataforma e provedor de IA — canonicamente localizado em `.ai/`. Detalhes em [`spec/01-fundamentos.md`](spec/01-fundamentos.md).

## Idioma

A documentação GERADA por este framework em um projeto-alvo usa o idioma
escolhido pelo usuário durante o bootstrap interativo (`spec/16`, Passo
0) — PT-BR PODE ser sugerido como default, mas não é obrigatório. Este
próprio `bob_framework/` (a especificação em si) é sempre escrito em
PT-BR. Regras e exceções completas em [`spec/01-fundamentos.md`](spec/01-fundamentos.md).

## Índice da especificação

| # | Arquivo | Cobre |
|---|---|---|
| 01 | [`spec/01-fundamentos.md`](spec/01-fundamentos.md) | Objetivo, idioma, princípio central (`.ai/` como fonte única de verdade) |
| 02 | [`spec/02-estrutura-diretorios.md`](spec/02-estrutura-diretorios.md) | Estrutura de diretórios obrigatória de `.ai/` e dos adaptadores |
| 03 | [`spec/03-constituicao.md`](spec/03-constituicao.md) | `constitution.md`, `architecture.md`, `security.md`, `quality.md` |
| 04 | [`spec/04-instrucoes.md`](spec/04-instrucoes.md) | `instructions/`: geral, código, testes, git, documentação |
| 05 | [`spec/05-agentes.md`](spec/05-agentes.md) | Papéis de agente: architect, developer, reviewer, tester, researcher, mapper |
| 06 | [`spec/06-skills.md`](spec/06-skills.md) | Estrutura de `skills/` e do `SKILL.md` |
| 07 | [`spec/07-specs.md`](spec/07-specs.md) | Estrutura de `specs/` (features, requirements, decisions) |
| 08 | [`spec/08-workflows.md`](spec/08-workflows.md) | Workflows de feature, bugfix, refactor, code review, mapeamento de codebase |
| 09 | [`spec/09-contexto.md`](spec/09-contexto.md) | Os 9 arquivos de `.ai/context/` e a exigência de profundidade |
| 10 | [`spec/10-mapeamento-profundo.md`](spec/10-mapeamento-profundo.md) | Processo completo de mapeamento profundo de codebase (evidência, áreas de foco, paralelização) |
| 11 | [`spec/11-adaptadores.md`](spec/11-adaptadores.md) | `AGENTS.md`, `CLAUDE.md`, Copilot, independência de provedor, sem duplicação |
| 12 | [`spec/12-precedencia-e-divulgacao.md`](spec/12-precedencia-e-divulgacao.md) | Modelo de precedência e divulgação progressiva |
| 13 | [`spec/13-descoberta-e-migracao.md`](spec/13-descoberta-e-migracao.md) | Como inspecionar e migrar configuração de IA já existente no repositório |
| 14 | [`spec/14-readme-e-validacao.md`](spec/14-readme-e-validacao.md) | `.ai/README.md` e checklist de validação final |
| 15 | [`spec/15-restricoes-e-resultado.md`](spec/15-restricoes-e-resultado.md) | Restrição contra over-engineering e o resultado esperado |
| 16 | [`spec/16-bootstrap-interativo.md`](spec/16-bootstrap-interativo.md) | Fluxo de perguntas na primeira execução: idioma, agentes, skills, MCPs, escopo de config, preview obrigatório em `start.temp.md` |
| 17 | [`spec/17-sdd-workflow.md`](spec/17-sdd-workflow.md) | Fluxo de SDD em fases (User Story → descoberta → spec → tasks → implementação), com gates de decisão de negócio/técnica e a regra local-first-then-sync para spec/tasks quando há board |
| 18 | [`spec/18-board-e-branch.md`](spec/18-board-e-branch.md) | Board e branch de fallback (só quando não há convenção própria), workflow de PR com gates, permissões MCP e revisão consultiva |
| 19 | [`spec/19-comandos.md`](spec/19-comandos.md) | Sistema de comandos `/bob-[nome-comando]`, entrypoint `/bob-start`, comandos de agente, preview obrigatório |
| 20 | [`spec/20-versionamento.md`](spec/20-versionamento.md) | Versionamento do `bob_framework` (`CHANGELOG.md`) e do `.ai/` de cada projeto-alvo (`.ai/CHANGELOG.md` + carimbo de versão), e o fluxo de sincronização quando desatualizado |

Templates prontos para copiar (agente mapper, workflow de mapeamento, e os 9 templates de `.ai/context/`) estão em [`templates/`](templates/) — ver [`README.md`](README.md) deste diretório.

## Como usar este entrypoint

**Bootstrap completo de um projeto sem `.ai/` ainda:** leia `spec/01` a `spec/18` em ordem, seguindo `spec/13` primeiro para não sobrescrever configuração de IA existente, e `spec/16` (bootstrap interativo) antes de criar qualquer arquivo definitivo.

**Adicionar só o mapeamento profundo de codebase a um projeto que já tem `.ai/`:** leia `spec/01` (idioma), `spec/09` (contexto) e `spec/10` (mapeamento profundo), depois copie os templates conforme `README.md` deste diretório.

**Adicionar um novo agente, skill ou spec a um `.ai/` já existente:** leia apenas `spec/01` e o arquivo correspondente (`spec/05`, `spec/06` ou `spec/07`).

**Adicionar o sistema de comandos a um `.ai/` já existente:** leia `spec/19` e copie `templates/commands/` para `.ai/commands/`, renomeando cada arquivo (exceto `README.md`) com o prefixo `bob-` (ex.: `templates/commands/start.md` → `.ai/commands/bob-start.md`).

**Auditar/validar um `.ai/` já criado:** leia `spec/14`.

**Sincronizar um `.ai/` já existente com uma versão mais nova do `bob_framework`, ou retomar um bootstrap interrompido:** leia `spec/13` e `spec/20`.

## Resumo do resultado esperado

```text
Constituição → princípios imutáveis
Instruções   → comportamento de engenharia
Agentes      → papéis
Skills       → conhecimento especializado
Specs        → o que deve ser construído
Workflows    → como tarefas comuns são executadas
Comandos     → como tarefas são acionadas (trigger padronizado)
Contexto     → conhecimento específico deste projeto
Adaptadores  → tornam o framework consumível por diferentes ferramentas de IA
```

Detalhes completos em [`spec/15-restricoes-e-resultado.md`](spec/15-restricoes-e-resultado.md).
