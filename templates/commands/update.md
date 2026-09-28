# /bob-update

## Descrição

Sincroniza `.ai/` com uma versão mais nova do `bob_framework`, pulando
a árvore de decisão de 4 cenários do `/bob-start` — uso direto quando
o dev já sabe que está desatualizado e só quer sincronizar, sem
responder de novo nenhuma pergunta de bootstrap já respondida.

## Sintaxe

`/bob-update`

## Pré-condições

`.ai/` já existente, reconhecível como gerado por este framework
(`02-estrutura-diretorios.md`), com o carimbo de versão em
`.ai/README.md` desatualizado em relação à versão atual do
`bob_framework`. Se o carimbo já estiver atualizado, o comando informa
isso e para — não há o que sincronizar.

## Aciona

O fluxo de "Sincronização (`.ai/` desatualizado)" de
`20-versionamento.md`, pressupondo diretamente o cenário 3 do
`/bob-start` (`.ai/` reconhecível, carimbo desatualizado) — sem passar
pela avaliação dos outros três cenários.

## Processo

1. Ler, no `CHANGELOG.md` do `bob_framework`, as entradas mais recentes
   que o carimbo registrado em `.ai/README.md`.
2. Resumir ao dev, em linguagem simples, o que mudou estruturalmente
   desde aquela versão e o que precisaria ser adicionado/atualizado
   neste `.ai/` para acompanhar.
3. Gerar o preview em `update.temp.md` com os arquivos que seriam
   criados/alterados.
4. Aguardar aprovação explícita — uma mudança MAJOR do `bob_framework`
   NUNCA é aplicada automaticamente, mesmo com aprovação genérica de
   "sincronizar".
5. Após aprovação: gravar as mudanças, atualizar o carimbo em
   `.ai/README.md` para a nova versão, e adicionar a entrada
   correspondente em `.ai/CHANGELOG.md`.
6. Se o dev recusar, não alterar nada — o `.ai/` continua na versão
   antiga, funcional, apenas sem as capacidades novas.

## Saída esperada

`.ai/` sincronizado com a versão atual do `bob_framework` (ou nenhuma
mudança, se o dev recusar), sem repetir nenhuma pergunta de bootstrap
já respondida — só o que há de novo desde a última sincronização.
