import { Request, Response } from "express";
import UserModel from "../types/user-model";

let users: UserModel[] = [];

// Create User
export const createUser = (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password || !phone) {
    return res.status(400).json({ message: "Dados obrigatórios!!" });
  }

  const newUser: UserModel = {
    id: users.length + 1,
    name,
    email,
    password,
    phone,
  };

  users.push(newUser);

  res.status(201).json({ newUser, message: "Usuário criado com sucesso!" });
};

// Get All Users
export const getAllUsers = (req: Request, res: Response) => res.json(users);
