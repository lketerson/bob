# /bob-validate

## Descrição

Executa o checklist de validação de `.ai/` descrito em
`spec/14-readme-e-validacao.md` contra o estado atual do projeto.

## Sintaxe

`/bob-validate` — sem argumentos.

## Pré-condições

`.ai/` já existente.

## Aciona

Leitura e verificação de `.ai/` contra o checklist de
`spec/14-readme-e-validacao.md` — sem escrever nada.

## Processo

1. Verificar que todo diretório e arquivo obrigatório de
   `spec/02-estrutura-diretorios.md` existe, incluindo `.ai/commands/`.
2. Verificar os demais itens do checklist de
   `spec/14-readme-e-validacao.md` (idioma consistente, links internos
   válidos, adaptadores mínimos, ausência de duplicação, etc.).
3. Reportar ao dev, item a item, o que passou e o que falhou, com o
   caminho de arquivo relevante para cada falha.

## Saída esperada

Um relatório de validação — nenhum arquivo é criado ou alterado por este
comando.
