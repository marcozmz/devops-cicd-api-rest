# 🚀 API REST — Node.js + Express

API RESTful construída com **Node.js** e **Express**, seguindo boas práticas de organização por camadas (routes → controller → data). Inclui validação de dados, tratamento de erros, suporte a CORS e pipelines de CI/CD com GitHub Actions.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js) ![Express](https://img.shields.io/badge/Express-4.18-black?logo=express) ![CI](https://img.shields.io/badge/CI-GitHub%20Actions-blue?logo=githubactions) ![License](https://img.shields.io/badge/Licen%C3%A7a-MIT-yellow)

---

## 📁 Estrutura do Projeto

```
api-rest/
├── .env                          # Variáveis de ambiente
├── .gitignore
├── package.json
├── .github/
│   └── workflows/
│       ├── ci-matrix.yml         # Testes de compatibilidade de ambiente
│       ├── api-tests.yml         # Testes automáticos de endpoints
│       └── pr-validacao.yml      # Comentário automático em Pull Requests
└── src/
    ├── server.js                 # Inicialização do servidor
    ├── app.js                    # Configuração do Express
    ├── data/
    │   └── db.js                 # Banco de dados em memória
    ├── controllers/
    │   └── usuariosController.js # Lógica de negócio
    ├── middlewares/
    │   └── validacao.js          # Validação de requisições
    └── routes/
        └── usuarios.js           # Definição das rotas
```

---

## ⚙️ Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- npm v9 ou superior

---

## 🛠️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/devops-cicd-api-rest.git
cd devops-cicd-api-rest

# Instale as dependências
npm install
```

---

## ▶️ Como Executar

```bash
# Desenvolvimento (com hot-reload via nodemon)
npm run dev

# Produção
npm start
```

O servidor estará disponível em: `http://localhost:3000`

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
NODE_ENV=development
```

---

## 📦 Dependências

| Pacote            | Versão  | Descrição                           |
|-------------------|---------|-------------------------------------|
| express           | ^4.18.2 | Framework HTTP                      |
| cors              | ^2.8.5  | Habilita requisições cross-origin   |
| dotenv            | ^16.3.1 | Carrega variáveis de ambiente       |
| express-validator | ^7.0.1  | Validação de dados nas requisições  |
| uuid              | ^9.0.0  | Geração de IDs únicos               |
| nodemon *(dev)*   | ^3.0.1  | Reinicia o servidor automaticamente |

---

## 🌐 Endpoints

### Base URL: `http://localhost:3000`

| Método | Rota                | Descrição                | Status esperado |
|--------|---------------------|--------------------------|-----------------|
| GET    | `/`                 | Status da API            | 200             |
| GET    | `/api/usuarios`     | Listar todos os usuários | 200             |
| GET    | `/api/usuarios/:id` | Buscar usuário por ID    | 200 / 404       |
| POST   | `/api/usuarios`     | Criar novo usuário       | 201 / 400       |
| PUT    | `/api/usuarios/:id` | Atualizar usuário        | 200 / 404       |
| DELETE | `/api/usuarios/:id` | Remover usuário          | 204 / 404       |

### Exemplos de uso

#### `GET /api/usuarios`
```bash
curl http://localhost:3000/api/usuarios
```
```json
{
  "total": 2,
  "dados": [
    { "id": "1", "nome": "João Silva", "email": "joao@email.com", "idade": 30 },
    { "id": "2", "nome": "Maria Souza", "email": "maria@email.com", "idade": 25 }
  ]
}
```

#### `POST /api/usuarios`
```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome": "Ana Lima", "email": "ana@email.com", "idade": 28}'
```
```json
{ "id": "uuid-gerado", "nome": "Ana Lima", "email": "ana@email.com", "idade": 28 }
```

#### `PUT /api/usuarios/:id`
```bash
curl -X PUT http://localhost:3000/api/usuarios/1 \
  -H "Content-Type: application/json" \
  -d '{"nome": "João Atualizado", "email": "joao@email.com", "idade": 31}'
```

#### `DELETE /api/usuarios/:id`
```bash
curl -X DELETE http://localhost:3000/api/usuarios/1
```

---

## ✅ Validações

Ao criar ou atualizar um usuário, os seguintes campos são obrigatórios:

| Campo | Tipo   | Regras                           |
|-------|--------|----------------------------------|
| nome  | string | Obrigatório, mínimo 2 caracteres |
| email | string | Obrigatório, formato válido      |
| idade | number | Obrigatório, entre 0 e 120       |

**Exemplo de erro de validação (`400`):**
```json
{
  "erros": [
    { "msg": "Email inválido", "path": "email" },
    { "msg": "Nome deve ter ao menos 2 caracteres", "path": "nome" }
  ]
}
```

---

## ❌ Códigos de Resposta

| Código | Significado              |
|--------|--------------------------|
| 200    | OK                       |
| 201    | Criado com sucesso       |
| 204    | Sem conteúdo (deletado)  |
| 400    | Dados inválidos          |
| 404    | Recurso não encontrado   |
| 500    | Erro interno do servidor |

---

## ⚙️ CI/CD com GitHub Actions

Este projeto possui três pipelines automatizados que rodam a cada `push` e `pull request`.

### 1. Matriz de Compatibilidade (`ci-matrix.yml`)

Testa a aplicação em **9 combinações** de ambiente simultaneamente:

|             | Ubuntu | Windows | macOS |
|-------------|--------|---------|-------|
| **Node 18** | ✅     | ✅      | ✅    |
| **Node 20** | ✅     | ✅      | ✅    |
| **Node 22** | ✅     | ✅      | ✅    |

### 2. Testes de Endpoints (`api-tests.yml`)

Sobe o servidor e valida cada rota automaticamente:

| Teste                     | Status esperado |
|---------------------------|-----------------|
| GET /                     | 200             |
| GET /api/usuarios         | 200             |
| GET /api/usuarios/1       | 200             |
| GET /api/usuarios/999     | 404             |
| POST com payload válido   | 201             |
| POST com payload inválido | 400             |
| PUT em ID existente       | 200             |
| PUT em ID inexistente     | 404             |
| DELETE em ID existente    | 204             |
| DELETE em ID inexistente  | 404             |
| Rota inexistente          | 404             |

### 3. Comentário Automático em Pull Requests (`pr-validacao.yml`)

A cada Pull Request aberto, o GitHub Actions roda todos os testes e posta automaticamente um comentário com o resultado completo, indicando exatamente quais verificações passaram ou falharam.

> **Configuração necessária:** em Settings → Actions → General → Workflow permissions, marque **"Read and write permissions"** para que o bot consiga postar comentários.

---

## 🔮 Próximos Passos

- [ ] Integração com banco de dados (MongoDB ou PostgreSQL)
- [ ] Autenticação com JWT
- [ ] Paginação na listagem
- [ ] Testes automatizados com Jest
- [ ] Documentação com Swagger

---

## 👥 Contribuidores

| [[marcozmz]](https://github.com/marcozmz) | [Thur7798](https://github.com/Thur7798) |

---

## 📄 Licença

MIT