# Execução do Programa e APIs

---

## Clonando e Executando o Projeto

### Pré-requisitos

| Recurso                                   | Versão  |
| ----------------------------------------- | ------- |
| [Yarn](https://yarnpkg.com/)              | 1.22.19 |
| [Node Js](https://nodejs.org/en)          | 20+     |
| [Docker version](https://www.docker.com/) | 24.0.2  |

Certifique-se também de ter o `git` instalado.

## Instalação

Siga as seguintes etapas para executar o projeto localmente.
Usando um terminal, vá até a pasta onde deseja clonar o repositório, então execute o seguinte comando:

```bash
git clone https://github.com/MatheusCordeiroP/Geo-Server.git
```

Então navegue até o repositório:

```bash
cd Geo-Server
```

Instale as dependências do projeto usando Yarn.

```bash
yarn
```

Após isso, digite `code .` se possuir o visual code, ou vá manualmente até a pasta do projeto, onde deverá criar os arquivos `.env` e `.env.development`, ambos baseados no arquivo `.env.example`.
Após os dados estarem configurados, execute o seguinte comando para criar o conteiner do docker com mongodb.

```bash
yarn services:up
```

Você poderá verificar se o conteiner está executando corretamente ao executar o comando

```bash
docker ps
```

Uma vez que os passos anteriores estejam devidamente executados, você pode executar o projeto com o seguinte comando:

```bash
yarn dev
```

---

## REST API docs

---

#### Testando o funcionamento do servidor.

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>(caso o servidor esteja rodando, essa api retornará um sucesso com timestamp)</code></summary>

##### Parâmetros

> None

##### Respostas

> | http code | content-type                      | resposta                                                            |
> | --------- | --------------------------------- | ------------------------------------------------------------------- |
> | `200`     | "application/json; charset=utf-8" | {"message":"Hooray! Welcome to our API!","timestamp":1709127628737} |
> | -         | -                                 | None                                                                |

##### Exemplo cURL

> ```javascript
>  curl --location 'http://localhost:3003/'
> ```

</details>

---

#### Rotas de Usuário

<details>
 <summary><code>POST</code> <code><b>/api/v1/user/create</b></code> <code>(cria um novo usuário com as informações fornecidas)</code></summary>

##### Parâmetros

> | Nome          | Tipo          | Descrição                                                                   |
> | ------------- | ------------- | --------------------------------------------------------------------------- |
> | `name`        | String        | Nome do usuário                                                             |
> | `email`       | String        | Endereço de e-mail do usuário                                               |
> | `coordinates` | Array<number> | Coordenadas geográficas do usuário (Apenas enviar se não enviar `address`.) |
> | `address`     | String        | Endereço do usuário (Apenas enviar se não enviar `coordinates`.)            |

Observação: Apenas coordinates ou address devem ser enviados para a criação de usuários, se enviar ambos, o sistema retornará em um erro `400`.

##### Respostas

> | http code | content-type                      | resposta                                                                                                                                                            |
> | --------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | `200`     | `application/json; charset=utf-8` | { "name":"Matheus Cordeiro","email": "matheus@provedormail.com","address": "mocked address for testing","coordinates": [-23,-41],"\_id":"65df3e103627a8f35ddb3fd1"} |
> | `400`     | `application/json; charset=utf-8` | {"body": [{"message": "\"name\" is required","path": ["name"],"type": "any.required","context": {"label": "name","key":"name"}}]}                                   |
> | `500`     | `application/json; charset=utf-8` | unknown                                                                                                                                                             |

##### Exemplo cURL

> ```javascript
>  curl --location 'http://localhost:3003/api/v1/user/create' --header 'Content-Type: application/json' --data-raw '{ "name": "Matheus Cordeiro",     "email": "matheus@provedormail.com", "coordinates": [ -23.005, -41.005 ] }'
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/api/v1/user?limit=10&offset=0</b></code> <code>(procura todos os usuários dentro de um limit e offset enviados na requisição.)</code></summary>

##### Exemplo cURL

> ```javascript
> curl --location 'http://localhost:3003/api/v1/user?limit=10&offset=0'
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/api/v1/user/:id</b></code> <code>(procura um usuário específico através de seu id.)</code></summary>

##### Exemplo cURL

> ```javascript
> curl --location 'http://localhost:3003/api/v1/user/65de1bd4c2dfc8b56cdd1e25'
> ```

</details>

<details>
 <summary><code>PUT</code> <code><b>/api/v1/user/:id</b></code> <code>(procura um usuário específico através de seu id, e o atualiza com os parâmetros passados através do body.)</code></summary>

##### Exemplo cURL

> ```javascript
> curl --location --request PUT 'http://localhost:3003/api/v1/user/65de1bd4c2dfc8b56cdd1e25' --header 'Content-Type: application/json' --data '{ "name":"NOVO NOME", "address": "NOVO ENDEREÇO" }'
> ```

</details>

<details>
 <summary><code>DELETE</code> <code><b>/api/v1/user/:id</b></code> <code>(procura um usuário específico através de seu id e o apaga do banco de dados.)</code></summary>

##### Exemplo cURL

> ```javascript
> curl --location --request DELETE 'http://localhost:3003/api/v1/user/65ddef39e9032e08525dedf5'
> ```

</details>

---

#### Rotas de Regiões

<details>
 <summary><code>POST</code> <code><b>/api/v1/region/create</b></code> <code>(cria uma nova região com as informações fornecidas)</code></summary>

##### Exemplo cURL

> ```javascript
> curl --location 'http://localhost:3003/api/v1/region/create' --header 'Content-Type: application/json' --data '{ "name": "Cidade de São Paulo","region": {"type": "Polygon","coordinates": [[[0.0,1.0],[1.0,1.0],[0.0,0.0], [ 0.0, 1.0 ]]]}, "created_by": "65ddef39e9032e08525dedf5" }'
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/api/v1/region?limit=10&offset=0</b></code> <code>(procura todas as regiões dentro de um limit e offset enviados na requisição.)</code></summary>

##### Exemplo cURL

> ```javascript
> curl --location 'http://localhost:3003/api/v1/region?limit=10&offset=0'
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/api/v1/region/:id</b></code> <code>(procura uma região em específico através de seu id.)</code></summary>

##### Exemplo cURL

> ```javascript
> curl --location 'http://localhost:3003/api/v1/region/65ddf014e9032e08525dedfb'
> ```

</details>

<details>
 <summary><code>PUT</code> <code><b>/api/v1/region/:id</b></code> <code>(procura uma região em específico através de seu id, e a atualiza com os parâmetros passados através do body.)</code></summary>

##### Exemplo cURL

> ```javascript
> curl --location --request PUT 'http://localhost:3003/api/v1/region/65ddf41a3e730c754bcdea4d' --header 'Content-Type: application/json' --data '{"name": "Novo Nome"}'
> ```

</details>

<details>
 <summary><code>DELETE</code> <code><b>/api/v1/region/:id</b></code> <code>(procura uma região em específico através de seu id e a apaga do banco de dados.)</code></summary>

##### Exemplo cURL

> ```javascript
> curl --location --request DELETE 'http://localhost:3003/api/v1/region/65ddf41a3e730c754bcdea4d'
> ```

</details>

---

# OZmap Challenge: Construindo a Geolocalização do Futuro

Olá desenvolvedor(a)! Bem-vindo(a) ao Desafio Técnico do OZmap. Este é um projeto que simula um cenário real de nossa empresa, onde você irá desempenhar um papel crucial ao desenvolver uma API RESTful robusta para gerenciar usuários e localizações. Estamos muito animados para ver sua abordagem e solução!

## 🌍 **Visão Geral**

Em um mundo conectado e globalizado, a geolocalização se torna cada vez mais essencial. E aqui no OZmap, buscamos sempre otimizar e melhorar nossos sistemas. Assim, você encontrará um protótipo que precisa de sua experiência para ser corrigido, melhorado e levado ao próximo nível.

## 🛠 **Especificações Técnicas**

- **Node.js**: Versão 20 ou superior.
- **Banco de Dados**: Mongo 7+.
- **ORM**: Mongoose / Typegoose.
- **Linguagem**: Typescript.
- **Formatação e Linting**: Eslint + prettier.
- **Comunicação com MongoDB**: Deve ser feita via container.

## 🔍 **Funcionalidades Esperadas**

### Usuários

- **CRUD** completo para usuários.
- Cada usuário deve ter nome, email, endereço e coordenadas.
- Na criação, o usuário pode fornecer endereço ou coordenadas. Haverá erro caso forneça ambos ou nenhum.
- Uso de serviço de geolocalização para resolver endereço ↔ coordenadas.
- Atualização de endereço ou coordenadas deve seguir a mesma lógica.

### Regiões

- **CRUD** completo para regiões.
- Uma região é definida como um polígono em GeoJSON, um formato padrão para representar formas geográficas. Cada região tem um nome, um conjunto de coordenadas que formam o polígono, e um usuário que será o dono da região.
- Listar regiões contendo um ponto específico.
- Listar regiões a uma certa distância de um ponto, com opção de filtrar regiões não pertencentes ao usuário que fez a requisição.
- Exemplo de um polígono simples em GeoJSON:
  ```json
  {
    "type": "Polygon",
    "coordinates": [
      [
        [longitude1, latitude1],
        [longitude2, latitude2],
        [longitude3, latitude3],
        [longitude1, latitude1] // Fecha o polígono
      ]
    ]
  }
  ```

### Testes

- Unitários e de integração.

## 🌟 **Diferenciais**

- Autenticação não é requisito, podendo então o usuário ser fornecido junto do corpo da requisição. Caso implemente autenticação, o usuário deve ser obtido a partir do token.
- Interface básica de usuário.
- Documentação completa da API.
- Internacionalização.
- Cobertura de código.
- Utilização de mongo session

## ⚖ **Critérios de Avaliação**

1. Organização e clareza do código.
2. Estruturação do projeto.
3. Qualidade e eficiência do código.
4. Cobertura e qualidade de testes.
5. Pontos diferenciais citados acima.
6. Tempo de entrega.
7. Padronização e clareza das mensagens de erro.
8. Organização dos commits.
9. Implementação de logs.
10. Adesão às boas práticas de API RESTful.

## 🚀 **Entrega**

1. Crie um repositório público com a base desse código.
2. Crie uma branch para realizar o seu trabalho.
3. Ao finalizar, faça um pull request para a branch `main` deste repositório.
4. Envie um email para `rh@ozmap.com.br` informando que o teste foi concluído.
5. Aguarde nosso feedback.

---

Estamos ansiosos para ver sua implementação e criatividade em ação! Boa sorte e que a força do código esteja com você! 🚀
