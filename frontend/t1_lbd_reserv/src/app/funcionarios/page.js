"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(false);
  
    try {
      axios
        .get("http://localhost:3333/funcionario")
        .then((response) => {
          console.log("Resposta da API:", response.data);
          setFuncionarios(response.data);
        })
        .catch((error) => {
          console.error("Erro na requisição:", error);
        });
    } catch (error) {
      router.push("/hotel");
    }

  useEffect(() => {
    axios
      .get("http://localhost:3333/hotel")
      .then((response) => {
        console.log("Dados da API:", response.data);
        setFuncionarios(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="w-full h-[80px] hover:z-0 transition duration-500 hover:bg-opacity-0.5 h-1/10 bg-blue-500 p-8 mb-8 text-center text-white text-2xl bg-blue-600">
        Funcionários
      </div>
      {loading ? (
        <div>Carregando...</div>
      ) : funcionarios.length === 0 ? (
        <div>Não há funcionarios cadastrados</div>
      ) : null}

      <div
        aria-label="group of cards"
        tabIndex="0"
        className="focus:outline-none py-8 w-full"
      >
        <div className="flex flex-col w-full p-auto items-center justify-center">
          {funcionarios.map((funcionario, index) => (
            <div
              className="focus:outline-none w-3/4 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 m-6 shadow rounded "
              key={index}
            >
              <div className="flex items-center border-b border-gray-200 pb-6">
                <img
                  src="https://cdn.tuk.dev/assets/components/misc/doge-coin.png"
                  alt="coin avatar"
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex items-start w-full">
                  <div className="w-full">
                    <p
                      tabIndex="0"
                      className="truncate font-medium max-w-[150px] leading-5 text-gray-800 "
                    >
                      {funcionario.nome}
                    </p>
                    <p
                      tabIndex="0"
                      className="focus:outline-none  text-sm leading-normal pt-2 text-gray-500 font-bold"
                    >
                      {`CPF: ${funcionario.cpf}`}
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-2">
              <p
                      tabIndex="0"
                      className="focus:outline-none  text-sm leading-normal pt-2 text-gray-500 font-bold"
                    >
                  {`Cargo: ${funcionario.cargo}`}
                </p>
              </div>
              <div className="px-2">
              <p
                      tabIndex="0"
                      className="focus:outline-none  text-sm leading-normal pt-2 text-gray-500 font-bold"
                    >
                  {`Admissão: ${funcionario.dataAdmissao}`}
                </p>
              </div>
              <div className="w-full flex justify-end">
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
