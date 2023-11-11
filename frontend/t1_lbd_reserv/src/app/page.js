"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies/dist";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [cpfvalid, setCpfvalid] = useState(true);
  const [senhavalid, setSenhavalid] = useState(true);

  const handleCpfChange = (e) => {
    setCpf(e.target.value);
    setCpfvalid(true);
  };

  const handleSenhaChange = async (e) => {
    setSenha(e.target.value);
    setSenhavalid(true);
  };

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("CPF:", cpf);
    console.log("Senha:", senha);
    const data = {
      cpf: cpf,
      senha: senha,
    };

    try {
      axios
        .post("http://localhost:3333/funcionario/valida", data)
        .then((response) => {
          console.log("Resposta da API:", response.data);
          setCookie(undefined, 'funcID', response.data.id);
          router.push("/cliente");
        })
        .catch((error) => {
        
        });
    } catch (error) {
      console.log("Erro na requisição: ", error);
          if (error.message === new AppError("Senha inválida")) {
            setvalid(false);
            setCpfvalid(false);
          }
    }
  };

  return (
    <div className="bg-teal-950 w-screen h-screen flex items-center justify-center content-center bg-gradient-to-br from-green-400 to-blue-600">
      <form
        className=" flex flex-col scale-125 bg-black p-8 rounded-xl"
        action="#"
        onSubmit={handleSubmit}
      >
        <label className="block mb-2 text-sm font-bold text-lg p-2 text-center text-white">
          Login de Funcionário
        </label>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-white">
            CPF
          </label>
          <input
            type="text"
            id="cpf"
            className={`bg-gray-50 border ${
              cpfvalid ? "border-gray-300" : "border-red-400"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5`}
            placeholder="xxx.xxx.xxx-xx"
            required
            value={cpf}
            onChange={handleCpfChange}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-white">
            Senha
          </label>
          <input
            type="password"
            id="password"
            className={`bg-gray-50 border  ${
              senhavalid ? "border-gray-300" : "border-red-400"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
            required
            value={senha}
            onChange={handleSenhaChange}
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
              required
            />
          </div>
          <label className="ml-1 text-sm font-medium text-white ">
            Lembre de mim
          </label>
        </div>
        <button
          type="submit"
          className="text-white self-center bg-teal-400 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center trasition-1000"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
