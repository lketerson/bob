# Descoberta e Migração

## Descoberta do Repositório

Antes de criar ou modificar o framework:

1. Inspecionar o repositório.
2. Identificar a stack do projeto.
3. Identificar arquivos de configuração de IA existentes — incluindo um `.ai/` (ou diretório equivalente) já presente, e se ele foi gerado por este framework ou não (ver seção "`.ai/` já existente, mas não gerado por este framework", abaixo).
4. Identificar documentação existente.
5. Identificar documentação de arquitetura existente.
6. Identificar diretrizes de contribuição existentes.
7. Identificar convenções de teste existentes.
8. Identificar convenções de Git existentes.
9. Identificar instruções de agente existentes.

NÃO sobrescreva configuração de IA existente às cegas.

Se arquivos equivalentes já existirem, analise-os e migre suas informações úteis para `.ai/` onde for apropriado.

Preserve o comportamento existente, a menos que haja uma razão clara para mudá-lo.

## Padrão de Fluxo de Trabalho Git

Quando o repositório-alvo já possui uma árvore Git com histórico (não é um projeto greenfield), o item 8 da lista acima ("Identificar convenções de Git existentes") DEVE ser tratado com o seguinte processo antes de escrever `.ai/instructions/git.md`:

1. **Inspecionar o histórico real**, não assumir por convenção de mercado: branches locais e remotos, padrão de nomenclatura de branch (ex.: `feature/`, `feat/`, `fix/`, prefixo de ticket/issue), modelo de branching aparente (trunk-based, git-flow, branch por feature de vida curta, etc.), e se o projeto usa múltiplos worktrees como parte do fluxo de trabalho.
2. **Inspecionar a convenção de mensagens de commit** realmente usada no histórico (Conventional Commits, mensagens livres, referência a issue/ticket, idioma usado nas mensagens).
3. **Inspecionar arquivos que declarem uma convenção explícita**, quando existirem: `CONTRIBUTING.md`, templates de commit/PR em `.github/`, hooks de commit, arquivos de configuração de ferramentas de commit (ex.: linter de commit message).
4. **Se um padrão claro e consistente for identificado** a partir dos passos acima, documentá-lo em `.ai/instructions/git.md` e segui-lo — não substituir por uma convenção genérica só porque é mais comum em outros projetos.
5. **Se nenhum padrão claro for identificado** — histórico pequeno demais, inconsistente, conflitante entre branches, ou sem convenção declarada em nenhum arquivo — NÃO assumir uma convenção silenciosamente. Perguntar ao usuário se existe um padrão de Git (branching, nomenclatura, mensagens de commit, uso de worktrees) que deva ser seguido. Só prosseguir com a convenção padrão deste framework depois que o usuário confirmar explicitamente que não há preferência, ou indicar qual convenção usar.

Repositórios sem histórico de Git ainda (greenfield) não exigem essa verificação: a convenção padrão do framework PODE ser adotada diretamente, sem necessidade de perguntar.

## Arquivos de IA Existentes

Procure por arquivos como:

```text
AGENTS.md
CLAUDE.md
GEMINI.md
.github/copilot-instructions.md
.github/instructions/
.cursor/
.cursorrules
.windsurfrules
```

Inspecione também:

```text
README.md
CONTRIBUTING.md
docs/
```

Regras de projeto existentes DEVERIAM ser incorporadas à arquitetura canônica onde for apropriado.

Não copie tudo às cegas.

Resolva duplicações e contradições.

## `.ai/` já existente, mas não gerado por este framework

Em alguns projetos, um diretório `.ai/` (ou equivalente, ex.: `.bob/`,
`.claude-context/`) já pode existir sem ter sido gerado por este framework — criado por
outra ferramenta, processo interno da equipe, ou uma versão anterior
divergente. Isso é detectado quando a estrutura encontrada não
corresponde à descrita em `spec/02-estrutura-diretorios.md` (diretórios
ou arquivos essenciais ausentes, nomenclatura diferente, organização
distinta).

Quando isso acontecer, o framework NUNCA DEVE reorganizar ou
sobrescrever esse diretório silenciosamente. Em vez disso:

1. Apresentar ao usuário um resumo do que foi encontrado (estrutura
   atual, o que parece cobrir) e como isso diverge da estrutura proposta
   por este framework.
2. Perguntar explicitamente se o usuário deseja reorganizar o conteúdo
   existente para a estrutura deste framework.
3. Se o usuário confirmar, migrar o conteúdo útil (mesmo princípio desta
   seção — "Resolva duplicações e contradições", "Não copie tudo às
   cegas") para a nova estrutura, mostrando o preview em `start.temp.md`
   antes de gravar qualquer coisa definitiva (mesma regra de
   `spec/16-bootstrap-interativo.md`, Passo 7, e `spec/19-comandos.md`).
4. Se o usuário recusar, não alterar nada — continuar operando a partir
   da estrutura existente, sem forçar a migração.

Este é o mesmo fluxo acionado por `/bob-start` quando `.ai/` já existe
mas não corresponde à estrutura deste framework — ver
`spec/19-comandos.md`.

## `.ai/` já existente, gerado por este framework, mas incompleto (bootstrap interrompido)

Diferente da seção anterior (`.ai/` de outra origem), aqui a estrutura
encontrada é claramente deste framework — nomenclatura (`bob-*`),
organização e parte dos arquivos batem com
`spec/02-estrutura-diretorios.md` — mas está incompleta: faltam
arquivos/diretórios obrigatórios, ou existe um resquício de arquivo de
preview (`[slug].temp.md` — ver `spec/19-comandos.md`) na raiz do
projeto-alvo. Isso indica uma execução anterior do bootstrap
(`spec/16-bootstrap-interativo.md`) interrompida entre a aprovação do
preview e a gravação completa dos arquivos definitivos — não uma
ferramenta ou processo diferente.

Quando isso for detectado, `/bob-start` NÃO DEVE oferecer o fluxo de
reorganização da seção acima (que assume uma origem estranha ao
framework). Em vez disso:

1. Apresentar ao usuário quais arquivos/diretórios de `spec/02` já
   existem e quais faltam.
2. Perguntar se deseja retomar o bootstrap a partir do ponto onde parou.
3. Se confirmar, seguir `spec/16-bootstrap-interativo.md` apenas para os
   passos cujo resultado ainda não foi gravado, gerando um novo preview
   (`start.temp.md`) só com o que falta, antes de gravar.
4. Se recusar, não alterar nada.

Ver também `spec/20-versionamento.md` para o caso relacionado, porém
distinto, de um `.ai/` completo e correto, mas gerado por uma versão
mais antiga do `bob_framework` (desatualizado, não incompleto).
