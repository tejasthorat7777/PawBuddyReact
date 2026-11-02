const configuredApiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

export const API_BASE_URL = configuredApiUrl
  ? `${configuredApiUrl}/api`
  : import.meta.env.PROD
    ? "/api"
    : "http://localhost:3000/api";