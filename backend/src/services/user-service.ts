export const createUser = async () => {
  try {
    // const res = await fetch("http://192.168.1.9:3000/users", {
    const res = await fetch("http://10.49.6.165:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Pedro",
        email: "pedro@email.com",
        password: "123456",
        phone: 6140028922,
      }),
    });

    const data = await res.json();
    console.log("Usuário criado:", data);
  } catch (error) {
    console.log("Erro:", error);
  }
};
