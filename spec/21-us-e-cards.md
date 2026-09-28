# US e Cards — Formalização da Fase 1 e Enriquecimento de Tasks

## Quando este spec se aplica

Esta é uma camada **opcional** sobre o fluxo de SDD já definido em
`17-sdd-workflow.md`. Ela só se aplica quando o time decide formalizar
a Fase 1 (Descoberta/Pesquisa) num artefato próprio (`us.md`) e
enriquecer as tarefas da Fase 3 com o formato de "card" descrito
abaixo — nada aqui é obrigatório para quem já está satisfeito com o
fluxo padrão (`spec.md` gerado direto a partir da User Story do
sistema de rastreamento).

Como em `18-board-e-branch.md`, este arquivo não substitui uma
convenção própria já estabelecida — se o repositório já tiver um
formato de US/card equivalente, ele prevalece
(`13-descoberta-e-migracao.md`).

## US (User Story)

### O que é

Formaliza a Fase 1 (Descoberta/Pesquisa) de `17-sdd-workflow.md` num
documento de produto/negócio — Job Story, critério de aceite em
linguagem de usuário, cenários BDD — sem nenhum detalhe técnico ou de
implementação. É o "porquê/o quê"; `spec.md` (Fase 2) continua sendo o
"como técnico", gerado a partir do US já aprovado.

### Onde vive

`.ai/specs/features/<slug>/us.md`, usando `templates/specs/us.md` —
terceiro arquivo opcional de `.ai/specs/features/<slug>/`, ao lado de
`spec.md`/`tasks.md` (ver `07-specs.md`). Segue a mesma regra
"local-first" de `17-sdd-workflow.md` — sempre local; sincronização
para o board (quando houver) só mediante confirmação explícita, nunca
automática. A pasta em si não muda com ou sem board — o que muda é só
se há ou não um passo de sincronização depois (`17-sdd-workflow.md`,
"Local vs. board").

### Fluxo

1. **Happy path primeiro** (`/bob-us-create`) — Job Story, critério de
   aceite e cenário BDD só do caminho feliz. Nada de edge case ainda.
2. **Edge cases** (`/bob-us-edge-cases`) — o agente pergunta
   incansavelmente até não restar ambiguidade sobre o que o usuário
   pode e não pode fazer. Áreas mínimas a cobrir: rotas, tipo de
   usuário quando indefinido ou múltiplo, falha de rede, falha de
   backend, o que acontece ao tentar voltar, o que é obrigatório vs.
   opcional — lista de partida, não fechada; o agente complementa
   conforme o domínio exigir.
3. **Gate** — mesmo gate de decisão de negócio já existente em
   `17-sdd-workflow.md`, Fase 2: sem critério de aceite claro nem dono
   de negócio identificável, a US não é finalizada — sinaliza e para.
4. Só então a US aprovada alimenta a Fase 2 (`/bob-us-plan` → produz
   `spec.md`, seguindo `17-sdd-workflow.md` normalmente).

## Cards (tasks enriquecidas)

Um card **é** uma tarefa — mesma unidade de `tasks.md`
(`templates/specs/tasks.md`), não um conceito paralelo. Quando o
projeto adota este fluxo, cada bloco de tarefa PODE usar os campos
extras opcionais já adicionados ao template (Exemplo de
implementação, Contrato, Esforço/Risco, Referência à spec) — quem não
adotar o fluxo de US simplesmente não preenche esses campos.

Regras adicionais de quebra, sobre o que `17-sdd-workflow.md` Fase 3
já define:

* Minimizar dependência entre cards — priorizar paralelização.
* Quando uma task for grande demais para uma entrega só, a primeira
  deve entregar uma base sólida sobre a qual as demais operam, em vez
  de dividir arbitrariamente.

### Sincronização com board (quando houver)

Segue a regra "Local vs. board" de `17-sdd-workflow.md`: `us.md`,
`spec.md` e `tasks.md` são sempre gerados localmente primeiro; a
sincronização para o board só acontece mediante confirmação explícita
— nunca automática.

Ao sincronizar, o item do board que representa a US vira o item pai, e
cada card sincronizado DEVE referenciar esse item pai — usando o
mecanismo nativo de item pai/relacionado que o sistema suportar (ex.:
`US#12345` com `card#12346`, `card#12347`, ..., `card#1234N`
vinculados a ele — cada card é, ele mesmo, uma task, conforme já
estabelecido na seção "Cards" acima). Isso é a mesma regra geral já
estabelecida em `17-sdd-workflow.md`, Fase 3 ("cada item do board
DEVE referenciar a User Story de origem"), só tornada explícita aqui
para o par US/card.

### % de completude da US

Uma US só é considerada completa quando todos os seus cards estão
implementados. Quando o board suportar (ex.: checklist nativo de item
de trabalho, task list de issue), o item da US DEVE manter um
checklist com um item por card vinculado, marcado conforme cada card
conclui — isso torna a % de completude visível direto no card pai
(ex.: `13/14`), sem precisar abrir cada card individualmente. Se o
board não suportar checklist nativo, a contagem de cards
concluídos/total no corpo do item da US é o fallback aceitável.

N USs PODEM ser complementares e compor uma feature inteira maior —
nesse caso, ver "Branch de sync de múltiplas entregas" em
`18-board-e-branch.md` para como elas se juntam antes de ir para
produção.

## Branch e PR

* Ao iniciar a implementação de uma US, nasce uma branch de
  integração `us/<id>-<slug>` a partir da branch principal — mesmo
  mecanismo já descrito em `18-board-e-branch.md`, seção "Branch de
  sync (epic ou US, opcional)": as branches de cada card fazem merge
  nela, e só ao final ela segue para seu destino (por padrão
  main/release/prod).
* PR de card: `/bob-us-task-pr`, sempre em draft, alvo = branch da US
  — segue `18-board-e-branch.md`, seção "Pull Request", sem exceção.
* PR de sync de múltiplas entregas (várias US/epics já integradas
  indo juntas para produção): `/bob-us-sync-pr`, seguindo
  `18-board-e-branch.md`, seção "Branch de sync de múltiplas entregas
  (opcional)".

## Revisão

`/bob-us-pr-review` e `/bob-us-pr-adjust` DEVEM ser implementadas
sobre o papel `reviewer` (`05-agentes.md`) e a seção "Revisão" de
`18-board-e-branch.md` — nunca sobre skills de outro plugin/monorepo
nem sobre ferramenta externa (mesmo princípio já aplicado ao afastar a
dependência do speckit deste framework). `/bob-us-pr-review` DEVE
entregar, quando o achado for grande o suficiente para virar trabalho
rastreável por si só, uma US descrevendo como o erro ocorre (mesmo
formato de `us.md` acima), em vez de só um comentário solto.

## Material de apoio

Exemplos ilustrativos (adaptáveis, não prescrição):

### Exemplo de US (recorte)

```
Job Story: Quando um usuário faz login em um novo dispositivo, eu
quero que o sistema reconheça esse dispositivo, para que possamos
identificar acessos futuros.

Critério de aceite:
- Login em dispositivo não reconhecido antes disso o registra como
  principal, sem fricção.
- Login em dispositivo diferente do principal encaminha para um
  fluxo de verificação.

Cenário 1, caminho feliz:
Dado que a conta não tem dispositivo principal registrado,
Quando o usuário conclui o login,
Então o dispositivo passa a ser o principal da conta.
```

### Exemplo de card (recorte)

```
## Escopo
Criar o `RegisterPrimaryDeviceUsecase` com as regras de negócio dos
critérios 1 e 2. Integrar no controller de login: retornar 403 para
dispositivo não reconhecido.

## Contrato
POST /auth/login
Response 403 (novo): { "code": "UNRECOGNIZED_DEVICE" }

## Definition of Done
- [ ] Usecase criado e testado
- [ ] Controller retorna 403 no cenário correto
- [ ] PR revisado e aprovado

## Esforço
3 pontos | Risco: Médio
```

### Exemplo de PR de sync (recorte de título/corpo)

```
Título: [SYNC] - 1234, 1235, 1236 <nome da entrega> - DD/MM

Corpo:
Sincroniza para a release as entregas de <nome> integradas em
<branch de origem>:

- #1234 <descrição>
  [APPROVED ✅] - PR !101: <título>
  [APPROVED ✅] - PR !108: <título>
- #1235 <descrição>
  [APPROVED ✅] - PR !112: <título>

Sem mudanças de código novas nesta PR além do merge, com resolução de
conflitos em <arquivos>, se houver.
```
