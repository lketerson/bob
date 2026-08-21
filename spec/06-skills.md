# Skills

Skills representam conhecimento técnico reutilizável.

O framework NÃO DEVE assumir que skills específicas existem.

Inicialmente crie:

```text
.ai/skills/README.md
```

O README DEVE explicar a estrutura esperada de uma skill.

Uma skill DEVERIA seguir:

```text
.ai/skills/<nome-da-skill>/
└── SKILL.md
```

Um `SKILL.md` DEVERIA conter:

```markdown
# Nome da Skill

## Propósito

## Quando usar

## Pré-requisitos

## Conhecimento

## Regras

## Fluxo de trabalho recomendado

## Validação

## Erros comuns
```

Se a skill usar um MCP, o `SKILL.md` DEVE incluir também uma seção
`## Permissões MCP`, listando explicitamente o que a skill PODE fazer com
aquele MCP e o que NUNCA fará (ex.: pode criar PR em modo draft; nunca
aprova, faz merge/complete, ou muda estado de um item de board). Essa
declaração explícita reduz o risco de uma skill tomar uma ação
irreversível sem essa política clara.

Uma skill NÃO DEVE embutir fatos específicos do repositório-alvo (portas,
comandos, nomes de branch, convenções locais) — esses fatos pertencem a
`.ai/context/` ou `.ai/instructions/`, e a skill deve apenas referenciá-los.
Skills que hardcodam fatos do repositório tendem a divergir silenciosamente
de cópias adaptadas para outras ferramentas de IA ao longo do tempo, já
que cada cópia para de refletir mudanças reais do projeto de forma
independente.

Exemplos que PODEM ser adicionados posteriormente:

```text
skills/
├── flutter/
├── react/
├── angular/
├── node/
├── python/
├── database/
├── supabase/
├── playwright/
├── docker/
└── aws/
```

Estes são apenas exemplos.

O framework de bootstrap NÃO DEVE criar skills específicas de tecnologia a menos que o repositório de fato use essas tecnologias.
