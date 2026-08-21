# Workflows

Crie:

```text
.ai/workflows/feature.md
.ai/workflows/bugfix.md
.ai/workflows/refactor.md
.ai/workflows/code-review.md
.ai/workflows/map-codebase.md
```

Workflows descrevem COMO atividades comuns de engenharia devem ser executadas.

Toda demanda não trivial é orquestrada pelo Techlead (`05-agentes.md`),
que decompõe o trabalho por área, aciona o agente especializado
apropriado para cada workflow abaixo, e encerra sempre acionando o
Reviewer — nativamente (quando a ferramenta suporta multiagentes) ou via
chamada linear/comando `/bob-[nome-do-agente]` (`11-adaptadores.md`,
`19-comandos.md`).

Para especificações não triviais que exigem fases formais com gates de
decisão de negócio/técnica, ver o workflow de SDD detalhado em
`17-sdd-workflow.md` — ele expande a etapa "Criar/atualizar especificação
→ Planejar" abaixo em fases próprias (spec → tasks → implementação).

## Definição de Pronto (Definition of Done)

Todo workflow abaixo termina em "Validar" (ou equivalente). Isto define,
em termos executáveis, o que essa validação exige — independentemente de
o projeto usar board/PR (`18-board-e-branch.md`) ou trabalhar direto na
branch principal (projeto pequeno, `16-bootstrap-interativo.md`, Passo
1). Antes de reportar qualquer tarefa/demanda como concluída, o agente
DEVE:

* Executar o comando de lint/análise estática do projeto, quando
  `context/stack.md`/`conventions.md` o documentarem, e confirmar saída
  sem erro.
* Executar o comando de build/type-check do projeto, quando aplicável à
  stack, e confirmar saída sem erro.
* Executar o menor escopo de teste relevante à mudança
  (`instructions/testing.md`) e confirmar que passa; ampliar para a
  suíte completa quando não houver como direcionar.
* Confirmar que nenhum segredo/credencial foi introduzido no diff.
* Confirmar que os critérios de aceite/"Concluído quando" da tarefa
  (`templates/specs/tasks.md`, `07-specs.md`) foram de fato atendidos —
  não apenas implementados, mas verificados.
* Sinalizar explicitamente ao dev qualquer um dos itens acima que não
  pôde ser executado (ex.: projeto sem comando de lint configurado) —
  nunca marcar a tarefa como concluída omitindo silenciosamente uma
  verificação que não rodou.

Quando o projeto usa board/PR, `18-board-e-branch.md` acrescenta os gates
específicos daquele fluxo por cima desta base — esta Definição de Pronto
é o mínimo que se aplica mesmo sem PR.

## Workflow de feature

Fluxo genérico:

```text
Requisito
↓
Entender o contexto
↓
Inspecionar a implementação existente
↓
Identificar restrições
↓
Criar/atualizar especificação
↓
Planejar
↓
Implementar
↓
Testar
↓
Revisar
↓
Validar
```

## Workflow de bugfix

```text
Reproduzir
↓
Entender a causa raiz
↓
Identificar áreas afetadas
↓
Criar teste de regressão
↓
Implementar a correção
↓
Executar os testes
↓
Validar a regressão
```

## Workflow de refactor

```text
Identificar a motivação
↓
Definir invariantes
↓
Inspecionar dependências
↓
Refatorar incrementalmente
↓
Executar os testes
↓
Validar o comportamento
```

## Workflow de code review

```text
Entender a mudança
↓
Inspecionar a arquitetura afetada
↓
Verificar corretude
↓
Verificar segurança (para achados de segurança aprofundados — vazamento de segredos, injeção, spoofing — consultar o agente Security, `05-agentes.md`)
↓
Verificar testes
↓
Verificar manutenibilidade
↓
Reportar os achados
↓
Se houver achado de severidade Crítica ou Alta, o Techlead aciona
novamente o Developer com os achados específicos e reexecuta o Reviewer
depois da correção, antes de considerar a demanda concluída — mesmo
padrão de REPROVED → IN_PROGRESS de `18-board-e-branch.md`, agora
explícito também fora do fluxo de board
↓
Registrar lição genérica em erros-corrigidos.md, quando algum achado
revelar um erro do agente implementador (04-instrucoes.md)
```

## Workflow de mapeamento de codebase

```text
Detectar contexto existente
↓
Decidir entre mapeamento completo ou atualização incremental
↓
Explorar evidências área por área
↓
Escrever/atualizar cada documento de contexto
↓
Registrar a referência do mapeamento (data/commit)
↓
Reportar desvios (drift) e lacunas encontradas
```

O processo detalhado deste workflow está descrito em [`10-mapeamento-profundo.md`](10-mapeamento-profundo.md) e no template `/bob_framework/templates/workflows/map-codebase.md`.

## Workflow de concerns

```text
Verificar violações de camada
↓
Verificar princípios SOLID / Inversão de Dependência
↓
Identificar duplicação de código e oportunidades de extração
↓
Verificar convenção de nomenclatura de arquivos
↓
Registrar achados em concerns.md, cada um com proposta concreta
↓
Reportar um resumo priorizado
```

Disparado por `/bob-concerns` (`19-comandos.md`), acionando o agente
Mapper. É uma auditoria retrospectiva e complementar — não o mecanismo
primário de garantia de SOLID/DIP/SRP, que é responsabilidade contínua e
proativa de Architect, Developer e Techlead durante o design e a
implementação (`05-agentes.md`). O processo detalhado está em
`.ai/workflows/concerns.md`, a partir do template
`/bob_framework/templates/workflows/concerns.md`.

## Workflow de abertura de Pull Request

Para abrir um Pull Request depois de implementar, ver o fallback padrão
em `18-board-e-branch.md` e o runbook em
`templates/workflows/pull-request.md` — aplica-se apenas quando o projeto
não tiver convenção própria já estabelecida (ver
`13-descoberta-e-migracao.md`).
