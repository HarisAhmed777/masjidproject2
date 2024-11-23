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
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteiqamaapi } from '../API/Api';


function DeleteIqama ({ open, setOpen, values }){
    console.log(values);
const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['deleteiqama', values._id],
  queryFn: () => deleteiqamaapi({ id: values._id }),
  enabled: false, // Do not run automatically
});

const handleDelete = ()=>{
    refetch();
    setOpen(false);
}

    return(
        <>
           <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[825px] mt-8 top-[15%] transform transition-transform duration-500 ease-out -translate-y-20">
        <DialogHeader>
          <DialogTitle>delete Iqamah</DialogTitle>
        </DialogHeader>
        <div>
            <p>Are you sure you want to delete this iqama</p>
        </div>
        <DialogFooter>
          {/* <Button type="button" >
            {!isLoading ? (
              <>Confirm Iqama</>
            ) : (
              <div className="spinner w-3 h-3 mr-2"></div>
            )}
          </Button> */}
          <Button onClick= {()=>handleDelete()}>Confirm Delete</Button>
          <Button className= 'bg-red-600' onClick={()=>setOpen(false)}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog> 
        </>
    )
}

export default DeleteIqama;