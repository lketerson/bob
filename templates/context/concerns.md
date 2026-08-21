# Riscos e Pontos de Atenção

> **Escopo mapeado:** <!-- caminho ou "repositório inteiro" -->
> **Última atualização:** <!-- AAAA-MM-DD -->
> **Referência:** <!-- branch/commit quando disponível -->

<!--
Este é o documento onde o mapeamento registra o que exige cautela — não é
uma lista de tarefas, é um mapa de risco para que outro agente saiba onde
pisar com cuidado. Toda entrada deve citar `caminho` e, quando possível,
por que aquilo é um risco (não apenas "isso parece ruim").

As seções abaixo relacionadas a violações de camada/SOLID, duplicação de
código e nomenclatura são preenchidas pela auditoria retrospectiva do
comando `/bob-concerns` (`.ai/workflows/concerns.md`) — cada achado
inclui uma proposta de ação concreta, não apenas a descrição do
problema. Isso não substitui a aplicação proativa de SOLID/DIP/SRP
durante o design e a implementação, que é responsabilidade contínua de
Architect, Developer e Techlead (`05-agentes.md`).
-->

## Dívida técnica conhecida

| Área | Descrição | Caminho | Impacto se ignorado |
|---|---|---|---|
| | | | |

## Implementações incompletas / stubs

<!-- TODOs, FIXMEs, placeholders, funcionalidades declaradas mas não implementadas. -->

## Dependências desatualizadas ou de risco

<!-- Dependências presas em versões antigas, sem manutenção, ou com vulnerabilidades conhecidas identificadas durante o mapeamento. -->

## Áreas frágeis

<!-- Código com alta concentração de complexidade, arquivos anormalmente grandes, módulos com muitas responsabilidades misturadas, ou histórico de bugs recorrentes (se observável). -->

## Contradições entre documentação/constituição e código real

<!--
Toda vez que `.ai/constitution/` ou `.ai/instructions/` afirma algo que o
código não segue, registre aqui em vez de silenciar. Não corrija a
constituição automaticamente — isso é uma decisão do mantenedor do
projeto.
-->

## Violações de camada e princípios SOLID

<!-- Preenchido por /bob-concerns. Foco em Inversão de Dependência (DIP) e em limites de camada declarados em architecture.md (ou sugeridos pelo layout de diretórios). -->

| Violação | Caminhos | Por quê | Proposta |
|---|---|---|---|
| | | | |

## Duplicação de código e oportunidades de extração

<!-- Preenchido por /bob-concerns. Critério: 3+ ocorrências similares, ou 2+ ocorrências não triviais com risco real de divergência. -->

| Lógica duplicada | Caminhos onde ocorre | Extração proposta | Destino sugerido |
|---|---|---|---|
| | | | |

## Convenção de nomenclatura de arquivos

<!--
Preenchido por /bob-concerns, apenas se o projeto não tiver uma convenção
observada e consistente, nem uma declarada pelo dev. Proposta padrão do
framework: `{nome}.{tipo}.{extensao}` (ex.: `produto.http.dart`,
`impl_produto.http.dart`). Se já existir uma convenção, esta seção
registra apenas os arquivos que divergem dela, se houver.
-->

## Injeção de dependências

<!--
Preenchido por /bob-concerns, apenas se o projeto não tiver um mecanismo
de DI identificável (nativo da stack ou de terceiros). Registrar aqui a
lacuna e a proposta de adoção, citando pelo menos uma opção consolidada
para a stack do projeto (ver stack.md).
-->

## Áreas não mapeadas

<!-- Se o mapeamento foi parcial (escopo restrito), liste o que ainda não foi coberto, para que uma execução futura saiba o que falta. -->
