# 🛍️ API para gerenciamento de produtos e categorias
Uma API RESTful desenvolvida com Node.js e MongoDB para gerenciamento de usuários, categorias e produtos, incluindo autenticação JWT.

## 🔭 Tecnologias Utilizadas
- Node.js
- Express
- MongoDB
- Mongoose
- Bcryptjs
- JSON Web Token (JWT)
- Body-parser

## 🚀 Instalando o projeto
Clone o repositório da aplicação para sua máquina local:
```
git clone https://github.com/giordanamartins/API-products-and-categories
```
Acesse o diretório do projeto:
```
cd projectRoot
```
Execute o servidor com o comando:
```
node src/index.js
```
## 🧭 Rotas do projeto
### Cadastro de usuário:

- **Endpoint:** `POST /auth/register`

body: {

    "username": " ",
    "password": " "
}

### Login de usuário:

- **Endpoint:** `POST /auth/authenticate`

body: {

    "username": " ",
    "password": " "
}

#### Após login com o usuário, no header das requisições é necessário utilizar token para autenticação, exemplo:
| Key           | Value               |
| ------------- | ------------------- |
| authorization | Bearer eyJhbGciO... |

### Cadastro de categoria:

- **Endpoint:** `POST /category`

body: {

    "name": " ",
    "description": " "
}

### Listar categorias:

- **Endpoint:** `GET /category`

### Buscar categoria por ID:

- **Endpoint:** `GET /category/:id`

### Edição de categoria:

- **Endpoint:** `PUT /category/:id`

body: {

    "name": " ",
    "description": " "
}

### Deletar categoria:

- **Endpoint:** `DELETE /category/:id`

### Cadastro de produto:

- **Endpoint:** `POST /product`

body: {

    "name": " ",
    "description": " ",
    "amount":  ,
    "price":  ,
    "categories": ["categoryId"]
}

### Listar produtos:

- **Endpoint:** `GET /products`

### Buscar produto por ID:

- **Endpoint:** `GET /products/:id`

### Edição de produto:

- **Endpoint:** `PUT /product/:id`

body: {

    "name": " ",
    "description": " ",
    "amount":  ,
    "price":  ,
    "categories": ["categoryId"]
}

### Deletar produto:

- **Endpoint:** `DELETE /product/:id`

### Listar categorias e produtos:

- **Endpoint:** `GET /general/categories-with-products`

### Listar produtos por ID de categoria:

- **Endpoint:** `GET /general/:CategoryId/products`

---

Feito com 💻 e ☕ por [@giordanamartins](https://github.com/giordanamartins)
