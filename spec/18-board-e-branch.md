# Board e Branch — Fallback Padrão do Framework

## Quando este spec se aplica

**Esta é uma convenção de fallback.** Antes de aplicar qualquer coisa
deste arquivo, seguir `13-descoberta-e-migracao.md`: inspecionar o
repositório em busca de uma convenção de branch/PR/board já estabelecida
(histórico Git, `CONTRIBUTING.md`, templates de PR, documentação do time).

Se uma convenção própria e consistente já existir, ela DEVE prevalecer —
este arquivo NÃO DEVE substituí-la. Documentá-la em
`.ai/instructions/git.md`, conforme já determina
`13-descoberta-e-migracao.md`.

Só adote o board e o workflow de PR descritos abaixo quando a descoberta
não encontrar nenhuma convenção própria e clara, e o usuário confirmar
que quer adotar o padrão do framework — mesmo processo de confirmação já
exigido para convenções de Git em `13-descoberta-e-migracao.md`.

Além disso, este spec é condicionado à decisão tomada em
`16-bootstrap-interativo.md` (Passo 1 — Board e Gitflow): se o usuário
optar por não usar nenhum board, um projeto pequeno PODE legitimamente
trabalhar apenas com a branch principal (`main`/`master`), sem o board
nem o fluxo de branch/PR abaixo. Nesse caso, `17-sdd-workflow.md`
continua produzindo `spec.md`/`tasks.md` localmente, mas a Fase 4
(Implementação) commita diretamente na branch principal, sem branch
dedicada nem Pull Request.

## Board

Estados do card, em ordem:

```text
NEW → APPROVED → IN_PROGRESS → COMMITTED → REVIEWED → (deploy) → MERGED/QAV (homologação) → DONE/PROD
```

* Gate de CR (code review), logo após `COMMITTED`: se reprovado, o card vai
  para `REPROVED` em vez de avançar para `REVIEWED`.
* Gate de QA, logo após `MERGED/QAV` (homologação): se reprovado, o card
  vai para `REPROVED` em vez de avançar para `DONE/PROD`.
* `REPROVED` sempre volta o card para `IN_PROGRESS`, independente de ter
  vindo do gate de CR ou do gate de QA. Isso também é um dos gatilhos de
  `.ai/instructions/erros-corrigidos.md` (`04-instrucoes.md`,
  `05-agentes.md`) — a razão de rejeição registrada no card DEVE virar
  uma entrada genérica antes de retomar o trabalho.
* **1 card = 1 tarefa + 1 branch + 1 PR.** Nunca agrupar múltiplas tarefas
  não relacionadas em um único card/branch/PR.
* SLA: por padrão, um card não deve ficar mais de 48h esperando CR — este
  valor é um exemplo de partida, não uma prescrição fixa; o projeto/dev é
  livre para definir outro prazo, documentando a escolha em
  `.ai/instructions/git.md` ou `.ai/context/concerns.md`. Se o prazo
  vigente for ultrapassado, sinalizar.
* O board se move conforme a iteração/sprint em andamento — não fica
  parado entre iterações.

Campos do card:

| Campo | Conteúdo |
|---|---|
| Descrição | O que a tarefa faz |
| System Info | Contexto técnico relevante (área/módulo/serviço afetado) |
| Critérios de aceite | Do `tasks.md`/spec de origem |
| Razão de Rejeição | Preenchido ao cair em `REPROVED` — motivo + se foi CR ou QA |
| CR Reject Count | Quantas vezes foi reprovado em CR |
| QA Reject Count | Quantas vezes foi reprovado em QA |

## Branch

Uma branch por card, no padrão `<tipo>/<id-da-tarefa>-<slug>` — ex.:
`feat/1234-adicionar-botao-login`. `<tipo>` sugerido por padrão:

* `feat` — nova funcionalidade.
* `fix` — correção de bug.
* `hotfix` — correção urgente, direto para produção.

Esse vocabulário de `<tipo>` é um ponto de partida, não uma lista fechada
— o projeto/usuário é livre para definir outros tipos além destes (ex.:
`chore`, `docs`, `refactor`), desde que a convenção escolhida seja
documentada em `.ai/instructions/git.md`. O `<slug>` (descrição curta,
kebab-case) fica a critério do projeto.

### Branch de epic como sync (opcional)

Se o time trabalhar com **epics** — um nível de agrupamento acima da User
Story — a branch da epic PODE funcionar como branch de sincronização
(sync) de todas as branches de task/US geradas para aquela epic: as
branches de task/US fazem merge na branch da epic, não diretamente na
branch de release/main; só ao final é que a branch da epic faz merge em
prod/main.

Isso é condicional: só se aplica quando o projeto efetivamente trabalha
com epics. Na ausência de epics, o fluxo padrão continua sendo o descrito
acima — branches de task indo direto para o caminho de release, conforme
o diagrama.

## Pull Request

### Gates obrigatórios antes de abrir

Antes de abrir um PR, além da Definição de Pronto que já se aplica a toda
demanda (`08-workflows.md` — lint/build, testes, ausência de segredo no
diff, critérios de aceite verificados), DEVE passar também:

* Checagem de impacto em documentação — se a mudança afeta
  comportamento/arquitetura documentado em `.ai/context/`, o PR deve
  incluir a atualização correspondente ou sinalizar que ela é necessária.
* Para mudanças significativas: um "gate de contexto para o revisor" — a
  descrição do PR DEVE conter o quê, por quê, trade-offs considerados,
  alternativas rejeitadas e riscos futuros, não só o diff.

### Abertura

* PR sempre aberto como **draft** — publicá-lo (tirar do draft) é decisão
  do autor humano, nunca automática.
* Reviewer é **perguntado por PR** — nunca um default fixo assumido pelo
  agente.
* Mudança que envolve schema/migration exige reviewer dono daquele
  domínio — também perguntado, nunca assumido.

### O agente nunca aprova nem finaliza PR sozinho

Um agente que abre PR via MCP NUNCA aprova, faz merge/complete, ou muda o
estado do board por conta própria sem o gate correspondente (CR/QA) ter
passado de fato. Ver `06-skills.md` para a exigência de toda skill que usa
MCP declarar isso explicitamente.

### Revisão

O papel `reviewer` (`05-agentes.md`), ao revisar um PR aberto via MCP:

* Comenta no PR apenas achados de severidade **Crítica** ou **Alta** —
  nunca posta achados de severidade Média/Baixa como comentário de PR
  (podem ser reportados de outra forma, ex. resumo ao usuário).
* A decisão é sempre **consultiva** — o reviewer nunca aciona
  aprovação/merge sozinho, mesmo quando não encontra problemas.

## Material de apoio

Workflow operacional copiável em
[`templates/workflows/pull-request.md`](../templates/workflows/pull-request.md)
→ `.ai/workflows/pull-request.md`.
