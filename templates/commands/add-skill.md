# /bob-add-skill

## Descrição

Instala no projeto uma skill já existente vinda de um
marketplace/registro externo — diferente de `/bob-create-skill`, que cria
uma skill nova do zero.

## Sintaxe

`/bob-add-skill <nome-ou-url-da-skill>`.

## Pré-condições

`.ai/` já existente. Requer que o dev informe a origem
(marketplace/registro) e a skill desejada — o framework NÃO DEVE assumir
ou inventar um marketplace específico (`spec/16-bootstrap-interativo.md`,
Passo 4).

## Aciona

Registro da origem e da skill em `.ai/skills/README.md` (ou estrutura
equivalente), e instalação seguindo o mecanismo específico da ferramenta
de IA em uso, quando houver um nativo (ex.: marketplace de skills do
Claude Code).

## Processo

1. Perguntar ao dev a origem (URL do marketplace/registro) e o
   nome/identificador da skill.
2. Confirmar com o dev que é a skill correta antes de prosseguir.
3. Gerar o preview em `add-skill.temp.md` com o que será
   registrado/instalado.
4. Aguardar aprovação explícita antes de instalar.

## Saída esperada

Skill instalada e registrada, com a origem documentada em
`.ai/skills/README.md` para rastreabilidade futura.
