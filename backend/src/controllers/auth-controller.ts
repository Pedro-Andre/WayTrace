import { Request, Response } from "express";
import { registerUser } from "../services/auth-service";

// Cadastra usuário
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;

    const user = await registerUser({
      name,
      email,
      password,
      phone,
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
