# Comandos

## Propósito

Comandos são a camada de invocação do framework: um trigger textual
padronizado (`/bob-[nome-do-comando]`) que um dev digita na ferramenta de
IA para acionar um agente, workflow, ou etapa específica do framework,
sem precisar lembrar ou redigitar instruções longas toda vez.

Comandos NÃO substituem agentes/workflows/specs — eles apenas os
acionam. Um arquivo de comando é sempre um wrapper fino que aponta para o
processo canônico já definido em outro lugar da especificação; ele nunca
duplica esse processo.

## Estrutura

Crie:

```text
.ai/commands/
├── README.md
├── bob-start.md
├── bob-map-codebase.md
├── bob-concerns.md
├── bob-create-agent.md
├── bob-create-skill.md
├── bob-add-skill.md
├── bob-add-mcp.md
├── bob-create-spec.md
├── bob-validate.md
├── bob-techlead.md
├── bob-architect.md
├── bob-developer.md
├── bob-reviewer.md
├── bob-tester.md
├── bob-researcher.md
├── bob-security.md
└── bob-onboarding.md               (só se o agente Onboarding foi aprovado — 16, Passo 3)
```

## Convenção de nomenclatura

* Prefixo `/bob-` obrigatório para **todo** comando do framework, sem
  exceção — inclusive os comandos do agente Onboarding, que usam
  `/bob-onboarding` e `/bob-onboarding-abandonar`.
* kebab-case depois do prefixo.
* Entrypoint único: `/bob-start`.

Isso permite que o dev descubra todos os comandos do framework de uma
vez, via autocomplete da ferramenta de IA (quando suportado), digitando
`/bob-`.

## `/bob-start` — comportamento condicional

`/bob-start` avalia quatro cenários, nesta ordem:

1. **`.ai/` não existe** → dispara a descoberta do repositório
   (`13-descoberta-e-migracao.md`) seguida do bootstrap interativo
   completo (`16-bootstrap-interativo.md`).
2. **`.ai/` existe, a estrutura corresponde à deste framework**
   (`02-estrutura-diretorios.md`) **e o carimbo de versão em
   `.ai/README.md` bate com a versão atual do `bob_framework`**
   (`20-versionamento.md`) → NÃO repete o bootstrap; apresenta um
   resumo curto do estado atual (papéis de agente ativos, skills
   instaladas, MCPs configurados) e a lista de comandos disponíveis
   (lida de `.ai/commands/README.md`), perguntando ao dev o que deseja
   fazer.
3. **`.ai/` existe e é reconhecível como deste framework, mas está
   incompleto (bootstrap anterior interrompido) ou com o carimbo de
   versão desatualizado** → segue, respectivamente, a seção "`.ai/` já
   existente, gerado por este framework, mas incompleto" de
   `13-descoberta-e-migracao.md`, ou o fluxo de sincronização de
   `20-versionamento.md`. Em nenhum dos dois casos oferece o fluxo de
   reorganização do cenário 4 — a estrutura já é deste framework, só
   precisa ser completada/atualizada.
4. **`.ai/` existe, mas não foi gerado por este framework** (estrutura
   totalmente diferente da descrita em `02-estrutura-diretorios.md` —
   ex.: outra ferramenta ou processo interno já usa esse caminho) →
   segue o processo de detecção e confirmação descrito em
   `13-descoberta-e-migracao.md`, seção "`.ai/` já existente, mas não
   gerado por este framework". NUNCA reorganiza ou sobrescreve
   silenciosamente.

`/bob-start` é o único comando cujo adaptador de ferramenta (ex.:
`.claude/commands/bob-start.md`) PODE existir mesmo antes de `.ai/`
existir — todos os demais comandos pressupõem `.ai/` já criado (por
`/bob-start` ou manualmente).

## Lista de comandos padrão

| Comando | Aciona | Preview obrigatório (`[slug].temp.md`)? |
|---|---|---|
| `/bob-start` | Bootstrap completo (`16`) na primeira vez; menu de orientação, confirmação de reorganização, retomada de bootstrap incompleto, ou sincronização de versão, nas seguintes (`13`, `20`) | Sim, como `start.temp.md` — no bootstrap (`16`, Passo 8), na reorganização de um `.ai/` não-framework, na retomada de bootstrap incompleto (`13`), e na sincronização de versão (`20`) |
| `/bob-map-codebase` | Agente Mapper + workflow de mapeamento (`10`) | Não — ver exceção abaixo |
| `/bob-concerns` | Agente Mapper + workflow de concerns — auditoria retrospectiva que PODE identificar violações de camada/SOLID, duplicação e nomenclatura já existentes (a aplicação proativa de SOLID/DIP/SRP durante o design e a implementação é responsabilidade contínua de Architect/Developer/Techlead — ver `05-agentes.md` — não deste comando) | Não — ver exceção abaixo |
| `/bob-create-agent` | Criação de um novo papel de agente em `.ai/agents/` (`05`) | Sim, como `create-agent.temp.md` |
| `/bob-create-skill` | Criação de uma skill nova, do zero, em `.ai/skills/` (`06`) | Sim, como `create-skill.temp.md` |
| `/bob-add-skill` | Instalação de uma skill existente vinda de um marketplace/registro externo (`16`, Passo 4) | Sim, como `add-skill.temp.md` |
| `/bob-add-mcp` | Configuração de um novo servidor MCP a partir de um link informado pelo usuário | Sim, como `add-mcp.temp.md` |
| `/bob-create-spec` | Criação de uma nova spec de feature em `.ai/specs/features/<slug>/` (`07`, `17`) | Sim, como `create-spec.temp.md` |
| `/bob-validate` | Checklist de validação de `.ai/` (`14`) | Não — comando somente leitura |
| `/bob-onboarding` (opcional) | Agente Onboarding — instrutor para novos devs (`05`, `templates/agents/onboarding.md`) | Não — usa seu próprio mecanismo de roadmap/branch |
| `/bob-onboarding-abandonar` (opcional) | Interrompe e limpa o processo de onboarding a qualquer momento | Não — o próprio comando já é a confirmação |

`/bob-onboarding` e `/bob-onboarding-abandonar` só existem se o agente
Onboarding foi aprovado durante o bootstrap
(`16-bootstrap-interativo.md`, Passo 3) — mesma condição de
`templates/agents/onboarding.md` e `templates/workflows/onboarding.md`.

### Fonte única de verdade da lista de comandos

A tabela acima e a de "Comandos de agente" (abaixo) são a fonte canônica
da lista de comandos do framework. `templates/commands/README.md` e a
árvore de `commands/` em `02-estrutura-diretorios.md` DEVEM espelhar
exatamente os mesmos comandos (nome e, no caso do primeiro, descrição de
uma linha) — qualquer comando adicionado, removido ou renomeado aqui DEVE
ser replicado nos dois na mesma edição. Esta é uma disciplina de
manutenção deste repositório (`bob_framework`), não uma checagem possível
em tempo de bootstrap: uma vez copiado para `.ai/commands/README.md` de
um projeto-alvo, aquele arquivo já não tem acesso a este para comparação.

## Comandos de agente

Além dos comandos utilitários acima, cada agente padrão (exceto o
Mapper, já coberto por `/bob-map-codebase` e `/bob-concerns`) tem um
comando de invocação direta — usado quando o dev quer aquele papel
especificamente sem passar pela orquestração do Techlead, ou como
fallback quando a ferramenta de IA em uso não suporta invocação nativa
de múltiplos agentes (`11-adaptadores.md`, "Suporte a multiagentes"):

| Comando | Aciona |
|---|---|
| `/bob-techlead` | Entrada/orquestrador — decompõe a demanda e delega |
| `/bob-architect` | Plano de implementação / avaliação de alternativas |
| `/bob-developer` | Implementação de uma tarefa pontual |
| `/bob-reviewer` | Revisão de uma mudança já implementada |
| `/bob-tester` | Estratégia e casos de teste |
| `/bob-researcher` | Investigação/comparação técnica |
| `/bob-security` | Análise de segurança focada |

Nenhum desses comandos requer preview em `[slug].temp.md` — são
invocações de agente, não criação/alteração de arquivo de `.ai/`.

## Estrutura de um arquivo de comando

Todo `.ai/commands/bob-<nome>.md` DEVE conter:

```markdown
# /bob-<nome>

## Descrição
## Sintaxe
## Pré-condições
## Aciona
## Processo
## Saída esperada
```

## `/bob-add-mcp` — detalhe do fluxo

Diferente do Passo 5 do bootstrap interativo (`16`), que faz pesquisa
ampla por candidatos a partir da stack detectada, `/bob-add-mcp` parte de
um MCP específico que o usuário já tem em mente. O comando DEVE:

1. Perguntar ao usuário o link da documentação do MCP OU o link direto
   do pacote/servidor MCP (ex.: repositório, registro npm) — pelo menos
   um dos dois é obrigatório.
2. Buscar e inspecionar esse link para entender o que o MCP oferece:
   ferramentas expostas, permissões necessárias, requisitos de
   autenticação/segredos.
3. Apresentar um resumo do que foi encontrado ao usuário e confirmar que
   é o MCP correto antes de prosseguir.
4. Perguntar o escopo (local ou global), seguindo exatamente
   `16-bootstrap-interativo.md`, Passo 6.
5. Gerar o preview em `add-mcp.temp.md` com a configuração proposta
   (arquivo específico da ferramenta) e a atualização correspondente em
   `.ai/context/integrations.md`. NUNCA incluir credenciais/segredos
   reais no preview — apenas placeholders, perguntando ao usuário
   onde/como fornecê-los com segurança.
6. Aguardar aprovação explícita antes de gravar qualquer coisa.
7. Após aprovação, gravar a configuração no arquivo específico da
   ferramenta (nunca em `.ai/`, que permanece agnóstico de provedor —
   `11-adaptadores.md`), atualizar `.ai/context/integrations.md`, e
   remover `add-mcp.temp.md`.

## Adaptadores de comando

Ferramentas de IA que suportam comandos nativos (slash commands) DEVEM
receber um arquivo adaptador mínimo por comando, apontando para o
arquivo canônico em `.ai/commands/`. Ver `11-adaptadores.md`.

Ferramentas sem suporte nativo a comandos continuam podendo usar o
framework normalmente — o dev referencia o arquivo canônico diretamente
na conversa (ex.: "siga `.ai/commands/bob-map-codebase.md`").

## Regra de preview

Todo comando que cria ou altera arquivo em `.ai/`, em um adaptador, ou em
configuração de ferramenta (ex.: MCP, barra de status), ou que reorganiza
um `.ai/` pré-existente não-framework (`13-descoberta-e-migracao.md`),
DEVE seguir a mesma regra de preview obrigatório já estabelecida em
`16-bootstrap-interativo.md`, Passo 8 — não apenas durante o bootstrap.

**Nome do arquivo de preview:** `[slug].temp.md`, na raiz do
projeto-alvo, onde `slug` é o nome do comando sem o prefixo `bob-` (ex.:
`create-agent.temp.md`, `add-mcp.temp.md`). Todas as sub-etapas
acionadas por `/bob-start` (bootstrap, reorganização de `.ai/` não-
framework, retomada de bootstrap incompleto, sincronização de versão —
`13-descoberta-e-migracao.md`, `20-versionamento.md`) usam
`start.temp.md`. Nomear o arquivo pelo comando evita colisão quando mais
de um comando com preview roda em paralelo sob orquestração multiagente
(`11-adaptadores.md`, "Suporte a multiagentes").

**Exceção deliberada:** `/bob-map-codebase` e `/bob-concerns` NÃO exigem
esse preview, mesmo escrevendo diretamente em `.ai/context/*.md` — ambos
só produzem ou atualizam documentação descritiva a partir de evidência
do repositório (nunca comportamento, regra ou configuração), e seu
próprio processo incremental já reporta ao final um resumo do que foi
criado/atualizado (`10-mapeamento-profundo.md`, passo 6), cumprindo o
mesmo papel de revisão que o preview cumpriria em outro comando. Nenhum
outro comando desta especificação tem essa isenção.
