<img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png" width="300px" style="max-width:100%;">

# Desafio 2: FastFeet, o início
⚠️ Etapa 1/4 do Desafio Final ⚠️


## 🚀 **Sobre**
Aplicação Node.js com cadastro e autenticação de usuários e cadastro de destinatários.

Desafio proposto em: https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/README.md


## ♥ **Extras**
Usa variáveis de ambiente com Dotenv (arquivo .env)

Possuí 5 configurações de banco de dados alternáveis pela variável de ambiente:
    
    NODE_ENV
    
Valores:

    - development
    - test1
    - test2
    - test3
    - production

Testado em 2 GBDs diferentes:

    1) MySQL sem docker
    2) Postgres com Docker usando container específico

Campo "admin" no cadastro de usuários para ter acesso como adminitrador ou simples operador.

Método para corrigir o fuso das datas para os campos createdAt e updatedAt dos cadastros.

    Arquivo: utils/Utils.js
    Métódodo: Utils.fixDataToLocaleString()
        
- CRUD completo de usários e destinatários conforme permissões do usuário
- Alteração de senhas
- Ativar/remover privilégio de administrador de acordo com o tipo de usuario autenticado
- Opção para permitir/bloquear repeticões de nomes de users pela variável de ambiente:

        USER_NO_DUPLICATE_NAMES = true/false
        

## 🚀 **Instalação** 
1 - Clonar o <a href="https://github.com/jairpro/bootcamp-gostack-desafio-02">repositório</a> em seu computador;

2 - Usando como modole o arquivo **.env.example** criar na mesma pasta um arquivo **.env** e definir as variaveis de ambiente da apliacação:

    SERVER_PORT (porta da aplicação sugestão 3333 ou somar 1 até obter uma porta livre)
    AUTH_SECRET (segredo da autenticação por algorítmo md5.
    
 O md5 pode ser obtido <a href="https://www.md5online.org/">aqui</a> ou <a href="https://www.md5hashgenerator.com/">aqui</a>)
    
    USER_NO_DUPLICATE_NAMES (true = não permite nomes duplicados de usuários, false = permite) 
    RECIPIENT_NO_DUPLICATE_NAMES (o mesmo acima para destinatários, mas ainda não foi implementado)

 Esquemas de conexão ao GDB:

    NODE_ENV (define o esquema de conexão das variáveis abaixo, equivale ao *** em maiúsculas nas variaveis abaixo:)

    DB_***_DIALECT (O GDB usado: 'postgres', 'mysql', etc)
    DB_***_HOST (url do servidor GDB)
    DB_***_PORT (porta de acesso, vazio assume porta padrão conforme o GDB)
    DB_***_DATABASE (nome do banco de dados)
    DB_***_USER (nome do usuário do banco de dados)
    DB_***_PASSWORD (senha do usuário)

3 - Usando como modelo o arquivo **src/config/config.example.json** criar na mesma pasta um arquivo **config.json** e definir o restante dos campos (semelhantes aos acima) para cada configuração de conexão ao banco de dados: 
    
    username
    password
    database
    host
    port
    dialect
    
4 - Instalar as dependências do projeto digitando no terminal o comando:

    yarn
    
5 - Para executar a aplicação utilize:

    yarn dev

ou para depurar:

    yarn dev:debug
    
## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo <a href="https://github.com/jairpro/bootcamp-gostack-desafio-02/blob/master/LICENSE">LICENSE</a> para mais detalhes.

