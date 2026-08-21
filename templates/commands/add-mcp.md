# /bob-add-mcp

## Descrição

Configura um novo servidor MCP específico, a partir de um link informado
pelo dev — diferente do Passo 5 do bootstrap interativo (`spec/16`), que
faz pesquisa ampla por candidatos a partir da stack detectada.

## Sintaxe

`/bob-add-mcp <link>` — o link pode ser a documentação do MCP ou o link
direto do pacote/servidor MCP.

## Pré-condições

`.ai/` já existente, com `.ai/context/integrations.md` criado.

## Aciona

Atualização de `.ai/context/integrations.md` (seção "Ferramentas de IA")
e da configuração de MCP específica da ferramenta de IA em uso (fora de
`.ai/`, seguindo `spec/11-adaptadores.md`).

## Processo

1. Se o dev não informou o link junto do comando, perguntar: o link da
   documentação do MCP, ou o link direto do pacote/servidor MCP
   (repositório, registro npm, etc.) — pelo menos um dos dois é
   obrigatório.
2. Buscar e inspecionar o link informado para entender o que o MCP
   oferece: ferramentas expostas, permissões necessárias, requisitos de
   autenticação/segredos.
3. Apresentar um resumo do que foi encontrado ao dev e confirmar que é o
   MCP correto antes de prosseguir.
4. Perguntar o escopo — local (só este projeto) ou global (todos os
   projetos do usuário na ferramenta) — seguindo exatamente
   `spec/16-bootstrap-interativo.md`, Passo 6.
5. Gerar o preview em `add-mcp.temp.md` com a configuração proposta
   (arquivo específico da ferramenta) e a atualização correspondente em
   `.ai/context/integrations.md`. NUNCA incluir credenciais/segredos
   reais no preview — apenas placeholders, perguntando ao dev onde/como
   fornecê-los com segurança.
6. Aguardar aprovação explícita antes de gravar qualquer coisa.
7. Após aprovação, gravar a configuração no arquivo específico da
   ferramenta (nunca em `.ai/`, que permanece agnóstico de provedor) e
   atualizar `.ai/context/integrations.md`.

## Saída esperada

MCP configurado no escopo aprovado, registrado em
`.ai/context/integrations.md`, sem segredos versionados em `.ai/`.
