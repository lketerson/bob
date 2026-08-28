# Contribuindo com o BoB

## 1. Abra uma issue antes

Toda contribuição começa com uma issue descrevendo o quê e o porquê.
Nada de PR direto sem issue associada — isso evita trabalho duplicado e
alinha a mudança antes de qualquer código ser escrito.

## 2. Branch

Uma branch por issue, no padrão `<tipo>/<id-da-issue>-<slug>` — ex.:
`fix/42-corrigir-link-quebrado-no-readme`.

`<tipo>` é um destes quatro, sem exceção:

| Tipo | Quando usar |
|---|---|
| `add` | Adiciona algo que não existia (spec, template, comando, seção) |
| `remove` | Remove algo existente |
| `improve` | Melhora algo existente sem mudar o que ele faz |
| `fix` | Corrige um comportamento errado ou incorreto |

## 3. Pull Request

* Referencie a issue no corpo do PR (`Closes #42`).
* Descreva o quê e o porquê — o diff já mostra o como.
* Um PR por issue. Não agrupe mudanças não relacionadas.

## 4. Versionamento

O PR que fecha a issue deve incluir uma entrada nova no topo do
`CHANGELOG.md` (`## [x.y.z] - AAAA-MM-DD`), seguindo
[SemVer](https://semver.org/lang/pt-BR/). O `<tipo>` da branch (passo 2)
decide qual parte do número sobe:

| `<tipo>` | Afeta |
|---|---|
| `fix` | `z` (patch) |
| `improve` | `z` (patch) |
| `add` | `y` (minor) |
| `remove` | `y` (minor) |

`x` (major) é exceção — só sobe em uma mudança muito grande (ex.:
reestruturação que quebra compatibilidade com `.ai/` já gerados por
versões anteriores), e é uma decisão explícita de quem revisa o PR, nunca
inferida automaticamente do `<tipo>`.

Ao mergear em `master`, a entrada mais recente do `CHANGELOG.md` é lida
automaticamente para criar a tag e a GitHub Release correspondentes — ver
`.github/workflows/release.yml`. Não crie tags manualmente.

## 5. Licença

Ao contribuir, você concorda que sua contribuição será distribuída sob a
mesma licença do projeto ([MIT](LICENSE)).
