import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { FilePenLine, ListPlus, Eraser } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddIqama } from '../components/Dialogs/AddIqama';
import { useQuery } from '@tanstack/react-query';
import { alliqmas } from '../components/API/Api';
import UpdateIqama from '../components/Dialogs/UpdateIqama';
import DeleteIqama from '../components/Dialogs/DeleteIqama';

function Iqama() {
  const [open, setOpen] = useState(false);
  const [updatebtn,setUpdatebtn] = useState({open:false,values:{}});
  const [deletebtn,setDeletebtn] = useState({open:false,values:{}});
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allquery'],
    queryFn: alliqmas,
  });

  console.log('Data:', data); // Check the structure of the data
  console.log('Data length:', Array.isArray(data) ? data.length : 'Not an array');

  // Format time function
  const formatTime = (time) => {
    if (time?.offset) {
      return time.offset;
    }
    const hour = time?.hour || '--';
    const minute = time?.minute || '--';
    const amPm = time?.amPm || '';
    return `${hour}:${minute} ${amPm}`;
  };

  return (
    <div className="bg-[#f9f9f9] w-full p-5">
      <div className="flex items-center justify-between mb-12 pt-6">
        <h2 className="text-xl sm:text-2xl text-blue-900">IQAMA TIMINGS</h2>
        <div className="flex gap-4 me-10">
          <Button onClick={() => setOpen(true)}>Add</Button>
          <AddIqama open={open} setOpen={setOpen} />  
          <Button>Upload</Button>
        </div>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading data.</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Iqama Change Date</TableHead>
            <TableHead className="w-[100px]">Fajr</TableHead>
            <TableHead className="w-[100px]">Zuhur</TableHead>
            <TableHead className="w-[100px]">Asr</TableHead>
            <TableHead className="w-[100px]">Maghrib</TableHead>
            <TableHead className="w-[100px]">Isha</TableHead>
            <TableHead className="w-[100px]">Jummah I</TableHead>
            <TableHead className="w-[100px]">Jummah II</TableHead>
            <TableHead className="w-[100px]">Jummah III</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
        {Array.isArray(data) && data.length > 0 ? (
  data.map((entry) => (
    <TableRow key={entry._id}>
      <TableCell className="font-medium">
        {new Date(entry.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </TableCell>
      <TableCell>{formatTime(entry.times?.fajr)}</TableCell>
      <TableCell>{formatTime(entry.times?.dhuhr)}</TableCell>
      <TableCell>{formatTime(entry.times?.asr)}</TableCell>
      <TableCell>{formatTime(entry.times?.maghrib)}</TableCell>
      <TableCell>{formatTime(entry.times?.isha)}</TableCell>
      <TableCell>{formatTime(entry.times?.jummah1) || '--'}</TableCell>
      <TableCell>{formatTime(entry.times?.jummah2) || '--'}</TableCell>
      <TableCell>{formatTime(entry.times?.jummah3) || '--'}</TableCell>
      <TableCell className="flex gap-2">
        <FilePenLine
          className="h-5 text-blue-900 cursor-pointer"
          onClick={() => setUpdatebtn({ open: true, values: entry })}
        />
        {updatebtn.open && updatebtn.values._id === entry._id && (
          <UpdateIqama
            open={updatebtn.open}
            setOpen={(value) => setUpdatebtn({ open: value, values: {} })}
            values={updatebtn.values}
          />
        )}
        <Eraser
        className="h-5 text-blue-900 cursor-pointer"
        onClick={() =>
          setDeletebtn({ open:true,values: entry })
        } 
        />
        {deletebtn.open && deletebtn.values._id === entry._id && (
            <DeleteIqama
            open = {deletebtn.open}
            setOpen={(value)=>setDeletebtn({open:value,values:{}})}
            values = {deletebtn.values}
            />
          )}
      </TableCell>
    </TableRow>
  ))
) : (
  <TableRow>
    <TableCell colSpan={10} className="text-center">
      No data available
    </TableCell>
  </TableRow>
)}
        </TableBody>
      </Table>
    </div>
  );
}

export default Iqama;
