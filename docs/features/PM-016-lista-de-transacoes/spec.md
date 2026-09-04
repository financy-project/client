# Lista de Transações - PM-016

## Design

Ainda não há link do Figma nem screenshots para esta tela — a definir em conjunto com o `product-owner` agent ou o usuário. Quando houver link, rodar `/figma-fidelity` antes de planejar (`/feature-plan` já invoca automaticamente se `spec.md` linkar um Figma).

## Description

Adiciona a listagem de transações na tela `/transacoes`. Hoje a tela só tem o cabeçalho (título "Transações", subtítulo, botão "+ Nova transação") e o modal de criação, entregues no PM-014 — que explicitamente deixou "a listagem/grade de transações da tela `/transacoes`" fora de escopo para uma feature futura. Esta é essa feature. Consome a query `listTransactions` já existente no servidor (`../server/src/modules/transaction`), que retorna uma `TransactionConnection` (edges + `pageInfo`) com paginação por cursor (`first`/`after`) e suporta filtros (`startDate`, `endDate`, `month`, `year`, `description`, `type`, `categoryIds`) — não usados nesta feature, ver Out of Scope.

## Users

Usuários autenticados revisando as transações que cadastraram

## Acceptance Criteria

* [ ] A tela `/transacoes` exibe uma lista das transações do usuário, abaixo do cabeçalho já existente, consumindo `listTransactions`
* [ ] Cada item da lista exibe: descrição, data, categoria (quando houver — `category` é nullable em `TransactionType`), tipo (despesa/receita) e valor formatado em R$ (o servidor retorna `value` como `Int` em centavos)
* [ ] O tipo (despesa/receita) é indicado visualmente — reaproveitar `TransactionTypeIndicator` (`src/components/transaction-type-indicator.tsx`) se o rótulo/estilo servir para a lista, ou confirmar em `/feature-plan` se o Figma pede algo diferente
* [ ] Estado vazio (nenhuma transação cadastrada): mensagem apropriada no lugar da lista
* [ ] Carregar mais transações além da primeira página usa `first`/`after` de `listTransactions` (definir em `/feature-plan` o padrão de UI — "carregar mais" vs. scroll infinito vs. paginação tradicional)

## Out of Scope

- Edição e exclusão de transações a partir da lista — as mutations `updateTransaction`/`deleteTransaction` já existem no servidor, mas a UI (ex. menu de ações por item) fica para uma feature futura
- Filtros de busca/data/categoria/tipo na UI — o servidor já aceita `description`, `type`, `categoryIds`, `startDate`/`endDate`, `month`/`year` em `listTransactions`, mas nenhum controle de filtro é adicionado nesta feature
- Ordenação customizada (a ordem retornada pelo servidor é a assumida)
- Resumo/totais agregados da lista (ex. total de despesas/receitas do período) — potencial feature futura, análoga ao PM-013 (`resumo-da-lista-de-categorias`)
