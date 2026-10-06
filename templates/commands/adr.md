---
description: Registra uma decisão técnica como ADR, a partir de uma instrução ou de perguntas.
---

# /bob-adr

## Descrição

Registra uma decisão técnica do projeto como ADR em
`.ai/specs/decisions/`, seguindo `spec/22-adr.md` — inclusive quando a
decisão nova substitui uma já registrada.

## Sintaxe

`/bob-adr [instrução]` — ex.: `/bob-adr usar fila para envio de e-mail
em vez de chamada síncrona, por causa dos timeouts do provedor`.

A instrução é opcional: sem ela, o agente conduz o registro por
perguntas.

## Pré-condições

`.ai/` já existente, com `.ai/specs/decisions/` criado.

## Aciona

Criação de `.ai/specs/decisions/<NNNN>-<slug>.md` a partir de
`templates/specs/adr.md`, e atualização do índice
`.ai/specs/decisions/README.md` (`spec/22-adr.md`).

## Processo

1. Ler o índice `.ai/specs/decisions/README.md` (se existir) para
   descobrir o próximo número e identificar ADRs aceitos relacionados ao
   mesmo tema.
2. Montar o rascunho:
   * **Com instrução:** extrair dela — e do contexto da conversa atual,
     quando o comando vier de uma sugestão do agente — contexto,
     decisão, alternativas e consequências. Perguntar só o que faltar.
   * **Sem instrução:** perguntar, uma de cada vez: qual decisão foi
     tomada; qual problema/contexto a motivou; quais alternativas foram
     consideradas e por que foram descartadas; quais consequências e
     trade-offs o time aceita; quem decidiu; e se já está aceita ou
     ainda é uma proposta.
   * Nunca inventar alternativas, motivos ou consequências não
     confirmados pelo dev — campo sem resposta fica sinalizado como
     pendente no preview.
3. Se a decisão contradiz ou altera um ADR aceito encontrado no passo 1,
   mostrar isso ao dev e perguntar se o novo ADR substitui o antigo.
4. Gerar o preview em `adr.temp.md` com o ADR completo, a linha nova do
   índice e, se houver substituição, a alteração de `Status` do ADR
   antigo.
5. Aguardar aprovação explícita.
6. Após aprovação: gravar o ADR, criar/atualizar o índice, atualizar o
   ADR substituído (só o campo `Status`), e remover `adr.temp.md`.

## Saída esperada

`.ai/specs/decisions/<NNNN>-<slug>.md` criado, índice atualizado, e —
quando aplicável — o ADR anterior marcado como substituído, preservando
o histórico de evolução da decisão.
