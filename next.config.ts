/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config({
  path:
    process.env.NODE_ENV === "production"
      ? "envs/production.env"
      : "envs/development.env",
});
const apiURL = process.env.NEXT_PUBLIC_API_URL;
module.exports = {
  env: {
    API_URL: apiURL,
  },
};
