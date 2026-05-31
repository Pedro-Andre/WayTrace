import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/user-routes";
import authRoutes from "./routes/auth-routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);

// app.post("/location", (req: Request, res: Response) => {
//   const { latitude, longitude } = req.body;

//   console.log("📍 Localização recebida:", latitude, longitude);

//   res.sendStatus(200).json({ message: "OK" });
// });

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
