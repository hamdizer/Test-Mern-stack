import axios from "axios";
import { User } from "../types";
import { Credentials } from "../types";
export const Register = async (user: User) => {
  return await axios.post("http://localhost:8000/api/users", user);
};
export const Login = async (credentials:Credentials) => {
    return await axios.post("http://localhost:8000/api/auth/login",credentials);
  };
export const Logout = async () => {
    return await axios.post("http://localhost:8000/api/auth/logout");
  };