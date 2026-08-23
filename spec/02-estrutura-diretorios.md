# Estrutura de Diretórios Obrigatória

Crie a seguinte estrutura:

```text
.ai/
├── constitution/
│   ├── constitution.md
│   ├── architecture.md
│   ├── security.md
│   └── quality.md
│
├── instructions/
│   ├── general.md
│   ├── coding.md
│   ├── testing.md
│   ├── git.md
│   ├── documentation.md
│   └── erros-corrigidos.md
│
├── agents/
│   ├── techlead.md
│   ├── architect.md
│   ├── developer.md
│   ├── reviewer.md
│   ├── tester.md
│   ├── researcher.md
│   ├── mapper.md
│   └── security.md
│
├── skills/
│   └── README.md
│
├── specs/
│   ├── README.md
│   ├── features/
│   ├── requirements/
│   └── decisions/
│
├── workflows/
│   ├── feature.md
│   ├── bugfix.md
│   ├── refactor.md
│   ├── code-review.md
│   ├── map-codebase.md
│   └── concerns.md
│
├── commands/
│   ├── README.md
│   ├── bob-start.md
│   ├── bob-map-codebase.md
│   ├── bob-concerns.md
│   ├── bob-create-agent.md
│   ├── bob-create-skill.md
│   ├── bob-add-skill.md
│   ├── bob-add-mcp.md
│   ├── bob-create-spec.md
│   ├── bob-validate.md
│   ├── bob-techlead.md
│   ├── bob-architect.md
│   ├── bob-developer.md
│   ├── bob-reviewer.md
│   ├── bob-tester.md
│   ├── bob-researcher.md
│   ├── bob-security.md
│   └── bob-onboarding.md           (opcional — só se o agente Onboarding foi aprovado)
│
├── context/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── structure.md
│   ├── stack.md
│   ├── integrations.md
│   ├── conventions.md
│   ├── testing.md
│   ├── concerns.md
│   └── glossary.md
│
├── README.md
└── CHANGELOG.md
```

`.ai/README.md` carrega no topo o carimbo de qual versão do
`bob_framework` gerou/sincronizou este `.ai/` por último, e
`.ai/CHANGELOG.md` registra a evolução desta instância ao longo do tempo
— ver `20-versionamento.md`.

A lista de arquivos em `commands/` acima é ilustrativa desta árvore —
`19-comandos.md` é a fonte canônica da lista de comandos do framework
(nome, descrição, condição de existência). Qualquer comando adicionado,
removido ou renomeado lá DEVE ser replicado aqui na mesma edição.

Crie também os adaptadores de provedor/ferramenta quando apropriado:

```text
AGENTS.md
CLAUDE.md
.github/
└── copilot-instructions.md
```

Os adaptadores DEVEM permanecer mínimos e DEVEM referenciar os arquivos canônicos em `.ai/`. Ferramentas de IA com suporte nativo a comandos (slash commands) recebem também um adaptador mínimo por comando de `.ai/commands/`, apontando de volta para o arquivo canônico — ver `spec/11-adaptadores.md`, seção "Comandos". Ferramentas com suporte a barra de status configurável (ex.: `.claude/settings.json` do Claude Code) PODEM opcionalmente receber o script de `templates/adapters/statusline.js`, quando aprovado pelo dev no bootstrap — ver `spec/11-adaptadores.md`, seção "Barra de status", e `spec/16-bootstrap-interativo.md`, Passo 7.
