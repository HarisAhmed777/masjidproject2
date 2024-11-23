import React from 'react';
import { Button } from '../components/ui/button';
import { PartyPopper } from 'lucide-react';
import Confetti from '../components/Confetti/Confetti';
import Congrats from '../assets/loginlogo.png';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { verifiedemail } from '../components/API/Api';

function VerificationSuccessful() {
  const { token } = useParams(); // Extract token from URL

  // Step 4: Pass token to verifiedemail function in useQuery
  const { data, isLoading, isError } = useQuery({
    queryKey: ['verified', token],
    queryFn: () => verifiedemail(token), // Pass token as argument
    enabled: !!token, // Only run query if token is present
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred during verification.</div>;

  return (
    <div className='bg-loginbg w-[100vw] relative overflow-hidden'>
      <Confetti />

      <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
        <div className='bg-[#f9f9f9] h-1/2 w-3/4 md:w-1/2 p-4 rounded-lg shadow-lg text-center'>
          <div className='justify-self-center'>
            <img src={Congrats} alt="no image" className='h-16' />
          </div>
          <PartyPopper className='text-4xl text-green-500 mx-auto mb-4' />
          <h2 className='text-blue-950 text-2xl md:text-4xl'>Verification Success</h2>
          <p className='pt-8'>Congratulations! Your email has been successfully verified.</p>
          <p className='pt-2'>Please click the button below to go to the home page.</p>
          <Link to='/'><Button className='mt-4 relative'>Go To Home Page</Button></Link>
        </div>
      </div>
    </div>
  );
}

export default VerificationSuccessful;
