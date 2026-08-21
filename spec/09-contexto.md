# Contexto

Crie:

```text
.ai/context/project-overview.md
.ai/context/architecture.md
.ai/context/structure.md
.ai/context/stack.md
.ai/context/integrations.md
.ai/context/conventions.md
.ai/context/testing.md
.ai/context/concerns.md
.ai/context/glossary.md
```

Estes arquivos representam conhecimento específico DESTE repositório, produzido por inspeção direta, não por suposição.

Diferente da constituição, estes arquivos PODEM conter informação específica de stack.

## Propósito de cada arquivo

* `project-overview.md` — o que o projeto é, a quem serve, seu escopo e limites.
* `architecture.md` — a arquitetura realmente implementada: camadas, módulos, limites, fluxo de dados, pontos de entrada.
* `structure.md` — um mapa diretório por diretório do repositório: o que existe em cada lugar e por quê.
* `stack.md` — linguagens, runtimes, frameworks, gerenciadores de pacotes, ferramentas de build e dependências principais, com as versões efetivamente em uso.
* `integrations.md` — serviços externos, APIs, SDKs, filas, bancos de dados e outros sistemas com os quais o código se comunica.
* `conventions.md` — convenções de nomenclatura, formatação e estrutura efetivamente seguidas no código (observadas, não aspiracionais).
* `testing.md` — frameworks de teste, organização, como executar os testes e o que é/não é de fato coberto.
* `concerns.md` — riscos conhecidos, dívida técnica, TODOs, áreas frágeis, dependências desatualizadas, pontos declarados como inaceitáveis pelo usuário (ver `16-bootstrap-interativo.md`, Passo 2 — com exemplo concreto no código quando existir), qualquer coisa que exija cautela, e — via `/bob-concerns` (`spec/19-comandos.md`) — violações de camada/SOLID, duplicação de código com oportunidade de extração, e convenção de nomenclatura de arquivos, cada uma com proposta de ação concreta.
* `glossary.md` — terminologia de domínio e específica do projeto.

## Exigência de profundidade

Um arquivo de contexto não está completo apenas por existir. Cada arquivo DEVE:

* Citar caminhos de arquivo concretos (entre crases) para afirmações não triviais.
* Distinguir o que é observado no código do que é apenas afirmado em documentação, comentários ou mensagens de commit existentes.
* Evitar generalidades vagas ("usa boas práticas modernas") em favor de afirmações específicas e verificáveis.
* Ser escrito de forma que outro agente possa agir com base nele sem precisar reler todo o codebase.
* Registrar quando foi mapeado pela última vez (data e, quando disponível, referência de commit/branch), para que passes futuros de mapeamento consigam detectar desvio (drift).

O agente DEVE inspecionar o repositório antes de preencher estes arquivos. Não invente informação sobre o projeto.

Exceção: em projetos greenfield, sem código ainda para inspecionar, ou
quando a stack não estiver claramente definida em um projeto já
existente, `project-overview.md`, `architecture.md`, `structure.md`,
`stack.md` e `integrations.md` são preenchidos a partir do entendimento
levantado com a skill `grill-me`
(`https://github.com/mattpocock/skills/tree/main/skills/productivity`)
durante o bootstrap (`16-bootstrap-interativo.md`, Passo 4) — decisões
declaradas pelo dev (arquitetura, divisão de pastas, local do `shared`,
stack e integrações propostas e aprovadas), não código observado. Isso
substitui, não contradiz, a exigência de evidência: a "evidência", nesse
caso, é a decisão explícita do dev, registrada como tal.

Para o processo completo, passo a passo, de mapeamento, use o workflow definido em `.ai/workflows/map-codebase.md`, seguindo o processo descrito em [`10-mapeamento-profundo.md`](10-mapeamento-profundo.md) e os templates em `/bob_framework/templates/`.
