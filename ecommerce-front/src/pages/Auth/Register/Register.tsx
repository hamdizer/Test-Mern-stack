import { useEffect, useState } from "react";
import { Country, Role, User } from "../../../types";
import { getAllCountries } from "../../../services/country";
import { Register } from "../../../services/auth";
import RadioGroup from "../../../components/RadioGroup";
const RegisterUser = (props: any) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [telNumber, setTelNumber] = useState("");
  const [countries,setCountries]=useState<Country[]>()
  const [passwordsError,setPasswordsError]=useState("")
  const [role,setRole]=useState("")
  useEffect(()=>{
    getAllCountries().then((response)=>{
        setCountries(response.data)
    })
    .catch(err=>{
        console.log(err)
    })
  },[])
  const getRole = (role:string) => {
    console.log(role)
    setRole(role);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  const handleTelNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelNumber(e.target.value);
  };
  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let roleAuth=role==="user"?Role.USER:Role.ADMIN
    const data:User={firstName:firstName,lastName:lastName,email:email,password:password,passwordConfirm:passwordConfirm,
        tel_number:parseInt(telNumber),role:roleAuth}
     if(password!==passwordConfirm){
       setPasswordsError("Passwords must be equals")
     }   
    await Register(data)
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              FirstName
            </label>
            <input
              type="text"
              id="firstName"
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="FirstName"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              LastName
            </label>
            <input
              type="text"
              id="lastName"
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="LastName"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
          </div>
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
              htmlFor="tel"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="tel"
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Phone Number"
              value={telNumber}
              onChange={handleTelNumberChange}
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
          <div className="mb-4">
            <label
              htmlFor="passwordConfim"
              className="block text-sm font-medium text-gray-700"
            >
              Password Confirmation
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Password Confirmation"
              value={passwordConfirm}
              onChange={handlePasswordConfirmChange}
              required
            />
            {passwordsError&& <p style={{color:"red",fontWeight:"bold",textAlign:"center"}}>{passwordsError}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <select               className="mt-1 p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300" id="country">
                {countries?.map((country:Country)=><option value={country.description} key={country.code}>{country.description}</option>)}


            </select>
          </div>
          <RadioGroup getData={getRole} values={["user","admin"]} />
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
