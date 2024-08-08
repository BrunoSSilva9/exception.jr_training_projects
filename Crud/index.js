const express = require('express');

const app = express();
const port = 3020;

const cursos = ['Java Avancado', 'Desenvolvimento de games', 'Phyton'];

app.use(express.json());

app.get('/cursos', (req, res) => {
  res.json(cursos);
});

app.get('/cursos/:index', (req, res) => {
  const { index } = req.params;
  const curso = cursos[index];

  if (!curso) {
    return res.status(404).json({ message: 'Curso não encontrado' });
  }

  res.json(curso);
});

app.post('/cursos', (req, res) => {
  const { name } = req.body;
  cursos.push(name);
  res.status(201).json(cursos);
});

app.put('/cursos/:index', (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  if (index >= cursos.length || index < 0) {
    return res.status(404).json({ message: 'Curso não encontrado' });
  }

  cursos[index] = name;
  res.json(cursos);
});

app.delete('/cursos/:index', (req, res) => {
  const { index } = req.params;

  if (index >= cursos.length || index < 0) {
    return res.status(404).json({ message: 'Curso não encontrado' });
  }

  cursos.splice(index, 1);
  res.json({ message: 'Curso deletado com sucesso' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
