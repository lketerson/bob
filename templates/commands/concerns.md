# /bob-concerns

## Descrição

Auditoria retrospectiva do código em busca de violações de camada,
violações de princípios SOLID (com foco em Inversão de Dependência),
duplicação de código com oportunidade de extração, e convenção de
nomenclatura de arquivos — registrando cada achado, com uma proposta de
ação concreta, em `.ai/context/concerns.md`.

Este comando não é o mecanismo primário de garantia de SOLID/DIP/SRP no
projeto — essa é uma responsabilidade contínua e proativa dos agentes
Architect, Developer e Techlead durante o design e a implementação (ver
`spec/05-agentes.md`). `/bob-concerns` apenas identifica o que escapou
desse cuidado, como uma checagem periódica.

## Sintaxe

`/bob-concerns [escopo opcional]` — sem argumento, analisa o repositório
inteiro; com um caminho, restringe a análise a essa área.

## Pré-condições

`.ai/` já existente. Funciona melhor com `.ai/context/architecture.md`,
`structure.md`, `conventions.md` e `stack.md` já mapeados
(`/bob-map-codebase`), mas PODE operar com inspeção direta do código na
ausência deles.

## Aciona

Agente Mapper (`spec/05-agentes.md`) e o processo descrito em
`.ai/workflows/concerns.md` (copiado de
`templates/workflows/concerns.md`).

## Processo

Segue integralmente `.ai/workflows/concerns.md`: violações de camada →
princípios SOLID/Inversão de Dependência → duplicação de código e
oportunidades de extração → convenção de nomenclatura de arquivos →
registro em `concerns.md` com proposta concreta para cada achado →
relatório resumido ao dev.

## Saída esperada

`.ai/context/concerns.md` criado ou atualizado com os achados e
propostas, e um relatório resumido apresentado ao dev. Nenhum código de
produto é alterado — apenas propostas são registradas; implementá-las é
trabalho do Developer, tipicamente a partir de uma spec/task própria
(`/bob-create-spec`). Não requer preview em `[slug].temp.md` — o relatório
final cumpre esse papel de revisão, mesmo padrão de `/bob-map-codebase`.
