"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { parseCookies } from "nookies";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [funcId, setFuncId] = useState("");

  const [hoteis, setHoteis] = useState([]);
  const [quartos, setQuartos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [quartosDisp, setQuartosDisp] = useState([]);
  const [quartosEscolhidos, setQuartosEscolhidos] = useState([]);

  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [nAdultos, setNAdultos] = useState(0);
  const [nCriancas, setNCriancas] = useState(0);
  const [clienteId, setClienteid] = useState("");


  const [cadastrar, setCadastrar] = useState(false);

  const router = useRouter();

  const handleCheckinChange = (e) => {
    if (e.target.value > checkout && checkout != "") {
      toast.warning("Data de checkout não pode ser anterior ao checkin!", {
        position: "top-right",
        autoClose: 3000, // Fecha automaticamente após 3 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setCheckin(e.target.value);
    }
    const newCheckin = new Date(checkin);
    console.log(newCheckin);

    const newCheckout = new Date(checkout);
    console.log(newCheckout);
    
    try {
      axios
        .get(`http://localhost:3333/quarto/livres/${newCheckin.toISOString()}/${newCheckout.toISOString()}`)
        .then((response) => {
          setQuartosDisp(response.data);
          console.log(quartosDisp);
        })
        .catch((error) => {
          console.error("erro:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckoutChange = async (e) => {
    if (e.target.value < checkin && checkin != "") {
      toast.warning("Data de checkout não pode ser anterior ao checkin!", {
        position: "top-right",
        autoClose: 3000, // Fecha automaticamente após 3 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setCheckout(e.target.value);
    }
  };

  const handlenAdultos = async (e) => {
    setNAdultos(e.target.value);
  };
  const handlenCriancas = async (e) => {
    setNCriancas(e.target.value);
  };

  const handleClienteId = async (e) => {
    setClienteid(e.target.value);
  };

  const ReservasList = ({ quartoId }) => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
      const cookies = parseCookies();

      if (cookies["funcID"]) {
        setFuncId(cookies["funcID"]);
        console.log("Funcionário autenticado:", funcId);
      } else {
        console.log("Nenhum funcionario autenticado");
      }
      // Chamar a API para obter as reservas do quarto usando quartoId
      try {
        axios
          .get(`http://localhost:3333/reserva/byquarto/${quartoId}`)
          .then((response) => {
            setReservas(response.data);
          })
          .catch((error) => {
            console.error("erro:", error);
          });
      } catch (error) {
        console.log(error);
      }
    }, [quartoId]);

    return (
      <div className="flex flex-row overflow-auto">
        <ToastContainer />
        {reservas.map((reserva) => (
          <p
            key={reserva.id}
            className="w-32 h-fit p-4 m-4 align-center justify-center text-white p-4 bg-blue-600 rounded-lg w-full text-center flex flex-row"
          >
            {`${formatarData(reserva.checkin)} - ${formatarData(
              reserva.checkout
            )}`}
          </p>
        ))}
      </div>
    );
  };

  const formatarData = (data) => {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate();
    const mes = dataFormatada.getMonth() + 1;
    const ano = dataFormatada.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      checkin : checkin,
      checkout: checkout,
      nAdultos: nAdultos,
      nCriancas: nCriancas,
      status: "reservado",
      clienteId: clienteId,
      funcionarioId: funcId,
      quartosReservados: quartosDisp,
      metodoPagamento: "Cartão de débito"
    };

    try {
      axios
        .post("http://localhost:3333/reserva", data)
        .then((response) => {
          toast.sucess(
            "Reserva efetuada",
            {
              position: "top-right",
              autoClose: 3000, // Fecha automaticamente após 3 segundos
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          window.locale.reaload();
        })
        .catch((error) => {
          console.error("Erro na requisição:", error);
        });
    } catch (error) {
      router.push("/reserva");
    }
  };

  useEffect(() => {
    //obter hotéis
    axios
      .get("http://localhost:3333/hotel")
      .then((response) => {
        console.log("Dados da API:", response.data);
        setHoteis(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(
          `Não foi possível carregar os hoteis. Erro: ${error.response.data.message}`,
          {
            position: "top-right",
            autoClose: 3000, // Fecha automaticamente após 3 segundos
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setLoading(false);
      });

    //obter quartos
    axios
      .get("http://localhost:3333/quarto")
      .then((response) => {
        console.log("Dados da API:", response.data);
        setQuartos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(
          `Não foi possível carregar os quartos. Erro: ${error.response.data.message}`,
          {
            position: "top-right",
            autoClose: 3000, // Fecha automaticamente após 3 segundos
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setLoading(false);
      });

    //obter clientes
    axios
      .get("http://localhost:3333/cliente")
      .then((response) => {
        console.log("Resposta da API:", response.data);
        const dados = response.data; 
        const clientesOrdenados = dados.sort((a, b) =>
          a.nome.localeCompare(b.nome)
        );
        setClientes(clientesOrdenados);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  }, []);

  return (
    <>
      <title>Reservas</title>
      <ToastContainer />

      <div className="w-full h-[85px]  bg-gradient-to-br from-green-400 to-blue-600 p-6 mb-4 text-center text-white text-2xl">
        Reserva
      </div>

      <div className="w-full mx-auto w-3/4 flex flex-col items-center">
        <div className="p-4 w-3/5 rounded-lg border shadow-md bg-gradient-to-r from-green-400 to-blue-600 border-gray-700 overflow-auto h-max-4/5">
          <div className="flex flex flex-col justify-between items-center mb-4">
            <div className="w-full justify-between items-center flex flex-row">
              <h3 className="text-xl font-bold leading-none text-black">
                Reservas
              </h3>

              <button
                type="button"
                title="Cadastrar reserva"
                onClick={() => {
                  setCadastrar(true);
                }}
                className="text-blue-700 border border-black bg-green-600 hover:bg-green-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
                </svg>
                <span className="sr-only">Icon description</span>
              </button>
            </div>
            {hoteis.map((hotel, index) => (
              <div className="w-full h-4/5 flex flex-col m-4" key={index}>
                <div
                  href="#"
                  className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                >
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {hotel.nome}
                  </h5>
                  <div className="flex items-center space-x-1">
                    <svg
                      className={`w-4 h-4 ${
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
                      className={`w-4 h-4 ${
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
                      className={`w-4 h-4 ${
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
                      className={`w-4 h-4 ${
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
                      className={`w-4 h-4 ${
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

                  <div className="flex flex-col items-center h-2/3 m-4">
                    {quartos.map(
                      (quarto, index) =>
                        quarto.hotelId === hotel.id && (
                          <div
                            key={index}
                            href="#"
                            className="block w-5/6 p-6 m-4 bg-white border border-gray-200 rounded-lg shadow"
                          >
                            <h5 className="mb-2 text-2xl font-mediunm tracking-tight text-gray-900 ">
                              {`Quarto N° ${quarto.numero}`}
                            </h5>
                            <p className="font-normal text-gray-700 ">
                              {`Preço por diária:R$ ${quarto.precoDiaria}`}
                            </p>
                            <div className="bg-orange-400 rounded-lg font-bold border-4 border-solid border-orange-500 p-2">
                              <p>Datas Reservadas:</p>
                              <ReservasList quartoId={quarto.id} />
                            </div>
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {cadastrar && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-gray-400 bg-opacity-30 flex justify-center items-center">
            <div className="w-3/4 h-3/5 bg-white flex rounded-xl flex flex-col">
              <div className="w-full h-1/10 flex flex-row">
                <div className="text-blue-600 font-bold text-2xl p-4 text-center w-full h-1/12">
                  Cadastrar Reserva
                </div>
                <button
                  type="button"
                  onClick={() => setCadastrar(false)}
                  className="m-2 justify-end text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                  data-modal-hide="authentication-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="px-6 py-6 lg:px-8">
                <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                  <div className="w-full flex flex-row justify-between">
                    <div className="w-5/12 flex flex-col">
                      <label class="block mb-2 text-sm font-medium text-gray-900 text-start ">
                        Checkin
                      </label>
                      <input
                        type="date"
                        name="checkin"
                        id="dataAdmissao"
                        placeholder="XXXX-XX-XX"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={checkin}
                        onChange={handleCheckinChange}
                      />
                    </div>
                    <div className="w-5/12 flex flex-col">
                      <label class="block mb-2 text-sm font-medium text-gray-900 text-start ">
                        Checkout
                      </label>
                      <input
                        type="date"
                        name="checkout"
                        id="dataAdmissao"
                        placeholder="XXXX-XX-XX"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        value={checkout}
                        onChange={handleCheckoutChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Quantidade de Adultos
                    </label>
                    <input
                      type="number"
                      name="nAdultos"
                      id="nAdultos"
                      placeholder="xx.xxx.xxx/xxx-xx"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={nAdultos}
                      onChange={handlenAdultos}
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Quantidade de Crianças
                    </label>
                    <input
                      type="number"
                      name="nCriancas"
                      id="nCriancas"
                      placeholder="NOME"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      value={nCriancas}
                      onChange={handlenCriancas}
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Cliente
                    </label>
                    <select
                      id="opcoesSelect"
                      name="opcao"
                      onChange={handleClienteId}
                      value={clienteId}
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      {clientes.map((cliente, index) => (
                        <option key={index} value={cliente.id}>
                          {cliente.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Quarto
                    </label>
                    <select
                      id="opcoesSelect"
                      name="opcao"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                      {quartosDisp.map((disp, index) => (
                        <option key={index} value={disp.id}>
                          {disp.numero}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
