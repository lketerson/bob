# Changelog — `bob_framework`

Versionamento deste repositório (a especificação-fonte), seguindo
[SemVer](https://semver.org/lang/pt-BR/). Para o versionamento do `.ai/`
gerado em cada projeto-alvo, ver `.ai/CHANGELOG.md` daquele projeto e
`spec/20-versionamento.md`.

## [1.5.0] - 2026-08-28

Fecha a lacuna de saúde comunitária do repositório no GitHub e cobre
duas mudanças anteriores que tinham ficado sem entrada no changelog:

- `CONTRIBUTING.md`: fluxo de contribuição issue-first, os quatro tipos
  de branch (`add`/`remove`/`improve`/`fix`) e a regra de versionamento
  que mapeia cada tipo para `x.y.z` — `fix`/`improve` sobem o patch,
  `add`/`remove` sobem o minor, major é sempre decisão manual (retroativo
  ao commit que introduziu o `CONTRIBUTING.md`).
- `README.md`: seção "Motivação" explicando por que o BoB existe
  (retroativo).
- `.github/ISSUE_TEMPLATE/` e `.github/PULL_REQUEST_TEMPLATE.md`:
  estruturam o fluxo já definido no `CONTRIBUTING.md` (bug report /
  proposta de mudança, checklist de PR) em vez de depender de prosa.
- `.github/workflows/ci.yml` + `.markdownlint.jsonc`: lint de markdown e
  checagem de links (internos e externos) em todo push/PR.
- `CODE_OF_CONDUCT.md`: adaptado do Contributor Covenant 2.1, fechando o
  checklist de "Community Standards" do GitHub junto com
  `CONTRIBUTING.md`/`LICENSE`.
- `.github/workflows/release.yml`: cria tag e GitHub Release
  automaticamente a partir da entrada mais recente deste arquivo a cada
  push em `master`, usado pela primeira vez na v1.4.1.

## [1.4.1] - 2026-08-28

Adiciona o badge de status do CI (`.github/workflows/ci.yml`) ao header
do `README.md`, ao lado dos badges já existentes de licença e de stars —
agora que existe um workflow de CI real (lint de markdown + checagem de
links), ele fica visível a quem chega no repositório.

## [1.4.0] - 2026-08-23

Novo Passo 7 no bootstrap interativo (`spec/16-bootstrap-interativo.md`):
pergunta ao dev, apenas quando a ferramenta de IA em uso suportar (ex.:
Claude Code), se deseja configurar uma barra de status (status line)
mostrando modelo, consumo de janela de contexto, branch Git e limites de
uso, com escopo local/global igual ao das demais decisões de ferramenta.
Adiciona o adaptador default pronto para copiar em
`templates/adapters/statusline.js` (`spec/11-adaptadores.md`, nova seção
"Barra de status"), e a seção "Ferramentas de IA" — antes ausente — em
`templates/context/integrations.md`, onde a decisão (habilitado/
desabilitado, escopo) é registrada, junto ao board e aos MCPs já
previstos ali. Corrige também, em `start.md`, a referência a um "item 1c"
do `README.md` que não existe mais na versão atual do Quickstart.

## [1.3.0] - 2026-08-21

O agente Security (`spec/05-agentes.md`) passa a identificar também
exposição a negação de serviço (DoS/DDoS) — ausência de rate
limiting, payloads/uploads sem limite de tamanho, consultas sem
paginação, ReDoS, ausência de timeout em chamadas externas, falta de
proteção de borda — reportando achado e mitigação sugerida, nunca
executando ou simulando o ataque. Reflete a mesma categoria na descrição
de `templates/commands/security.md` (`/bob-security`).

## [1.2.0] - 2026-08-21

No fluxo de reorganização de um `.ai/` já existente mas não gerado pelo
BoB (`spec/13-descoberta-e-migracao.md`), exige que o framework deixe
explícito, antes de perguntar se o usuário quer migrar: que tem
liberdade para renomear arquivos e realocar informações, mas não para
alterar o conteúdo de informações já existentes; e que recomende
versionamento (Git) ou cópia da pasta como backup antes de prosseguir,
caso o repositório ainda não esteja versionado. Exige confirmação
explícita do usuário dessas condições, distinta da aprovação do preview.
Reflete o mesmo aviso, resumido, no passo 3 de "Codebase existente" do
Quickstart do `README.md`.

## [1.1.0] - 2026-08-21

Divide o Quickstart do `README.md` em dois caminhos — "Novo projeto"
(bootstrap direto, sem checagem de convenção de Git prévia) e "Codebase
existente" (descoberta do repositório antes de qualquer pergunta,
`/bob-map-codebase` ao final) — cada um com um guia curto de setup, e
adiciona uma tabela com todos os comandos `/bob-*` invocáveis
diretamente no Quickstart.

## [1.0.0] - 2026-08-21

Primeira versão pública do BoB.

- Especificação completa em `spec/`, com o sistema de comandos
  `/bob-[nome]` (`spec/19-comandos.md`), o fluxo de bootstrap interativo
  (`spec/16-bootstrap-interativo.md`), o workflow de SDD em fases
  (`spec/17-sdd-workflow.md`) e o versionamento do `.ai/` gerado em cada
  projeto-alvo (`spec/20-versionamento.md`).
- Templates prontos para copiar em `templates/` (agente mapper, workflows
  de mapeamento/concerns, esqueletos de `.ai/context/`, comandos e
  specs).
- `README.md` com header (logo + título "BoB") e seções curtas no estilo
  do README do [gsd-core](https://github.com/open-gsd/gsd-core), e
  `LICENSE` (MIT).
