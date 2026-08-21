# /bob-onboarding

## Descrição

Aciona o agente Onboarding: um instrutor que guia um novo desenvolvedor
pelo repositório via um roteiro de estudo persistido em
`onboarding/roadmap.md`. `/bob-onboarding-abandonar` interrompe o
processo e limpa tudo, a qualquer momento.

## Sintaxe

`/bob-onboarding` — sem argumentos; retoma automaticamente de onde parou
se já houver uma sessão em andamento (`onboarding/roadmap.md`
existente).

`/bob-onboarding-abandonar` — sem argumentos; interrompe e limpa o
processo imediatamente (o próprio comando já é a confirmação).

## Pré-condições

`.ai/` já existente, com o agente Onboarding aprovado durante o
bootstrap (`spec/16-bootstrap-interativo.md`, Passo 3) e
`.ai/agents/onboarding.md` / `.ai/workflows/onboarding.md` criados.

## Aciona

Agente Onboarding (`spec/05-agentes.md`) e o processo completo descrito
em `.ai/workflows/onboarding.md` (copiado de
`templates/workflows/onboarding.md`).

## Processo

Segue integralmente `.ai/workflows/onboarding.md`: diagnóstico de nível
→ inicialização (branch local `onboarding-novo-dev` + roadmap) → leitura
de documentação → uso prático da aplicação → escolha e estudo de um
fluxo de dados (ou Modo Professor, se greenfield) → verificação de
aprendizado → prática guiada com bug intencional (branch
`onboarding-bug-pratica`) → validação → encerramento e limpeza.

## Saída esperada

`onboarding/roadmap.md` (e, na etapa de prática guiada,
`onboarding/task.md`) atualizados a cada etapa concluída, existindo
apenas nas branches locais de onboarding — nunca publicadas. Ao concluir
ou ao processar `/bob-onboarding-abandonar`, a pasta `onboarding/` e as
branches locais são removidas.
