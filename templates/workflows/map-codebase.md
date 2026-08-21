# Workflow: Mapeamento de Codebase

Runbook operacional para o agente `mapper` (`.ai/agents/mapper.md`). Descreve como executar, na prática, o processo definido em `/bob_framework/spec/10-mapeamento-profundo.md`.

## Quando disparar

* `.ai/context/` não existe ou está vazio.
* `.ai/context/` existe, mas um agente identificou que ele contradiz o código atual.
* Depois de uma mudança arquitetural significativa, upgrade de dependência major, ou reestruturação de diretórios.
* Antes de iniciar trabalho não trivial (feature grande, refactor, planejamento de arquitetura) em um repositório pouco conhecido.

Não disparar para projetos sem código ainda, ou para codebases pequenos o bastante para ler por completo diretamente.

## Passo 1 — Detectar estado atual

* Verificar se `.ai/context/` existe e se cada um dos 9 arquivos esperados está presente.
* Se todos existirem, ler o bloco de metadados (`Escopo mapeado`, `Última atualização`, `Referência`) de cada um.
* Decidir o modo de execução:
  * **Mapeamento completo** — quando não há `.ai/context/` prévio, ou quando a maior parte dos arquivos está ausente/claramente obsoleta.
  * **Atualização incremental** — quando o contexto existente é majoritariamente válido e apenas partes específicas precisam de revisão (ex.: uma dependência nova, um módulo novo, um diretório renomeado).

## Passo 2 — Definir o escopo

* Repositório inteiro, por padrão.
* Para monorepos ou codebases muito grandes, escopo pode ser restrito a um pacote/app/diretório por execução. Nesse caso, cada execução deve declarar seu escopo no cabeçalho dos documentos que produzir, e múltiplas execuções podem ser necessárias para cobrir o repositório inteiro.

## Passo 3 — Explorar por área de foco

Execute as quatro áreas abaixo. Se o ambiente de execução suportar delegar cada área a um agente/subtarefa independente, rode-as em paralelo — cada uma lê e escreve apenas os arquivos de contexto que lhe pertencem, o que evita que uma área contamine as descobertas de outra e mantém o contexto de cada execução focado. Se não houver suporte a paralelização, execute-as em sequência, uma de cada vez, na ordem abaixo.

### Área: Tecnologia → `stack.md`, `integrations.md`

Explorar:
- Manifests de dependências e lockfiles (o gerenciador de pacotes usado pelo projeto).
- Arquivos de configuração de build/bundler/compilador.
- Versão de linguagem/runtime declarada (arquivos de versão, configuração de engine, Dockerfile, CI).
- SDKs e clientes de serviços externos importados no código.
- Variáveis de ambiente/configuração referenciadas no código (sem ler os valores de arquivos `.env` reais).

### Área: Arquitetura → `architecture.md`, `structure.md`

Explorar:
- Estrutura de diretórios de primeiro e segundo nível.
- Pontos de entrada da aplicação (main, index, bootstrap, handlers de rota/entrypoint de servidor).
- Limites entre módulos/camadas e como eles se comunicam.
- Grafo de imports entre as áreas principais do código (o que depende do quê).
- Onde o estado/dados fluem: origem da requisição/evento até a resposta/persistência.

### Área: Qualidade → `conventions.md`, `testing.md`

Explorar:
- Configuração de linter/formatter e o que ela de fato impõe.
- Onde os testes vivem, como são nomeados, e o comando usado para executá-los.
- Configuração de CI relacionada a lint/teste/build.
- Padrões de nomenclatura observados em arquivos, funções, componentes — comparando com o que a configuração de lint declara, quando houver divergência.
- **Se o repositório já tem uma árvore Git com histórico:** modelo de branching, nomenclatura de branch, uso de worktrees, e convenção de mensagens de commit/PR realmente observados no histórico e em arquivos como `CONTRIBUTING.md`. Se nenhum padrão claro for identificável, registrar isso explicitamente em `conventions.md` em vez de inventar um padrão — e sinalizar ao orquestrador/usuário que não há convenção de Git identificável, conforme `/bob_framework/spec/13-descoberta-e-migracao.md`. Repositórios sem histórico de Git (greenfield) não precisam desta verificação.

### Área: Risco → `concerns.md`

Explorar:
- Marcadores `TODO`, `FIXME`, `HACK`, `XXX` no código.
- Implementações claramente stub/incompletas.
- Arquivos anormalmente grandes ou com complexidade concentrada.
- Dependências desatualizadas ou com versões presas (pinned) sem explicação aparente.
- Divergências entre o que a documentação/constituição existente afirma e o que o código realmente faz.

### Síntese → `project-overview.md`, `glossary.md`

Depois das quatro áreas acima, sintetizar:
- Propósito e escopo do projeto, a partir do que foi observado mais qualquer documentação de produto existente.
- Termos de domínio e de projeto usados de forma consistente no código, comentários e nomes de entidades.

## Passo 4 — Escrever os documentos

* Usar os templates de `/bob_framework/templates/context/` como estrutura.
* Cada documento deve citar caminhos de arquivo concretos (entre crases) para suas afirmações.
* Cada documento deve atualizar seu bloco de metadados (`Escopo mapeado`, `Última atualização`, `Referência`).
* Em atualização incremental, editar apenas as seções afetadas pela mudança identificada no Passo 1 — não reescrever o documento inteiro.
* Nunca deixar placeholders de template no arquivo final.

## Passo 5 — Reconciliar contradições

Se qualquer área encontrar uma contradição entre `.ai/constitution/` ou `.ai/instructions/` e o comportamento real do código:
* Registrar a contradição em `concerns.md`, com os caminhos de arquivo envolvidos.
* Não alterar a constituição ou as instruções automaticamente — isso é uma decisão do usuário/mantenedor do projeto.

## Passo 6 — Reportar

Produzir um resumo (não o conteúdo integral dos documentos) contendo:
* Quais arquivos de `.ai/context/` foram criados.
* Quais foram atualizados, e o que mudou em cada um.
* Quais contradições ou lacunas foram registradas em `concerns.md`.
* Se o mapeamento cobriu o repositório inteiro ou um escopo parcial (e, se parcial, o que ainda falta mapear).

## Critérios de sucesso

- [ ] Todos os 9 arquivos de `.ai/context/` existem e não contêm placeholders de template.
- [ ] Toda afirmação não trivial cita ao menos um caminho de arquivo.
- [ ] Nenhum arquivo `.env`/credencial foi lido.
- [ ] O bloco de metadados de cada arquivo produzido/atualizado está preenchido.
- [ ] Contradições encontradas estão registradas em `concerns.md`, não silenciadas.
- [ ] O resumo final foi reportado sem incluir o conteúdo integral dos documentos.
