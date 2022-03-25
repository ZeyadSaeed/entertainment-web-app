import axios from "axios";

const token: string = localStorage.getItem("token");

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://entertainmentwebapp.herokuapp.com/api"
      : "http://localhost:5000/api",
  headers: { "auth-token": token },
});
