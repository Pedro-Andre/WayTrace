import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth-service";
import { generateToken, Role } from "../utils/jwt";

const isValidRole = (tipo: any): tipo is Role => {
  return tipo === "cliente" || tipo === "entregador";
};

// Cadastra Cliente ou Entregador
export const register = async (req: Request, res: Response) => {
  try {
    const { tipo, name, email, password, phone } = req.body;

    if (!isValidRole(tipo)) {
      return res.status(400).json({ message: "Tipo de usuário inválido" });
    }

    const user = await registerUser(tipo, { name, email, password, phone });

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

// Verifica Login com JWT
export const login = async (req: Request, res: Response) => {
  try {
    const { tipo, email, password } = req.body;

    if (!isValidRole(tipo)) {
      return res.status(400).json({ message: "Tipo de usuário inválido" });
    }

    const user = await loginUser(tipo, email, password);

    const token = generateToken(user.id, tipo);

    return res.status(200).json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        tipo,
      },
    });
  } catch (error: any) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

//  GPT FUNCIONAL
// import { Request, Response } from "express";
// import { registerUser } from "../services/auth-service";
// import { loginUser } from "../services/auth-service";
// import { generateToken } from "../utils/jwt";

// // Cadastra usuário
// export const register = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     const user = await registerUser({
//       name,
//       email,
//       password,
//       phone,
//     });

//     return res.status(201).json({
//       message: "Usuário criado com sucesso",
//       user,
//     });
//   } catch (error: any) {
//     return res.status(400).json({
//       message: error.message,
//     });
//   }
// };

// // Verifica Login de usuário com JWT
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     const user = await loginUser(email, password);

//     const token = generateToken(user.id);

//     return res.status(200).json({
//       message: "Login realizado com sucesso",
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error: any) {
//     return res.status(401).json({
//       message: error.message,
//     });
//   }
// };
