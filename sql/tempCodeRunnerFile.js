  app.get('/produtos', async(req, res) => {
    try{
      const [rows, fields] = await connection.execute('SELECT * FROM produtos')
      res.send(rows)
    }catch(error){
      console.log(error);
      return res.status(500).send({error: 'Não foi possível se conectar ao banco de dados'})
    }
  })