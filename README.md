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

1. Aponte seu agente de IA para este repositório e peça para seguir [`start.md`](start.md).
2. Se o projeto-alvo ainda não tem `.ai/`, isso dispara o bootstrap interativo (idioma, agentes, skills, MCPs) com preview obrigatório antes de gravar qualquer arquivo.
3. Depois do bootstrap, use `/bob-start` a qualquer momento para ver o estado do framework e os comandos disponíveis.

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
