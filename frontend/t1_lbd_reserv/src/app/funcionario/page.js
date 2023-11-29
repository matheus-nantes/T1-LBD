"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const router = useRouter();

  const [senha, setsenha] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setcpf] = useState("");
  const [cargo, setCargo] = useState("");
  const [dataAdmissao, setdataAdmissao] = useState("");
  const [hotelId, setHotelId] = useState("");

  var nomeHotel = "";

  const handlesenhaChange = (e) => {
    setsenha(e.target.value);
  };

  const handleNomeChange = async (e) => {
    setNome(e.target.value);
  };

  const handlecpfChange = async (e) => {
    setcpf(e.target.value);
  };

  const handleDataAdmissaoChange = async (e) => {
    setdataAdmissao(e.target.value);
    console.log(dataAdmissao);
  };

  const handleCargoChange = async (e) => {
    setCargo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("senha:", senha);
    console.log("nome:", nome);
    console.log("cpf:", cpf);
    console.log("cargo:", cargo);
    console.log("dataAdmissao:", new Date(dataAdmissao));
    console.log("hotelId", hotelId);

    const data = {
      senha: senha,
      nome: nome,
      cpf: cpf,
      cargo: cargo,
      dataAdmissao: new Date(dataAdmissao),
      hotelId: hotelId,
    };

    try {
      axios
        .post("http://localhost:3333/funcionario", data)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          toast.sucess("Hotel adicionado com sucesso", {
            position: "top-right",
            autoClose: 3000, // Fecha automaticamente após 3 segundos
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000, // Fecha automaticamente após 3 segundos
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000, // Fecha automaticamente após 3 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get("hotelId");
    setHotelId(hotelId);
    console.log(hotelId);
  }, []);

  return (
    <>
    <ToastContainer/>
      <div className="w-full h-[85px]  bg-gradient-to-br from-green-400 to-blue-600 p-8 mb-8 text-center text-white text-2xl bg-teal-700">
        Funcionários
      </div>
      <div className="w-full p-8 mb-8 text-center flex justify-center ">
        <div className="w-3/4 bg-white h-3/5 flex rounded-xl flex flex-col">
          <div className="w-full h-1/10 flex flex-row">
            <div className="text-teal-500 font-bold text-2xl p-4 text-center w-full h-1/12">
              Cadastrar Funcionário
            </div>
            <button
              type="button"
              onClick={() => router.push("/hotel")}
              class="m-2 justify-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              data-modal-hide="authentication-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <div class="px-6 py-6 lg:px-8">
            <form class="space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 text-start ">
                  CPF
                </label>
                <input
                  type="text"
                  name="CPF"
                  id="CPF"
                  placeholder="XX.XXX.XXX-XX"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={cpf}
                  onChange={handlecpfChange}
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 text-start ">
                  SENHA
                </label>
                <input
                  type="password"
                  name="SENHA"
                  id="SENHA"
                  placeholder="********"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={senha}
                  onChange={handlesenhaChange}
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 text-start ">
                  NOME
                </label>
                <input
                  type="text"
                  name="NOME"
                  id="NOME"
                  placeholder="Fulano ..."
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={nome}
                  onChange={handleNomeChange}
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 text-start ">
                  DATA DE ADMISSAO
                </label>
                <input
                  type="date"
                  name="dataAdmissao"
                  id="dataAdmissao"
                  placeholder="XXXX-XX-XX"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={dataAdmissao}
                  onChange={handleDataAdmissaoChange}
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 text-start ">
                  CARGO
                </label>
                <input
                  type="text"
                  name="CNPJ"
                  id="CPF"
                  placeholder="ex: Gerente"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                  value={cargo}
                  onChange={handleCargoChange}
                />
              </div>

              <button
                type="submit"
                class="w-1/2 text-white bg-teal-400 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
        <div
          className="fixed top-0 left-0 w-full h-full pointer-events-none"
          style={{ zIndex: -1 }}
        ></div>
      </div>
    </>
  );
}
