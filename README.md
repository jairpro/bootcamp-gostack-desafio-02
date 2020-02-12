<img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/raw/master/.github/logo.png" width="300px" style="max-width:100%;">

# Desafio 2: FastFeet, o início
⚠️ Etapa 1/4 do Desafio Final ⚠️


<p align="center">
  <a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-extras">Extras</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>


## 🚀 **Sobre**
Aplicação Node.js com cadastro e autenticação de usuários e cadastro de destinatários.

Desafio proposto em: https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/README.md


## ♥ **Extras**
Usa variáveis de ambiente com Dotenv (arquivo .env);

Possuí 5 configurações de banco de dados alternáveis pela variável de ambiente:
    
    NODE_ENV
    
Valores:

    - development (conexão local padrão no ambiente de desenvolvimento)
    - test1 (usei para testar o MySQL local com Xampp) 
    - test2 (usei para testar o Postgres com Docker local)
    - test3 (reservei para testar o MySQL com Docker local)
    - production (conterá a conexão escolhida para o deploy da aplicação num servidor da web)

Testado em 2 GBDs diferentes:

    1) MySQL sem Docker
    2) Postgres com Docker usando container específico

Campo "admin" no cadastro de usuários para ter acesso como adminitrador ou simples operador;

Método para corrigir o fuso das datas para os campos createdAt e updatedAt dos cadastros:

    Arquivo: utils/Utils.js
    Métódodo: Utils.fixDataToLocaleString()
        
- CRUD completo de usuários e destinatários conforme permissões do usuário;
- Alteração de senhas conforme permissões do usuário;
- Ativar/remover privilégio de administrador de acordo com o tipo de usuario autenticado;

- Opção para permitir/bloquear repeticões de nomes de usuários pela variável de ambiente:

        USER_NO_DUPLICATE_NAMES = true/false
        

## 🚀 **Instalação** 
1 - Clonar o <a href="https://github.com/jairpro/bootcamp-gostack-desafio-02">repositório</a> em seu computador;

2 - Usando como modelo o arquivo **.env.example** criar na mesma pasta um arquivo **.env** e definir a série de **variáveis de ambiente** a seguir:

    SERVER_PORT (porta da aplicação sugestão 3333 ou somar 1 até obter uma porta livre)
    AUTH_SECRET (segredo da autenticação por algorítmo md5)
    
 O md5 pode ser obtido <a href="https://www.md5online.org/">aqui</a> ou <a href="https://www.md5hashgenerator.com/">aqui</a>;
 
 Continuando com as variáveis de ambiente, temos:
    
    USER_NO_DUPLICATE_NAMES (true = não permite nomes duplicados de usuários, false = permite) 
    RECIPIENT_NO_DUPLICATE_NAMES (o mesmo acima para destinatários, mas ainda não foi implementado)

 Variáveis de ambiente para os esquemas de conexão ao GDB:

    NODE_ENV (define o esquema de conexão e o seu valor [em minúscula] equivale ao *** [em maiúscula] das variáveis abaixo)

    DB_***_DIALECT (O GDB usado: 'postgres', 'mysql', etc)
    DB_***_HOST (url do servidor GDB)
    DB_***_PORT (porta de acesso, vazio assume porta padrão conforme o GDB)
    DB_***_DATABASE (nome do banco de dados)
    DB_***_USER (nome do usuário do banco de dados)
    DB_***_PASSWORD (senha do usuário)

3 - Usando como modelo o arquivo **src/config/config.example.json** criar na mesma pasta um arquivo **config.json** e definir o restante dos campos (semelhantes aos acima) para cada **configuração de conexão ao banco de dados**: 
    
    username
    password
    database
    host
    port
    dialect
    
4 - **Instalar as dependências do projeto** digitando no terminal o comando:

    yarn

5 - **Remova as depencias de GDB sobressalentes**.

  Se não necessitar do **MySQL**, execute:
  
    yarn remove mysql2

  Ou, se não usar o **Postgres**:

    yarn remove pg pg-hstore

6 - No(s) seu(s) GDB(s) que for usar, **crie o(s) banco(s) de dados** para a aplicação e **crie o usuário com as permissões necessárias**;

7 - **Aplique as migrations para criar as tabelas no banco de dados**. No terminal da aplicação digite:

    yarn sequelize db:migrate

  O comando acima assume por padrão: `yarn sequelize db:migrate --env "development"`
    
  Alternativamente pode-se aplicar as migrations para cada esquema de conexão que necessitar:
    
    yarn sequelize db:migrate --env "production"
    yarn sequelize db:migrate --env "test1"
    yarn sequelize db:migrate --env "test2"
    yarn sequelize db:migrate --env "test3"

8 - **Aplique o seed para incluir o usuário administrador** inicial:

    yarn sequelize db:seed:all
    
  Use o esquema de conexão `--env` apropriado conforme explicado no passo anterior.

9 - Para **executar a aplicação** utilize:

    yarn dev

ou, no caso de depurar:

    yarn dev:debug
    
## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo <a href="https://github.com/jairpro/bootcamp-gostack-desafio-02/blob/master/LICENSE">LICENSE</a> para mais detalhes.

