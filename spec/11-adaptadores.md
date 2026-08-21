# Adaptadores e Independência de Provedor

## Estratégia de Adaptadores

Crie adaptadores de provedor mínimos.

### AGENTS.md

`AGENTS.md` DEVE atuar como o ponto de entrada genérico primário.

DEVERIA conter:

* Referência a `.ai/`
* Regras obrigatórias do projeto
* Instruções para inspecionar os arquivos relevantes
* Instrução para seguir a constituição antes da implementação

NÃO DEVE duplicar todo o diretório `.ai/`.

### CLAUDE.md

Crie um adaptador mínimo que direcione o Claude para `.ai/`.

Não duplique as regras do projeto.

### GitHub Copilot

Crie:

```text
.github/copilot-instructions.md
```

DEVE apontar para os arquivos canônicos em `.ai/`.

Se instruções específicas de caminho forem úteis, PODEM ser criadas em:

```text
.github/instructions/
```

No entanto, crie-as apenas quando fornecerem valor significativo.

### Comandos

Ferramentas de IA que suportam comandos nativos (slash commands, ex.:
Claude Code) DEVEM receber um adaptador mínimo por comando de
`.ai/commands/`, no formato específico daquela ferramenta (ex.:
`.claude/commands/bob-start.md`), apontando de volta para o arquivo
canônico correspondente — nunca duplicando o conteúdo do comando.

Ferramentas sem suporte nativo a comandos não recebem esses adaptadores;
o dev referencia o arquivo canônico de `.ai/commands/` diretamente na
conversa. Ver `spec/19-comandos.md`.

### Suporte a multiagentes

O Techlead (`spec/05-agentes.md`) detecta automaticamente, sem perguntar
ao dev, se a ferramenta de IA em uso suporta orquestração nativa de
múltiplos agentes/subagentes (ex.: subagentes do Claude Code). Quando
suportado, essa capacidade DEVE ser habilitada automaticamente — não é
uma configuração opcional que o dev precisa ativar manualmente.

Quando a ferramenta NÃO suporta multiagentes, o Techlead aciona cada
agente por chamada linear sequencial, ou orienta o dev a usar o comando
`/bob-[nome-do-agente]` correspondente (`spec/19-comandos.md`, "Comandos
de agente") — nunca falha silenciosamente por falta desse suporte.

## Independência de Provedor

O framework NÃO DEVE depender de:

* Claude
* OpenAI
* Codex
* GitHub Copilot
* Gemini
* Cursor
* Windsurf
* Qualquer outro provedor de IA específico

Arquivos específicos de provedor são apenas adaptadores.

O diretório `.ai/` DEVE permanecer utilizável mesmo que todo provedor de IA seja substituído.

Evite terminologia específica de provedor dentro dos documentos canônicos sempre que possível.

Por exemplo, prefira:

```text
agente
```

em vez de:

```text
Claude
```

e:

```text
assistente de IA
```

em vez de:

```text
Copilot
```

## Sem Duplicação

Evite duplicação entre:

```text
AGENTS.md
CLAUDE.md
copilot-instructions.md
.ai/*
```

O diretório `.ai/` é canônico.

Os adaptadores devem estabelecer, principalmente:

```text
"Você é um agente trabalhando neste repositório.
O conhecimento canônico de engenharia de IA está localizado em `.ai/`.
Leia os arquivos relevantes antes de agir."
```

A mesma lógica vale para skills usadas por múltiplas ferramentas de IA
(`.claude/`, `.cursor/`, `.codex/`, etc.): evite manter cópias adaptadas
da mesma skill em cada pasta específica de ferramenta. Skills que embutem
fatos do repositório em vez de referenciá-los a partir de `.ai/context/`/
`.ai/instructions/` tendem a divergir silenciosamente entre essas cópias
ao longo do tempo, já que cada uma para de refletir mudanças reais do
projeto de forma independente.
