<img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/3633608606b6134c1775a8d37daa1ea25b2eb3d6/.github/logo.png" width="300px" style="max-width:100%;">

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

Desafio proposto em: https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/3633608606b6134c1775a8d37daa1ea25b2eb3d6/README.md


## ♥ **Extras**

- Usa variáveis de ambiente com Dotenv (arquivo .env);
- Campo "admin" no cadastro de usuários para ter acesso como adminitrador ou simples operador;
- CRUD completo de usuários e destinatários conforme permissões do usuário;
- Alteração de senhas conforme permissões do usuário;
- Ativar/remover privilégio de administrador de acordo com o tipo de usuário autenticado;
- Opção para permitir/bloquear repeticões de nomes de usuários pela variável de ambiente:

        USER_NO_DUPLICATE_NAMES = true/false


## 🚀 **Instalação**
1 - Clonar o <a href="https://github.com/jairpro/bootcamp-gostack-desafio-02">repositório</a> em seu computador;

2 - Usando como modelo o arquivo **.env.example** criar na mesma pasta um arquivo **.env** e definir a série de **variáveis de ambiente** a seguir:

    APP_PORT (porta da aplicação sugestão 3333 ou somar 1 até obter uma porta livre)
    AUTH_SECRET (segredo da autenticação por algorítmo md5)

 O md5 pode ser obtido <a href="https://www.md5online.org/">aqui</a> ou <a href="https://www.md5hashgenerator.com/">aqui</a>;

 Continuando com as variáveis de ambiente, temos:

    USER_NO_DUPLICATE_NAMES (true = não permite nomes duplicados de usuários, false = permite)
    RECIPIENT_NO_DUPLICATE_NAMES (o mesmo acima para destinatários, mas ainda não foi implementado)

 Variáveis de ambiente para os esquemas de conexão ao GDB:

    DB_DIALECT (O GDB usado: 'postgres', 'mysql', etc)
    DB_HOST (url do servidor GDB)
    DB_PORT (porta de acesso, vazio assume porta padrão conforme o GDB)
    DB_NAME (nome do banco de dados)
    DB_USER (nome do usuário do banco de dados)
    DB_PASS (senha do usuário)

3 - **Instalar as dependências do projeto** digitando no terminal o comando:

    yarn

4 - Nos seus GDBs que for usar, **crie os bancos de dados, e para cada banco, o respectivo usuário com as permissões de acesso necessárias**;

5 - **Aplique as migrations para criar as tabelas no banco de dados**. No terminal da aplicação digite:

    yarn sequelize db:migrate --config src/config/database.js

6 - **Aplique o seed para incluir o usuário administrador** inicial:

    yarn sequelize db:seed:all --config src/config/database.js

7 - Para **executar a aplicação** utilize:

    yarn dev

ou, no caso de depurar:

    yarn dev:debug

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo <a href="https://github.com/jairpro/bootcamp-gostack-desafio-02/blob/master/LICENSE">LICENSE</a> para mais detalhes.
