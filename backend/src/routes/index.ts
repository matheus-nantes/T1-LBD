import { Router } from "express";
import { hotelRoutes } from "./hotel.routes";
import { quartoRoutes } from "./quarto.routes";
import { tagRoutes } from "./tag.routes";
import { reservaRoutes } from "./reserva.routes";
import { pagamentoRoutes } from "./pagamento.routes";
import { clienteRoutes } from "./cliente.routes";
import { funcionarioRoutes } from "./funcionario.routes";

const routes = Router();

routes.use("/cliente", clienteRoutes);
routes.use("/funcionario", funcionarioRoutes);
routes.use("/hotel",hotelRoutes);
routes.use("/pagamento", pagamentoRoutes);
routes.use("/quarto", quartoRoutes);
routes.use("/reserva", reservaRoutes);
routes.use("/tag", tagRoutes);


export { routes };