import express from "express";
import cors from "cors";
import { textRoutes } from "./routes/textRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/texts", textRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}!!!!!!!!!!!!!!!!!!`);
});
