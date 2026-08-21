# Arquitetura

> **Escopo mapeado:** <!-- caminho ou "repositório inteiro" -->
> **Última atualização:** <!-- AAAA-MM-DD -->
> **Referência:** <!-- branch/commit quando disponível -->

<!--
Descreva a arquitetura REALMENTE implementada, não a arquitetura pretendida
por algum documento antigo. Se a documentação existente diverge do código,
registre a divergência aqui (ou em concerns.md) em vez de repetir a
afirmação desatualizada como se fosse fato.
Toda camada/módulo citado deve vir acompanhado de pelo menos um `caminho`.
-->

## Estilo arquitetural

<!-- Ex.: monolito modular, camadas, hexagonal, microsserviços, etc. — apenas se observável no código, com evidência. Se não for claro, diga isso explicitamente em vez de rotular. -->

## Camadas / módulos principais

<!--
Para cada camada ou módulo principal, liste: responsabilidade, caminhos
de arquivo/diretório, e como ele se comunica com os demais.
-->

| Camada/módulo | Responsabilidade | Caminho | Comunica-se com |
|---|---|---|---|
| | | | |

## Pontos de entrada

<!-- Onde a execução começa: servidor HTTP, CLI, handler de evento, ponto de bootstrap. Cite o arquivo exato. -->

## Fluxo de dados

<!-- Da origem (requisição, evento, input do usuário) até o destino (resposta, persistência, efeito colateral). Descreva o caminho típico com base em um exemplo real do código, citando arquivos. -->

## Limites e acoplamento

<!-- Onde os limites arquiteturais são respeitados de forma consistente, e onde há acoplamento que foge do padrão declarado (se houver). -->

## Decisões arquiteturais notáveis

<!-- Decisões que não são óbvias a partir do código sozinho e que foram encontradas em documentação, ADRs, ou comentários — sempre com a fonte citada. -->
