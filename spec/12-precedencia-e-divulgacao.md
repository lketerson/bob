# Precedência e Divulgação Progressiva

## Modelo de Precedência

Defina a seguinte precedência conceitual:

```text
Restrições de sistema/plataforma
        ↓
Constituição do Projeto
        ↓
Instruções do Projeto
        ↓
Papel de Agente Relevante
        ↓
Skills Relevantes
        ↓
Especificação Relevante
        ↓
Requisitos específicos da tarefa
```

Quando existirem conflitos, restrições de nível mais alto DEVEM prevalecer, a menos que explicitamente sobrepostas por uma fonte de autoridade mais alta.

O mecanismo exato de precedência de uma ferramenta de IA externa NÃO DEVE ser assumido.

## Divulgação Progressiva

O framework DEVE suportar divulgação progressiva.

Os agentes NÃO DEVEM precisar carregar todos os arquivos para cada tarefa.

Por exemplo:

Uma tarefa de banco de dados pode exigir:

```text
constituição
+ instruções gerais
+ instruções de erros corrigidos
+ instruções de código
+ skill de banco de dados
+ especificação relevante
```

Uma tarefa de UI pode exigir:

```text
constituição
+ instruções gerais
+ instruções de erros corrigidos
+ instruções de código
+ skill de UI relevante
+ especificação relevante
```

`instructions/general.md` e `instructions/erros-corrigidos.md`
(`04-instrucoes.md`) são a exceção à divulgação progressiva dentro de
`instructions/`: DEVEM ser carregados sempre, independentemente do tipo
de tarefa — diferente de `coding.md`/`testing.md`/`git.md`/
`documentation.md`, carregados apenas quando relevantes à tarefa atual.

O agente DEVERIA carregar apenas o conhecimento relevante para a tarefa atual.

Esta própria especificação segue o mesmo princípio: por isso ela está dividida em `start.md` (entrypoint) e os arquivos individuais em `spec/`, em vez de um único arquivo monolítico. Ver `start.md` para orientação de qual arquivo ler para cada tipo de tarefa.
