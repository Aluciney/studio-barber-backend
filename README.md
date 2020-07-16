# studio-barber-backend

### Estrutura de Arquivos

A estrutura de arquivos está da seguinte maneira:

```bash
studio-barber-backend
├── src/
│   ├── app/
│   │   └── models/
│   │       ├── index.js
│   │       └── user.js
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   ├── AuthenticationController.js
│   │   └── UserController.js
│   ├── database/
│   │   ├── migrations/
│   │   │   └── 20200715143841-create-user.js
│   │   └── seeders/
│   ├── middlewares/
│   │   └── auth.js
│   ├── routes.js
│   ├── server.js
│   └── server.test.js
├── .env.example
├── .gitignore
├── .sequelizerc
├── jest.config.js
├── LICENSE
├── package.json
└── README.md
```

Serão explicados os arquivos e diretórios na seção de [Edição](#edição).

### Instalação

1. Para instalar e utilizar esse projeto o processo é bem simples, basta clonar o repositório usando:

```sh
git clone https://github.com/Aluciney/studio-barber-backend.git
```

2. Depois do projeto baixado você entra na raiz e instala as dependências:

##### yarn - 
```sh
yarn
```
##### npm - 
```sh
npm install
```

Com isso o projeto será criado com todas as dependências devidamente, tal como os arquivos de configuração que são copiados para o projeto.

---