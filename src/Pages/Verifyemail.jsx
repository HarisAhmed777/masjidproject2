import React from 'react';
import { Button } from '../components/ui/button';
import { PartyPopper } from 'lucide-react';
import Confetti from '../components/Confetti/Confetti';
import Congrats from '../assets/loginlogo.png';
import { sendverifyication } from '../components/API/Api';
import { useQuery } from '@tanstack/react-query';

function VerifyEmail() {
  const { data, isLoading, isSuccess,isError, refetch } = useQuery({
    queryKey: ['verifyemail'],
    queryFn: sendverifyication,
    enabled: false,
  });
  console.log(isSuccess);
  {isSuccess??alert('Email Sent Successfully')};

  const handleVerifyEmail = async () => {
    console.log("Clicked on Send Verification Email");
    refetch();
  };
  


  return (
    <div className='bg-loginbg w-[100vw] relative overflow-hidden'>
      <Confetti />

      <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
        <div className='bg-[#f9f9f9] h-1/2 w-3/4 md:w-1/2 p-4 rounded-lg shadow-lg text-center'>
          <div className='justify-self-center'>
            <img src={Congrats} alt="no image" className='h-16' />
          </div>
          <PartyPopper className='text-4xl text-green-500 mx-auto mb-4' />
          <h2 className='text-blue-950 text-2xl md:text-4xl'>Verify Email</h2>
          <p className='pt-8'>Congratulations! You are successfully signed in as a new user.</p>
          <p className='pt-2'>Please verify your email by clicking the link sent to your email.</p>
          <div className='mt-4'>
          {isLoading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500 mx-auto"></div>
            ) : isSuccess ? (
              <Button className='z-50 relative' onClick={handleVerifyEmail}>
                Resend Verification Email
              </Button>
            ) : (
              <Button className='z-50 relative' onClick={handleVerifyEmail}>
                Send Verification Email
              </Button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
