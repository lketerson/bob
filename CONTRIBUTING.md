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

## 4. Licença

Ao contribuir, você concorda que sua contribuição será distribuída sob a
mesma licença do projeto ([MIT](LICENSE)).
