# Mapeamento Profundo de Codebase

Popular `.ai/context/` NÃO DEVE ser um resumo raso, feito em uma única passada. É uma atividade distinta, com processo próprio, porque arquivos de contexto rasos são piores do que nenhum arquivo de contexto: eles dão aos agentes uma falsa confiança.

## Princípios

* **Evidência sobre suposição.** Toda afirmação não trivial DEVE ser rastreável a algo de fato lido no repositório: um manifest, um arquivo de configuração, um grafo de imports, um layout de diretórios, um teste ou um comentário — não inferida a partir do nome do projeto ou de convenções comuns para a stack aparente.
* **Prescritivo sobre descritivo.** Um arquivo de contexto deve se ler como um briefing sobre o qual outro agente pode agir imediatamente, não como um parágrafo que apenas redescreve o que qualquer leitor inferiria olhando a árvore de arquivos.
* **Observado sobre aspiracional.** Se a documentação, os comentários ou a nomenclatura existentes afirmam algo que o código não faz de fato, o arquivo de contexto DEVE refletir o que o código realmente faz e PODE anotar a divergência — NÃO DEVE repetir silenciosamente a afirmação aspiracional como fato.
* **Limites sobre exaustividade.** O objetivo é mapear o que um agente precisa para se orientar e agir com segurança, não reproduzir todo o codebase em prosa.
* **Incremental sobre pontual.** O mapeamento deve ser repetível: uma execução posterior deve conseguir detectar o que mudou desde o último mapeamento e atualizar apenas os arquivos afetados, em vez de recomeçar do zero a cada vez.

## Áreas de foco

Divida o trabalho de mapeamento em áreas de foco para que cada uma permaneça profunda em vez de rasa. Cada área corresponde a arquivos de contexto específicos:

| Área de foco | Explorar | Produz |
|---|---|---|
| Tecnologia | Manifests de pacotes, lockfiles, arquivos de configuração, SDKs, versões de runtime | `stack.md`, `integrations.md` |
| Arquitetura | Layout de diretórios, pontos de entrada, limites de módulo, grafo de imports, fluxo de dados | `architecture.md`, `structure.md` |
| Qualidade | Configuração de lint/formatação, organização de testes, configuração de CI, padrões de nomenclatura efetivamente usados | `conventions.md`, `testing.md` |
| Risco | Marcadores TODO/FIXME, implementações stub, arquivos excessivamente grandes, dependências desatualizadas, contradições entre documentação e código | `concerns.md` (auditoria complementar mais profunda de violações de camada/SOLID, duplicação e nomenclatura via `/bob-concerns` — ver `spec/19-comandos.md`) |

`project-overview.md` e `glossary.md` são produzidos a partir de uma síntese de todas as áreas de foco, mais qualquer documentação de produto/negócio existente encontrada no repositório.

## Processo

1. **Verificar contexto existente.** Se `.ai/context/` já tem conteúdo, determine se esta é uma primeira execução de mapeamento ou uma atualização. Em uma atualização, identifique o que mudou (dependências novas/removidas, diretórios movidos, novos módulos) em vez de reescrever tudo incondicionalmente.
2. **Definir o escopo da passada.** Para um codebase grande ou em formato de monorepo, o mapeamento PODE ser restrito a uma subárea (por exemplo, um pacote ou app) em vez do repositório inteiro de uma vez. Informe qual escopo foi mapeado nos arquivos resultantes.
3. **Explorar cada área de foco relevante**, reunindo evidência concreta antes de escrever qualquer coisa. Prefira ler manifests e configuração a adivinhar a partir de nomes de arquivo. Nunca leia arquivos `.env`, arquivos de credenciais, chaves ou qualquer coisa que pareça um segredo — referencie que tais arquivos existem sem ler seu conteúdo.
4. **Escrever ou atualizar cada documento de contexto**, preenchendo a estrutura definida por seu template (ver `/bob_framework/templates/context/`). Todo documento DEVE citar caminhos de arquivo para suas afirmações e DEVE registrar uma referência de mapeamento (data e, quando disponível, commit/branch).
5. **Reconciliar contradições.** Se o mapeamento revelar um conflito entre o que `constitution.md`/`instructions/` prescrevem e o que o código de fato faz, não resolva isso silenciosamente — registre em `concerns.md` e sinalize ao usuário; não altere a constituição unilateralmente. Da mesma forma, se o mapeamento encontrar evidência de uma prática já declarada como "ponto inaceitável" pelo usuário (`16-bootstrap-interativo.md`, Passo 2), registrar o exemplo concreto encontrado na seção correspondente de `concerns.md` e sinalizar ao usuário.
6. **Reportar um resumo**, não o conteúdo completo dos documentos: quais arquivos foram criados, quais foram atualizados e o que mudou de forma relevante. Isso mantém o contexto do agente orquestrador leve mesmo em codebases grandes.

## Paralelização (quando suportado)

Quando o ambiente que executa este framework suportar delegar subtarefas a agentes independentes, as áreas de foco acima PODEM ser exploradas em paralelo, cada uma lendo e escrevendo apenas seus próprios arquivos de contexto. Isso mantém o contexto de qualquer agente individual focado e evita que uma passada de exploração contamine os achados de outra.

Quando o ambiente não suportar isso, execute as áreas de foco sequencialmente, na ordem mostrada na tabela acima, tratando cada uma como uma passada totalmente separada antes de avançar para a próxima.

De qualquer forma, o agente orquestrador DEVE receber apenas uma confirmação/resumo de cada passada, não a saída bruta da exploração — os arquivos de contexto são o artefato, não a conversa que os produziu.

## Quando executar isso

Execute o workflow de mapeamento:

* Antes de iniciar trabalho não trivial em um codebase que ainda não tem `.ai/context/`, ou onde ele está claramente desatualizado.
* Depois de uma mudança arquitetural significativa, upgrade de dependência ou reestruturação.
* Quando um agente perceber que `.ai/context/` contradiz o que está observando no código.

Pule esta etapa para projetos greenfield sem código ainda, ou para
codebases trivialmente pequenos — na prática, menos de ~20 arquivos de
código-fonte, ou um único script/módulo sem camadas ou limites internos
distinguíveis — onde uma leitura completa é mais barata do que uma
passada de mapeamento.

## Material de apoio

O agente responsável (`mapper`, ver [`05-agentes.md`](05-agentes.md)) e o workflow operacional (`.ai/workflows/map-codebase.md`) devem ser copiados a partir de:

```text
/bob_framework/templates/agents/mapper.md
/bob_framework/templates/workflows/map-codebase.md
/bob_framework/templates/context/*.md
```

Ver `/bob_framework/README.md` para o detalhamento de como esses templates são usados.

## Matriz de cobertura (opcional)

O mapper PODE manter uma matriz de cobertura (área/feature × status
Good/Partial/Missing × gaps × prioridade) para orientar quais partes do
repositório ainda carecem de mapeamento — útil em repositórios grandes
cobertos em múltiplas passadas parciais. É um complemento: não substitui
os documentos de `.ai/context/` nem o registro de referência de
mapeamento de cada um.
