# Integrações Externas

> **Escopo mapeado:** <!-- caminho ou "repositório inteiro" -->
> **Última atualização:** <!-- AAAA-MM-DD -->
> **Referência:** <!-- branch/commit quando disponível -->

<!--
Todo sistema externo com o qual o código realmente troca dados: APIs,
bancos de dados, filas, provedores de autenticação, serviços de storage,
webhooks recebidos/enviados. Baseie-se em imports/clientes/SDKs
encontrados no código, não em documentação antiga não verificada.
Nunca leia nem transcreva valores de segredos/credenciais — apenas cite
onde a configuração é referenciada (o `nome da variável`, não o valor).
-->

## Serviços externos

| Serviço | Tipo | Usado para | Onde no código |
|---|---|---|---|
| | | | |

## Bancos de dados / stores

| Store | Tipo | Usado para | Onde no código |
|---|---|---|---|
| | | | |

## Autenticação / autorização

<!-- Provedor(es) usados, mecanismo (sessão, token, OAuth, etc.), onde é implementado. -->

## APIs expostas por este projeto

<!-- Se este projeto expõe uma API para outros consumidores, descreva o formato (REST/GraphQL/RPC/etc.) e onde os endpoints/schemas são definidos. -->

## Comunicação assíncrona

<!-- Filas, eventos, webhooks, jobs agendados — se existirem. -->

## Ferramentas de IA

<!--
Decisões tomadas durante o bootstrap (16-bootstrap-interativo.md) sobre
ferramentas de suporte ao agente de IA — não são integrações do produto
em si, mas registradas aqui pelo mesmo motivo: a configuração de conexão
real vive fora de `.ai/`, no arquivo específico da ferramenta
(11-adaptadores.md). Preencher apenas o que o dev de fato aprovou.
-->

### Board / rastreamento de trabalho

<!-- Ferramenta usada (ex.: Azure Boards, Jira, GitHub Projects, Trello), e se foi criada manualmente ou via MCP. -->

### Servidores MCP habilitados

| MCP | Propósito | Escopo (local/global) |
|---|---|---|
| | | |

### Barra de status (status line)

<!-- Se configurada: ferramenta de IA, escopo (local/global), e onde vive o adaptador (ex.: `.claude/settings.json` + `.claude/statusline.js`). -->

## Segredos e configuração sensível

<!--
Liste APENAS os nomes das variáveis/arquivos de configuração sensível
referenciados no código (ex.: `DATABASE_URL`, `API_KEY`) e onde são
consumidos. NUNCA copie valores reais, mesmo que estivessem acessíveis.
-->
