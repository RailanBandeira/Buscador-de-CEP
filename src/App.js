import './App.css';
import { useState } from 'react';
import Cep from './componentes/imagem';

function App() {

  const [endereco, setEndereco] = useState({})

  function manipularEndereco(evento) {

    const cep = evento.target.value

    setEndereco({
      cep
    })

    if (cep && cep.length === 8) {
      // obter o cep
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resposta => resposta.json())
        .then(dados => {
          setEndereco({
            cep: cep,
            rua: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf
          })
        })
    }

  }
  return (
    <div className="App">
      <header className="App-header">
        <Cep />
        <h1>Buscador de Cep</h1>
        <input placeholder='Digite o cep' onChange={manipularEndereco}></input>
        <ul>
          <li>CEP: {endereco.cep}</li>
          <li>Bairro: {endereco.bairro}</li>
          <li>Cidade: {endereco.cidade}</li>
          <li>Estado: {endereco.estado}</li>
        </ul>
      </header>
    </div>
  );
}

export default App;