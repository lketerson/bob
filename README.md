<div align="center">
  <img src="assets/bob-logo.png" alt="BoB" width="180" />

  # BoB

  <em>Build on Base.</em>

  [![License](https://img.shields.io/github/license/lketerson/bob)](LICENSE)
  [![GitHub stars](https://img.shields.io/github/stars/lketerson/bob?style=flat)](https://github.com/lketerson/bob/stargazers)
</div>

---

## O que é

BoB é uma especificação que um agente de IA lê para criar e manter `.ai/` — a fonte única de verdade de engenharia de IA de um projeto (constituição, agentes, skills, specs, workflows, comandos e contexto), agnóstica de stack e de provedor de IA. Ferramentas específicas (Claude, Copilot, etc.) recebem só um adaptador mínimo apontando de volta para `.ai/`, nunca uma cópia divergente.

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
3. Responda as perguntas do bootstrap (idioma, board, agentes, skills, MCPs, barra de status) e aprove o preview em `start.temp.md` antes da gravação definitiva.
4. `.ai/` é criado do zero, já estruturado para o projeto.

### Codebase existente

1. Aponte seu agente de IA para este repositório e peça para seguir [`start.md`](start.md).
2. Rode `/bob-start`. Antes de perguntar qualquer coisa, o framework faz a descoberta do repositório — stack, documentação, convenções de Git e de IA já existentes — para não sobrescrever nada às cegas ([`spec/13`](spec/13-descoberta-e-migracao.md)).
3. Se já existir um `.ai/` (ou equivalente) de outra origem, `/bob-start` mostra o que foi encontrado e pergunta se você quer migrar para esta estrutura — nunca reorganiza silenciosamente. Antes de prosseguir, deixa explícito que pode renomear arquivos e realocar informações, mas nunca alterar o conteúdo já existente, e pede sua confirmação; se o repositório ainda não estiver versionado, recomenda copiar a pasta antes de continuar, para permitir reverter.
4. Segue o mesmo bootstrap interativo do fluxo de projeto novo, com preview em `start.temp.md` antes de gravar.
5. Rode `/bob-map-codebase` para mapear `.ai/context/` com evidência real do repositório.

### Comandos

| Comando | Aciona |
|---|---|
| `/bob-start` | Entrypoint — bootstrap completo, orientação, retomada ou sincronização de versão |
| `/bob-map-codebase` | Mapeia/atualiza `.ai/context/` com evidência do repositório |
| `/bob-concerns` | Auditoria retrospectiva de SOLID, duplicação e nomenclatura |
| `/bob-create-agent` | Cria um novo papel de agente |
| `/bob-create-skill` | Cria uma skill técnica nova |
| `/bob-add-skill` | Instala uma skill já existente de um marketplace |
| `/bob-add-mcp` | Configura um novo servidor MCP |
| `/bob-create-spec` | Cria uma nova spec de feature |
| `/bob-validate` | Checklist de validação de `.ai/` (leitura) |
| `/bob-techlead` | Orquestrador — decompõe a demanda e delega aos agentes |
| `/bob-architect` | Plano de implementação / avaliação de alternativas |
| `/bob-developer` | Implementação de uma tarefa pontual |
| `/bob-reviewer` | Revisão de uma mudança já implementada |
| `/bob-tester` | Estratégia e casos de teste |
| `/bob-researcher` | Investigação e comparação técnica |
| `/bob-security` | Análise de segurança focada |
| `/bob-onboarding` (opcional) | Guia um novo dev pelo repositório via roteiro de estudo |

Lista completa, com sintaxe e pré-condições de cada comando, em [`templates/commands/README.md`](templates/commands/README.md).

## Documentação

- [`start.md`](start.md) — entrypoint; diz o que ler para cada tipo de tarefa
- [`spec/`](spec/) — a especificação completa, dividida por tema
- [`templates/`](templates/) — conteúdo pronto para copiar para `.ai/` durante o bootstrap
- [`templates/commands/README.md`](templates/commands/README.md) — lista de comandos `/bob-*`

## FAQ

**Por que "BoB"?**
**B**uild **o**n **B**ase — o nome do framework e do diretório canônico (`.ai/`) que ele cria em cada projeto.

**Por que a spec é dividida em vários arquivos?**
Um arquivo único cobrindo tudo obrigaria a carregar conteúdo irrelevante para a tarefa atual. `spec/` segue divulgação progressiva: leia só o que a tarefa precisa.

**Qual a diferença entre `spec/` e `templates/`?**
`spec/` define o que cada peça do `.ai/` deve conter e quais regras seguir. `templates/` é o conteúdo já pronto para copiar.

## Licença

[MIT](LICENSE)
