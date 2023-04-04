# StoreComSQL

Fiz esse site em html, javascript e css que é uma loja de roupas de banho. No site você poderá fazer cadastro e login (a página seguinte não leva a lugar algum - mas da a resposta se o login  foi bem sucedido ou não) e com a aba produtos você pode inserir os produtos que deseja vender neste site. Os produtos são inseridos dinamicamente com imagens e textos, criando um card que dá o preço e solicita a quantidade desejada. Essa não é a versão final do site, mas já está no fim do código.

------

Este é um código HTML que representa uma página da web. A página tem um formulário de login e um formulário de cadastro, ambos com campos de email, senha e nome. A página também tem uma seção de loja que é preenchida com produtos que são gerados dinamicamente a partir de um conjunto de dados no arquivo JSON. O usuário pode pesquisar produtos na loja usando a barra de pesquisa. Há também um carrinho de compras que é preenchido com os produtos adicionados pelo usuário. O código também inclui algumas fontes do Google Fonts e ícones do Material Design.

Este código é um exemplo de servidor web escrito em Node.js usando o framework Express. Ele usa alguns pacotes como o Multer para lidar com upload de arquivos, o MySQL para interagir com o banco de dados e o Bcrypt para criptografar senhas.

A aplicação expõe rotas para cadastro de usuários, login, adição de produtos e listagem de produtos. Ao cadastrar um usuário, a senha é criptografada com o Bcrypt antes de ser armazenada no banco de dados. Ao fazer login, a senha fornecida é comparada com a senha armazenada no banco de dados usando o Bcrypt. Ao adicionar um produto, as imagens são redimensionadas usando o Sharp e o produto é adicionado ao banco de dados. Ao listar os produtos, uma consulta é feita ao banco de dados e os resultados são retornados ao cliente. O servidor escuta na porta 3000.
