import React, { useEffect, useState } from 'react'
import Labelandinput from '../components/Labelandinput';
import { Button } from '../components/ui/button';
import { signupnewuser } from '../components/API/Api';
import { Link, useNavigate } from 'react-router-dom';
function SignupPage() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        masjidname:'',
        email:'',
        password:'',
        location:'',
        address:'',
        city:'',
        state:'',
        postalcode:'',
        country:'',
        longitude:'',
        latitude:'',
    })
    const SignInLabelAndInput = [
        {
            label:"Masjid Name",
            name:"masjidname",
            labelclass:'block mt-3',
            inptype :"text",
            placeholder:'Masjid Name',
            inpclass:"bg-white w-[300px] px-3 py-1 mt-2 border-2 focus:border-blue-500  focus:outline-none lg:w-[617px] xl:w-[805px]",
            onchange:((e)=>handleChange(e)),
          },
          {
            label:"Email",
            name:"email",
            labelclass:'block mt-3 ',
            inptype :"email",
            placeholder:'Email',
            inpclass:"bg-white  px-3 py-1 mt-2 border-2 focus:border-blue-500  focus:outline-none w-[300px]",
            onchange:((e)=>handleChange(e)),
          },
          {
            label:"Password",
            name:"password",
            labelclass:'block mt-3 ',
            inptype :"text",
            placeholder:'Password',
            inpclass:"bg-white   px-3 py-1 mt-2 border-2 focus:border-blue-500  focus:outline-none w-[300px]",
            onchange:((e)=>handleChange(e)),
          },
          {
            label:"Location",
            name:"location",
            labelclass:'block mt-3',
            inptype :"text",
            placeholder:'Location',
            inpclass:"bg-white w-[300px] px-3 py-1 mt-2 border-2 focus:border-blue-500  focus:outline-none lg:w-[617px] xl:w-[805px]",
            onchange:((e)=>handleChange(e)),
          },
          {
            label:"Address",
            name:"address",
            labelclass:'block mt-3',
            inptype :"text",
            placeholder:'address',
            inpclass:"bg-white w-[300px] px-3 py-1 mt-2 border-2 focus:border-blue-500  focus:outline-none lg:w-[617px] xl:w-[805px]",
            onchange:((e)=>handleChange(e)),
          },
          {
            label:"City",
            name:"city",
            labelclass:'block mt-3 ',
            inptype :"text",
            placeholder:'city',
            inpclass:"bg-white px-3 py-1 mt-2 border-2 focus:border-blue-500  focus:outline-none w-[300px]",
            onchange:((e)=>handleChange(e)),
          },
          {
            label:"State",
            name:"state",
            labelclass:'block mt-3 ',
            inptype :"text",
            placeholder:'state',
            inpclass:"bg-white px-3 py-1 mt-2 border-2 focus:border-blue-500  focus:outline-none w-[300px]",
            onchange:((e)=>handleChange(e)),
          },
          {
            label:"PinCode",
            name:"postalcode",
            labelclass:'block mt-3',
            inptype :"text",
            placeholder:'country',
            inpclass:"bg-white px-3 py-1 mt-2 border-2 focus:border-blue-500  focus:outline-none w-[300px]",
            onchange:((e)=>handleChange(e)),
          },
          {
            label:"Country",
            name:"country",
            labelclass:'block mt-3',
            inptype :"text",
            placeholder:'Country',
            inpclass:"bg-white px-3 py-1 mt-2 border-2 focus:border-blue-500  focus:outline-none w-[300px]",
            onchange:((e)=>handleChange(e)),
          },
          {
            label:"longitude",
            name:"longitude",
            labelclass:'block mt-3',
            inptype :"text",
            placeholder:'longitude',
            inpclass:"bg-white px-3 py-1 mt-2 border-2 focus:border-blue-500  focus:outline-none w-[300px]",
            onchange:((e)=>handleChange(e)),
          },
          {
            label:"latitude",
            name:"latitude",
            labelclass:'block mt-3',
            inptype :"text",
            placeholder:'latitude',
            inpclass:" w-[300px] bg-white px-3 py-1 mt-2 border-2 focus:border-blue-500  focus:outline-none lg:w-[300px]",
            onchange:((e)=>handleChange(e)),
          },
    ]
    const handleChange = (e)=>{
            const {name,value} = e.target;
            setValues({
                ...values,
                [name]:value,
            })
    }
    const handlesubmit = ()=>{
        console.log(values);
        const senddata  = signupnewuser(values);
        alert(senddata);
        navigate('/login')
    }
    useEffect(()=>{

    },[values])
    

    return (
        <div className='bg-loginbg w-full flex justify-center p-4 md:p-10'>
            <div className='bg-[#f9f9f9] w-full md:w-[80vw] lg:w-[80vw] p-8 md:p-20 lg:p-32'>
                <h2 className='text-2xl sm:text-3xl text-blue-700 text-center font-semibold mb-4'>Masjid Signup</h2>
                <p className='mb-6'>
                    Already have an account?<Link to = '/login'> <span className='text-blue-500'>Login</span></Link>
                </p>

                <div className='flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4'>
                    <div className='w-full '>
                        <Labelandinput {...SignInLabelAndInput[0]} />
                    </div>
                    <div className='w-full lg:w-[45%] xl:w-[48%] '>
                        <Labelandinput {...SignInLabelAndInput[1]} />
                    </div>
                    <div className='w-full lg:w-[45%] lg:ms-4 xl:w-[48%]'>
                        <Labelandinput {...SignInLabelAndInput[2]} />
                    </div>
                    <div className='w-full'>
                        <Labelandinput {...SignInLabelAndInput[3]} />
                    </div>
                    <div className='w-full'>
                        <Labelandinput {...SignInLabelAndInput[4]} />
                    </div>
                    <div className='w-full lg:w-[45%]  xl:w-[48%]'>
                        <Labelandinput {...SignInLabelAndInput[5]} />
                    </div>
                    <div className='w-full lg:w-[45%] lg:ms-4 xl:w-[48%]'>
                        <Labelandinput {...SignInLabelAndInput[6]} />
                    </div>
                    <div className='w-full lg:w-[45%]  xl:w-[48%]'>
                        <Labelandinput {...SignInLabelAndInput[7]} />
                    </div>
                    <div className='w-full lg:w-[45%] lg:ms-4 xl:w-[48%]'>
                        <Labelandinput {...SignInLabelAndInput[8]} />
                    </div>
                    <div className='w-full lg:w-[45%]  xl:w-[48%]'>
                        <Labelandinput {...SignInLabelAndInput[9]} />
                    </div>
                    <div className='w-full lg:w-[45%] lg:ms-4 xl:w-[48%]'>
                        <Labelandinput {...SignInLabelAndInput[10]} />
                    </div>
                </div>

                <Button className='mt-6 bg-blue-700 hover:bg-blue-900 w-full md:w-auto' onClick = {()=>handlesubmit()}>
                    SIGN UP
                </Button>
            </div>
        </div>
    );
}

export default SignupPage