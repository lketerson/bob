# Instruções

As instruções definem COMO os agentes devem operar.

Crie:

```text
.ai/instructions/general.md
.ai/instructions/coding.md
.ai/instructions/testing.md
.ai/instructions/git.md
.ai/instructions/documentation.md
.ai/instructions/erros-corrigidos.md
```

## Geral

Defina:

* Inspecionar antes de modificar.
* Entender o código existente antes de criar abstrações.
* Reutilizar padrões existentes quando apropriado.
* Evitar mudanças não relacionadas.
* Pedir esclarecimento quando os requisitos forem genuinamente ambíguos.
* Não fabricar APIs, arquivos, dependências ou comportamento do projeto.
* Declarar suposições quando forem necessárias.
* Validar as mudanças.

## Código

Defina práticas de desenvolvimento genéricas:

* Seguir as convenções existentes.
* Preferir código legível.
* Manter funções/componentes/classes focados.
* Evitar abstração prematura.
* Evitar dependências desnecessárias.
* Preservar compatibilidade retroativa quando possível.
* Manter as mudanças mínimas e coerentes.

## Testes

Defina:

* Identificar o nível de teste apropriado.
* Adicionar ou atualizar testes para mudanças de comportamento.
* Não remover testes apenas para fazer a suíte passar.
* Preferir testes determinísticos.
* Validar casos extremos.
* Executar primeiro o menor escopo de teste relevante.
* Executar validação mais ampla quando apropriado.

NÃO assuma um framework de testes específico.

## Git

Defina regras genéricas:

* Inspecionar o status do repositório antes de mudanças.
* Não sobrescrever mudanças não relacionadas do usuário.
* Não criar commits a menos que solicitado.
* Não reescrever histórico a menos que explicitamente solicitado.
* Manter commits focados quando commits forem solicitados.
* Se o repositório já possui uma árvore Git com histórico, analisar o padrão real de branches, nomenclatura, uso de worktrees e mensagens de commit antes de assumir qualquer convenção — ver o processo de descoberta em [`13-descoberta-e-migracao.md`](13-descoberta-e-migracao.md).
* Seguir convenções de Git específicas do repositório quando um padrão claro e consistente existir.
* Se o repositório tem histórico mas nenhum padrão claro for identificável, perguntar ao usuário se há uma convenção a seguir antes de adotar a convenção padrão deste framework — nunca assumir silenciosamente.
* Para um repositório sem histórico de Git ainda (greenfield), a convenção padrão deste framework PODE ser adotada diretamente, sem necessidade de perguntar.

## Documentação

Defina:

* Atualizar a documentação quando o comportamento ou a arquitetura mudarem.
* Preferir documentação próxima ao conceito relevante.
* Evitar documentar detalhes de implementação propensos a ficarem obsoletos.
* Manter a documentação concisa e precisa.

## Erros Corrigidos (Memória Persistente)

`.ai/instructions/erros-corrigidos.md` é uma memória persistente e
cumulativa de correções que o dev já fez a implementações de agentes
deste projeto — existe para que o mesmo erro não se repita numa sessão
ou agente futuro sem acesso ao histórico da conversa anterior.

Diferente de `coding.md`/`testing.md`/`git.md`/`documentation.md`
(carregados conforme a relevância da tarefa atual — ver
`12-precedencia-e-divulgacao.md`), este arquivo, junto com `general.md`,
DEVE ser sempre considerado por todo agente, independentemente do tipo
de tarefa.

### Quando registrar uma entrada

O gatilho principal e mais comum acontece dentro da própria sessão de
trabalho: sempre que o dev, em resposta a uma implementação que o agente
acabou de propor ou escrever, pedir uma correção — de nomenclatura,
variável, estrutura, padrão, arquitetura etc. — o agente DEVE, ao
aplicar a correção pedida, generalizar esse pedido numa regra
reutilizável e adicioná-la à seção correspondente deste arquivo (ver
"Organização em seções", abaixo), antes de considerar a tarefa
concluída. Não é necessário nenhum mecanismo formal de revisão para
isso — a maioria das entradas nasce assim, de uma correção direta do dev
no meio da conversa. O mesmo vale quando a correção vier por outro
caminho (achado de um Reviewer, reprovação formal em CR/QA quando o
projeto usa board — `18-board-e-branch.md` — ou falha de
validação/teste): o gatilho é sempre "uma implementação foi marcada como
incorreta", não um mecanismo específico de board ou revisão.

Exemplo:

```text
DEV: Implemente uma função que soma dois números.
AGENTE: num soma(a, b) { return a + b; }
DEV: O nome da função deve ser mais descritivo, e devemos usar uma
     variável para armazenar o valor antes do retorno.
AGENTE: (aplica a correção pedida e, antes de considerar a tarefa
        concluída, registra as duas entradas abaixo)

num somaValores(a, b) {
  num valorSomado = a + b;
  return valorSomado;
}
```

Entradas resultantes — uma na seção "Nomenclatura", outra na seção
"Variáveis" (nunca citando `soma`/`somaValores` diretamente, só a regra
generalizada):

* Nomenclatura → "Nomes de função devem ser descritivos o suficiente
  para comunicar o que a função faz, não apenas o tipo de operação."
* Variáveis → "Preferir armazenar o resultado de uma expressão numa
  variável nomeada antes do `return`, em vez de retornar a expressão
  diretamente, quando isso tornar a intenção mais clara."

### Organização em seções

O arquivo é dividido em seções temáticas, criadas conforme a
necessidade — não uma lista fechada. Ponto de partida sugerido:

```text
## Nomenclatura
## Variáveis
## Arquitetura
## Padrões
## Testes
## Outras
```

Cada correção vai na seção mais específica que se aplicar. Se nenhuma
seção existente couber, o agente PODE criar uma nova seção temática em
vez de forçar o encaixe numa existente; "Outras" é só para casos raros
que ainda não justificam seção própria.

### Formato de cada entrada

Dentro de cada seção, mais recente no topo:

```markdown
### [AAAA-MM-DD] <título curto e genérico do erro>

* **Erro cometido:** <o que foi feito de forma incorreta, descrito de forma genérica>
* **Correção a aplicar dali em diante:** <regra reutilizável, redigida como instrução para o futuro, não como narrativa do incidente>
```

A entrada DEVE generalizar o pedido do dev (regra reutilizável), nunca
ficar amarrada ao arquivo, tarefa ou nome de variável/função específico
do caso que a originou.

Antes de propor ou implementar qualquer coisa, todo agente DEVE consultar
este arquivo (mesma disciplina de verificar pastas de lógica
compartilhada antes de duplicar código — `05-agentes.md`), em especial
as seções relevantes à tarefa atual, para não repetir um erro já
registrado. O arquivo começa vazio (apenas com os cabeçalhos de seção
sugeridos acima e este texto explicativo), sem entradas inventadas no
bootstrap.
