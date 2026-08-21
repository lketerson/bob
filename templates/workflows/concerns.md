# Concerns — Análise de Arquitetura, Duplicação e Convenções

Fluxo executado pelo agente Mapper (ver `.ai/agents/mapper.md`),
disparado pelo comando `/bob-concerns`, produzindo ou atualizando
`.ai/context/concerns.md`.

Diferente do mapeamento completo (`.ai/workflows/map-codebase.md`), este
workflow é focado: não remapeia `architecture.md`, `stack.md` ou os
demais documentos de contexto — apenas lê o que já existe neles (quando
existirem) e escreve exclusivamente em `concerns.md`.

**Este workflow é uma auditoria retrospectiva, não o mecanismo primário
de garantia de SOLID/DIP/SRP.** Aplicar esses princípios de forma
proativa durante o design e a implementação é responsabilidade contínua
dos agentes Architect, Developer e Techlead (`spec/05-agentes.md`) — este
workflow apenas identifica violações que já escaparam desse cuidado
contínuo, como uma checagem periódica complementar.

## Quando usar

* Periodicamente, como uma checagem de saúde arquitetural, independente
  de estar mapeando o codebase inteiro.
* Depois de um período de desenvolvimento acelerado, onde atalhos podem
  ter se acumulado.
* Quando o dev pedir explicitamente uma análise de qualidade/arquitetura
  sem querer remapear todo o `.ai/context/`.

## Pré-condições

Funciona melhor com `.ai/context/architecture.md`, `structure.md`,
`conventions.md` e `stack.md` já mapeados (`/bob-map-codebase`) — usa-os
como baseline para comparar contra o código real. Na ausência deles,
PODE operar com uma inspeção direta e mais limitada do código, avisando
o dev dessa limitação no relatório final.

## Processo

### 1. Violações de camada

Comparar os limites de módulo/camada declarados em `architecture.md`
(quando existir) — ou, na ausência dele, os limites que o próprio layout
de diretórios sugere — contra as dependências/imports reais do código.
Exemplos de violação: uma camada de apresentação importando diretamente
um cliente de banco de dados, pulando a camada de domínio/serviço; um
módulo de domínio importando um framework de UI.

Para cada violação encontrada, registrar em `concerns.md`: os módulos
envolvidos, os caminhos de arquivo concretos, e por que isso viola o
limite declarado (ou o limite razoável para a stack em questão).

### 2. Princípios SOLID, com foco em Inversão de Dependência (DIP)

Esta seção é uma checagem retrospectiva, não a fonte primária de adesão
a SOLID no projeto — o design e a implementação já devem ter sido
conduzidos com esses princípios em mente pelo Architect/Developer/
Techlead. Aqui, verificar se módulos de alto nível (casos de uso, serviços de domínio,
controllers) dependem de abstrações (interfaces/tipos abstratos) ou se
instanciam diretamente implementações concretas de baixo nível (ex.:
`new HttpClient()`, `new PrismaClient()` direto dentro de uma regra de
negócio, em vez de receber essa dependência injetada ou abstraída).

Se o projeto NÃO tiver um mecanismo de injeção de dependências (DI)
identificável (nem nativo da stack — ex.: DI do NestJS/Angular — nem uma
biblioteca de terceiros — ex.: InversifyJS, GetIt/Riverpod em
Dart/Flutter, Dagger/Hilt em Android/Kotlin, tsyringe), registrar essa
lacuna em `concerns.md` e propor a adoção de um mecanismo adequado à
stack identificada em `stack.md`, citando pelo menos uma opção
consolidada para aquela stack. Não instalar ou configurar nada
automaticamente — é uma proposta, não uma implementação.

Se o projeto JÁ tiver um mecanismo de DI mas partes do código o
ignoram (instanciação direta ao lado de outras partes que usam injeção
corretamente), registrar isso como uma inconsistência, citando os
caminhos que divergem do padrão já adotado.

### 3. Duplicação de código e oportunidades de extração

Buscar lógica não trivial (validação, parsing/formatação — ex.:
tratamento de datas —, mapeamento de DTO, regras de cálculo) que se
repete de forma quase idêntica em múltiplos arquivos. Critério prático:

* 3 ou mais ocorrências de lógica muito similar, OU
* 2 ocorrências de lógica não trivial (mais do que uma linha simples)
  onde uma divergência futura entre as cópias seria um risco real (ex.:
  uma cópia é corrigida, a outra não).

Não sinalizar repetições triviais (ex.: duas linhas de código simples e
sem lógica de negócio) — o objetivo é reduzir risco real de divergência,
não perseguir DRY absoluto.

Para cada oportunidade encontrada, registrar em `concerns.md`: os
caminhos onde a duplicação ocorre, um resumo do que a lógica faz, e uma
proposta concreta de extração — incluindo o diretório/módulo de destino
sugerido, consistente com onde o projeto já guarda código compartilhado
(`structure.md`, ou a pasta `shared`/`utils`/`helpers`/`formatters`
identificada durante o mapeamento). Não implementar a extração — apenas
propor.

### 4. Convenção de nomenclatura de arquivos

Verificar se `conventions.md` já documenta um padrão de nomenclatura de
arquivos observado e consistente, ou se `.ai/instructions/coding.md` já
prescreve um.

* **Se já existir um padrão** (observado e consistente, ou prescrito
  pelo dev) — não propor nada; apenas confirmar que o padrão está sendo
  seguido, e sinalizar em `concerns.md` os arquivos que divergem dele,
  se houver.
* **Se NÃO existir um padrão claro** (nomenclatura inconsistente entre
  arquivos, ou nunca declarada) — propor em `concerns.md` o padrão
  default deste framework:

  ```text
  {nome}.{tipo}.{extensao}
  ```

  Exemplos: `produto.http.dart`, `impl_produto.http.dart`. `{tipo}`
  identifica o papel do arquivo (ex.: `http`, `repository`, `service`,
  `model`, `controller` — adaptar ao vocabulário da stack do projeto).
  Deixar claro que é uma sugestão, não uma imposição — a decisão de
  adotar é do dev.

Nunca sobrescrever silenciosamente um padrão que o projeto já segue,
mesmo que o padrão do framework seja "melhor" na opinião do agente.

### 5. Registro e promoção

Registrar todos os achados das seções 1 a 4 em `.ai/context/concerns.md`
(seções correspondentes — ver template em
`/bob_framework/templates/context/concerns.md`), cada um com evidência
(`caminho`) e uma proposta de ação concreta, não apenas a descrição do
problema.

Se o dev aprovar uma proposta desta análise (ex.: adotar a convenção de
nomenclatura sugerida, ou adotar um mecanismo de DI), o registro
definitivo dessa decisão migra para `.ai/instructions/coding.md` (regra
prescritiva daqui em diante) — `concerns.md` permanece um mapa de
risco/proposta, não o lugar onde regras já aprovadas vivem
permanentemente.

### 6. Relatório final

Reportar ao dev um resumo do que foi encontrado e proposto — não o
conteúdo integral de `concerns.md` — destacando os itens de maior
impacto primeiro.
