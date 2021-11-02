## Users

Vamos experimentar GraphQL. Usaremos um cliente que permite submeter requisições em GraphQL, assim não será necessário se preocupar com a
interface (pelo menos enquanto aprendemos).

No lado do servidor teremos GraphQL em execução, além de um banco
de dados "fake". Naturalmente, em um sistema "real", estaríamos fazendo uso de um banco de dados real como MySQL ou MongoDB, por
exemplo. Contudo, dado que o foco está em GraphQL, vamos usar uma
alternativa mais simples para o nosso aprendizado.

### Banco de dados "fake"

O papel do nosso banco de dados será desempenhado pela ferramenta
[json-server](https://github.com/typicode/json-server).

A ideia é
simples, você cria um arquivo, por exemplo, [db.json](db.json), contendo dados iniciais a serem consultados e atualizados via GraphQL. O comando `json-server --watch db.json` coloca à disposição
uma API REST por meio da qual teremos acesso aos dados.

### Acesso o banco de dados "fake"

O acesso ao banco de dados será feita via [Axios](https://axios-http.com/). Novamente, a opção aqui é pela simplicidade e facilidade de
uso. Desta forma, podemos nos concentrar no servidor GraphQL sem nos
distrairmos.
