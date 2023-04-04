const express = require('express');
const multer = require('multer');
const mysql = require('mysql2/promise');
const cors = require('cors');
const sharp = require('sharp');
const fs = require('fs');
const bcrypt = require('bcrypt')

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log(bodyParser.json())

const upload = multer({ dest: './uploads' });
app.use(cors());

app.use('/uploads', express.static('uploads'));

async function init() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12312345678fF',
    database: 'store'
  });

  app.post('/cadastrar', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, 10);
    const passwordCompare = bcrypt.compare(password, passwordHash)

    try {
        const [results, fields] = await connection.execute('INSERT INTO store.user (nome, email, password) VALUES (?, ?, ?)', [nome, email, passwordHash]);
        console.log('Cadastro inserido com sucesso');
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Erro ao inserir o cadastro no banco de dados' });
      }

    return res.status(200).send({ success: 'Usuário cadastrado com sucesso' });
  })

  app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

    try {
      const [rows, fields] = await connection.execute('SELECT * FROM user WHERE email = ?', [email]);
      if (rows.length > 0) {
        const passwordMatch = await bcrypt.compare(password, rows[0].password);
        if (passwordMatch) {
          res.setHeader('Location', '/sucesso');
          res.status(302);
          res.end();
        } else {
          res.status(401).send({ error: 'Email ou senha inválidos' });
        }
      } else {
        return res.status(401).send({ error: 'Email ou senha inválidos' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: 'Erro ao verificar o login no banco de dados' });
    }
  });


  app.post('/produtos', upload.array('imagens'), async (req, res) => {
    const imagens = req.files.map(file => './uploads/' + file.filename);
    const nome = req.body.nome;
    const preco = req.body.preco;
    const quantidade = req.body.quantidade;
    const descricao = req.body.descricao;

    for (const imagem of imagens) {
      try {
        const filename = imagem.split('/').pop();
        const outputFilename = `./uploads/compressed_${filename}`; // adiciona o sufixo "compressed_" ao nome do arquivo
        await sharp(imagem).resize(800, 800).toFile(outputFilename);
        const imagemComprimida = outputFilename;
        const [results, fields] = await connection.execute('INSERT INTO produtos (nome, preco, quantidade, imagem, descricao) VALUES (?, ?, ?, ?, ?)', [nome, preco, quantidade, imagemComprimida, descricao]);
        console.log('Produto inserido com sucesso');
        fs.unlinkSync(imagem); // Exclui a imagem original após a compressão
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Erro ao inserir o produto no banco de dados' });
      }
    }

    return res.status(200).send({ success: 'Produto adicionado com sucesso' });
  });

  app.get('/produtos', async(req, res) => {
    try{
      const [rows, fields] = await connection.execute('SELECT * FROM produtos')
      res.send(rows)
    }catch(error){
      console.log(error);
      return res.status(500).send({error: 'Não foi possível se conectar ao banco de dados'})
    }
  })

  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  })
}

init();