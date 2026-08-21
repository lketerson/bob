# Onboarding do Novo Desenvolvedor

Fluxo executado pelo agente `onboarding` (ver `.ai/agents/onboarding.md`),
disparado pelo comando `/bob-onboarding` (ou gatilho equivalente). A qualquer
momento, o comando `/bob-onboarding-abandonar` interrompe o processo e limpa
tudo — ver "Encerramento e limpeza" no final.

## Fluxo geral

```text
Diagnóstico de nível (perguntas gerais)          [branch: onboarding-novo-dev]
        ↓
Inicialização (branch + onboarding/roadmap.md)   [branch: onboarding-novo-dev]
        ↓
Leitura de documentação                          [branch: onboarding-novo-dev]
        ↓
Uso prático da aplicação (fora do agente)        [branch: onboarding-novo-dev]
        ↓
Projeto greenfield? (apurado no Passo 0) ──────────────────┐
        ↓ não                                              ↓ sim
Escolha e estudo de um fluxo de dados ponta a ponta    Modo Professor (seção
        ↓                                              dedicada ao final deste
Verificação de aprendizado (5 perguntas)               documento) — substitui
        ↓                                              os Passos 4, 6 e 7
Prática guiada: bug intencional + task.md                    ↓
   [branch: onboarding-bug-pratica]                          ↓
        ↓                                                    ↓
Validação da correção (quando o dev resolver)                ↓
        ↓                                                    ↓
Encerramento e limpeza (proposta ao concluir) ←───────────────┘

Em qualquer uma das etapas acima, o comando /bob-onboarding-abandonar
interrompe o processo e executa a limpeza diretamente (sem precisar de
confirmação adicional — o próprio comando já é a confirmação do dev).
```

## Restrição central: o agente nunca escreve código de produto

Enquanto o processo de onboarding não estiver concluído nem abandonado
(via `/bob-onboarding-abandonar`), o agente DEVE se limitar a explicar,
orientar e responder perguntas do dev — NUNCA deve escrever, editar ou
corrigir código de produto em nome do dev.

A única exceção é a introdução do bug controlado no Passo 6 (incluindo o
commit "silencioso" correspondente) — a única modificação de código que o
agente tem permissão para fazer em todo o processo, restrita à branch
`onboarding-bug-pratica`.

Isso vale inclusive para a etapa de Validação (Passo 7): se a correção do
dev estiver incorreta ou incompleta, o agente explica o que está errado —
nunca corrige ele mesmo. Escrever `onboarding/roadmap.md` e
`onboarding/task.md` (artefatos do próprio processo de onboarding, não
código de produto) não é afetado por esta restrição.

Escrever arquivos `.md` de apoio (ex.: um guia passo a passo para orientar
o dev numa implementação ou na correção do bug) também não é afetado por
esta restrição — não é código de produto, é material de orientação. Ao
oferecer esse tipo de ajuda, o agente DEVE perguntar ao dev se ele prefere
receber a orientação como um arquivo `.md` (salvo dentro de `onboarding/`)
ou apenas apresentada diretamente no chat — a escolha é do dev, não do
agente.

## Persistência de estado e retomada

`onboarding/roadmap.md` é a única fonte de verdade sobre o progresso do
dev — o agente não tem memória entre sessões além do que estiver gravado
nesse arquivo. Por isso:

* A cada etapa concluída (diagnóstico de nível, leitura de documentação,
  uso da aplicação, fluxo escolhido, resultado das perguntas, status do
  bug), o agente DEVE atualizar `onboarding/roadmap.md` imediatamente, com
  detalhe suficiente para que uma sessão nova retome exatamente de onde
  parou sem depender do histórico da conversa — incluindo qual branch de
  onboarding está ativa no momento (`onboarding-novo-dev` ou
  `onboarding-bug-pratica`).
* Enquanto o processo de onboarding não estiver concluído nem abandonado,
  toda nova invocação do comando de onboarding DEVE começar lendo
  `onboarding/roadmap.md` e propondo explicitamente ao dev continuar a
  partir da etapa pendente — em vez de aguardar passivamente o dev pedir
  para retomar.

## Verificação de branch ativa

Enquanto o processo de onboarding estiver ativo, antes de criar ou alterar
qualquer arquivo, ou de commitar, o agente DEVE confirmar em qual branch
está e certificar que é a branch de onboarding correta para a etapa atual:

* `onboarding-novo-dev` para todas as etapas até a Verificação de
  aprendizado (inclusive).
* `onboarding-bug-pratica` durante a Prática guiada e a Validação.

Se a branch atual não for a esperada, o agente DEVE trocar para a branch
correta (criando-a se ainda não existir, a partir da branch de onboarding
apropriada) antes de prosseguir — nunca commitar conteúdo de onboarding em
`main`, na branch original do dev, ou em qualquer outra branch fora desse
par.

## 0. Diagnóstico de nível

Antes de qualquer pergunta do diagnóstico, e apenas na primeira invocação
do comando (não repetir em retomadas de sessão), o agente DEVE exibir ao
dev, literalmente, o aviso abaixo dentro de um box:

```text
┌────────────────────────────────────────────────────────────────────┐
│ AVISO                                                               │
│                                                                      │
│ O NÍVEL E AS MÉTRICAS OBTIDAS DURANTE ESTE ONBOARDING NÃO DEFINEM   │
│ O SEU CONHECIMENTO TÉCNICO REAL. SÃO APENAS SINAIS QUE O BOB USA    │
│ PARA CALIBRAR E CRIAR UMA EXPERIÊNCIA CUSTOMIZADA PARA VOCÊ.        │
└────────────────────────────────────────────────────────────────────┘
```

Só depois de exibir esse aviso o agente prossegue para as perguntas do
diagnóstico. Antes de qualquer outra etapa — inclusive antes de criar a
branch local ou a pasta `onboarding/` — o agente DEVE aplicar uma
bateria de perguntas gerais, cobrindo pelo menos:

* Fundamentos de programação.
* Conceitos da(s) linguagem(ns)/framework(s) do projeto identificados na
  descoberta.
* Git — branching, commits, merge/rebase, resolução de conflitos. Esta
  área é explicitamente importante nesta etapa, já que todo o processo de
  onboarding depende do dev conseguir operar Git com segurança.
* Arquitetura e testes.
* Conceitos de engenharia de IA aplicados a este framework: SDD
  (Spec-Driven Development), MCP (Model Context Protocol), instructions,
  skills, agents, persona, guardrails, e outros itens relevantes de
  `.ai/`.

com o objetivo de classificar o dev em um dos seguintes níveis:

```text
Estagiário
Trainee
Júnior
Pleno
Sênior
Especialista
```

O número de perguntas fica a critério do agente — o suficiente para
classificar com confiança, sem se alongar desnecessariamente.

A classificação DEVE ser baseada nas respostas técnicas reais, não apenas
na autodeclaração do dev sobre seu próprio nível. A autodeclaração pode
ser usada como contexto adicional, mas não substitui a avaliação.

A familiaridade do dev com os conceitos de engenharia de IA (SDD, MCP,
instructions, skills, agents, persona, guardrails etc.) DEVE ser registrada
separadamente do nível técnico geral — ela não redefine sozinha o nível
principal, mas calibra o quanto o agente precisa explicar sobre o próprio
framework `.ai/` e suas ferramentas ao longo de todo o processo (por
exemplo, ao apontar o dev para `.ai/context/` no Passo 2, ou ao mencionar
o agente `mapper` no Passo 4).

Este diagnóstico só ocorre na primeira invocação do comando. Em retomadas
de sessão (branch/roadmap já existentes), o agente reaproveita o nível já
registrado em `onboarding/roadmap.md` em vez de perguntar novamente — a
menos que o roadmap indique que o nível ainda não foi determinado.

O nível resultante e a nota de familiaridade com IA aplicada DEVEM ser
registrados em `onboarding/roadmap.md` (resultado + breve justificativa,
não a bateria de perguntas inteira) e DEVEM calibrar as etapas seguintes:

* A complexidade do fluxo de dados escolhido no Passo 4 (mais simples e
  localizado para níveis iniciais; mais amplo, com mais integrações, para
  níveis avançados).
* A dificuldade relativa das 5 perguntas de verificação do Passo 5 (a
  proporção continua 2 fáceis / 2 médias / 1 difícil, mas o piso e o teto
  de dificuldade sobem com o nível).
* A complexidade do bug intencional do Passo 6 (ex.: um erro de
  sintaxe/lógica simples e local para um estagiário; um bug sutil,
  envolvendo múltiplas camadas ou uma condição de borda, para um
  sênior/especialista).
* O nível de detalhamento das explicações do agente ao longo de todo o
  processo — mais passo a passo para níveis iniciais, mais direto e
  conciso para níveis avançados.

O agente PODE reajustar a classificação mais adiante se o desempenho do
dev nos Passos 5 ou 6 contradisser fortemente o nível inicial — mas a
avaliação inicial não deve ser pulada.

Além do nível técnico, o agente DEVE verificar se o repositório é um
projeto novo (greenfield — mesmo critério já usado em
`16-bootstrap-interativo.md`: sem código-base anterior relevante). Essa
constatação DEVE ser registrada em `onboarding/roadmap.md` e determina se
o processo segue o fluxo padrão (Passos 4, 6 e 7) ou o "Modo Professor"
(seção dedicada ao final deste documento), que substitui essas três
etapas por ensino ativo da stack/arquitetura planejada.

## 1. Inicialização

Na primeira invocação do comando:

1. Verificar se a branch local `onboarding-novo-dev` já existe.
   * Se não existir, criá-la localmente a partir do estado atual do
     repositório, sem rastreamento de branch remota.
   * Se já existir, fazer checkout dela e retomar a partir do que
     `onboarding/roadmap.md` indicar como pendente (ver "Persistência de
     estado e retomada" e "Verificação de branch ativa" acima).
2. Antes de trocar de branch, verificar se há alterações não commitadas
   do usuário e preservá-las (stash ou commit), para não perder trabalho
   em andamento.
3. Criar a pasta `onboarding/` na raiz do repositório e, dentro dela,
   `roadmap.md`, já registrando o nível apurado no Passo 0 e listando as
   etapas deste workflow com status (pendente/em andamento/concluída). O
   caminho é fixo — não criar subpastas por sessão ou por desenvolvedor.
4. Informar ao dev que tudo o que for criado neste processo existe apenas
   nas branches locais de onboarding e nunca será publicado — e que isso é
   uma restrição absoluta, não uma preferência configurável. Informar
   também que `/bob-onboarding-abandonar` pode ser usado a qualquer momento
   para interromper e limpar tudo.

## 2. Leitura de documentação

Apontar o dev para a documentação relevante do repositório: `README.md`,
`AGENTS.md`/adaptador equivalente, e os arquivos em `.ai/context/`
(especialmente `project-overview.md`, `architecture.md` e `stack.md`).

Marcar a etapa como concluída em `onboarding/roadmap.md` quando o dev
confirmar a leitura.

## 3. Uso prático da aplicação

Instruir o dev a subir e usar a aplicação por conta própria (referenciar
os passos de execução do projeto, se documentados).

O agente NÃO participa desta etapa — apenas orienta o que fazer e aguarda
o dev confirmar que voltou.

Marcar a etapa como concluída quando o dev confirmar o retorno.

Se o projeto for greenfield (ver Passo 0), pular os Passos 4, 6 e 7
abaixo e seguir diretamente para "Modo Professor (projetos greenfield)",
ao final deste documento. Caso contrário, prosseguir normalmente pelos
Passos 4 a 7.

## 4. Escolha e estudo de um fluxo de dados ponta a ponta

O agente seleciona, com base em evidência real do código (mesma
disciplina do agente `mapper`: citar caminhos de arquivo concretos) e no
nível apurado no Passo 0, um fluxo de dados ponta a ponta do sistema —
por exemplo, uma requisição desde o ponto de entrada até a persistência e
a resposta, ou um evento assíncrono do disparo até o efeito final.

Registrar o fluxo escolhido (nome + arquivos envolvidos) em
`onboarding/roadmap.md` e pedir ao dev que o estude por conta própria
antes de prosseguir.

## 5. Verificação de aprendizado

Quando o dev sinalizar que estudou o fluxo, o agente faz exatamente 5
perguntas sobre esse fluxo específico, com dificuldade calibrada pelo
nível apurado no Passo 0:

* 2 perguntas fáceis
* 2 perguntas médias
* 1 pergunta difícil

Registrar em `onboarding/roadmap.md` um resumo do desempenho.

## 6. Prática guiada — bug intencional

1. O agente cria a branch local `onboarding-bug-pratica` a partir de
   `onboarding-novo-dev` e faz checkout nela (ver "Verificação de branch
   ativa"). Esta branch também nunca deve ser publicada.
2. O agente introduz, nessa branch, um bug controlado e reversível no
   código, relacionado ao fluxo estudado, com complexidade calibrada pelo
   nível apurado no Passo 0. **Esta é a única exceção à restrição central
   de nunca escrever código de produto** (ver seção no topo deste
   documento).
3. O commit dessa alteração é feito sem narrar o diff ao dev nesta etapa
   — a mensagem de commit deve ser genérica o suficiente para não revelar
   a natureza do bug (ex.: `onboarding: cenário de prática`).
4. Criar `onboarding/task.md` (nesta branch): um card de bug no estilo QA,
   contendo:
   * Título
   * Passos para reproduzir
   * Comportamento esperado
   * Comportamento observado
   * Severidade/prioridade
   * Ambiente/contexto (o fluxo estudado, por exemplo)
5. Instruir o dev a investigar e corrigir o bug diretamente na branch
   `onboarding-bug-pratica`. A partir daqui, o agente volta a ser
   estritamente consultivo: explica e orienta, mas não edita o código de
   correção. Ao orientar, o agente PODE oferecer ao dev escrever um
   arquivo `.md` com um passo a passo (salvo dentro de `onboarding/`) ou
   apenas apresentar a orientação no chat — a escolha é do dev.
6. Registrar em `onboarding/roadmap.md` que a prática guiada está em
   andamento e qual é a branch ativa.

## 7. Validação

Quando o dev sinalizar que resolveu o bug (na branch
`onboarding-bug-pratica`), o agente valida a correção (revisando o
código, executando testes relevantes se existirem) e marca
`onboarding/roadmap.md` como concluído. Se a correção estiver incorreta
ou incompleta, o agente explica o problema — nunca corrige ele mesmo.

## Modo Professor (projetos greenfield)

Aplica-se apenas quando o Passo 0 identificou o projeto como greenfield.
Substitui inteiramente os Passos 4 (fluxo de dados real), 6 (bug
intencional) e 7 (validação) — não há código suficiente para sustentar
nenhum dos três de forma real.

Nesse modo, o agente assume um papel mais ativo de professor — ensina em
vez de apenas apontar documentação e aguardar. O ensino cobre, calibrado
pelo nível apurado no Passo 0:

* A stack escolhida (`.ai/context/stack.md`, quando já existir).
* A arquitetura planejada, se houver specs/ADRs em `.ai/specs/`
  (`07-specs.md`) ou decisões já registradas em
  `.ai/context/architecture.md`.
* Conceitos gerais da linguagem/framework relevantes ao que o time
  pretende construir.
* Os conceitos de engenharia de IA já cobertos no diagnóstico (SDD, MCP,
  instructions, skills, agents, persona, guardrails), com o
  aprofundamento que a nota de familiaridade do Passo 0 indicar.

Verificação de aprendizado adaptada: em vez de perguntas sobre um fluxo
real, o agente elabora perguntas conceituais sobre a stack/arquitetura
planejada, também calibradas pelo nível do dev. A proporção 2 fáceis / 2
médias / 1 difícil do Passo 5 é um ponto de partida razoável, mas o
agente PODE ajustá-la já que não há um fluxo concreto para ancorar as
perguntas.

Sem prática guiada com bug: o agente NÃO DEVE improvisar um bug em código
mínimo/scaffold só para preencher a etapa — a restrição central de nunca
escrever código de produto continua valendo integralmente aqui, sem a
exceção do Passo 6 (que só existe no fluxo padrão). Registrar em
`onboarding/roadmap.md` que esta etapa foi substituída pelo Modo
Professor, não "concluída" no sentido do fluxo padrão.

### Preferência de estilo de comunicação

Antes de propor o encerramento, perguntar ao dev: "Você gostaria que os
agentes padrão deste projeto (fora do onboarding) adotem, nas interações
futuras com você, um estilo de comunicação mais didático — mais
detalhado, com menos abreviações e explicações mais simplificadas?"

Se o dev responder SIM, registrar essa preferência de forma persistente
em `.ai/instructions/general.md` (seção "## Preferências de comunicação
por desenvolvedor", criada se ainda não existir), ANTES da limpeza do
onboarding — já que a pasta `onboarding/` é removida ao final e não pode
ser o único lugar onde essa preferência fica guardada. Identificar o dev
pelo nome/identificador que ele informar (perguntar, se ainda não tiver
sido dado) ou, na ausência de identificador, por uma nota genérica ("dev
que concluiu onboarding em `<data>`"). Registrar também um resumo do
estilo pedido (mais detalhado, menos abreviações, explicações mais
simplificadas).

Esta é uma aplicação best-effort: agentes futuros não têm garantia de
identificar automaticamente qual desenvolvedor está interagindo com eles
em cada sessão — a instrução em `general.md` serve para que, quando um
agente conseguir identificar (ex.: o dev se apresenta, ou o contexto
deixa claro), ele aplique o estilo registrado.

Se o dev responder NÃO (ou preferir o estilo padrão), não registrar nada
— não é necessário anotar uma ausência de preferência.

Conclusão do Modo Professor: ao final do ensino e das perguntas
conceituais e da pergunta de estilo de comunicação acima, o agente
PERGUNTA ao dev qual das duas opções prefere:

* **Encerrar por ora** — seguir para "Encerramento e limpeza" (Passo 8)
  normalmente, deixando claro que a parte prática (fluxo real + bug)
  fica pendente para quando houver código suficiente, retomável com um
  novo `/bob-onboarding`.
* **Manter em aberto** — não limpar ainda; `onboarding/roadmap.md`
  permanece registrado como "Modo Professor concluído, fluxo padrão
  pendente", e uma invocação futura do onboarding (quando o agente notar
  que o projeto deixou de ser greenfield) PROPÕE retomar os Passos 4, 6 e
  7 a partir daí.

A escolha é do dev, não do agente.

## 8. Encerramento e limpeza (conclusão ou abandono)

Existem dois gatilhos para esta etapa:

* **Conclusão normal:** quando `onboarding/roadmap.md` é marcado como
  concluído no Passo 7, o agente PROPÕE a limpeza e só executa mediante
  confirmação explícita do dev.
* **Abandono (`/bob-onboarding-abandonar`):** a qualquer momento do processo
  (mesmo no meio de qualquer etapa anterior), o dev pode invocar este
  comando. Nesse caso o agente executa a limpeza diretamente, sem esperar
  confirmação adicional — o próprio comando já é a confirmação explícita
  do dev. Ainda assim, o agente DEVE informar exatamente o que foi
  removido ao final.

Em ambos os casos, a limpeza consiste em:

* Remover a pasta `onboarding/`.
* Remover a branch local `onboarding-bug-pratica`, se existir.
* Remover a branch local `onboarding-novo-dev`.
* Retornar o dev para a branch em que estava antes de iniciar o processo.

Isso é uma limpeza do material de estudo/documentação de IA temporária,
não do código de produto. Na conclusão normal (não no abandono), se o dev
preferir manter o material, o agente NÃO DEVE insistir — apenas oferecer a
limpeza uma vez por sessão em que o onboarding for concluído.
