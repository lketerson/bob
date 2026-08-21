# /bob-security

## Descrição

Aciona diretamente o agente Security para uma análise focada em
vazamento de segredos, tratamento de `.env`, injeção (SQL e afins),
spoofing/falhas de autenticação, exposição a negação de serviço
(DoS/DDoS), e demais categorias conhecidas de vulnerabilidade.

## Sintaxe

`/bob-security [escopo opcional]` — sem argumento, analisa o repositório
inteiro; com um caminho, restringe a análise a essa área.

## Pré-condições

`.ai/` já existente, com `.ai/agents/security.md` criado.

## Aciona

Agente Security (`spec/05-agentes.md`), diretamente.

## Processo

Segue o processo definido em `.ai/agents/security.md`, priorizando
achados por severidade e impacto real.

## Saída esperada

Um relatório de achados de segurança priorizado — nenhuma correção é
aplicada automaticamente, a menos que explicitamente solicitado.
