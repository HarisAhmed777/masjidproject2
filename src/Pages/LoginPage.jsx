import React, { useEffect, useState } from 'react'
import Labelandinput from '../components/Labelandinput'
import {Button} from '../components/ui/button';
import { checkemail, loginuser } from '../components/API/Api';
// import { loginlogo } from '../../src/assets/loginlogo.png';
// secondfrontend/src/assets/loginlogo.png
import { Link, useNavigate } from 'react-router-dom'
function LoginPage() {
  const navigate = useNavigate();
  const [errorstate, setErrorState] = useState({ email: false, password: false });
  const [loginvalues,setLoginvalues] = useState({
    email:'',
    password:'',
  })
  const labelandinput = [
    {
      label:"Email",
      name:"email",
      labelclass:'block mt-3',
      inptype :"email",
      placeholder:'Email',
      inpclass:`bg-white px-3 py-1 mt-2 border-2 w-[200px] xsm:w-[280px] md:w-[350px] ${
        errorstate.email ? 'border-red-500 placeholder-red-500' : 'focus:border-blue-500'
      }`,
      onchange:((e)=>handleChange(e)),
    },
    {
      label:"Password",
      name:"password",
      labelclass:'block mt-3',
      inptype:"password",
      placeholder:"Password",
      inpclass:`bg-white px-3 py-1 mt-2 border-2 w-[200px] xsm:w-[280px] md:w-[350px] ${
        errorstate.password ? 'border-red-500 placeholder-red-500' : 'focus:border-blue-500'
      }`,
      onchange:((e)=>handleChange(e)),
    }
  ]
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setLoginvalues({
      ...loginvalues,
      [name]:value,
    })
    if (name === 'email') {
      validateEmail(value);
    } else if (name === 'password') {
      validatePassword(value);
    }
  }
  const validateEmail = (email) => {
    const emailRegex = /^[a-z0-9@.]+/; // Only lowercase letters, numbers, @, and .
    setErrorState((prev) => ({ ...prev, email: !emailRegex.test(email) }));
  };

  const validatePassword = (password) => {
    const specialCharCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;
    const isValidLength = password.length === 15;
    const isValidSpecialChar = specialCharCount <= 7;
    setErrorState((prev) => ({
      ...prev,
      password: !(isValidLength && isValidSpecialChar),
    }));
  };
  

  const handleSubmit = async ()=>{
   
    try {
      const login = await loginuser(loginvalues);
      if(login) {
        // const checkkemail = await checkemail();
        // {checkemail?navigate('/verifyemail'):navigate('/')};
        navigate('/');
        window.location.reload();

      }
    } catch (error) {
      setErrorState(true);
      console.log(error.message,"This is only printed");
    }
  }
 
  return (
    <div className='bg-loginbg w-[100vw] relative overflow-hidden'>
      <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
      <div className='bg-[#f9f9f9]  w-3/4 md:w-1/2 lg:w-[40%] xl:w-[27%]  p-4 rounded-lg shadow-lg text-'>
      <img src="" alt="Logo" />
      <h2 className='text-2xl sm:text-3xl text-blue-700 text-center font-semibold mb-4'>Masjid Login</h2>
      <p>Don't You have an account?<Link to = '/signup'> <span className='text-blue-500 hover:text-blue-900'>Sign Up</span></Link></p>
      <Labelandinput {...labelandinput[0]} errorstate:errorstate/>
      <Labelandinput {...labelandinput[1] } errorstate:errorstate/>
      {(errorstate.email || errorstate.password) && (
            <p className="text-xsm ms-2 pt-3 text-red-500">Invalid email or password format.</p>
          )}
      <div className='flex mt-4 justify-between items-center' >
      <Button className='bg-blue-700 hover:bg-blue-900' onClick = {()=>handleSubmit()}>Login</Button>
     <p className='text-blue-700 hover:text-blue-900'> <Link to = '/forgotpassword'> Forgot password ?</Link></p>
      </div>
      </div>

    </div>
    </div>
  )
}

export default LoginPage