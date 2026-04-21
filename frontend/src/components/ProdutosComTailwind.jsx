import {useState, useEffect} from 'react'
import axios from 'axios';

const ProdutosComTailwind = () => {
//adicionado para funcionar na vercel(deploy)
const API_URL ="https://testedeploycrud.vercel.app/produtos";


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
    <div className="container mx-auto p-4">
  <h1 className="text-2xl font-bold mb-4">Cadastro de Produtos</h1>
  <form className="mb-4">
    <div className="mb-2">
      <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
      <input
        type="text"
        id="nome"
        placeholder="Nome"
        value={novoProduto.nome}
        onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
        className="mt-1 p-2 border rounded w-full"
      />
    </div>
    <div className="mb-2">
      <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
      <input
        type="text"
        id="descricao"
        placeholder="Descrição"
        value={novoProduto.descricao}
        onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
        className="mt-1 p-2 border rounded w-full"
      />
    </div>
    <button
      onClick={handleSubmit}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {editar ? 'Alterar' : 'Cadastrar'}
    </button>
  </form>
  <ul>
    {produtos.map(produto => (
      <li key={produto.id} className="border p-2 mb-2 rounded flex items-center justify-between">
        <div>
          <strong className="font-semibold">{produto.nome}</strong> {produto.descricao}
        </div>
        <div>
          <button
            onClick={() => handleEditar(produto)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
          >
            Editar
          </button>
          <button
            onClick={() => deletaProduto(produto.id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            Deletar
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
  )
}

export default ProdutosComTailwind
