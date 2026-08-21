# Workflow: Abertura de Pull Request

Runbook operacional para abrir um PR seguindo `18-board-e-branch.md` — só
se aplica quando não existir uma convenção própria do projeto (ver a
ressalva no topo daquele spec).

## Quando disparar

* Ao concluir a implementação de uma tarefa (ver `17-sdd-workflow.md`,
  Fase 4).
* Sempre associado a 1 card = 1 tarefa + 1 branch + 1 PR.

## Passo 1 — Rodar os gates

Antes de qualquer coisa, confirmar que passam:

- [ ] Lint/build/análise estática.
- [ ] Testes relevantes.
- [ ] Varredura de segredo no diff — nenhuma credencial/token/chave
      exposta.
- [ ] Impacto em documentação (`.ai/context/`) identificado e tratado.
- [ ] Para mudança significativa: contexto de revisor redigido (o quê,
      por quê, trade-offs, alternativas rejeitadas, riscos futuros).

Se qualquer gate falhar, corrigir antes de prosseguir — não abrir PR com
gate pendente.

## Passo 2 — Preencher a descrição do PR

Usar o template de PR do projeto se existir; caso não exista, incluir
pelo menos:

* O que mudou e por quê.
* Como testar.
* Referência à tarefa/card de origem.
* O contexto de revisor do Passo 1, se aplicável.

## Passo 3 — Abrir como draft

Abrir o PR sempre em modo **draft** via MCP (ou CLI/UI, conforme
disponível). Nunca marcar como pronto para review automaticamente.

## Passo 4 — Perguntar o reviewer

Perguntar ao usuário quem deve revisar — nunca assumir um reviewer
default. Se a mudança envolve schema/migration, perguntar especificamente
pelo dono daquele domínio.

## Passo 5 — Aguardar

O agente para aqui. Publicar o PR (tirar de draft), aprovar, ou fazer
merge/complete são ações humanas — o agente nunca as executa sozinho.

## Critérios de sucesso

- [ ] Todos os gates do Passo 1 passaram antes da abertura.
- [ ] PR aberto como draft.
- [ ] Reviewer foi perguntado, não assumido.
- [ ] Nenhuma ação de aprovação/merge foi tomada pelo agente.
