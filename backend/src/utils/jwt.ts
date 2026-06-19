import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export type Role = "cliente" | "entregador";

export const generateToken = (userId: number, role: Role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" });
};

// GPT FUNCIONAL
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET!;

// export const generateToken = (userId: number) => {
//   return jwt.sign(
//     {
//       userId,
//     },
//     JWT_SECRET,
//     {
//       expiresIn: "7d",
//     },
//   );
// };

// console.log("JWT_SECRET =", process.env.JWT_SECRET);
