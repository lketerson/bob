# Versionamento

Este framework versiona **duas coisas distintas**, que nunca devem ser
confundidas entre si:

```text
A. O bob_framework em si         → CHANGELOG.md (raiz deste repositório)
B. O .ai/ de cada projeto-alvo   → .ai/CHANGELOG.md
```

`A` muda quando a especificação/templates evoluem (este repositório).
`B` muda quando o `.ai/` de um projeto específico é criado ou atualizado
(novo agente, nova skill, sincronização com uma versão nova de `A`
etc.). Um projeto-alvo nunca versiona `A` — apenas registra, via carimbo
(seção "Carimbo de versão", abaixo), qual versão de `A` gerou seu `.ai/`.

## A. Versionamento do `bob_framework`

Mantido em `CHANGELOG.md`, na raiz deste repositório, seguindo
[SemVer](https://semver.org/lang/pt-BR/) (`MAJOR.MINOR.PATCH`):

* **MAJOR** — mudança estrutural que quebra compatibilidade com um
  `.ai/` já gerado por versão anterior (ex.: renomear ou remover um
  arquivo/diretório obrigatório de `spec/02-estrutura-diretorios.md`).
* **MINOR** — nova capacidade compatível com o que já existe (ex.: novo
  comando, novo template de agente, novo arquivo de `spec/`).
* **PATCH** — correção, esclarecimento ou ajuste de texto sem mudança de
  estrutura ou comportamento (ex.: link quebrado, ambiguidade
  esclarecida).

Formato de cada entrada, mais recente no topo:

```markdown
## [x.y.z] - AAAA-MM-DD

<Um parágrafo descrevendo o que mudou e por quê — não uma lista de
commits.>
```

Toda mudança não trivial (mesmo critério objetivo de
`14-readme-e-validacao.md`) feita em `spec/` ou `templates/` DEVE
adicionar uma entrada a este `CHANGELOG.md` antes de considerar a
mudança concluída.

## B. Versionamento do `.ai/` de um projeto-alvo

Mantido em `.ai/CHANGELOG.md` (arquivo obrigatório — ver
`02-estrutura-diretorios.md`), criado durante o bootstrap
(`16-bootstrap-interativo.md`, Passo 7) com a entrada inicial:

```markdown
## [0.1.0] - AAAA-MM-DD

Bootstrap inicial do framework: <resumo curto do que foi criado — agentes
aprovados, skills instaladas, MCPs habilitados>.
```

Mesma convenção SemVer e mesmo formato de entrada de `A`, mas versionando
a instância deste `.ai/`, não o framework-fonte:

* **MAJOR** — mudança estrutural relevante na instância (ex.: adoção de
  um novo agente que reorganiza responsabilidades existentes, migração
  de um `.ai/` não-framework — `13-descoberta-e-migracao.md`).
* **MINOR** — adição compatível (novo agente, nova skill, novo MCP,
  sincronização com uma versão MINOR do `bob_framework`).
* **PATCH** — correção pontual em conteúdo já existente (ex.: ajuste em
  `instructions/`, sincronização com uma versão PATCH do
  `bob_framework`).

Todo comando que grava algo em `.ai/` depois do bootstrap
(`/bob-create-agent`, `/bob-create-skill`, `/bob-add-skill`,
`/bob-add-mcp`, e a retomada/sincronização de `/bob-start` — ver
`19-comandos.md`) DEVE adicionar uma entrada correspondente a
`.ai/CHANGELOG.md` como parte do mesmo preview/aprovação daquele
comando. `/bob-create-spec` NÃO adiciona entrada aqui — a evolução de
uma feature specific tem seu próprio rastro em
`.ai/specs/features/<slug>/` e, quando há board, no próprio board
(`17-sdd-workflow.md`, `18-board-e-branch.md`); misturar os dois
transformaria o changelog do framework em um changelog de produto.

## Carimbo de versão (detecção de drift)

Além do changelog de `B` (que registra a evolução do próprio `.ai/`),
`.ai/README.md` carrega, logo no topo, um carimbo de qual versão de `A`
gerou ou sincronizou por último este `.ai/`:

```markdown
> **Gerado a partir do bob_framework:** vX.Y.Z
```

Este carimbo é o que permite a um agente, numa sessão futura, distinguir
sem ambiguidade três estados de um `.ai/` já existente e reconhecível
como deste framework (`19-comandos.md`, cenários 2 e 3):

* Carimbo == versão atual do `bob_framework` → nenhuma ação (cenário 2).
* Carimbo < versão atual do `bob_framework` → **desatualizado**, aciona
  a sincronização abaixo.
* Estrutura incompleta (independente do carimbo) → **bootstrap
  interrompido**, ver `13-descoberta-e-migracao.md` — não é um problema
  de versão, é um bootstrap que nunca terminou.

## Sincronização (`.ai/` desatualizado)

Quando `/bob-start` detecta um carimbo desatualizado:

1. Ler, no `CHANGELOG.md` do `bob_framework`, as entradas mais recentes
   que o carimbo registrado.
2. Resumir ao dev, em linguagem simples, o que mudou estruturalmente
   desde aquela versão (ex.: "a versão 1.3.0 adicionou o comando
   `/bob-security` e o arquivo `constitution/quality.md`") e o que
   precisaria ser adicionado/atualizado neste `.ai/` para acompanhar.
3. Gerar o preview em `start.temp.md` com os arquivos que seriam
   criados/alterados.
4. Aguardar aprovação explícita — uma mudança MAJOR do `bob_framework`
   NUNCA é aplicada automaticamente, mesmo com aprovação genérica de
   "sincronizar", porque pode implicar decisão que afeta convenções já
   em uso no projeto (ver `12-precedencia-e-divulgacao.md`).
5. Após aprovação e gravação: atualizar o carimbo em `.ai/README.md`
   para a nova versão e adicionar a entrada correspondente em
   `.ai/CHANGELOG.md` (ex.: `## [1.3.0] - AAAA-MM-DD` — "Sincronizado
   com bob_framework v1.3.0: adiciona `/bob-security` e
   `constitution/quality.md`").
6. Se o dev recusar, não alterar nada — o `.ai/` continua na versão
   antiga, funcional, apenas sem as capacidades novas.
