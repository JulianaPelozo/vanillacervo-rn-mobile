import 'dotenv/config';

export default {
  expo: {
    name: "vanillacervo",
    slug: "vanillacervo",
    version: "1.0.0",
    extra: {
      apiUrl: process.env.API_URL || "http://192.168.0.187:3000"
    }
  }
};
