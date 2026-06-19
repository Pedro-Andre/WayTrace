import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../utils/jwt";

const JWT_SECRET = process.env.JWT_SECRET!;

type DecodedToken = { userId: number; role: Role };

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token não informado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Token inválido" });
  }
};

// Restringe acesso por tipo de usuário (ex: só entregador pode atualizar localização)
export const requireRole = (role: Role) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: "Acesso não autorizado" });
    }
    next();
  };
};

//  GPT FUNCIONAL
// import { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET!;

// export const authMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({
//       message: "Token não informado",
//     });
//   }

//   const [, token] = authHeader.split(" ");

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

//     req.user = decoded;

//     next();
//   } catch {
//     return res.status(401).json({
//       message: "Token inválido",
//     });
//   }
// };
