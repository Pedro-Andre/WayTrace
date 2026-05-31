const API_URL = process.env.EXPO_PUBLIC_API_URL;
import { Coords } from "../../../shared/coords-model";
import UserModel from "../../../shared/user-model";

export const api = {
  sendLocation: (coords: Coords) =>
    fetch(`${API_URL}/location`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(coords),
    }),

  createUser: (data: UserModel) =>
    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
};
