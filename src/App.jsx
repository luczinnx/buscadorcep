import {useState} from 'react';
import './index.css';
import { FiSearch } from "react-icons/fi";
import api from './services/api.js';

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function mostraCep() {
    if(input === '') {
      alert('Preencha o campo de busca.');
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput('');
    }
    catch {
      alert('CEP não encontrado.');
      setInput('');
    }
  }

  return (
    <>
      <div className='conteiner'>
        <h1 className='titulo'>Buscar CEP</h1>
        <div className='input'>
          <input type='text' placeholder='Digite o CEP...' value={input} onChange={(e) => setInput(e.target.value)}/>

          <button className='procurar' onClick={mostraCep}><FiSearch size={20} color='white'/></button>
        </div>

        {Object.keys(cep).length > 0  && (
          <main className='principal'>
            <h2>CEP: {cep.cep}</h2>

            <span>{cep.logradouro}</span>
            <span>Complemento: {cep.complemento}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>)}
      </div>
    </>
  )
}

export default App
