# /bob-create-agent

## Descrição

Cria um novo papel de agente em `.ai/agents/`, além dos 8 papéis padrão
(`spec/05-agentes.md`).

## Sintaxe

`/bob-create-agent <nome-do-papel>` — ex.: `/bob-create-agent dba`.

## Pré-condições

`.ai/` já existente.

## Aciona

Criação direta de um arquivo `.ai/agents/<nome-do-papel>.md`, seguindo a
estrutura obrigatória de `spec/05-agentes.md` (Papel, Responsabilidades,
Quando usar, Entradas, Processo, Restrições, Saída esperada).

## Processo

1. Perguntar ao dev o propósito do papel, suas responsabilidades
   principais, quando deve ser usado, e quaisquer restrições
   específicas.
2. Redigir o arquivo seguindo a estrutura obrigatória de
   `spec/05-agentes.md`, sem inventar responsabilidades não confirmadas
   pelo dev.
3. Gerar o preview em `create-agent.temp.md` com o conteúdo completo
   proposto.
4. Aguardar aprovação explícita antes de gravar o arquivo definitivo.
5. Se a ferramenta de IA em uso tiver um mecanismo nativo de
   papéis/agentes (ex.: subagentes), propor também o adaptador
   correspondente (ver `spec/11-adaptadores.md`).

## Saída esperada

`.ai/agents/<nome-do-papel>.md` criado, e adaptador de ferramenta
correspondente quando aplicável.
