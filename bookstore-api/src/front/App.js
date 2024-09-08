import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({ titulo: '', autor: '' });

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get(`${API_URL}/listlivros`);
        setLivros(response.data);
      } catch (error) {
        console.error('Erro ao buscar livros:', error);
      }
    };
    fetchLivros();
  }, []);

  const handleAdicionarLivro = async () => {
    try {
      const response = await axios.post(`${API_URL}/novolivro`, novoLivro);
      setLivros([...livros, response.data]);
      setNovoLivro({ titulo: '', autor: '', genero: '', quantidade:'' });
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  const handleExcluirLivro = async (id) => {
    try {
      await axios.delete(`${API_URL}/livrodeleted/${id}`);
      setLivros(livros.filter(livro => livro.id !== id));
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };

  return (
    <div>
      <h2>Gerenciador de Livros</h2>

      <form onSubmit={handleAdicionarLivro}>
  <div>
    <label htmlFor="titulo">Título:</label>
    <input type="text" id="titulo" name="titulo" value={novoLivro.titulo} onChange={(e) => setNovoLivro({ ...novoLivro, titulo: e.target.value })} required />
  </div>
  <div>
    <label htmlFor="autor">Autor:</label>
    <input type="text" id="autor" name="autor" value={novoLivro.autor} onChange={(e) => setNovoLivro({ ...novoLivro, autor: e.target.value })} required />
  </div>
  <div>
    <label htmlFor="genero">Gênero:</label>
    <input type="text" id="genero" name="genero" value={novoLivro.genero} onChange={(e) => setNovoLivro({ ...novoLivro, genero: e.target.value })} required />
  </div>
  <div>
    <label htmlFor="preco">Preço:</label>
    <input type="text" id="preco" name="preco" step="0.01" value={novoLivro.preco} onChange={(e) => setNovoLivro({ ...novoLivro, preco: e.target.value })} required />
  </div>
  <div>
    <label htmlFor="quantidade">Quantidade:</label>
    <input type="text" id="quantidade" name="quantidade" min="0" value={novoLivro.quantidade} onChange={(e) => setNovoLivro({ ...novoLivro, quantidade: e.target.value })} required />
  </div>
  <button type="submit">Adicionar Livro</button>
</form>

      <ul>
        {livros.map(livro => (
          <li key={livro.id}>
            {livro.titulo} - {livro.autor}
            <button onClick={() => handleExcluirLivro(livro.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;