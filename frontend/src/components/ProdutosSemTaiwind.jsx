// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/estilo.css'

const API_URL = 'http://localhost:5000/produtos';

function ProdutosSemTaiwind() {
    const [produtos, setProdutos] = useState([]);
    const [novoProduto, setNovoProduto] = useState({ nome: '', descricao:'' });
    const [editar, setEditar] = useState(false);


    //consultar produtos

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
        try {
            const response = await axios.get(API_URL);
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    //cadastrar produtos
    const criarProduto = async () => {
        if (!novoProduto.nome || !novoProduto.descricao) {
            alert('campo obrigatório.');
            return;
        }
        try {
            // const response = await axios.post(API_URL, { nome: novoProduto.nome }); //um valor só
            const response = await axios.post(API_URL, novoProduto);
            setProdutos([...produtos, response.data]);
            setNovoProduto({ nome: '', descricao:'' });
            setEditar(false);
        } catch (error) {
            console.error('Erro ao criar Produto:', error);
        }
    };

    //alterar produtos
    const alterarProduto = async () => {
        if (!novoProduto.nome || !novoProduto.descricao) {
            alert('campo  é obrigatório.');
            return;
        }
        try {
            // const response = await axios.put(`${API_URL}/${novoProduto.id}`, { nome: novoProduto.nome });// um valor só
            const response = await axios.put(`${API_URL}/${novoProduto.id}`, novoProduto);
            setProdutos(produtos.map(produto => produto.id === novoProduto.id ? response.data : produto));
            setNovoProduto({ nome: '',descricao:'' });
            setEditar(false);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
        }
    };

    //execluir produtos

    const deletaProduto = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setProdutos(produtos.filter(produto => produto.id !== id));
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };

    const handleEditar = (produto) => {
        setNovoProduto(produto);
        setEditar(true);
    };

    const handleSubmit = () => {
        if (editar) {
            alterarProduto();
        } else {
            criarProduto();
        }
    };

    return (
        <div className="container">
            <h1>Cadastro de Produtos</h1>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Name"
                    value={novoProduto.nome}
                    onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                />

                <input
                    type="text"
                    placeholder="Descrição"
                    value={novoProduto.descricao}
                    onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
                />
                <button onClick={handleSubmit}>
                    {editar ? 'Alterar' : 'Cadastrar'}
                </button>
            </div>
            <ul>
                {produtos.map(produto => (
                    <li key={produto.id}>
                        <strong>{produto.nome}</strong> {produto.descricao}
                        <button onClick={() => handleEditar(produto)}>Editar</button>
                        <button onClick={() => deletaProduto(produto.id)}>Deletar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProdutosSemTaiwind;