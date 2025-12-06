import Constants from "expo-constants";

export const API_URL = Constants.expoConfig?.extra?.apiUrl ?? "";

if (!API_URL) {
  console.warn("API_URL não encontrada. Verifique app.config.js / .env");
}
