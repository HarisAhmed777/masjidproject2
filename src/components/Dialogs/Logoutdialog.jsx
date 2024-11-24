import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from '@tanstack/react-query';
import { logoutapi } from '../API/Api';
import  { useNavigate} from 'react-router-dom'


function LogoutDialog ({ open, setOpen }){
    const navigate = useNavigate('');

        const {data:logout,refetch,isError,isLoading,isSuccess} = useQuery({
            queryKey:['logout'],
            queryFn:logoutapi,
            enabled:false
        })


      const handlelogout = ()=>{
            refetch();
            window.location.reload();
            setOpen(false);
      }
     ;

    return(
        <>
           <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[825px] mt-8 top-[15%] transform transition-transform duration-500 ease-out -translate-y-20">
        <DialogHeader>
          <DialogTitle>Logout </DialogTitle>
        </DialogHeader>
        <div>
            <p>Are you sure you want to Logout from this device </p>
        </div>
        <DialogFooter>
          <Button onClick ={handlelogout}>Confirm Logout</Button>
          <Button className= 'bg-red-600' onClick={()=>setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog> 
        </>
    )
}

export default LogoutDialog;