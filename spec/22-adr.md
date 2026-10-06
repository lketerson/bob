# ADR — Registro de Decisões Arquiteturais

## Propósito

Um ADR (Architecture Decision Record) registra uma decisão técnica
relevante do projeto: o contexto em que foi tomada, o que foi decidido,
quais alternativas foram descartadas e por quê, e quais consequências o
time aceitou ao escolher esse caminho.

Existe para que o **porquê** de uma decisão não fique só na conversa em
que ela aconteceu — uma sessão ou agente futuro, sem acesso ao histórico
daquela conversa, consegue entender por que o projeto é como é, e um dev
novo não reabre uma discussão já encerrada sem saber que ela existiu.

ADRs vivem em `.ai/specs/decisions/` (`07-specs.md`) e são criados de
três formas:

* **Extração inicial no `/bob-start`** — durante o bootstrap, a partir
  das decisões já embutidas no código existente e das tomadas no próprio
  bootstrap (ver "Extração inicial no `/bob-start`", abaixo).
* **Sugestão do agente** — durante o trabalho, quando uma decisão
  digna de registro acaba de ser tomada (ver "Quando sugerir", abaixo).
* **Comando `/bob-adr`** — quando o dev quer registrar uma decisão
  diretamente, passando uma instrução ou respondendo às perguntas do
  agente (`19-comandos.md`, `templates/commands/adr.md`).

Em todos os casos o agente NUNCA cria um ADR sem preview e aprovação
explícita do dev (`19-comandos.md`, "Regra de preview").

## Diferença para outros artefatos

| Artefato | Registra | Exemplo |
|---|---|---|
| `specs/features/<slug>/` | O QUE construir numa feature | "Login com e-mail e senha" |
| `instructions/erros-corrigidos.md` | Regras generalizadas a partir de correções do dev | "Nomes de função devem ser descritivos" |
| `specs/decisions/` (ADR) | POR QUE o projeto seguiu um caminho técnico, e o que foi descartado | "Usar fila assíncrona em vez de chamada síncrona para envio de e-mail" |

Uma mesma conversa pode gerar mais de um desses — ex.: uma correção do
dev que reverte uma escolha de arquitetura gera uma regra em
`erros-corrigidos.md` e, se atender aos critérios abaixo, também um ADR.

## Estrutura

```text
.ai/specs/decisions/
├── README.md               (índice — criado junto com o primeiro ADR)
├── 0001-<slug>.md
├── 0002-<slug>.md
└── ...
```

* Numeração sequencial de 4 dígitos, nunca reaproveitada — mesmo que um
  ADR seja depreciado ou substituído, seu número continua ocupado.
* `<slug>` em kebab-case, descrevendo a decisão (não o problema) — ex.:
  `0003-usar-fila-para-envio-de-email.md`.
* Conteúdo seguindo o template `templates/specs/adr.md`, no idioma
  escolhido no bootstrap (`16-bootstrap-interativo.md`, Passo 0).

### Índice (`README.md`)

Tabela única, uma linha por ADR, mais recente no topo:

```markdown
# Decisões

| ADR | Título | Status | Data |
|---|---|---|---|
| [0002](0002-usar-fila-para-envio-de-email.md) | Usar fila para envio de e-mail | Aceita | AAAA-MM-DD |
| [0001](0001-adotar-postgres.md) | Adotar PostgreSQL | Substituída por [0004](0004-...md) | AAAA-MM-DD |
```

O índice é o ponto de entrada da divulgação progressiva
(`12-precedencia-e-divulgacao.md`): um agente lê o índice para saber
quais decisões existem e só abre o ADR individual quando ele for
relevante à tarefa atual.

## Ciclo de vida (evolução das decisões)

```text
Proposta → Aceita → Depreciada
                  ↘ Substituída por ADR-NNNN
```

* **Proposta** — redigida, ainda aguardando decisão do time (ex.: ADR
  criado para discutir alternativas antes de decidir).
* **Aceita** — decisão em vigor.
* **Depreciada** — deixou de valer, sem que outra decisão a substitua
  (ex.: o módulo que ela regia foi removido).
* **Substituída por ADR-NNNN** — uma decisão nova tomou o lugar desta.

Um ADR aceito é **imutável no conteúdo**: decisões evoluem por novos
ADRs, nunca reescrevendo o antigo. A única alteração permitida num ADR
já aceito é atualizar o campo `Status` (e o link para o ADR que o
substitui). Isso mantém o histórico completo — dá para ler a sequência
de ADRs de um tema e entender como e por que a decisão mudou ao longo do
tempo.

Ao criar um ADR que substitui outro, no mesmo preview:

1. O ADR novo preenche `Substitui: ADR-NNNN`.
2. O ADR antigo tem o `Status` alterado para `Substituída por ADR-MMMM`.
3. O índice é atualizado nas duas linhas.

Correção de erro de digitação ou link quebrado num ADR aceito não é
mudança de decisão e PODE ser feita diretamente.

## Quando um ADR vale a pena

Uma decisão merece ADR quando atende a pelo menos um destes critérios:

* Escolha entre alternativas técnicas reais com trade-offs — o gate de
  "Decisão técnica" de `17-sdd-workflow.md` (arquitetura, tecnologia,
  modelagem de dados, estratégia de rollout).
* Adoção, remoção ou substituição de uma dependência com peso
  arquitetural (`context/stack.md`).
* Definição ou mudança de um contrato público (API, schema, evento).
* Adoção de um padrão/convenção que passa a valer para o projeto todo
  (ex.: estratégia de tratamento de erros, organização de camadas).
* Reversão ou mudança de uma decisão já registrada em outro ADR.
* Decisão que um dev novo provavelmente questionaria ("por que não
  usamos X?").

NÃO merece ADR: detalhe local de implementação, escolha de nome, ajuste
pontual sem efeito fora do arquivo, ou qualquer coisa que já esteja
coberta integralmente por uma spec de feature ou por
`erros-corrigidos.md`. Na dúvida, perguntar ao dev em vez de criar.

## Quando sugerir (agente)

Todo agente — em especial Techlead e Architect (`05-agentes.md`) — DEVE
sugerir ao dev o registro de um ADR quando, durante a sessão:

* o dev escolhe entre alternativas apresentadas pelo agente e a escolha
  atende aos critérios acima;
* o gate de "Decisão técnica" de uma spec (`17-sdd-workflow.md`, Fase 2)
  é resolvido;
* o dev pede uma mudança que contradiz um ADR aceito (ver "Consulta",
  abaixo) — nesse caso, sugerir um ADR novo que substitui o antigo.

Forma da sugestão: curta, no fim da resposta, sem interromper o
trabalho — ex.: "Essa escolha de fila em vez de chamada síncrona parece
uma decisão que vale registrar. Quer que eu crie um ADR (`/bob-adr`)?".
Regras:

* Nunca criar o ADR sem o dev aceitar a sugestão.
* Sugerir uma vez por decisão — se o dev recusar, não repetir a mesma
  sugestão naquela sessão.
* Se o dev aceitar, seguir o mesmo processo de `/bob-adr`, já com a
  instrução preenchida a partir do contexto da conversa (alternativas
  discutidas, motivo da escolha) — sem refazer perguntas já respondidas.
* Uma decisão tomada no meio de uma spec PODE ser registrada antes da
  spec ser concluída; o campo "Decisões já tomadas" do Handoff da spec
  (`07-specs.md`) passa a referenciar o ADR (ex.: `ADR-0003`) em vez de
  repetir o conteúdo.

## Extração inicial no `/bob-start`

O bootstrap (`16-bootstrap-interativo.md`) é o momento em que mais
decisões aparecem de uma vez — seja porque já estão embutidas no código
existente, seja porque acabaram de ser tomadas nas perguntas do próprio
bootstrap. Por isso, `/bob-start` identifica esses pontos e propõe
extraí-los como ADRs já na criação do `.ai/`, em vez de esperar que
surjam um a um nas sessões seguintes.

### Fontes

* **Codebase existente** — a partir da descoberta
  (`13-descoberta-e-migracao.md`) e do mapeamento já feito (evidência
  direta, nunca suposição): dependências com peso arquitetural
  (`context/stack.md`), padrão arquitetural efetivamente usado
  (`context/architecture.md`), integrações externas, documentação de
  arquitetura existente, e mensagens de commit/PR que registram uma
  migração ou troca deliberada (ex.: "migra de X para Y").
* **Decisões tomadas no próprio bootstrap** — stack e integrações
  aprovadas a partir do `grill-me`, arquitetura escolhida, divisão de
  pastas (module-first/layer-first) e local dos itens reutilizáveis
  (`16-bootstrap-interativo.md`, Passo 4).

Decisões já registradas em ADRs existentes no repositório (seção
"ADRs já existentes no repositório", abaixo) não viram candidatas de
novo — são migradas ou referenciadas, nunca duplicadas.

### Processo

1. Listar ao dev as decisões candidatas, aplicando os critérios de
   "Quando um ADR vale a pena" — cada uma com título, a evidência
   (caminho de arquivo, dependência, commit) ou o passo do bootstrap de
   onde veio, e uma linha do que foi decidido. Priorizar as de maior
   peso; evitar inundar o dev com dezenas de candidatas triviais.
2. O dev escolhe quais registrar — todas, algumas ou nenhuma.
3. Para cada escolhida, preencher o ADR a partir do que já se sabe.
   Para decisões herdadas do código, o **motivo** raramente está na
   evidência: perguntar ao dev; se ninguém souber, registrar
   explicitamente no Contexto "motivo original não documentado —
   decisão herdada, identificada em `<evidência>`", sem inventar uma
   justificativa. Alternativas não conhecidas ficam como não
   documentadas, nunca inventadas.
4. Os ADRs escolhidos (status `Aceita`, numerados a partir de `0001`) e
   o índice entram no mesmo preview `start.temp.md` do bootstrap
   (`16-bootstrap-interativo.md`, Passo 8) — sem preview próprio.
5. Candidatas não escolhidas não são registradas em lugar nenhum; o dev
   pode registrá-las depois com `/bob-adr`.

A mesma extração é oferecida quando um `.ai/` já existente é
sincronizado (`20-versionamento.md`) a partir de uma versão do
`bob_framework` anterior à introdução de ADRs — usando o preview
daquela sincronização (`start.temp.md` ou `update.temp.md`).

## Consulta

Antes de propor arquitetura, tecnologia ou padrão novo, o agente DEVE
ler o índice `.ai/specs/decisions/README.md` (quando existir) e abrir os
ADRs aceitos relevantes à tarefa. Se a proposta contradiz um ADR aceito,
o agente DEVE dizer isso explicitamente ao dev, citando o ADR — nunca
contradizer uma decisão registrada em silêncio. O dev então decide entre
seguir o ADR ou substituí-lo por um novo.

Na precedência (`12-precedencia-e-divulgacao.md`), um ADR aceito tem o
mesmo peso de uma especificação: prevalece sobre requisitos pontuais da
tarefa, mas não sobre a constituição nem sobre as instruções do projeto.
Uma decisão que precisaria mudar a constituição não é resolvida por ADR
— é uma alteração da própria constituição, com aprovação do time.

## ADRs já existentes no repositório

Se a descoberta (`13-descoberta-e-migracao.md`) encontrar ADRs em outro
lugar (ex.: `docs/adr/`, `doc/architecture/decisions/`, formato
adr-tools/MADR), NÃO duplicar nem mover silenciosamente. Perguntar ao
dev entre:

1. **Migrar** para `.ai/specs/decisions/`, preservando conteúdo e
   numeração originais (só renomear/realocar — mesma regra de
   `13-descoberta-e-migracao.md`).
2. **Manter onde estão** — `.ai/specs/decisions/README.md` passa a
   apontar para o diretório existente, e `/bob-adr` grava os novos ADRs
   lá, seguindo o formato e a numeração já em uso naquele diretório.

## Versionamento

Criar ou atualizar um ADR NÃO adiciona entrada em `.ai/CHANGELOG.md` —
mesma regra de `/bob-create-spec` (`20-versionamento.md`): decisões do
projeto têm seu próprio rastro no índice de `specs/decisions/`, e
misturá-las ao changelog do `.ai/` o transformaria num changelog de
produto.
