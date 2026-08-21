# Fluxo de SDD (Spec-Driven Development)

Este workflow detalha, para especificações não triviais, o processo já
resumido no "Workflow de feature" de `08-workflows.md`. Use `08-workflows.md`
para o fluxo genérico e curto; use este arquivo quando a especificação for
grande o suficiente para justificar fases formais com gates — por exemplo,
uma funcionalidade nova com múltiplos requisitos, não um ajuste pontual.

## Terminologia

O ponto de partida de uma especificação é uma **User Story (US)** — a
unidade de trabalho de negócio que origina a spec. O framework usa esse
termo de forma agnóstica de ferramenta. Se o sistema de rastreamento de
trabalho do projeto usar outro nome (PBI, Issue, Ticket, etc.), trate como
sinônimo — NÃO renomeie a terminologia do sistema de rastreamento em si,
apenas use "User Story" nos documentos que este framework produz.

## Fases

```text
User Story
    ↓
Descoberta/Pesquisa
    ↓
Spec
    ↓
Tasks
    ↓
Implementação
```

### Fase 1 — Descoberta/Pesquisa

Objetivo: entender o pedido antes de formalizar. Inspecionar o sistema de
rastreamento de trabalho (via MCP, quando disponível) para buscar a User
Story, seu contexto e discussões associadas. Inspecionar o código e os
arquivos de `.ai/context/` relevantes.

Gate: se a User Story não tiver critério de aceite claro nem dono de
negócio identificável, sinalizar isso ao usuário antes de prosseguir —
não adivinhar o objetivo de negócio.

### Local vs. board (vale para as Fases 2 e 3)

* **Se o projeto NÃO trabalha com um sistema de rastreamento de trabalho
  integrado via MCP:** `spec.md` e `tasks.md` são sempre gerados só
  localmente — não há pergunta de "onde", porque não existe outro lugar.
* **Se o projeto trabalha com board:** o fluxo padrão do framework é
  gerar **localmente primeiro**, para validação e revisão, e só depois
  **sincronizar** esse conteúdo já validado para o board (criar/atualizar
  os itens correspondentes). Local-first-then-sync é a proposta padrão do
  agente — não uma escolha entre opções equivalentes. O agente DEVE
  confirmar com o usuário antes de sincronizar para o board; nunca
  sincroniza automaticamente sem essa confirmação.
* **Se o usuário optou por não usar board nem fluxo formal de
  branch/PR** (projeto pequeno — decisão tomada em
  `16-bootstrap-interativo.md`, Passo 1): `spec.md`/`tasks.md` continuam
  gerados localmente, e a Fase 4 (Implementação) ocorre diretamente na
  branch principal, sem branch dedicada nem Pull Request — ver a
  ressalva correspondente em `18-board-e-branch.md`.

### Fase 2 — Spec

Produzir ou atualizar `.ai/specs/features/<slug>/spec.md`, seguindo o
template em `templates/specs/spec.md` (ver `07-specs.md`). Ver "Local vs.
board" acima para a ordem em que o conteúdo é gerado e, se aplicável,
sincronizado para o board.

Gates:

* **Decisão de negócio.** Se houver qualquer pergunta de escopo/prioridade
  sem resposta do dono de negócio, a spec NÃO DEVE ser finalizada — a fase
  para e a pergunta é levantada explicitamente.
* **Decisão técnica.** O agente NUNCA decide sozinho arquitetura,
  tecnologia, modelagem de dados ou estratégia de rollout — apresenta
  opções com trade-offs para o time decidir. Isso reforça o que já está em
  `03-constituicao.md`/`05-agentes.md` (papel Architect), tornando-o uma
  etapa formal e obrigatória deste workflow.

### Fase 3 — Tasks

Quebrar a spec aprovada em tarefas, seguindo o template
`templates/specs/tasks.md`, produzindo `.ai/specs/features/<slug>/tasks.md`.

Todo título de tarefa DEVE seguir o padrão `"[TIPO] descrição curta"`
(ex.: `[FRONT] Adicionar botão à tela de login`) — `TIPO` é uma tag curta
de área/camada, com vocabulário a critério do projeto (ex.: FRONT, BACK,
INFRA, DB), não uma lista fechada. Todo título de teste referenciado nas
tarefas DEVE seguir o padrão `"DEVE <comportamento esperado> QUANDO
<condição/cenário>"` — equivalente em PT-BR ao padrão "should...when" de
BDD.

Seguir a regra de "Local vs. board" acima: `tasks.md` é sempre gerado
localmente primeiro; se o projeto trabalha com board, o agente propõe
sincronizar depois, mediante confirmação — nunca assume a sincronização.
Ao sincronizar, cada item do board DEVE referenciar a User Story de
origem (item pai/relacionado, conforme o sistema suportar), e uma tarefa
sincronizada vira um item com a spec individual da tarefa na própria
descrição do item.

### Quebra modular para projetos novos (greenfield)

Quando o projeto é novo (sem código-base anterior relevante, ou a
feature é o pontapé inicial de um módulo), a quebra de tasks DEVERIA
organizar cada módulo/feature de negócio como uma **Epic**, com uma
**task por camada técnica** dentro daquele módulo — repetindo a mesma
estrutura para front e para back, quando aplicável. Exemplo:

```text
EPIC: LOGIN (front)
├── T1. [FRONT] View
├── T2. [FRONT] Controller
├── T3. [FRONT] Componentes
├── T4. [FRONT] Domain
├── T5. [FRONT] Data
├── T6. [FRONT] Cliente (API client)
├── T7. [FRONT] Services
└── T8. [FRONT] Validators

EPIC: LOGIN (back)
├── T1. [BACK] Controller
├── T2. [BACK] Domain
├── T3. [BACK] Data
├── T4. [BACK] Services
└── T5. [BACK] Validators
```

A mesma lógica se aplica a outros módulos/features do projeto — cada um
vira sua própria Epic, com tasks por camada. As camadas exatas
(view/controller/domain/data/etc.) variam conforme a arquitetura real do
projeto (`context/architecture.md`); o exemplo acima é ilustrativo, não
uma lista fechada.

Quando o time trabalha com epics dessa forma, ver "Branch de epic como
sync" em `18-board-e-branch.md` — as branches de task fazem merge na
branch da epic, que só depois faz merge em main/prod.

### Fase 4 — Implementação

Implementar uma tarefa por vez, seguindo `tasks.md`/o item do board
correspondente, os papéis `developer`/`tester`/`reviewer` (`05-agentes.md`)
e as instruções do projeto. Ao concluir cada tarefa, marcar seu status
(local e/ou no board, conforme a opção escolhida na Fase 3) e preencher
os campos `Branch` e `PR/Commit(s)` da tarefa em `tasks.md`
(`templates/specs/tasks.md`) — mesmo em projetos sem PR, registrar
o(s) commit(s) que a implementaram, para que a rastreabilidade
spec → tasks → código não pare na tarefa.

Antes de implementar, verificar pastas de lógica compartilhada
(`shared/`, `utils/`, `helpers/`, `formatters/` ou equivalentes do
projeto — ver `05-agentes.md` e `context/structure.md`) para reaproveitar
em vez de duplicar, e usar a skill `ponytail`
(`16-bootstrap-interativo.md`, Passo 4) para evitar reimplementar algo
que o próprio framework/stack do projeto já resolve.

Se a implementação de uma tarefa terminar em Pull Request, ver
`18-board-e-branch.md` — que só se aplica como fallback, quando o projeto
não tiver convenção própria de PR/branch já estabelecida.

## Regras gerais do fluxo

* A IA NUNCA decide tecnicamente sozinha — só apresenta opções; a decisão
  final é do time. Vale para todas as fases.
* Cada fase produz um artefato rastreável (`spec.md`, `tasks.md`) — nunca
  decisões que existem só na conversa.
* Entre fases, prefira reduzir o contexto carregado ao mínimo necessário
  para a fase seguinte (ver "Divulgação Progressiva" em
  `12-precedencia-e-divulgacao.md`) — a seção "Handoff" no topo de cada
  spec (ver `07-specs.md`) existe exatamente para isso.
