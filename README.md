# 📌 Projeto de Gerenciamento de Clientes

Este projeto foi desenvolvido como parte de um case técnico, com o objetivo de implementar autenticação de usuários e um CRUD de clientes utilizando **Angular** e **Node.js (NestJS/Express)**.

## 🚀 Funcionalidades

- Cadastro e login de usuários com **autenticação via token (JWT)**  
- Proteção de rotas com **AuthGuard**  
- CRUD de clientes:
  - Criar cliente
  - Listar clientes
  - Editar cliente
  - Excluir cliente  
- Formulários com validação (Angular Reactive Forms + Angular Material)  
- Máscaras para CPF e telefone  
- Estrutura modular e reutilizável no frontend  

## 🛠️ Tecnologias Utilizadas

- Angular 19
- Angular Material
- Reactive Forms
- RxJS
- Signals
- ngx-mask

## 📂 Estrutura do Projeto

```bash
src
├── app
│   ├── app.component.*         # Componente raiz
│   ├── app.config.ts           # Configuração do app
│   ├── app.routes.ts           # Rotas principais
│   │
│   ├── guards                  # Guards para proteção de rotas
│   │   ├── auth                # Protege rotas autenticadas
│   │   └── login               # Evita acesso à tela de login já autenticado
│   │
│   ├── interceptors            # Interceptor HTTP para JWT
│   │   └── auth.interceptor.ts
│   │
│   ├── interfaces              # Interfaces de tipagem
│   │   ├── client.interface.ts
│   │   └── user.interface.ts
│   │
│   ├── pages                   # Páginas principais
│   │   ├── client              # Listagem e gestão de clientes
│   │   ├── login               # Tela de login
│   │   └── register            # Tela de cadastro
│   │
│   ├── pipes                   # Pipes customizados
│   │   ├── formatted-cpf
│   │   └── formatted-phone
│   │
│   ├── services                # Serviços
│   │   ├── auth                # Autenticação
│   │   ├── client              # Gestão de clientes
│   │   └── loading             # Spinner de carregamento
│   │
│   └── shared/components       # Componentes compartilhados
│       ├── forms/authentication-form
│       ├── header
│       ├── loading-spinner-component
│       └── wrapper/auth-wrapper
│
├── assets                      # Imagens e recursos estáticos
└── environments                # Variáveis de ambiente
```

## ▶️ Como Rodar o Projeto
1. Clonar o repositório
git clone https://github.com/LaNicolau/client-manager.git

2. Instalar dependências
npm install

3. Rodar em ambiente de desenvolvimento
ng serve

Acesse no navegador: http://localhost:4200

## 📌 Observações

- O projeto está integrado com um banco de dados **PostgreSQL** hospedado na nuvem.  
- Por esse motivo, a **primeira requisição** após um período de inatividade pode demorar um pouco, pois o banco "adormece" para economizar recursos.  
- Após essa primeira chamada, as requisições seguintes são processadas normalmente e com maior rapidez.

- A autenticação foi implementada como plus, garantindo proteção de rotas e login seguro.
- Atualmente, todos os usuários logados conseguem visualizar os clientes cadastrados no sistema (não foi feita separação de dados por usuário).

## ✨ Possíveis Melhorias Futuras

Separar os dados por usuário (cada conta ver apenas seus clientes).
Implementar refresh token.
Adicionar paginação e filtros na listagem de clientes.
