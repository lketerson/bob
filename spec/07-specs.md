# Specs

Crie:

```text
.ai/specs/README.md
.ai/specs/features/
.ai/specs/requirements/
.ai/specs/decisions/
```

Specs representam O QUE precisa ser construído.

Uma especificação DEVERIA conter:

```text
Contexto
Problema
Objetivo
Requisitos
Restrições
Critérios de aceitação
Considerações técnicas
Questões em aberto
```

Especificações NÃO DEVEM conter detalhes de implementação desnecessários, a menos que sejam requisitos.

## Formato recomendado dentro de `features/`

Para specs não triviais que seguem o fluxo de SDD (`17-sdd-workflow.md`),
o conteúdo recomendado de `.ai/specs/features/<slug>/` é:

```text
.ai/specs/features/<slug>/
├── spec.md
└── tasks.md
```

usando os templates prontos em `templates/specs/spec.md` e
`templates/specs/tasks.md`, que já cobrem os elementos listados acima
(Contexto/Problema/Objetivo/Requisitos/Critérios de aceitação/etc.) em um
formato mais estruturado (User Stories WHEN/THEN/SHALL, rastreabilidade de
requisitos). Para specs simples, a estrutura mínima já descrita acima
(Contexto, Problema, ...) continua válida, sem exigir o formato completo.

## Seção Handoff

Toda spec/PRD gerado por este framework DEVE começar com uma seção
"Handoff": um resumo compacto (problema em uma frase, escopo aprovado,
arquivos relevantes, decisões já tomadas, bloqueios) para que quem
consumir o documento na fase seguinte não precise reler o documento
inteiro.
