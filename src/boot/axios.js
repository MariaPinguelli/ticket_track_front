// src/boot/axios.js
import axios from "axios";

export default async ({ app, store }) => {
  const user = store.getters.currentUser || {};
  const token = user.token || "";

  const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Adiciona o axios ao contexto global da aplicação
  app.config.globalProperties.$axios = api;
};
