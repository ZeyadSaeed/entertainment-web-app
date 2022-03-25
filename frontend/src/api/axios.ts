import axios from "axios";

const token: string = localStorage.getItem("token");

export default axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "auth-token": token },
});
