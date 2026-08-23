# Bootstrap Interativo (Primeira Execução)

## Quando se aplica

Esta etapa DEVE ocorrer sempre que o framework for executado em um projeto-alvo
que ainda não possui `.ai/` — ou seja, antes de qualquer conteúdo ser escrito
nos diretórios descritos em `02-estrutura-diretorios.md`.

Em atualizações incrementais de um `.ai/` já existente (adicionar um agente,
uma skill, um novo mapeamento), esta etapa NÃO se aplica — ver `start.md`
para o fluxo correto de atualização incremental.

Esta etapa ocorre depois da descoberta do repositório
(`13-descoberta-e-migracao.md`) e antes da criação de qualquer arquivo
definitivo.

## Ordem do fluxo

```text
Descoberta do repositório (spec/13)
        ↓
Detectar stack, ferramentas e integrações existentes
        ↓
Perguntar ao usuário: idioma da documentação gerada e da comunicação
        ↓
Perguntar ao usuário: já existe board? deseja criar um (manual ou via MCP)?
        ↓
Perguntar ao usuário: pontos inaceitáveis para este projeto (guardrails)
        ↓
Perguntar ao usuário: quais agentes criar
        ↓
Perguntar ao usuário: quais skills criar / usar marketplace
        ↓
Sugerir e perguntar ao usuário: quais MCPs habilitar
        ↓
Perguntar ao usuário: escopo da configuração MCP (local ou global)
        ↓
Se a ferramenta suportar: perguntar ao usuário se deseja configurar
uma barra de status (status line)
        ↓
Gerar preview em start.temp.md e aguardar aprovação
        ↓
Criar os arquivos definitivos em .ai/ e nos adaptadores
```

## Passo 0 — Idioma

Perguntar ao usuário em qual idioma a comunicação do agente e toda a
documentação gerada em `.ai/` (constituição, instruções, agentes, skills,
specs, tasks, etc.) devem ser escritas. PT-BR PODE ser sugerido como
default, mas a escolha é do usuário — não assuma.

Essa escolha DEVE valer para toda a documentação gerada dali em diante
neste projeto-alvo. Registrar a decisão de forma persistente (ex.: no
início de `.ai/README.md` ou em `.ai/context/project-overview.md`, a
critério do que já existir nesses arquivos) para que sessões futuras a
sigam sem precisar perguntar de novo.

Isto é distinto do idioma do próprio `bob_framework/` (a especificação em
si), que permanece sempre em PT-BR — ver `01-fundamentos.md`.

## Passo 1 — Board e Gitflow

Perguntar ao usuário:

1. **"Este projeto já possui um board (sistema de rastreamento de
   trabalho — ex.: Azure Boards, Jira, GitHub Projects, Trello)?"**
   * **Se SIM** — registrar qual ferramenta é usada. Se houver um MCP
     correspondente, ele entra como candidato no Passo 5 (MCPs).
   * **Se NÃO** — perguntar: **"Deseja usar um board para este
     projeto?"**
     * **Se SIM** — perguntar: **"Deseja criá-lo manualmente (você
       mesmo, na ferramenta escolhida) ou que o agente crie via MCP, se
       disponível?"** Registrar a decisão; se for via MCP, o MCP
       correspondente entra como candidato obrigatório no Passo 5.
     * **Se NÃO** — NÃO force a adoção de board nem do fluxo de
       branch/PR formal (`18-board-e-branch.md`). Um projeto pequeno
       PODE legitimamente trabalhar apenas com a branch principal
       (`main`/`master`), sem board e sem Pull Request formal — ver a
       ressalva correspondente em `18-board-e-branch.md`.

2. Independentemente da resposta acima, prosseguir com a confirmação de
   convenção de Git (branch, commit, PR) já exigida por
   `13-descoberta-e-migracao.md` e, se o usuário optou por usar board,
   com a confirmação de adoção do fallback de board/branch/PR
   (`18-board-e-branch.md`), quando não houver convenção própria já
   estabelecida.

Esta decisão DEVE ser tomada cedo no bootstrap porque calibra se
`17-sdd-workflow.md` (seção "Local vs. board") e `18-board-e-branch.md`
se aplicam integralmente, parcialmente, ou não se aplicam de todo.

Registrar a decisão em `.ai/context/integrations.md`, junto às demais
decisões de ferramenta deste bootstrap.

## Passo 2 — Pontos Inaceitáveis (Guardrails do Projeto)

Perguntar ao usuário: "Existem práticas, decisões ou padrões que são
inaceitáveis para este projeto — coisas que a IA (ou qualquer
desenvolvedor) nunca deveria fazer aqui, além das regras genéricas já
cobertas pela constituição (`03-constituicao.md`)?" Exemplos ilustrativos
para ajudar o usuário a pensar (não uma lista fechada): acessar o banco
de produção diretamente, contornar um mecanismo de aprovação/feature
flag, usar uma biblioteca/dependência específica banida, modificar um
módulo legado sem revisão de um dono específico, fazer deploy fora de
uma janela definida.

Estes pontos são específicos DESTE projeto — diferente da constituição
genérica (`03-constituicao.md`), que é agnóstica de projeto. Registrar as
respostas em `.ai/context/concerns.md`, numa seção dedicada ("## Pontos
inaceitáveis"), citando a razão quando o usuário fornecer.

Depois de registrar os pontos informados, verificar — com base na
descoberta/mapeamento já realizado do repositório (evidência direta, não
suposição) — se algum deles já ocorre no código atual. Se encontrar,
sinalizar ao usuário um exemplo concreto (caminho de arquivo e trecho
relevante) junto ao ponto correspondente em `concerns.md` — o agente NÃO
corrige automaticamente, apenas relata.

Se o usuário não tiver nenhum ponto a declarar no momento, registrar isso
explicitamente ("nenhum ponto declarado até o momento") em vez de omitir
a seção — permitindo que ela seja preenchida depois, sem precisar
perguntar de novo do zero.

## Passo 3 — Agentes

Apresentar ao usuário três opções para os papéis de agente do projeto
(papéis padrão descritos em `05-agentes.md`: techlead, architect,
developer, reviewer, tester, researcher, mapper, security — mais o
Techlead, que atua como ponto de entrada/orquestrador desses papéis):

1. **Agentes padrão** — criar apenas os 8 papéis padrão, sem alterações.
2. **Agentes padrão + agentes especificados pelo usuário** — criar apenas
   os 8 papéis padrão e, adicionalmente, os papéis extras que o usuário
   indicar (ex.: um agente `dba` para um projeto com modelagem de banco
   complexa).
3. **Apenas agentes especificados pelo usuário** — não criar nenhum papel
   padrão automaticamente; criar somente os papéis que o usuário nomear
   explicitamente.

NÃO assuma qual das três opções o usuário quer. NÃO crie agentes além dos
aprovados pelo usuário, seja qual for a opção escolhida.

Independentemente da opção escolhida acima, perguntar também — de forma
separada — se o usuário deseja habilitar o agente opcional de
**Onboarding** (ver `05-agentes.md` e `templates/agents/onboarding.md`):
um instrutor que guia novos desenvolvedores pelo repositório via o
comando `/bob-onboarding` (ou gatilho equivalente da ferramenta), usando
uma branch local dedicada (`onboarding-novo-dev`) que nunca deve ser
publicada. Este agente só deve ser criado se o usuário confirmar
explicitamente que o quer — ele não faz parte de nenhuma das três opções
padrão porque tem um propósito distinto (treinamento de novos devs, não
engenharia do dia a dia). `/bob-onboarding-abandonar` interrompe e limpa
o processo a qualquer momento.

Ao acionar o Techlead como entrada de uma demanda (`/bob-techlead`, ou a
orquestração padrão descrita em `05-agentes.md`), o próprio Techlead
verifica se a ferramenta de IA em uso suporta orquestração nativa de
múltiplos agentes e, se suportar, habilita esse suporte automaticamente
— sem perguntar ao dev nem exigir configuração manual (ver
`11-adaptadores.md`, "Suporte a multiagentes"). Quando não suportado, o
Techlead aciona cada agente por chamada linear ou pelo comando
`/bob-[nome-do-agente]` correspondente.

## Passo 4 — Skills

Com base na stack identificada na descoberta (linguagem, frameworks, bancos
de dados, ferramentas de build/test), o agente DEVE pesquisar ativamente
(usando as ferramentas de busca disponíveis) quais skills técnicas fazem
sentido para essa stack, em vez de se limitar a um conjunto fixo
pré-definido. A pesquisa serve para levantar candidatos reais e atuais —
não para inventar skills genéricas sem fundamento.

Apresentar os candidatos encontrados ao usuário e perguntar:

* Quais das skills sugeridas deseja criar agora (o restante fica
  documentado como sugestão futura no `.ai/skills/README.md`, não criado)
  — seguindo a estrutura descrita em `06-skills.md`.
* Se deseja se conectar a algum marketplace/registro externo de skills.
  Se sim, registrar a origem e a URL informada pelo usuário — o framework
  NÃO DEVE assumir ou inventar um marketplace específico.

NÃO crie skills de tecnologia que o repositório não usa de fato (reforça
`06-skills.md`). NÃO habilite nenhuma skill ou marketplace sem confirmação
explícita do usuário.

Independentemente da stack detectada, sempre propor ao usuário a skill
`ponytail`, do DietrichGebert
(`https://github.com/DietrichGebert/ponytail`), como sugestão padrão
para o dev, junto das skills específicas de tecnologia levantadas pela
pesquisa — usada pelos agentes implementadores (`05-agentes.md`, papel
Developer) para evitar repetir código ou criar estruturas que o próprio
framework/stack do projeto já resolve, antes de implementar uma solução
própria. Assim como o `grill-me` (abaixo), esta é uma exceção deliberada
à regra geral de nunca assumir ou inventar uma origem/marketplace de
skill — a origem do `ponytail` é fixada por decisão de projeto, não
inventada pelo agente.

### Entendimento do projeto e definição de stack (`grill-me`)

Se o repositório for um projeto novo (greenfield, sem código-base
anterior relevante) OU se, em um projeto já existente, a stack não
estiver claramente definida/documentada (nenhuma evidência forte na
descoberta — `13-descoberta-e-migracao.md` — e o usuário não souber
descrevê-la de forma direta), o agente DEVE propor a instalação da skill
`grill-me`, do mattpocock
(`https://github.com/mattpocock/skills/tree/main/skills/productivity`),
e, mediante aprovação, instalá-la e invocá-la para entender o problema e
o projeto antes de prosseguir para a fase de Spec (`17-sdd-workflow.md`,
Fase 2).

Esta é uma exceção deliberada e explícita à regra geral de
`16-bootstrap-interativo.md` (Passo 4) de nunca assumir ou inventar uma
origem/marketplace de skill — a origem do `grill-me` é fixada por
decisão de projeto, não inventada pelo agente.

Quando a stack não está definida, o agente DEVE usar o `grill-me` para
entender o problema a fundo e, com base nisso, propor ao usuário uma
stack de tecnologias e as integrações necessárias (bancos de dados,
serviços externos, etc.) — sempre como proposta sujeita a aprovação, sem
adotar nada automaticamente.

Ao final desse entendimento, o agente DEVE:

* Descrever o produto (o que é, para quem, escopo) no `README.md` da
  raiz do projeto-alvo — não confundir com `.ai/README.md`, que descreve
  o próprio framework (`14-readme-e-validacao.md`).
* Registrar os detalhes técnicos em `.ai/context/` (`project-overview.md`,
  `architecture.md`, `stack.md`, `structure.md`, `integrations.md`,
  conforme `09-contexto.md`) — mantendo produto e detalhe técnico em
  lugares separados, não misturados no mesmo arquivo. A stack e as
  integrações propostas pelo `grill-me` (quando usado) são registradas
  em `stack.md` e `integrations.md` somente após aprovação do usuário.
* Perguntar ao dev qual arquitetura será usada, sugerindo como ponto de
  partida (não uma regra fechada) com base no porte do projeto que o dev
  descrever:
  - **MVC** para projetos pequenos.
  - **MVVM com repository pattern** para projetos médios.
  - **Clean Architecture** para projetos grandes.

  O dev é livre para escolher outra arquitetura — a sugestão acima é só
  um default por porte, não uma imposição.
* Perguntar ao dev como será a divisão de pastas: **module-first**
  (agrupado por feature/módulo) ou **layer-first** (agrupado por camada
  técnica).
* Perguntar ao dev onde vão morar os itens reutilizáveis (`shared`/
  `utils`/`helpers`/`formatters` — ver `05-agentes.md`).

Registrar as respostas de arquitetura, divisão de pastas e local do
`shared` em `.ai/context/architecture.md` e `.ai/context/structure.md`,
para que fiquem disponíveis a qualquer agente futuro — inclusive a
quebra modular greenfield de `17-sdd-workflow.md` (Fase 3), que depende
diretamente da arquitetura escolhida aqui.

## Passo 5 — MCPs (Model Context Protocol)

Servidores MCP são uma integração de ferramenta, não conhecimento canônico
— por isso a decisão é registrada em `.ai/context/integrations.md` (seção
"Ferramentas de IA"), mas a configuração de conexão em si vive no arquivo
específico da ferramenta de IA usada (ex.: `.mcp.json` de um projeto Claude
Code, configuração de MCP do editor), fora de `.ai/`, seguindo o mesmo
princípio de adaptador de `11-adaptadores.md`.

O agente DEVE pesquisar ativamente quais servidores MCP existem e fazem
sentido para a stack e as ferramentas identificadas na descoberta
(linguagem, provedor de Git/CI, containers, bancos de dados, navegador/E2E,
etc.), em vez de se limitar apenas a uma tabela fixa de evidências. A
tabela abaixo é só um ponto de partida para orientar a busca, não uma
lista exaustiva:

| Evidência no repositório | Ponto de partida da busca |
|---|---|
| Linguagem/gerenciador de pacotes identificado (ex.: `package.json`, `.csproj`, `requirements.txt`) | MCP específico da linguagem/ecossistema, quando existir |
| Remote Git aponta para Azure DevOps | MCP do Azure DevOps |
| Remote Git aponta para GitHub | MCP do GitHub |
| `Dockerfile` / `docker-compose.yml` presentes | MCP do Docker |
| Banco de dados identificado em `integrations.md` | MCP do respectivo banco de dados |
| Aplicação web (front-end servido em navegador), independentemente de já ter testes E2E configurados | MCP do Playwright |
| Testes end-to-end / navegador já configurados com outra ferramenta (ex.: Cypress) | MCP de automação de navegador correspondente |

Apresentar ao usuário os candidatos levantados pela pesquisa (com o que
cada um oferece, em poucas palavras) e aguardar aprovação explícita antes
de habilitar qualquer um. NÃO instale ou habilite nenhum MCP não aprovado
explicitamente pelo usuário. Nem todo item sugerido precisa existir de
fato (ex.: pode não haver MCP oficial para uma stack específica).

## Passo 6 — Escopo da configuração MCP

Perguntar ao usuário se a configuração MCP aprovada deve ser:

* **Local** — vale apenas para este repositório (arquivo de configuração
  dentro do próprio projeto-alvo).
* **Global** — vale para todos os projetos do usuário na máquina/ferramenta
  (configuração fora do projeto-alvo, ao nível de usuário).

O local exato de cada escopo depende da ferramenta de IA em uso e NÃO DEVE
ser assumido — se não for evidente, perguntar ao usuário onde a ferramenta
espera esse arquivo antes de gravar.

Registrar a decisão (local vs. global, e quais MCPs) em
`.ai/context/integrations.md`, mesmo que o arquivo de configuração real
fique fora de `.ai/`.

### Exemplos ilustrativos por ferramenta

Estes exemplos são referência, não prescrição — podem ficar
desatualizados; o agente DEVE sempre confirmar o comportamento real da
ferramenta em uso antes de gravar qualquer configuração:

* **Cursor** — tipicamente `.cursor/mcp.json`, local ao projeto,
  comumente adicionado ao `.gitignore`.
* **Codex** — tipicamente `.codex/config.toml`, ao nível de usuário
  (global).
* **Claude Code** — escopo local via `claude mcp add -s local ...` (grava
  em `~/.claude.json`, fora do projeto, nunca commitado);
  `.claude/settings.json`, quando committed, guarda apenas permissões —
  nunca segredos ou configuração de MCP.

## Passo 7 — Barra de status (status line)

Algumas ferramentas de IA permitem configurar uma barra de status
personalizada (ex.: rodapé do terminal) exibindo informações como o
modelo em uso, o consumo da janela de contexto, a branch Git atual e
limites de uso (rate limits). O Claude Code é um exemplo — expõe esses
dados via um payload JSON (modelo, janela de contexto, rate limits,
diretório atual) enviado por stdin a um comando configurável em
`.claude/settings.json` (`statusLine.command`).

O agente DEVE primeiro confirmar se a ferramenta de IA em uso suporta
esse tipo de configuração — NÃO assuma. Se não suportar, ou não for
possível confirmar, pule este passo sem perguntar nada ao usuário.

Quando suportado, perguntar: **"Deseja configurar uma barra de status
personalizada, mostrando modelo em uso e consumo da janela de contexto
(e, quando disponível, branch Git e limites de uso)?"**

Se o usuário confirmar, propor como default o adaptador pronto em
`templates/adapters/statusline.js` (`bob_framework`) — que exibe, nesta
ordem: modelo em uso | consumo da janela de contexto (barra de
progresso + tokens) | branch Git atual | consumo do limite de 5 horas
(barra de progresso + horário de reset) | consumo do limite semanal
(barra de progresso + dia/horário de reset). Este default reflete a
barra de status já validada no ambiente de referência deste framework —
o usuário é livre para pedir menos campos, outra ordem, ou outras cores;
o script é só um ponto de partida, não uma prescrição fechada.

Perguntar também o escopo da configuração, mesmo critério do Passo 6:

* **Local** — `.claude/settings.json` e o script dentro do próprio
  projeto-alvo (ex.: `.claude/statusline.js`).
* **Global** — `~/.claude/settings.json` e o script ao nível de
  usuário, fora do projeto-alvo, valendo para todos os projetos na
  máquina.

Assim como a configuração de MCP (Passo 6), o script e a entrada
`statusLine` de `settings.json` NUNCA vão para `.ai/` — `.ai/` permanece
agnóstico de ferramenta (`11-adaptadores.md`). Registrar apenas a
decisão (habilitado/desabilitado, escopo) em
`.ai/context/integrations.md`, seção "Ferramentas de IA".

Se a ferramenta em uso não for Claude Code mas suportar um mecanismo
equivalente, o agente DEVE adaptar o adaptador ao formato real daquela
ferramenta — nunca assumir que o formato do Claude Code (JSON via
stdin, `.claude/settings.json`) se aplica genericamente.

## Passo 8 — Preview obrigatório antes de gravar

Antes de criar qualquer arquivo definitivo desta etapa — constituição,
instruções, agentes, skills, workflows, configuração de MCP, ou
configuração de barra de status — gerar um arquivo `start.temp.md` (na
raiz do projeto-alvo) contendo:

* A lista de arquivos que serão criados/alterados, com o caminho final de
  cada um.
* O conteúdo completo proposto para cada arquivo (ou o diff, se for
  alteração de um arquivo existente).

Apresentar esse preview ao usuário e aguardar aprovação explícita antes de
gravar qualquer arquivo no destino final. Após a aprovação e a gravação,
remover `start.temp.md`.

Esta regra de preview se aplica a toda a etapa de bootstrap interativo —
não apenas aos passos de agentes/skills/MCP.
