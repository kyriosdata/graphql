## Experimentação

Uma entidade "Disciplina" cujo único atributo,
além do identificador único é o nome.

## Uso

- `npm run start`
- Abra o navegador http://localhost:4000
- Submeta a seguinte GraphQL query

```
{
  disciplina(id:"1") {
    nome
  }
}
```

- A consulta abaixo simplesmente retorna o total de disciplinas.

```
{
	total
}
```
