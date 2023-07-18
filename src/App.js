import "./styles.css";
import React, { useState } from "react";

const App = () => {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");

  const buscarEndereco = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (response.ok) {
        // Verifica se o CEP é válido
        if (!data.erro) {
          // Define o endereço encontrado
          const { logradouro, bairro, localidade, uf } = data;
          const enderecoCompleto = `${logradouro}, ${bairro}, ${localidade} - ${uf}`;
          setEndereco(enderecoCompleto);
        } else {
          setEndereco("CEP não encontrado");
        }
      } else {
        throw new Error("Erro ao buscar endereço");
      }
    } catch (error) {
      console.error(error);
      setEndereco("Erro ao buscar endereço");
    }
  };

  const limparConsulta = () => {
    setCep("");
    setEndereco("");
  };

  return (
    <div className="App">
      <div className="efeito">
        <h1>Consultar Endereço</h1>
        <div className="elements">
          <input
            type="text"
            placeholder="Digite o CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          <button onClick={buscarEndereco}>Buscar</button>
          <button onClick={limparConsulta}>Limpar</button>
        </div>
        <p>{endereco}</p>
      </div>
    </div>
  );
};

export default App;
