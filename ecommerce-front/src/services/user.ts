import axios from "axios";
import {  User } from "../types";
export const getAllUsers = async () => {
  return await axios.get("http://localhost:8000/api/users");
};
export const addUser = async (user: User) => {
  return await axios.post("http://localhost:8000/api/users", user);
};
export const updateUser = async (idUser:number,user: User) => {
    return await axios.post(`http://localhost:8000/api/users/${idUser}`, user);
  };
export const deleteUser = async (idUser: number) => {
    return await axios.delete(`http://localhost:8000/api/users/${idUser}`);
  };
  export const getUser = async (email: string) => {
    return await axios.get(`http://localhost:8000/api/users/${email}`);
  };