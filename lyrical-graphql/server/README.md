## Acesso ao Cosmos DB (MongoDB API)

Defina variáveis de ambiente, por exemplo: 

- `AZURE_MONGODB_USER`
- `AZURE_MONGODB_PASSWORD`

Execute o CLI mongosh conforme abaixo: 

- `mongosh mongodb://%AZURE_MONGODB_USER%:%AZURE_MONGOD_PASSWORD%@<url fornecida pelo Azure>`