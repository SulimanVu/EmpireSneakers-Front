const env = process.env["NODE_ENV"];

export let serverUrl: string;

if (env === "development") {
  serverUrl = "http://localhost:3010";
} else {
  serverUrl = "https://wayshoes-back.onrender.com";
}
