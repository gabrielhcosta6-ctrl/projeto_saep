# Sistema de Gerenciamento de Chamados Técnicos

## Integrante
- Gabriel Henrique

## Tecnologias Utilizadas
- **Backend:** Node.js, Express, MySQL2, CORS
- **Frontend:** HTML5, CSS3, JavaScript (Fetch API)
- **Banco de Dados:** MySQL

## Instruções para Executar

### Configuração do Banco de Dados
1. Executei o script contido em script.sql no seu banco de dados MySQL para gerar as tabelas.

### Executando o Backend
1. abri o terminal na pasta backend.
2. Executei npm install para baixar as dependências.
3. Iniciei o servidor com node server.js.
4. O servidor rodou na porta 3000.

### Executando o Frontend
1. Abri o arquivo frontend/index.html diretamente no navegador.
2. Utilizei as credenciais padrão para logar:
   - **E-mail:** `admin@suporte.com`
   - **Senha:** `123456`

## Endpoints da API
- `POST /login` - Autenticação
- `POST /usuarios` - Cadastrar Usuário
- `GET /usuarios` - Listar Usuários
- `GET /chamados` - Listar Chamados (Aceita queries `?status=` e `?prioridade=`)
- `GET /chamados/:id` - Buscar Chamado por ID
- `POST /chamados` - Criar Chamado
- `PUT /chamados/:id` - Atualizar Chamado
- `DELETE /chamados/:id` - Excluir Chamado
