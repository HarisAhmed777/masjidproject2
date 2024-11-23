import React, { useState } from 'react'
import Labelandinput from '../components/Labelandinput'
import {useQuery} from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { resetpassowrdapi } from '../components/API/Api';
import { Button } from '../components/ui/button';
function ResetPassword() {
  const {token} = useParams();
  const navigate = useNavigate();
  const [values,setValues] = useState({
    password:'',
    confirmpassword:'',
  })

  const resetpassword = [
    {
      label:"Enter Your New Password",
      name:"password",
      labelclass:'block mt-3',
      inptype :"text",
      placeholder:'enter your new password',
      inpclass:"bg-white px-3 py-1 mt-2 border-2 focus:border-blue-500  focus:outline-none w-[200px] xsm:w-[280px] md:w-[350px]",
      onchange:((e)=>handleChange(e)),
    },
    {
      label:"Confirm your password",
      name:"confirmpassword",
      labelclass:'block mt-3',
      inptype:"text",
      placeholder:"confirm your password",
      inpclass:"bg-white px-3  py-1 mt-2  border-2 focus:border-blue-500  focus:outline-none w-[200px] xsm:w-[280px] md:w-[350px]",
      onchange:((e)=>handleChange(e)),
    }
  ]
     const {data,isLoading,isError,isSuccess,refetch}=useQuery({
       queryKey:['resetpassword',token,values.password],
       queryFn:()=>resetpassowrdapi(token,values.password),
       enabled:false
    })
  const handleChange = (e)=>{
    const {name,value} = e.target;
    setValues({
      ...values,
      [name]:value,
    })
    

  }
  const handleResetPassword = ()=>{
    console.log("this is first triggred");
    console.log(values.password);
    console.log(values.confirmpassword);
    if(values.password===values.confirmpassword){
      console.log("This is triggred");
      refetch();
    }
  }
  isSuccess && navigate('/login');
  return (
    <div className='bg-loginbg w-[100vw] relative overflow-hidden'>
      <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
        <div className='bg-[#f9f9f9]  w-3/4 md:w-1/2 lg:w-[40%] xl:w-[27%]  p-4 rounded-lg shadow-lg text-'>
          <img src="" alt="Logo" />
          <h2 className='text-2xl sm:text-3xl text-blue-700 text-center font-semibold mb-4'>Reset Your Password</h2>
          <Labelandinput {...resetpassword[0]}/>
          <Labelandinput {...resetpassword[1]}/>
          {isLoading?(
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 mx-auto"></div>
          ):(
          <Button className= 'mt-4' onClick = {()=>handleResetPassword()}>Change Your Password</Button>
          )
          }
          {isSuccess && <p>Password Changed Successfully .You are redirected to login page</p>}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword