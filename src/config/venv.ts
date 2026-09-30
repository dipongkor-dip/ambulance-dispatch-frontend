const config = {
  baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
  superAdmin: import.meta.env.VITE_SUPER_ADMIN,
  adminPass: import.meta.env.VITE_PASSWORD,
};

export default config;
