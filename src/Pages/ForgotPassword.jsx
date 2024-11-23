import React,{useState} from 'react'
import Labelandinput from '../components/Labelandinput'
import { Button } from '../components/ui/button'
import {useQuery} from '@tanstack/react-query'
import { forgotpasswordapi } from '../components/API/Api';
function ForgotPassword() {
    const [email,setEmail] =  useState('');
    const forgotpassword = [{
        
            label:"Email Id ",
            name:"email",
            labelclass:'block mt-3',
            inptype:"text",
            placeholder:"Enter your email id",
            inpclass:"bg-white px-3  py-1 mt-2  border-2 focus:border-blue-500  focus:outline-none w-[200px] xsm:w-[280px] md:w-[350px]",
            onchange:((e)=>setEmail(e.target.value)),
          
    }]
    
    const {data,isLoading,isError,refetch,isSuccess} = useQuery({
        queryKey:['forgotpassword',email],
        queryFn:()=>forgotpasswordapi(email),
        enabled:false
    })
    console.log(data);
    const handleForgotPassword = async ()=>{
        refetch();
    }
  return (
    <div className='bg-loginbg w-[100vw] relative overflow-hidden'>
    <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
    <div className='bg-[#f9f9f9]  w-3/4 md:w-1/2 lg:w-[40%] xl:w-[27%]  p-4 rounded-lg shadow-lg text-'>
    <img src="" alt="Logo" />
    <h2 className='text-2xl sm:text-3xl text-blue-700 text-center font-semibold mb-4'>Forgot Password</h2>
    <Labelandinput {...forgotpassword[0]}/>
    <div className='text-center mt-4'>
    {!isLoading?
    (<Button onClick = {()=>handleForgotPassword()}>Submit</Button>):
    (
    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 mx-auto"></div>
    )
    
    }
    {isSuccess && <p>Your reset Password link is sent to your email</p> }
    </div>
    </div>
    </div>
    </div>
  )
}

export default ForgotPassword