import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

app.post("/location", (req: Request, res: Response) => {
  const { latitude, longitude } = req.body;

  console.log("📍 Localização recebida:", latitude, longitude);

  res.sendStatus(200).json({ message: "OK" });
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
