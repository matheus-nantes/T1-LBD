"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [cpf, setcpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nivel, setNivel] = useState("");

  const [nomeSave, setNomeSave] = useState("");
  const [emailSave, setEmailSave] = useState("");
  const [telefoneSave, setTelefoneSave] = useState("");
  const [nivelSave, setNivelSave] = useState("");

  var [destaque, setDestaque] = useState([]);
  const [excluir, setExcluir] = useState(false);
  const [editar, setEditar] = useState(false);

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleEmailChange = async (e) => {
    setEmail(e.target.value);
  };

  const handleCpfChange = async (e) => {
    setcpf(e.target.value);
  };

  const handleTelefoneChange = async (e) => {
    setTelefone(e.target.value);
  };

  const handleNivelChange = async (e) => {
    setNivel(e.target.value);
  };

  const [cadastrar, setCadastrar] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3333/cliente")
      .then((response) => {
        console.log("Resposta da API:", response.data);
        setClientes(response.data);
        setDestaque = Array(response.data.length).fill(false);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("cpf:", cpf);
    console.log("nome:", nome);
    console.log("email:", email);
    console.log("telefone:", nivel);

    const data = {
      nome: nome,
      cpf: cpf,
      email: email,
      nivel: nivel,
      telefone: telefone,
    };
    try {
      axios
        .post("http://localhost:3333/cliente", data)
        .then((response) => {
          setCadastrar(false);
          console.log("Resposta da API:", response.data);
          setClientes((prevClientes) => [...prevClientes.pop(prevClientes.findIndex(prevClientes.id === response.data.id))], response.data);
          toast.success("Cliente adicionado com sucesso!", {
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
          console.error("Erro na requisição:", error);
          toast.error(error.response, {
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
      toast.error(error.response, {
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

  const handleEdit = async (e) => {
    e.preventDefault();
    console.log("cpf:", cpf);
    console.log("nome:", nome);
    console.log("email:", email);
    console.log("telefone:", nivel);

    if(!(email === emailSave && nome === nomeSave && telefone === telefoneSave && nivel === nivelSave)){

    const data = {
      nome: nome,
      cpf: cpf,
      email: email,
      nivel: nivel,
      telefone: telefone,
    };
    try {
      axios
        .put(`http://localhost:3333/cliente`, data)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          console.log("texte:",response.data.id);
          setClientes((prevClientes) => {
            // Encontrar o índice do cliente antigo usando o id
            const indexToRemove = prevClientes.findIndex((cliente) => cliente.id === response.data.id);
      
            // Remover o cliente antigo e adicionar o novo no array
            const newClientes = [...prevClientes];
            newClientes.splice(indexToRemove, 1, response.data);
      
            return newClientes;
          });
          toast.success("Cliente editado com sucesso!", {
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
          console.error("Erro na requisição:", error);
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
    setEditar(false);}
    else{
      toast.error("Nenhum dado foi alterado", {
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

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("id: ", id);
    console.log("cpf:", cpf);

    try {
      axios
        .delete(`http://localhost:3333/cliente/${id}`)
        .then((response) => {
          console.log("foi: ", id);
          console.log("Resposta da API:", response.data);
          setClientes((prevClientes) => {
            // Encontrar o índice do cliente antigo usando o id
            const indexToRemove = prevClientes.findIndex((cliente) => cliente.id === response.data.id);
      
            // Remover o cliente antigo e adicionar o novo no array
            const newClientes = [...prevClientes];
            newClientes.pop(indexToRemove);
      
            return newClientes;
          });
          toast.success("Cliente removido com sucesso!", {
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
          console.log("não foi: ", id);
          console.error("Erro na requisição:", error.response);
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
    setExcluir(false);
  };

  return (
    <>
       <title>My Title</title>
      <div className="w-full h-[80px]  bg-gradient-to-br from-green-400 to-blue-600 p-6 mb-4 text-center text-white text-2xl bg-teal-500">
        CLIENTES
      </div>

      <div class="max-w-2xl mx-auto w-3/4 flex flex-col items-center">
        <div class="p-4 w-full rounded-lg border shadow-md bg-gray-800 border-gray-700 overflow-auto h-max-2/5">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Clientes Cadastrados
            </h3>
            <button
              type="button"
              onClick={() => {
                setId("");
                setcpf("");
                setNome("");
                setNivel("");
                setTelefone("");
                setEmail("");
                setCadastrar(true);
              }}
              class="text-blue-700 border border-blue-700 bg-teal-500 hover:bg-teal-300 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
              </svg>
              <span class="sr-only">Icon description</span>
            </button>
          </div>
          <div class="flow-root">
            <ul
              role="list"
              class="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {loading ? (
                <div>Carregando...</div>
              ) : clientes.length === 0 ? (
                <div className="text-center">Não há clientes cadastrados</div>
              ) : null}
              {clientes.map((cliente, index) => (
                <li
                  class="py-3 sm:py-4"
                  onMouseEnter={() => {
                    setDestaque((prevDestaque) => {
                      const newDestaque = [...prevDestaque];
                      newDestaque[index] = true;
                      return newDestaque;
                    });
                  }}
                  onMouseLeave={() => {
                    setDestaque((prevDestaque) => {
                      const newDestaque = [...prevDestaque];
                      newDestaque[index] = false;
                      return newDestaque;
                    });
                  }}
                >
                  <div class="flex items-center space-x-4">
                    <button
                    title="Cadastrar reserva"
                      className={` m-2 w-10 h-10 ease-in-out duration-500 hover:opacity-100 transform ${
                        destaque[index]
                          ? "scale-100 opacity-80"
                          : "scale-0 opacity-0"
                      }  bg-red-500 w-50 h-50 rounded-lg p-2 hover:bg-yellow-300`}
                      onClick={() => {
                        setExcluir(true);
                        setId(clientes[index].id);
                        setcpf(clientes[index].cpf);
                        setNome(clientes[index].nome);
                        setNivel(clientes[index].nivel);
                        setTelefone(clientes[index].telefone);
                        setEmail(clientes[index].email);
                      }}
                    >
                      <img
                        src="./icons8-calendário.gif" // Substitua com o caminho do seu arquivo GIF
                        alt="GIF"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </button>
                    <div class="flex-shrink-0">
                      <img
                        class="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                        alt="Neil image"
                      />
                    </div>
                    <div class="flex-1 min-w-0 w-3/5">
                      <div className="flex flex-row items-center">
                        <p class="text-lg font-medium text-gray-900 truncate dark:text-white">
                          {cliente.nome}
                        </p>
                        <p class="text-sm hidden text-gray-500 truncate dark:text-gray-400 pl-2 flex">
                          {cliente.cpf}
                        </p>
                      </div>
                      <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                        {cliente.email}
                      </p>
                    </div>
                    <button
                    title="Excluir cliente"
                      className={` m-2 w-10 h-10 ease-in-out duration-500 hover:opacity-100 transform ${
                        destaque[index]
                          ? "scale-100 opacity-80"
                          : "scale-0 opacity-0"
                      }  bg-red-500 w-50 h-50 rounded-lg p-2 hover:bg-yellow-300`}
                      onClick={() => {
                        setExcluir(true);
                        setId(clientes[index].id);
                        setcpf(clientes[index].cpf);
                        setNome(clientes[index].nome);
                        setNivel(clientes[index].nivel);
                        setTelefone(clientes[index].telefone);
                        setEmail(clientes[index].email);
                      }}
                    >
                      <img
                        src="./icons8-lixo.gif" // Substitua com o caminho do seu arquivo GIF
                        alt="GIF"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </button>
                    <button
                    title="Editar dados do cliente"
                      className={` ease-in-out w-10 h-10 duration-500 hover:opacity-100 transform ${
                        destaque[index]
                          ? "scale-100 opacity-80"
                          : "scale-0 opacity-0"
                      }  bg-yellow-500 w-50 h-50 rounded-lg p-2 hover:bg-yellow-300`}
                      onClick={() => {
                        setEditar(true);
                        setId(clientes[index].id);
                        setcpf(clientes[index].cpf);
                        setNome(clientes[index].nome);
                        setNivel(clientes[index].nivel);
                        setTelefone(clientes[index].telefone);
                        setEmail(clientes[index].email);

                        setNomeSave(clientes[index].nome);
                        setNivelSave(clientes[index].nivel);
                        setTelefoneSave(clientes[index].telefone);
                        setEmailSave(clientes[index].email);
                      }}
                    >
                      <img
                        src="./icons8-lápis.gif" // Substitua com o caminho do seu arquivo GIF
                        alt="GIF"
                        className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p class="mt-5">
          This card component is part of a larger, open-source library of
          Tailwind CSS components. Learn more by going to the official{" "}
          <a class="text-blue-600 hover:underline" href="#" target="_blank">
            Flowbite Documentation
          </a>
          .
        </p>
      </div>
      {cadastrar && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-30 flex justify-center items-center">
            <div className="w-3/5 h-fit bg-white flex rounded-xl flex flex-col p-0">
              <div className="w-full h-1/10 flex flex-row">
                <div className="text-teal-600 font-bold text-2xl p-4 text-center w-full h-1/12">
                  Cadastrar Cliente
                </div>
                <button
                title="Fechar"
                  type="button"
                  onClick={() => setCadastrar(false)}
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
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div class="px-6 py-6 lg:px-8">
                <form class="space-y-6" action="#" onSubmit={handleSubmit}>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">
                      CPF
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      id="cpf"
                      placeholder="xxx.xxx.xxx-xx"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={cpf}
                      onChange={handleCpfChange}
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">
                      NOME
                    </label>
                    <input
                      type="text"
                      name="nome"
                      id="nome"
                      placeholder="xx.xxx.xxx/xxx-xx"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={nome}
                      onChange={handleNomeChange}
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">
                      EMAIL
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="fulano@gmail.com"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">
                      TELEFONE
                    </label>
                    <input
                      type="text"
                      name="telefone"
                      id="telefone"
                      placeholder="DD XXXXX-XXXX"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={telefone}
                      onChange={handleTelefoneChange}
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">
                      NÍVEL
                    </label>
                    <input
                      type="text"
                      name="nivel"
                      id="nivel"
                      placeholder="ex: Diamond"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={nivel}
                      onChange={handleNivelChange}
                    />
                  </div>
                  <div></div>
                  <button
                    title="Cadastrar Cliente"
                    type="submit"
                    class="w-full mb-2 text-white bg-teal-600 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
      {editar && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-30 flex justify-center items-center">
            <div className="w-3/5 h-fit bg-white flex rounded-xl flex flex-col p-0">
              <div className="w-full h-1/10 flex flex-row">
                <div className="text-teal-600 font-bold text-2xl p-4 text-center w-full h-1/12">
                  Editar Cliente
                </div>
                <button
                title="Fechar"
                  type="button"
                  onClick={() => setEditar(false)}
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
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
              </div>

              <div class="px-6 py-6 lg:px-8">
                <form class="space-y-6" action="#" onSubmit={handleEdit}>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">
                      CPF
                    </label>
                    <input
                      type="text"
                      name="cpf"
                      id="cpf"
                      placeholder="xxx.xxx.xxx-xx"
                      class="bg-gray-200 border border-gray-300 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      disabled
                      value={cpf}
                      onChange={handleCpfChange}
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-400">
                      NOME
                    </label>
                    <input
                      type="text"
                      name="nome"
                      id="nome"
                      placeholder="xx.xxx.xxx/xxx-xx"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={nome}
                      onChange={handleNomeChange}
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">
                      EMAIL
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="fulano@gmail.com"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">
                      TELEFONE
                    </label>
                    <input
                      type="text"
                      name="telefone"
                      id="telefone"
                      placeholder="DD XXXXX-XXXX"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={telefone}
                      onChange={handleTelefoneChange}
                    />
                  </div>
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900">
                      NÍVEL
                    </label>
                    <input
                      type="text"
                      name="nivel"
                      id="nivel"
                      placeholder="ex: Diamond"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={nivel}
                      onChange={handleNivelChange}
                    />
                  </div>
                  <div></div>
                  <button
                    title="Salvar alterações"
                    type="submit"
                    class="w-full mb-2 text-white bg-teal-600 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Salvar
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
      {excluir && (
        <>
          <div
            id="deleteModal"
            tabindex="-1"
            class=" fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          >
            <div class="flex p-4 w-full max-w-md h-full justify-center items-center ">
              <div class="absolute center self-center p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5  border border-white-2">
                <button
                title="Fechar"
                  type="button"
                  onClick={() => {
                    setExcluir(false);
                  }}
                  class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="deleteModal"
                >
                  <svg
                    aria-hidden="true"
                    class="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <svg
                  class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p class="mb-4 text-gray-500 dark:text-gray-300">
                  Você tem certeza que deseja excluir o seguinte cliente:
                </p>
                <div>
                  <p class="mb-4 text-gray-500 dark:text-gray-300">
                    {`NOME: ${nome}`}
                  </p>
                  <p class="mb-4 text-gray-500 dark:text-gray-300">
                    {`CPF: ${cpf}`}
                  </p>
                </div>
                <div class="flex justify-center items-center space-x-4">
                  <button
                    data-modal-toggle="deleteModal"
                    type="button"
                    onClick={() => {
                      setExcluir(false);
                    }}
                    class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    Não, quero cancelar
                  </button>
                  <button
                    type="submit"
                    onClick={handleDelete}
                    class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Sim, tenho certeza
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
