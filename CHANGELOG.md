# Changelog — `bob_framework`

Versionamento deste repositório (a especificação-fonte), seguindo
[SemVer](https://semver.org/lang/pt-BR/). Para o versionamento do `.ai/`
gerado em cada projeto-alvo, ver `.ai/CHANGELOG.md` daquele projeto e
`spec/20-versionamento.md`.

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
