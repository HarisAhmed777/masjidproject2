// Salah Component
import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { LabelandSelect } from '../components/LabelAndSelect';
import Labelandinput from '../components/Labelandinput';
import { fetchSalahTimings, getlatandlan } from '../components/API/Api';
import { useQuery } from '@tanstack/react-query';
import { CalendarArrowDown } from 'lucide-react';
import GenerateTimingsDialog from '../components/Dialogs/GenerateTimingsDialog';
import UploadTimings from '../components/Dialogs/UploadTimings';
import { setMonth } from 'date-fns';

function Salah() {
  const [open, setOpen] = useState(false);
  const [uploaddialog,setUploaddialog] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [datas,setData] = useState('');
  const [dates, setDates] = useState({ startmonth: new Date().getMonth()+1, endmonth:new Date().getMonth()+1  });
  const [year,setYear ] = useState({ startYear: new Date().getFullYear(), endYear:new Date().getFullYear()  })
  const [values, setValues] = useState({
    calculationMethod: 5,
    asrmethod: 0,
    higherlatitudecalculation: 1,
    fajroffset: '',
    sunriseoffset: '',
    zuhuroffset: '',
    asroffset: '',
    magriboffset: '',
    ishaoffset: '',
  });


  const onDateChange = ({ start, end }) => {
    console.log(start,end,"This is start and end");
    console.log(start.year,end,year,"Thsi is start and end year");
    // Update the 'dates' state with the selected start and end dates
    setDates({
      startmonth: start.month,
      endmonth: end.month,
    });
    setYear({
      startYear:start.year,
      endYear:end.year,
    })
  };
  



  const salahlableandinput = [
    {
      label: "Calculation Method",
      name: "calculationMethod",
      labelclass: "block mt-3 text-sm font-semibold",
      options: [
        { label: "Egyptian General Authority of Survey", id: 5 },
        { label: "Leave research institute", id: 1 },
        { label: "ISNA (North America)", id: 2 },
        { label: "Muslim World League", id: 3 },
        { label: "Umm al-Qura University, Makkah", id: 4 }
      ],
      selectclass: 'mt-2 w-full border border-slate-200 px-3 py-1 outline-none rounded-sm focus: border focus:border-blue-800',
      onchange: (e) => handleChange(e),
    },
    {
      label: "Asr Method",
      name: "asrmethod",
      labelclass: "block mt-3 text-sm font-semibold",
      options: [
        { label: 'Standard', id: 0},
        { label: 'Hanafi', id: 1 },
      ],
      selectclass: 'mt-2  border w-full border-slate-200 px-3 py-1 outline-none rounded-sm focus: border focus:border-blue-800',
      onchange: (e) => handleChange(e),
    },
    {
      label: "Higher Latitude Calculation",
      name: "higherlatitudecalculation",
      labelclass: "block mt-3 text-sm font-semibold",
      options: [
        { label: 'None', id: 0 },
        { label: 'Nightmiddle', id: 1 },
        { label: 'OneSeventh', id: 2 },
        { label: 'Anglebased', id: 3 },
      ],
      selectclass: 'mt-2  border w-full border-slate-200 px-3 py-1 outline-none rounded-sm focus: border focus:border-blue-800',
      onchange: (e) => handleChange(e),
    },
    {
      label: "Fajr Offset",
      name: "fajroffset",
      labelclass: 'block mt-3',
      inptype: "number",
      placeholder: 'Fajr Offset',
      inpclass: "mt-2  border w-full border-slate-200 px-3 py-1 outline-none rounded-sm focus: border focus:border-blue-800",
      onchange: (e) => handleChange(e),
    },
    {
      label: "Sunrise Offset",
      name: "sunriseoffset",
      labelclass: 'block mt-3',
      inptype: "number",
      placeholder: 'Sunrise Offset',
      inpclass: "mt-2  border w-full border-slate-200 px-3 py-1 outline-none rounded-sm focus: border focus:border-blue-800",
      onchange: (e) => handleChange(e),
    },
    {
      label: "Zuhur Offset",
      name: "zuhuroffset",
      labelclass: 'block mt-3',
      inptype: "number",
      placeholder: 'Zuhur Offset',
      inpclass: "mt-2  border w-full border-slate-200 px-3 py-1 outline-none rounded-sm focus: border focus:border-blue-800",
      onchange: (e) => handleChange(e),
    },
    {
      label: "Asr Offset",
      name: "asrroffset",
      labelclass: 'block mt-3',
      inptype: "number",
      placeholder: 'Asr Offset',
      inpclass: "mt-2  border w-full border-slate-200 px-3 py-1 outline-none rounded-sm focus: border focus:border-blue-800",
      onchange: (e) => handleChange(e),
    },
    {
      label: "Magrib Offset",
      name: "magriboffset",
      labelclass: 'block mt-3',
      inptype: "number",
      placeholder: 'Magrib Offset',
      inpclass: "mt-2  border w-full border-slate-200 px-3 py-1 outline-none rounded-sm focus: border focus:border-blue-800",
      onchange: (e) => handleChange(e),
    },
    {
      label: "Isha Offset",
      name: "ishaoffset",
      labelclass: 'block mt-3',
      inptype: "number",
      placeholder: 'Isha Offset',
      inpclass: "mt-2  border w-full border-slate-200 px-3 py-1 outline-none rounded-sm focus: border focus:border-blue-800",
      onchange: (e) => handleChange(e),
    },
  ];

  const { data: latLongData } = useQuery({
    queryKey: ['latandlan'],
    queryFn: getlatandlan,
    enabled: true,
  });
  
  console.log(latLongData, "This is latlondata");
  console.log(latLongData?.latitude, "This is from latlondata.lat");
  
  // Ensure fetchSalahTimings is only triggered when latLongData is available
  // const { data: salahTimings, refetch } = useQuery({
  //   queryKey: ['getdatafromapi', latLongData, dates],
  //   queryFn: () => {
  //     console.log("Calling API with:", latLongData?.latitude, latLongData?.longitude);
  //     return fetchSalahTimings({
  //       latitude: latLongData?.latitude,
  //       longitude: latLongData?.longitude,
  //       method: values.calculationMethod,
  //       standard: values.asrmethod,
  //       latitudecalculation: values.higherlatitudecalculation,
  //       startMonth: dates.startmonth,
  //       startYear: currentYear,
  //       endMonth: dates.endmonth,
  //       endYear: currentYear,
  //     });
  //   },
  //   enabled: false, // Use refetch to trigger this query
  // });
  const apis = async () => {
    console.log(dates.startmonth,"Yjos os from lone 174");
    const apiss = await fetchSalahTimings({
      latitude: latLongData?.latitude,
      longitude: latLongData?.longitude,
      method: values.calculationMethod,
      standard: values.asrmethod,
      latitudecalculation: values.higherlatitudecalculation,
      startMonth: dates.startmonth,
      startYear: year.startYear,
      endMonth: dates.endmonth,
      endYear: year.endYear,
    });
  
    // Apply offsets to the timings
    const updatedData = {};
    for (const [monthName, days] of Object.entries(apiss)) {
      updatedData[monthName] = days.map((day) => {
        const applyOffset = (time, offset) => {
          if (!offset || isNaN(offset)) return time; // No offset, return original time
          const [hours, minutes] = time.split(':').map(Number);
          const totalMinutes = hours * 60 + minutes + parseInt(offset, 10);
          const updatedHours = Math.floor((totalMinutes % 1440) / 60);
          const updatedMinutes = totalMinutes % 60;
          return `${String(updatedHours).padStart(2, '0')}:${String(updatedMinutes).padStart(2, '0')}`;
        };
  
        return {
          ...day,
          timings: {
            ...day.timings,
            Fajr: applyOffset(day.timings.Fajr, values.fajroffset),
            Sunrise: applyOffset(day.timings.Sunrise, values.sunriseoffset),
            Dhuhr: applyOffset(day.timings.Dhuhr, values.zuhuroffset),
            Asr: applyOffset(day.timings.Asr, values.asroffset),
            Maghrib: applyOffset(day.timings.Maghrib, values.magriboffset),
            Isha: applyOffset(day.timings.Isha, values.ishaoffset),
          },
        };
      });
    }
  
    setData(updatedData);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    const inputField = salahlableandinput.find((input) => input.name === name);
    if (inputField?.options) {
      const selectedOption = inputField.options.find((option) => option.id == value);
      setValues((prevValues) => ({
        ...prevValues,
        [name]: selectedOption ? selectedOption.id : '',
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    setDates({
      startmonth:new Date().getMonth()+1 ,
      endmonth: new Date().getMonth()+1,
    });
  };
  const handlePreviousMonth = async ()=>{
    console.log("entring handle preoios submit ");
    console.log(new Date().getMonth(),"Ths is from handlePrevious submit");
    const previousmonth =  new Date().getMonth(); 
    setDates({
      startmonth: previousmonth,
      endmonth: previousmonth,
    });
  }
  useEffect(()=>{
    apis();
  },[dates])

  const toggleDropdown = (index) => {
    setIsDropdownOpen((prev) => (prev === index ? null : index));
  };

  console.log(datas);

  return (
    <div className="bg-[#f9f9f9] pt-4 ps-5">
      <h2 className="text-xl sm:text-3xl text-blue-900">Prayer Timings</h2>
      <div className="bg-white ms-3 shadow-md mt-3 pb-4 w-11/12">
        <div className="flex justify-between items-center p-3 border-b border-black">
          <h2 className="text-xl pt-2 ps-3">Calculation Settings</h2>
          <Button className="me-3" onClick={handleSubmit}>Save And Generate Timings</Button>
        </div>
        <div className="ps-6 grid grid-cols-3 gap-7 items-center me-3">
          {salahlableandinput.map((inputProps, index) => (
            inputProps.options ? 
              <LabelandSelect key={index} {...inputProps} /> :
              <div key={index}>
                <Labelandinput {...inputProps} />
                in minutes
              </div>
          ))}
        </div>
      </div>

      <div className="mt-4 ms-3 w-11/12">
        <div className="flex justify-between">
          <Button onClick = {handlePreviousMonth}>View Previous Month</Button>
          <Button onClick={() => setOpen(true)}>Generate Timings</Button>
          <GenerateTimingsDialog open={open} setOpen={setOpen} onDateChange={onDateChange} />
          <Button onClick={() => setUploaddialog(true)}>Upload Timings</Button>
          <UploadTimings open={uploaddialog} setOpen={setUploaddialog} uploaddata={datas} />


        </div>
      </div>
            <div className='w-11/12'>
      {datas && Object.keys(datas).length > 0 ? (
  <div className="mt-6 w-full ms-3">
    {Object.entries(datas).map(([monthName, days], index) => (
      <div key={index} className="mt-4">
        <button
          onClick={() => toggleDropdown(index)}
          className="w-full flex items-center justify-between p-4 bg-blue-100 text-blue-800 text-lg font-semibold rounded shadow-md"
        >
          <span className="flex items-center">
            <CalendarArrowDown className="mr-2" />
            {`Prayer Timings for ${monthName}`}
          </span>
          <span>{isDropdownOpen === index ? "▲" : "▼"}</span>
        </button>

        {isDropdownOpen === index && (
          <div className="bg-white shadow-md mt-4">
            <table className="w-full text-left border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Fajr</th>
                  <th className="border border-gray-300 p-2">Sunrise</th>
                  <th className="border border-gray-300 p-2">Dhuhr</th>
                  <th className="border border-gray-300 p-2">Asr</th>
                  <th className="border border-gray-300 p-2">Maghrib</th>
                  <th className="border border-gray-300 p-2">Isha</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day, dayIndex) => (
                  <tr key={dayIndex} className="border-b">
                    <td className="border border-gray-300 p-2">{day.date}</td>
                    <td className="border border-gray-300 p-2">{day.timings.Fajr}</td>
                    <td className="border border-gray-300 p-2">{day.timings.Sunrise}</td>
                    <td className="border border-gray-300 p-2">{day.timings.Dhuhr}</td>
                    <td className="border border-gray-300 p-2">{day.timings.Asr}</td>
                    <td className="border border-gray-300 p-2">{day.timings.Maghrib}</td>
                    <td className="border border-gray-300 p-2">{day.timings.Isha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    ))}
  </div>
) : (
  <div>No prayer timings available</div>
)}
</div>

    </div>
  );
}

export default Salah;
