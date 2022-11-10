## GraphQL Schema (viewer)

Executa a aplicação [GraphQL Voyager](https://github.com/IvanGoncharov/graphql-voyager) para consulta à documentação de um
GraphQL Schema e, adicionalmente, exibe os relacionamentos
entre os tipos por meio de um grafo.

## Como usar?

- `npm install`
- `npm run dev`
- Abra o navegador em http://localhost:9091.
- Estará disponível o schema empregado pela SpaceX (apenas para demonstração)

## Como configurar para usar o meu schema?

- Crie o GraphQL SDL (Schema Definition Languenge) ([exemplo](schema.graphql))
- Atualize o script em **package.json** para consultar o schema a ser exibido.
