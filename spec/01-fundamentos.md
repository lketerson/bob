# Fundamentos

## Objetivo

Criar um AI Engineering Framework agnóstico de stack dentro do repositório.

O framework DEVE ser projetado para funcionar com diferentes:

* agentes de IA
* assistentes de código de IA
* provedores de LLM
* linguagens de programação
* frameworks
* plataformas
* arquiteturas de aplicação

Exemplos de ambientes suportados incluem, mas não se limitam a:

* Flutter / Dart
* Android / Kotlin
* iOS / Swift
* React / TypeScript
* Angular / TypeScript
* Node.js
* Java / Spring
* C# / .NET
* Python
* Go
* Serviços de backend
* Aplicações web
* Aplicações mobile
* Aplicações desktop
* Monorepos
* Bibliotecas e SDKs

O framework NÃO DEVE conter suposições sobre uma stack tecnológica específica.

## Idioma

Este diretório (`bob_framework/` — a especificação e os templates) é
escrito em português brasileiro (PT-BR) e permanece assim,
independentemente do idioma escolhido para qualquer projeto-alvo.

Já a documentação GERADA por este framework em um projeto-alvo — os
arquivos canônicos em `.ai/`, os adaptadores de provedor, e a comunicação
do agente com o time daquele projeto — usa o idioma escolhido
explicitamente pelo usuário durante o bootstrap interativo (ver
`16-bootstrap-interativo.md`, Passo 0). PT-BR PODE ser sugerido como
default nessa pergunta, mas não é uma regra fixa: um projeto-alvo pode
escolher gerar seu `.ai/` em outro idioma.

Essa escolha, uma vez feita, DEVE valer para toda a documentação gerada
dali em diante nesse projeto-alvo — não varia de arquivo para arquivo nem
de sessão para sessão.

Exceções (válidas em qualquer idioma escolhido):

* Identificadores de código (nomes de arquivo, variáveis, funções, classes, chaves de configuração) permanecem no idioma em que existem no projeto.
* Nomes de arquivos e diretórios canônicos do próprio framework (`constitution.md`, `architecture.md`, `README.md`, etc.) permanecem em inglês, pois são convenções estruturais do framework, não conteúdo.
* Trechos de código, comandos e caminhos de arquivo permanecem como estão.

## Princípio Central

O projeto DEVE ter uma única fonte de verdade para o conhecimento de engenharia de IA do projeto.

A fonte canônica DEVE ser:

```text
.ai/
```

Arquivos específicos de IA exigidos por ferramentas individuais DEVEM atuar como adaptadores para `.ai/`, em vez de se tornarem fontes de verdade independentes.

A arquitetura deve seguir:

```text
.ai/
   ↓
Conhecimento de Engenharia de IA
   ↓
Adaptadores
   ↓
Claude / Codex / Copilot / Gemini / Outros Agentes
```

Evite duplicar as mesmas regras entre diferentes provedores de IA.
