# API-products-and-categories
> O projeto consiste em uma API para cadastro de usuários, categorias e produtos.

## 💻 Pré-requisitos
- Node.js e npm;
- MongoDB;
- Git.
  
## 🔭 Dependências utilizadas
- Bcryptjs;
- Body-parser;
- Express;
- JsonWebToken;
- Mongoose.

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

``POST`` http://localhost:3000/auth/register

body: {

    "username": " ",
    "password": " "
}

### Login de usuário:

``POST`` http://localhost:3000/auth/authenticate

body: {

    "username": " ",
    "password": " "
}

#### Após login com o usuário, no header das requisições é necessário utilizar token para autenticação, exemplo:
| Key           | Value               |
| ------------- | ------------------- |
| authorization | Bearer eyJhbGciO... |

### Cadastro de categoria:

``POST`` http://localhost:3000/category

body: {

    "name": " ",
    "description": " "
}

### Listar categorias:

``GET`` http://localhost:3000/category

### Buscar categoria por ID:

``GET`` http://localhost:3000/category/:id

### Edição de categoria:

``PUT`` http://localhost:3000/category/:id

body: {

    "name": " ",
    "description": " "
}

### Deletar categoria:

``DELETE`` http://localhost:3000/category/:id

### Cadastro de produto:

``POST`` http://localhost:3000/product

body: {

    "name": " ",
    "description": " ",
    "amount":  ,
    "price":  ,
    "categories": ["categoryId"]
}

### Listar produtos:

``GET`` http://localhost:3000/products

### Buscar produto por ID:

``GET`` http://localhost:3000/products/:id

### Edição de produto:

``PUT`` http://localhost:3000/product/:id

body: {

    "name": " ",
    "description": " ",
    "amount":  ,
    "price":  ,
    "categories": ["categoryId"]
}

### Deletar produto:

``DELETE`` http://localhost:3000/product/:id

### Listar categorias e produtos:

``GET`` http://localhost:3000/general/categories-with-products

### Listar produtos por ID de categoria:

``GET`` http://localhost:3000/general/:CategoryId/products
