const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

//let sangues = ['Puro', 'Mestiço', 'Trouxa];
// if (!sangue include(sangue));

app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hp',
  password: 'ds564',
  port: 7007
});

// 🧙✨ ROTAS PARA OS MAGOS: ✨🧙

// Rota para criar um mago:
app.post('/personagens', async (req, res) => {
  const { nome, idade, casa, habilidade, sangue } = req.body;
  const query = 'INSERT INTO personagens (nome, idade, casa, habilidade, sangue) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [nome, idade, casa, habilidade, sangue];

  let sangues=['puro', 'mestiço', 'trouxa', 'Puro', 'Mestiço', 'Trouxa'];
  let casas=['grifinória', 'sonserina', 'lufa-lufa', 'corvinal', 'Grifinória', 'Sonserina', 'Lufa-Lufa', 'Corvinal'];

  if(!sangues.includes(sangue)){
      return res.status(400).send({ message: 'Status de Sangue inválido. Digite algo válido.'})
  }

  if(!casas.includes(casa)){
      return res.status(400).send({ message: 'Casa de Hogwarts inválida. Digite algo válido.'})
  }
  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar mago:', error);
    res.status(500).send('Erro ao criar mago');
  }
});

// Rota para pegar todos os magos:
app.get('/personagens', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM personagens');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao obter magos:', error);
    res.status(500).send('Erro ao obter magos');
  }
});

// Rota para atualizar um mago:
app.put('/personagens/:id', async (req, res) => {
  const id = req.params.id;
  const { nome, idade, casa, habilidade, sangue } = req.body;
  const query = 'UPDATE personagens SET nome=$1, idade=$2, casa=$3, habilidade=$4, sangue=$5 WHERE id=$6';
  const values = [nome, idade, casa, habilidade, sangue, id];

  try {
    await pool.query(query, values);
    res.send('mago atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar mago:', error);
    res.status(500).send('Erro ao atualizar mago');
  }
});

// Rota para deletar um mago existente:
app.delete('/personagens/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM personagens WHERE id=$1';

  try {
    await pool.query(query, [id]);
    res.send('mago deletado com sucesso');
  } catch (error) {
    console.error('Erro ao deletar mago:', error);
    res.status(500).send('Erro ao deletar mago');
  }
});

// ✨ ROTAS PARA AS VARINHAS: ✨

// Rota para criar uma nova varinha:
app.post('/varinhas', async (req, res) => {
  const { material, comprimento, nucleo, data_fabricacao } = req.body;
  const query = 'INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [material, comprimento, nucleo, data_fabricacao];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar varinha:', error);
    res.status(500).send('Erro ao criar varinha');
  }
});

// Rota para obter todas as varinhas:
app.get('/varinhas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM varinhas');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao obter varinhas:', error);
    res.status(500).send('Erro ao obter varinhas');
  }
});

// Rota para atualizar uma varinha existente:
app.put('/varinhas/:id', async (req, res) => {
  const id = req.params.id;
  const { material, comprimento, nucleo, data_fabricacao } = req.body;
  const query = 'UPDATE varinhas SET material=$1, comprimento=$2, nucleo=$3, data_fabricacao=$4 WHERE id=$5';
  const values = [material, comprimento, nucleo, data_fabricacao, id];

  try {
    await pool.query(query, values);
    res.send('Varinha atualizada com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar varinha:', error);
    res.status(500).send('Erro ao atualizar varinha');
  }
});

// Rota para apagar uma varinha existente:
app.delete('/varinhas/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM varinhas WHERE id=$1';

  try {
    await pool.query(query, [id]);
    res.send('Varinha deletada com sucesso');
  } catch (error) {
    console.error('Erro ao deletar varinha:', error);
    res.status(500).send('Erro ao deletar varinha');
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando corretamente na porta ${port}✨`);
});