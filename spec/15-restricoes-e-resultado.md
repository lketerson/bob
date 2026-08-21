# Restrições e Resultado Esperado

## Restrição Importante

NÃO faça engenharia excessiva (over-engineering) na implementação inicial.

O objetivo desta tarefa é criar a **fundação do framework**, não preencher toda skill, agente ou especificação possível.

**Escopo desta restrição:** ela se aplica à autoria e evolução do
`bob_framework` em si (este repositório de especificação) — por exemplo,
ao decidir se uma skill/agente/spec de exemplo adicional merece um
template pronto aqui. Ela NÃO se aplica ao bootstrap executado por um
agente num projeto-alvo: lá, os 8 agentes padrão, os 17 comandos e os 4
arquivos de constituição DEVEM ser criados integralmente já na primeira
execução, conforme `02-estrutura-diretorios.md`, `05-agentes.md` e
`19-comandos.md` exigem sem exceção. "Não preencher toda skill/agente
possível" refere-se a não inventar papéis, skills ou specs além do que a
própria especificação prescreve ou o usuário aprovou — nunca a entregar
menos do que ela já exige.

Prefira:

```text
Pequeno + claro + extensível
```

em vez de:

```text
Grande + complexo + altamente prescritivo
```

O framework deve fornecer estrutura sem se tornar um fardo de manutenção.

## Resultado Esperado

Ao final da tarefa, o repositório deve conter um AI Engineering Framework coerente e agnóstico de provedor, onde:

```text
Constituição
    ↓
define princípios imutáveis

Instruções
    ↓
definem comportamento de engenharia

Agentes
    ↓
definem papéis

Skills
    ↓
fornecem conhecimento especializado

Specs
    ↓
definem o que deve ser construído

Workflows
    ↓
definem como tarefas comuns são executadas

Contexto
    ↓
descreve este projeto específico

Adaptadores
    ↓
tornam o framework consumível por diferentes ferramentas de IA
```

A implementação final DEVE ser genérica o suficiente para ser reutilizada em diferentes projetos e stacks tecnológicas, permitindo que cada projeto adicione seu próprio contexto de domínio e skills técnicas específicas.
