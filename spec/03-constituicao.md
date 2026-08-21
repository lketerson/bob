# Constituição

A constituição define regras que DEVEM ser tratadas como restrições de nível de projeto. Ela é dividida em quatro arquivos, cada um coberto por uma subseção abaixo.

## Regras Gerais

Crie:

```text
.ai/constitution/constitution.md
```

Ela DEVE definir princípios como:

* Integridade arquitetural
* Manutenibilidade
* Segurança
* Type safety quando aplicável
* Testabilidade
* Separação de responsabilidades
* Gestão de dependências
* Evitar complexidade desnecessária
* Evitar abstrações duplicadas
* Compatibilidade retroativa
* Documentação
* Observabilidade quando aplicável

NÃO assuma que todo projeto usa:

* REST
* GraphQL
* SQL
* Flutter
* React
* MVC
* Clean Architecture
* Microsserviços
* Monólitos
* Qualquer linguagem de programação específica

A constituição deve descrever princípios, não tecnologias.

## Arquitetura

Crie:

```text
.ai/constitution/architecture.md
```

Este arquivo DEVE estabelecer princípios arquiteturais genéricos.

Exemplos:

* Respeitar os limites arquiteturais existentes.
* Não introduzir padrões arquiteturais sem justificativa.
* Preferir abstrações existentes quando apropriado.
* Evitar dependências circulares.
* Manter responsabilidades coesas — cada unidade (módulo, classe, função) DEVE ter um único motivo para mudar (Princípio da Responsabilidade Única).
* Minimizar acoplamento.
* Depender de abstrações, não de implementações concretas de baixo nível (Inversão de Dependência) — módulos de alto nível não devem instanciar diretamente detalhes de infraestrutura quando uma abstração/injeção de dependência for viável para a stack do projeto.
* Manter preocupações de infraestrutura separadas de preocupações de domínio/negócio quando a arquitetura exigir.
* Não introduzir novas dependências desnecessariamente.
* Não refatorar partes não relacionadas do sistema.

A aplicação de SOLID — em especial SRP e DIP — é responsabilidade
contínua e proativa dos agentes Architect, Developer e Techlead durante
o design e a implementação (`05-agentes.md`), não apenas algo verificado
retrospectivamente por uma auditoria (`/bob-concerns`, `19-comandos.md`).

Detalhes específicos de arquitetura descobertos no repositório DEVERIAM ser documentados separadamente em:

```text
.ai/context/architecture.md
```

O framework em si DEVE permanecer agnóstico de stack.

## Segurança

Crie:

```text
.ai/constitution/security.md
```

Defina regras de segurança genéricas:

* Nunca expor segredos.
* Nunca commitar credenciais.
* Nunca hardcodar credenciais sensíveis.
* Tokens de sessão/autenticação DEVEM ser persistidos em cookies com
  atributos seguros (`HttpOnly`, `Secure`, `SameSite`) ou em secure
  storage criptografado nativo da plataforma — nunca em
  `localStorage`/`sessionStorage`/arquivo de texto plano. Credenciais de
  login (senhas, segredos) NUNCA DEVEM ser persistidas em texto puro,
  mesmo para conveniência de acesso rápido (ver `05-agentes.md`, agente
  Security).
* Tratar entradas fornecidas pelo usuário como não confiáveis.
* Seguir o princípio do menor privilégio.
* Evitar registrar informações sensíveis em logs.
* Respeitar os mecanismos de autenticação e autorização existentes.
* Não enfraquecer controles de segurança para fazer testes passarem.
* Mudanças sensíveis à segurança exigem validação explícita.

Não assuma um provedor de autenticação específico.

## Qualidade

Crie:

```text
.ai/constitution/quality.md
```

Defina princípios de qualidade genéricos:

* O código deve ser sustentável.
* As mudanças devem ser focadas.
* Testes devem acompanhar mudanças de comportamento.
* Testes existentes não devem ser ignorados.
* Evitar duplicação desnecessária.
* Evitar abstrações especulativas.
* Preferir soluções simples.
* Erros devem ser tratados explicitamente.
* Mudanças devem ser validadas antes de serem concluídas.
