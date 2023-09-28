import { useState } from "react";
import { Login } from "../../../services/auth";
import { getUser } from "../../../services/user";
import { useNavigate } from "react-router-dom";
const LoginUser = (props: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
const navigate=useNavigate()
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) setEmailError("Email is Required");
    if (!password) setPasswordError("Password is Required");
    if(email && password)
    await Login({ email: email, password: password }).then((response)=>{
  getUser(email).then((response)=>{
    if(response.data.user.role==='user'){
      navigate("/")
    }
    else{
      navigate("/admin/products")
    }
  })
  localStorage.setItem('jwt',response.data.token)})
  .catch(err=>{
    console.log(err)
  });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />

          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
