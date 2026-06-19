import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { Role } from "../utils/jwt";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

const findUserByEmail = (role: Role, email: string) => {
  if (role === "cliente") {
    return prisma.cliente.findUnique({ where: { email } });
  }
  return prisma.entregador.findUnique({ where: { email } });
};

const createUser = (role: Role, data: RegisterData) => {
  if (role === "cliente") {
    return prisma.cliente.create({ data });
  }
  return prisma.entregador.create({ data });
};

// Cadastra Cliente ou Entregador
export const registerUser = async (role: Role, data: RegisterData) => {
  const existingUser = await findUserByEmail(role, data.email);

  if (existingUser) {
    throw new Error("Email já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await createUser(role, {
    ...data,
    password: hashedPassword,
  });

  return user;
};

// Verifica Login de Cliente ou Entregador
export const loginUser = async (
  role: Role,
  email: string,
  password: string,
) => {
  const user = await findUserByEmail(role, email);

  if (!user) {
    throw new Error("Email ou senha inválidos");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Email ou senha inválidos");
  }

  return user;
};

//  GPT FUNCIONAL
// import bcrypt from "bcrypt";
// import { prisma } from "../lib/prisma";

// // Modelo de usuário
// type RegisterData = {
//   name: string;
//   email: string;
//   password: string;
//   phone: string;
// };

// // Verifica se usuário já existe
// export const registerUser = async ({
//   name,
//   email,
//   password,
//   phone,
// }: RegisterData) => {
//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (existingUser) {
//     throw new Error("Email já cadastrado");
//   }

//   // Criptografa a senha
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await prisma.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//     },
//   });

//   return user;
// };

// // Verifica Login
// export const loginUser = async (email: string, password: string) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (!user) {
//     throw new Error("Email ou senha inválidos");
//   }

//   const passwordMatch = await bcrypt.compare(password, user.password);

//   if (!passwordMatch) {
//     throw new Error("Email ou senha inválidos");
//   }

//   return user;
// };
