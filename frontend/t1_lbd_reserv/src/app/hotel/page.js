"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [hoteis, setHoteis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [colapse, setColapse] = useState(false);
  const [rating, setRating] = useState(0);

  const [cnpj, setCnpj] = useState("");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");

  const handleCnpjChange = (e) => {
    setCnpj(e.target.value);
  };

  const handleNomeChange = async (e) => {
    setNome(e.target.value);
  };

  const handleEnderecoChange = async (e) => {
    setEndereco(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("CNPJ:", cnpj);
    console.log("Nome:", nome);
    console.log("Endereco:", endereco);
    console.log("avaliacao:", rating);
    const data = {
      cnpj: cnpj,
      nome: nome,
      endereco: endereco,
      numeroEstrelas: rating,
    };

    try {
      axios
        .post("http://localhost:3333/hotel", data)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          setHoteis((prevHoteis) => {
            // Encontrar o índice do cliente antigo usando o id
            const indexToRemove = prevHoteis.findIndex((hotell) => hotell.id === response.data.id);
      
            // Remover o cliente antigo e adicionar o novo no array
            const newClientes = [...prevHoteis];
            newClientes.pop(indexToRemove);
      
            return newClientes;
          });
          toast.sucess("Hotel inserido com sucesso!", {
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
          
          console.log(error)
        });
    } catch (error) {
      toast.error(`Não foi possível salvar o hotel. Erro: ${error.response}`, {
        position: "top-right",
        autoClose: 3000, // Fecha automaticamente após 3 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log(error)
    }
    setColapse(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3333/hotel")
      .then((response) => {
        console.log("Dados da API:", response.data);
        setHoteis(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <>
    <ToastContainer/>
      <div className="w-full h-[85px]  bg-gradient-to-br from-green-400 to-blue-600 p-6 mb-8 text-center text-white text-2xl bg-blue-600">
        HOTÉIS
      </div>
      {loading ? (
        <div>Carregando...</div>
      ) : hoteis.length === 0 ? (
        <div>Não há hotéis cadastrados</div>
      ) : null}

      {!colapse ? (
        <button
          className="z-0 fixed bottom-8 right-8 inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 text-white focus:ring-4 focus:outline-none focus:ring-green-800"
          onClick={() => setColapse(true)}
        >
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black rounded-md group-hover:bg-opacity-0">
            <h3>Adicionar Hotel</h3>
          </span>
        </button>
      ) : null}
      <div
        aria-label="group of cards"
        tabIndex="0"
        className="focus:outline-none py-8 w-full"
      >
        <div className="flex flex-wrap  w-full p-auto items-center justify-center">
          {hoteis.map((hotel, index) => (
            <div
              className="focus:outline-none w-2/3 lg:w-1/5 m-4  bg-white p-6 shadow rounded "
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
                      className="truncate font-medium max-w-[150px] leading-5 text-gray-800"
                    >
                      {hotel.nome}
                    </p>
                    <p
                      tabIndex="0"
                      className="focus:outline-none  text-sm leading-normal pt-2 text-gray-500"
                    >
                      {
                        <div class="flex items-center space-x-1">
                          <svg
                            class={`w-4 h-4 ${
                              hotel.numeroEstrelas >= 1
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class={`w-4 h-4 ${
                              hotel.numeroEstrelas >= 2
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class={`w-4 h-4 ${
                              hotel.numeroEstrelas >= 3
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class={`w-4 h-4 ${
                              hotel.numeroEstrelas >= 4
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <svg
                            class={`w-4 h-4 ${
                              hotel.numeroEstrelas == 5
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                        </div>
                      }
                    </p>
                  </div>
                  <div role="img" aria-label="bookmark" className="self-end">
                    <svg
                      className="focus:outline-none "
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z"
                        stroke="#2C3E50"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <p
                  tabIndex="0"
                  className="focus:outline-none text-sm leading-5 py-4 text-gray-600 h-32"
                >
                  {hotel.endereco}
                </p>
              </div>
              <div className="w-full flex justify-end">
              <button
                type="button"
                class=" flex self-end text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={()=>{
                    router.push(`/funcionario/?hotelId=${hotel.id}`)
                }}
              >
                Cadastrar Funcionário
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {colapse && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-30 flex justify-center items-center">
            <div className="w-3/4 h-3/5 bg-white flex rounded-xl flex flex-col">
              <div className="w-full h-1/10 flex flex-row">
                <div className="text-blue-600 font-bold text-2xl p-4 text-center w-full h-1/12">
                  Cadastrar hotel
                </div>
                <button
                  type="button"
                  onClick={() => setColapse(false)}
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
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900"
                    >
                      CNPJ
                    </label>
                    <input
                      type="text"
                      name="CNPJ"
                      id="CNPJ"
                      placeholder="xx.xxx.xxx/xxx-xx"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={cnpj}
                      onChange={handleCnpjChange}
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900"
                    >
                      NOME
                    </label>
                    <input
                      type="text"
                      name="NOME"
                      id="NOME"
                      placeholder="NOME"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={nome}
                      onChange={handleNomeChange}
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900"
                    >
                      ENDEREÇO
                    </label>
                    <input
                      type="text"
                      name="ENDEREÇO"
                      id="ENDEREÇO"
                      placeholder="Rua X, Bairro Y, n° XXX, Cidade - Estado"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={endereco}
                      onChange={handleEnderecoChange}
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900"
                    >
                      AVALIAÇÃO
                    </label>
                    <div class="flex items-center space-x-1">
                      <svg
                        class={`w-4 h-4 ${
                          rating >= 1 ? "text-yellow-300" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => {
                          rating == 1 ? setRating(0) : setRating(1);
                        }}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class={`w-4 h-4 ${
                          rating >= 2 ? "text-yellow-300" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => {
                          rating == 2 ? setRating(1) : setRating(2);
                        }}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class={`w-4 h-4 ${
                          rating >= 3 ? "text-yellow-300" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => {
                          rating == 3 ? setRating(2) : setRating(3);
                        }}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class={`w-4 h-4 ${
                          rating >= 4 ? "text-yellow-300" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => {
                          rating == 4 ? setRating(3) : setRating(4);
                        }}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        class={`w-4 h-4 ${
                          rating == 5 ? "text-yellow-300" : "text-gray-300"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                        onClick={() => {
                          rating == 5 ? setRating(4) : setRating(5);
                        }}
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                  </div>
                  <button
                    type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Cadastrar
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: -1 }}
          ></div>
        </>
      )}
    </>
  );
}
