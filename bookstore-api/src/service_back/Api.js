const express = require('express')
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 3000

const Livro = mongoose.model('Livro', {
  titulo: String,
  autor: String,
  genero: String,
  preco: String,
  quantidade: String
});



app.get('/listlivros', async (req, res) => {
  const livros = await Livro.find()
  res.send(livros)
})

app.post('/novolivro', async (req, res) => {
  const novoLivro = new Livro(req.body);
  
  await novoLivro.save();
  res.json(novoLivro);
});

app.put('/livroput/:id', async (req, res) => {
  const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(livro);
});

app.delete('/livrodelet/:id', async (req, res) => {
  await Livro.findByIdAndDelete(req.params.id);
  res.json({ message: 'Livro deletado' });
});

app.listen(port, () => {
  mongoose.connect('mongodb+srv://ogarotodev23:BrunoSantos2304*@apicollection.uxf4j.mongodb.net/?retryWrites=true&w=majority&appName=ApiCollection');
  console.log(`app bookstore running ${port}`)
})