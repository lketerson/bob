# /bob-create-skill

## Descrição

Cria uma nova skill técnica do zero em `.ai/skills/`, seguindo
`spec/06-skills.md`.

## Sintaxe

`/bob-create-skill <nome-da-skill>` — ex.: `/bob-create-skill supabase`.

## Pré-condições

`.ai/` já existente, com `.ai/skills/README.md` criado.

## Aciona

Criação de `.ai/skills/<nome-da-skill>/SKILL.md`, seguindo a estrutura
de `spec/06-skills.md` (Propósito, Quando usar, Pré-requisitos,
Conhecimento, Regras, Fluxo de trabalho recomendado, Validação, Erros
comuns).

## Processo

1. Confirmar que a tecnologia/conhecimento da skill é de fato usada no
   projeto (`spec/06-skills.md` proíbe skills de tecnologia que o
   repositório não usa).
2. Perguntar ao dev o conteúdo de cada seção obrigatória, ou pesquisar
   ativamente quando o dev pedir para o agente propor o conteúdo.
3. Se a skill usar um MCP, incluir a seção obrigatória
   `## Permissões MCP`.
4. Garantir que a skill referencie fatos do repositório a partir de
   `.ai/context/`/`.ai/instructions/` em vez de embuti-los diretamente
   (evita divergência entre cópias adaptadas por ferramenta).
5. Gerar o preview em `create-skill.temp.md`.
6. Aguardar aprovação explícita antes de gravar.

## Saída esperada

`.ai/skills/<nome-da-skill>/SKILL.md` criado, e `.ai/skills/README.md`
atualizado se necessário para listar a nova skill.
