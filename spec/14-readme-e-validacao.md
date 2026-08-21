# README e Validação

## README

Crie:

```text
.ai/README.md
```

Carrega no topo o carimbo de versão do `bob_framework`
(`> **Gerado a partir do bob_framework:** vX.Y.Z` — ver
`20-versionamento.md`).

DEVE explicar:

* O que é o AI Engineering Framework.
* Por que `.ai/` existe.
* Estrutura de diretórios.
* Como funciona o versionamento deste `.ai/` (`.ai/CHANGELOG.md`) e o
  carimbo de versão do `bob_framework` (`20-versionamento.md`).
* Diferença entre constituição, instruções, agentes, skills, specs, workflows e contexto.
* Como os agentes devem descobrir informação.
* Como adicionar uma nova skill.
* Como adicionar um novo agente.
* Como adicionar uma nova especificação.
* Lista de comandos disponíveis e como usá-los (`.ai/commands/README.md`).
* Como adicionar um novo comando.
* Como funcionam os adaptadores de provedor.
* O fato de que `.ai/` é a fonte canônica de verdade.

Inclua um diagrama de arquitetura simples.

## Manutenção Contínua

Depois de qualquer tarefa não trivial, verificar se `.ai/` precisa de
atualização. Considere "não trivial", de forma objetiva, qualquer
mudança que se encaixe em pelo menos um destes critérios:

* Altera um contrato público (API/rota/endpoint/schema de dados exposto).
* Adiciona, remove ou substitui uma dependência com peso arquitetural
  (ver `context/stack.md`).
* Introduz ou remove um componente/serviço/módulo inteiro.
* Toca mais de ~5 arquivos numa única tarefa.

Mudanças abaixo desses critérios (ex.: ajuste de texto, correção pontual
de uma linha, renomeação local sem efeito em contrato) PODEM pular esta
checagem. Tabela de referência (agnóstica de stack — adaptar conforme o
projeto):

| Tipo de mudança | O que revisar |
|---|---|
| Novo componente/serviço/módulo | `context/architecture.md`, `context/structure.md` |
| Nova configuração/variável de ambiente | `context/integrations.md`, instruções relacionadas |
| Nova convenção adotada pelo time | `instructions/coding.md` (ou instrução de convenção equivalente) |
| Nova dependência com peso arquitetural | `context/stack.md` |

Isso não substitui o mapeamento formal (`10-mapeamento-profundo.md`) — é
uma checagem leve e contínua, não uma nova passada completa.

## Requisitos de Qualidade

Depois de criar a estrutura, valide que:

* Todo diretório obrigatório existe.
* Todo arquivo obrigatório existe.
* Os arquivos markdown são válidos.
* Nenhum arquivo canônico referencia uma stack específica desnecessariamente.
* Não existem suposições específicas de provedor em `.ai/`.
* Os adaptadores de provedor são mínimos.
* Os adaptadores de comando (quando a ferramenta suporta) apontam para `.ai/commands/`, sem duplicar conteúdo.
* Não há duplicação significativa.
* As instruções de projeto existentes foram preservadas.
* A configuração de IA existente não foi destruída acidentalmente.
* O framework pode ser usado por um projeto mobile.
* O framework pode ser usado por um projeto web.
* O framework pode ser usado por um projeto de backend.
* O framework pode ser usado por um monorepo.
* Toda a documentação gerada está no idioma escolhido no bootstrap interativo (`spec/16`, Passo 0), de forma consistente em todos os arquivos.
* Links internos entre arquivos de `.ai/` resolvem para arquivos existentes (nenhum link quebrado).
* `.ai/README.md` carrega o carimbo de versão do `bob_framework`, e `.ai/CHANGELOG.md` existe com ao menos a entrada inicial do bootstrap (`spec/20-versionamento.md`).
