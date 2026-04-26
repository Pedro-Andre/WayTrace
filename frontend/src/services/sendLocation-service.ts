export type Coords = {
  latitude: number;
  longitude: number;
};

export const sendLocationToAPI = async (coords: Coords) => {
  try {
    await fetch("http://192.168.1.11:3000/location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coords),
    });
  } catch (error) {
    console.log("Erro ao enviar localização", error);
  }
};
