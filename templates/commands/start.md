# /bob-start

## Descrição

Entrypoint único do framework. Primeira execução num projeto sem
`.ai/`: dispara o bootstrap interativo completo. `.ai/` já existente,
compatível com esta estrutura e na versão atual do `bob_framework`:
mostra o estado atual e o menu de comandos. `.ai/` já existente mas
incompleto (bootstrap interrompido) ou com carimbo de versão
desatualizado: propõe retomar ou sincronizar. `.ai/` já existente mas
com estrutura totalmente diferente (não gerado por este framework):
pergunta se deseja reorganizar.

## Sintaxe

`/bob-start` — sem argumentos.

## Pré-condições

Nenhuma — é o único comando do framework que pode ser executado antes de
`.ai/` existir.

## Aciona

* Se `.ai/` não existir: descoberta do repositório
  (`spec/13-descoberta-e-migracao.md`) seguida do bootstrap interativo
  completo (`spec/16-bootstrap-interativo.md`).
* Se `.ai/` existir, corresponder à estrutura deste framework e o
  carimbo de versão em `.ai/README.md` bater com a versão atual do
  `bob_framework`: leitura de `.ai/commands/README.md` e um resumo do
  estado atual (agentes ativos em `.ai/agents/`, skills em
  `.ai/skills/`, MCPs registrados em `.ai/context/integrations.md`).
* Se `.ai/` existir, for reconhecível como deste framework, mas estiver
  incompleto (bootstrap interrompido) ou com o carimbo de versão
  desatualizado: o fluxo de retomada (`spec/13-descoberta-e-migracao.md`)
  ou de sincronização (`spec/20-versionamento.md`), respectivamente.
* Se `.ai/` existir com uma estrutura totalmente diferente (não gerado
  por este framework): o fluxo de detecção e confirmação de
  `spec/13-descoberta-e-migracao.md`, seção "`.ai/` já existente, mas
  não gerado por este framework".

## Processo

1. Verificar se `.ai/` existe no projeto-alvo.
2. Se não existir, seguir `spec/13` e depois `spec/16` integralmente,
   incluindo o preview obrigatório em `start.temp.md` (Passo 7) antes de
   gravar qualquer arquivo definitivo — incluindo `.ai/CHANGELOG.md`
   (entrada inicial) e o carimbo de versão em `.ai/README.md`
   (`spec/20-versionamento.md`).
3. Se existir, comparar sua estrutura com
   `spec/02-estrutura-diretorios.md` e o carimbo de versão em
   `.ai/README.md` com a versão atual do `bob_framework`:
   * Se corresponder e o carimbo bater, ler `.ai/README.md` e
     `.ai/commands/README.md`, apresentar um resumo do estado atual e a
     lista de comandos disponíveis, e perguntar ao dev o que deseja
     fazer.
   * Se a estrutura for reconhecível como deste framework mas estiver
     incompleta, propor retomar o bootstrap (`spec/13`).
   * Se a estrutura corresponder mas o carimbo estiver desatualizado,
     propor sincronizar (`spec/20`).
   * Se a estrutura não corresponder de forma alguma, perguntar ao dev
     se deseja reorganizar para a estrutura deste framework, seguindo
     `spec/13` — nunca reorganizar sem confirmação explícita.

## Saída esperada

Na primeira execução (sem `.ai/`): `.ai/` criado por completo, conforme
`spec/02-estrutura-diretorios.md`, incluindo `.ai/commands/` e
`.ai/CHANGELOG.md`. Com `.ai/` compatível e atualizado já existente:
nenhuma alteração de arquivo — apenas orientação. Com `.ai/` incompleto,
desatualizado ou incompatível já existente: nenhuma alteração sem
aprovação explícita do dev sobre retomar, sincronizar ou reorganizar.
