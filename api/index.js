// backend/index.js
const express = require('express');// Esta linha importa o módulo express, que é um framework web Node.js usado para criar aplicativos web e APIs de forma rápida e fácil
const cors = require('cors');// Esta linha importa o módulo cors (Cross-Origin Resource Sharing). O CORS é um mecanismo de segurança do navegador que restringe solicitações HTTP/HTTPS de um domínio diferente daquele onde o recurso solicitado reside.
const bodyParser = require('body-parser'); //é um middleware que analisa os corpos das requisições HTTP de entrada (como dados de formulário ou JSON) e os torna acessíveis através de req.body
const { v4: uuidv4 } = require('uuid'); // Importando uuid //A função v4 é responsável por gerar IDs universais únicos (UUIDs) 

const app = express();
const PORT = process.env.PORT || 5000;

//adicionado para funcionar na vercel(deploy)
app.use(cors({
  origin: 'https://deploybackfrontreactcrud.vercel.app'
}));
app.use(bodyParser.json());

let produtos = [];

// Create
app.post('/produtos', (req, res) => {
    const { nome,descricao } = req.body;
    if (!nome || !descricao) {
        return res.status(400).json({ error: ' campo obrigatório.' });
    }
    const novoItem = { id: uuidv4(), nome,descricao }; // Gera um ID único
    produtos.push(novoItem);
    res.status(201).json(novoItem);
});


// Read
app.get('/produtos', (req, res) => {
    res.json(produtos);
});

// Update
//falotu passar o :id para alterar
app.put('/produtos/:id', (req, res) => {
    const produtoId = req.params.id; //Obtém o ID do produto da URL
    const { nome,descricao } = req.body;
    if (!nome || !descricao) {
        return res.status(400).json({ error: 'O campo é obrigatório.' });
    }
    const produtoIndex = produtos.findIndex(item => item.id === produtoId);
    if (produtoIndex === -1) {
        return res.status(404).json({ error: 'Produto não encontrado.' }); // Retorna uma resposta de erro(404)
    }
    produtos[produtoIndex] = { id: produtoId, nome,descricao };
    res.json(produtos[produtoIndex]);
});

// Delete
//falotu passar o :id para excluir
app.delete('/produtos/:id', (req, res) => {
    const produtoId = req.params.id; //Obtém o ID do produto da URL
    const inicioProduto = produtos.length; //Armazena o tamanho inicial do array de produtos
    produtos = produtos.filter(item => item.id !== produtoId); //Filtra o array, removendo o produto com o ID correspondente
    if (produtos.length === inicioProduto) { //Verifica se o produto foi removido
        return res.status(404).json({ error: 'produto não encontrado.' }); // Retorna um erro 404 se o produto não foi encontrado
    }
    res.status(204).send(); // Retorna uma resposta de sucesso (204)
});

// app.listen(PORT, () => {
//     console.log(`Servidor Rodando na Porta ${PORT}`);
// });

module.exports = app;