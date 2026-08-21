# Convenções

> **Escopo mapeado:** <!-- caminho ou "repositório inteiro" -->
> **Última atualização:** <!-- AAAA-MM-DD -->
> **Referência:** <!-- branch/commit quando disponível -->

<!--
Este arquivo é OBSERVADO, não prescrito — descreva o que o código
realmente faz hoje, mesmo que não seja o ideal. Regras de como o código
DEVERIA ser escrito pertencem a `.ai/instructions/coding.md`, não aqui.
Se a configuração de lint/formatter diverge do que o código realmente
segue, registre os dois e aponte a diferença.
-->

## Nomenclatura

<!-- Padrões observados para arquivos, funções, variáveis, classes/tipos, componentes — com exemplos concretos citando `caminho`. -->

## Formatação e lint

<!-- Ferramenta usada (e config file), regras relevantes que de fato são aplicadas (via CI ou pre-commit hook). -->

## Padrões estruturais recorrentes

<!-- Padrões de código que se repetem de forma consistente pelo projeto (ex.: como um módulo expõe sua API pública, como erros são propagados, como componentes recebem props/dependências). Cite exemplos com `caminho`. -->

## Convenções de Git

<!--
Só preencha esta seção se o repositório já tiver uma árvore Git com
histórico. Baseie-se no histórico real (`git log`, branches locais e
remotos) e em arquivos que declarem a convenção (CONTRIBUTING.md,
templates de PR/commit em `.github/`), nunca em suposição. Se nenhum
padrão claro for identificável, diga isso explicitamente aqui — não
invente um padrão só para preencher a seção. Nesse caso, o processo de
descoberta descrito em `/bob_framework/spec/13-descoberta-e-migracao.md`
manda perguntar ao usuário antes de adotar a convenção padrão do
framework.
-->

* **Modelo de branching:** <!-- trunk-based, git-flow, branch por feature, etc. — apenas se observável. -->
* **Nomenclatura de branch:** <!-- ex.: `feature/`, `fix/`, prefixo de ticket. -->
* **Uso de worktrees:** <!-- se o projeto usa múltiplos worktrees como parte do fluxo, e como. -->
* **Convenção de mensagens de commit:** <!-- Conventional Commits, mensagens livres, referência a issue/ticket, idioma usado. -->
* **Convenção de PR:** <!-- template de PR, exigências de revisão, etc. -->
* **Fonte:** <!-- de onde essa convenção foi confirmada: `caminho` do arquivo ou "observado no histórico de commits". -->

## Inconsistências observadas

<!--
Onde o código diverge das próprias convenções que declara seguir (ex.:
lint configurado mas ignorado em partes do código, dois estilos
coexistindo). Isso ajuda um agente a não copiar o padrão "errado" por
engano.
-->
