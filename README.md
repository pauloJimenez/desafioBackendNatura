Desafio Backend Natura
===================================
Descrição
-----------
O objetivo desse desafio é desenvolvem uma API, que execute com NodeJS, para buscar as informações de um usuário no Github e também a sua lista de repositórios com algumas informações. Essa API deve conter a seguinte funcionalidade:

Buscar as informações de um usuário no Github e seus repositórios através do username.
* Nome
* URL do Avatar
* Email
* Biografia
* Quantidade de Seguidores
* Quantidade de repositórios
* Lista de repositórios do usuário:
  * Nome do repositório
  * Nome completo do repositório
  * URL do repositório

Configurando o Ambiente
-----------------------
Para a configuração do ambiente, seguir os passos abaixo:

1. Possuir o git client instalado;
2. Possuir o nestJS instalado. Para baixar executar o comando abaixo:

```bash
npm install -g @nestjs/cli.
```

3. Clonar o projeto do desafio backend acessando o endereço do github abaixo:
https://github.com/pauloJimenez/desafioBackendNatura
4. Após clonar o projeto rodar o comando abaixo:

```bash
npm install;
```

Executando o Projeto
--------------------
Para executar o projeto é necessário seguir os passos abaixo: 

1. digitar o comando abaixo:

```bash
npm run start ou nest start.
```
2. Executar no postman ou no browser a api abaixo:

```bash
http://localhost:3000/usuario-github/{userName}
```
O parâmetro userName é o nome de usuário no github.

Exemplo: [http://localhost:3000/usuario-github/{userName}}](http://localhost:3000/usuario-github/{userName})

Consultar Swagger
-----------------
Para consultar o Swagger da API, selecione o link 
[http://localhost:3000/api](http://localhost:3000/api)

Executar Teste Unitário
-----------------------
Para executar testes unitários é necessário digitar o comando abaixo: 

```bash
npm run test
```


