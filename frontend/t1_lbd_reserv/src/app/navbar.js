"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies } from "nookies";

function Navbar() {
  const router = useRouter();

  return (
    <nav class="duration-1000 bg-blue-900 opacity-0 hover:opacity-100 bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 border-gray-600">
      <div class=" flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex left-4 items-center">
          <svg
            width="50px"
            height="50px"
            viewBox="0 0 1024 1024"
            class="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            stroke="#000000"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <path
                d="M803 421l-49-13 49-13 13-48 13 48 48 13-48 13-13 49-13-49zM851 474l-19-4 19-5 4-19 4 19 19 5-19 4-4 19-4-19z"
                fill="#4ADE80"
              />

              <path
                d="M206 341m-9 0a9 9 0 1 0 18 0 9 9 0 1 0-18 0Z"
                fill="#ffffff"
              />

              <path
                d="M179 769l-33-7 33-8 7-32 8 32 32 8-32 7-8 33-7-33zM140 533l-15-3 15-4 3-14 4 14 14 4-14 3-4 15-3-15z"
                fill="#4ADE80"
              />

              <path
                d="M828 793a25 25 0 1 1 25-25 25 25 0 0 1-25 25z m0-36a10 10 0 1 0 10 10 10 10 0 0 0-10-10z"
                fill="#ffffff"
              />

              <path
                d="M434 342c-65 0-103 6-113 10v468h226V352c-10-4-49-10-113-10z m-21 445h-58v-57h57z m0-113h-58v-57h57z m0-113h-58v-57h57z m0-113h-58v-57h57z m41-57h57v57h-57z m0 113h57v57h-57z m0 113h57v57h-57z m0 113h57v57h-57z"
                fill="#4ADE80"
              />

              <path
                d="M649 517c-45 0-74 5-81 8v295h165V526c-8-4-37-9-83-9z m-15 269h-49v-49h49z m0-87h-49v-48h49z m0-87h-49v-48h49z m32-49h49v49h-49z m-1 87h49v49h-49z m0 87h49v49h-49z"
                fill="#1f5aff"
              />

              <path
                d="M753 523c0-14-18-19-38-22s-41-4-66-4-47 1-64 4l-17 4V348c0-14-18-19-47-22s-53-4-86-4-63 1-86 4-48 8-48 22v474H191v20h657v-20h-95zM547 820H320V352c10-4 49-10 113-10s103 5 113 10z m186 0H567V526c8-4 36-8 81-8h1c46 0 75 5 83 9z"
                fill="#ffffff"
              />

              <path
                d="M355 391h57v57.45h-57zM454 391h57v57.45h-57zM355 504h57v57.45h-57zM454 504h57v57.45h-57zM585 564h49v48.53h-49zM666 564h49v48.53h-49zM585 651h49v48.53h-49zM665 651h49v48.53h-49zM585 737h49v48.53h-49zM665 737h49v48.53h-49zM355 617h57v57.45h-57zM454 617h57v57.45h-57zM355 730h57v57.45h-57zM454 730h57v57.45h-57z"
                fill="#ffffff"
              />

              <path
                d="M319 210h26q0-2-1-2h-8v-38h35v32h-8q-1 0-1 2h35q0-2-1-2h-8v-68h8q1 0 1-2h-36q0 2 1 2h8v30h-35v-30h8q1 0 1-2h-34q0 2 1 2h8v69h-8q-1 0-1 2h9zM417 199a41 41 0 0 0 14 9 46 46 0 0 0 17 3 43 43 0 0 0 17-3 44 44 0 0 0 14-9 43 43 0 0 0 9-14 42 42 0 0 0 3-17 45 45 0 0 0-3-17 42 42 0 0 0-9-14 42 42 0 0 0-14-9 46 46 0 0 0-17-3 42 42 0 0 0-17 3 44 44 0 0 0-23 23 42 42 0 0 0-3 17 44 44 0 0 0 3 17 43 43 0 0 0 9 14z m7-51a29 29 0 0 1 5-9l7-6 9-2a23 23 0 0 1 12 3 27 27 0 0 1 9 9 44 44 0 0 1 5 14 79 79 0 0 1 2 17 39 39 0 0 1-2 12 31 31 0 0 1-5 10l-8 7-10 2a21 21 0 0 1-12-3 27 27 0 0 1-9-9 47 47 0 0 1-5-14 79 79 0 0 1-2-18 36 36 0 0 1 5-12zM500 146h2l3-6 3-4 4-2h17v68a5 5 0 0 1-1 4l-6 2h33a2 2 0 0 0-2-2h-7v-73h17l4 2 3 4 3 6h5l-2-5v-13h-76v13l-2 5h3zM595 210h56v-20h-5l-3 6-4 4-5 3h-18q-3-1-3-4v-29h18l3 2a23 23 0 0 1 2 7q0 2 2 2h2v-7-5-14h-5a26 26 0 0 1-2 7l-3 2h-17v-31h23l4 2 3 4 3 6h5l-2-5v-13h-63q0 2 1 2h9v67a4 4 0 0 1-2 4l-7 2q-1 0-1 2h9zM674 210h55v-11l2-9h-5l-3 6-3 4-4 2h-21q-3-1-3-4v-62a4 4 0 0 1 2-4l7-2q1 0 1-2h-36q0 2 1 2h8v67a4 4 0 0 1-2 4l-7 2q-1 0-1 2h9z"
                fill="#ffffff"
              />

              <path
                d="M248 178a10 10 0 0 0-10-10H126a10 10 0 0 0 0 20h112a10 10 0 0 0 10-10z"
                fill="#ffffff"
              />

              <path
                d="M273 178m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"
                fill="#ffffff"
              />

              <path
                d="M911 168H799a10 10 0 0 0 0 20h112a10 10 0 1 0 0-20z"
                fill="#ffffff"
              />

              <path
                d="M765 178m-10 0a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z"
                fill="#ffffff"
              />
            </g>
          </svg>
          <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Reserv
          </span>
        </a>
        <div class="flex md:order-2">
          <a class="flex left-4 items-center font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-t from-indigo-600 to-teal-300 hover:bg-gradient-to-t hover:from-teal-300 hover:via-indigo-500 hover:to-teal-300 hover:animate-pulse delay-300">
            <div>
              <button
                onClick={() => {
                  router.push("/");
                }}
              >
                Login
              </button>
            </div>
          </a>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200  text-gray-400  hover:bg-gray-700  focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          class="items-center justify-between w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul class="flex flex-row p-4 mt-1 h-[50px] bg-transparent font-medium space-x-8 md:w-full">
            <li>
              <a
                href="/hotel"
                class="block py-2 pl-3 pr-4 rounded md:p-0  hover:text-blue-400 text-white  border-gray-700"
                aria-current="page"
              >
                Hotel
              </a>
            </li>
            <li>
              <a
                href="/principal"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  hover:text-blue-400 md:p-0 md: hover:text-blue-500  text-white    md: hover:bg-transparent  border-gray-700"
              >
                Principal
              </a>
            </li>
            <li>
              <a
                href="/funcionarios"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  hover:text-blue-400 md:p-0 md: hover:text-blue-500  text-white    md: hover:bg-transparent  border-gray-700"
              >
                Funcionarios
              </a>
            </li>

            <li>
              <a
                href="/cliente"
                class="block py-2 pl-3 pr-4 rounded md:p-0  hover:text-blue-400 text-white  border-gray-700"
                aria-current="page"
              >
                Cliente
              </a>
            </li>
            <li>
              <a
                href="/cliente"
                class="block py-2 pl-3 pr-4 rounded md:p-0  hover:text-blue-400 text-white  border-gray-700"
                aria-current="page"
              >
                Reserva
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
