import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { format } from 'date-fns';
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '../ui/button';

function GenerateTimingsDialog({ open, setOpen, onDateChange }) {
    const [startdate, setStartDate] = useState(null);
    const [enddate, setEndDate] = useState(null);

    const handleCalculate = () => {
        if (startdate && enddate) {
            const startMonth = startdate.getMonth() + 1; // Months are 0-indexed
            const startYear = startdate.getFullYear();
            const endMonth = enddate.getMonth() + 1;
            const endYear = enddate.getFullYear();

            onDateChange({
                start: { month: startMonth, year: startYear },
                end: { month: endMonth, year: endYear }
            });
        }
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] mt-8">
                <DialogHeader>
                    <DialogTitle>Select Date Range</DialogTitle>
                </DialogHeader>
                <div>
                    <label className="block mb-4">Start Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"} className="w-full text-left">
                                <CalendarIcon />
                                {startdate ? format(startdate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={startdate}
                                onSelect={setStartDate}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <label className="block mb-4">End Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant={"outline"} className="w-full text-left">
                                <CalendarIcon />
                                {enddate ? format(enddate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={enddate}
                                onSelect={setEndDate}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleCalculate}>Calculate</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default GenerateTimingsDialog;
