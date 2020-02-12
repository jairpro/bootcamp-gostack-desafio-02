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

Testado 2 GBDs diferentes:

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
1 - Clonar esse repositório em seu computador;

2 - Instalar as dependências do projeto digitando no terminal o comando:

    yarn
    
3 - Para executar a aplicação utilize:

    yarn dev

ou para depurar:

    yarn dev:debug
    
## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
