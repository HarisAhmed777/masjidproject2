import { useEffect, useState } from 'react';
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
import { useMutation } from '@tanstack/react-query';
import { updateiqamatimingsapi } from '../API/Api';

function UpdateIqama({ open, setOpen, values }) {
  const [date, setDate] = useState(values.date ? new Date(values.date) : null);
  const [selectedOption, setSelectedOption] = useState("fixed");
  const [times, setTimes] = useState(values.times || {
    fajr: { hour: "", minute: "", amPm: "AM", offset: "" },
    dhuhr: { hour: "", minute: "", amPm: "AM", offset: "" },
    asr: { hour: "", minute: "", amPm: "AM", offset: "" },
    maghrib: { hour: "", minute: "", amPm: "AM", offset: "" },
    isha: { hour: "", minute: "", amPm: "AM", offset: "" },
  });
  const [error, setError] = useState(false);
  console.log(values.date);
  // Determine the default selected option based on values
  useEffect(() => {
    const hasOffset = Object.values(values.times || {}).some((time) => time.offset);
    setSelectedOption(hasOffset ? "offset" : "fixed");
  }, [values]);

  const handleTimeChange = (prayer, field, value) => {
    const newValue =
      field === "hour" || field === "minute"
        ? value.replace(/[^0-9]/g, "") // Allow only numbers
        : value;
    if (
      (field === "hour" && (newValue < 1 || newValue > 24)) ||
      (field === "minute" && (newValue < 0 || newValue > 59))
    ) {
      return; // Prevent invalid values
    }
    setTimes((prev) => ({
      ...prev,
      [prayer]: { ...prev[prayer], [field]: newValue },
    }));
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Reset all times when switching options
    setTimes({
      fajr: { hour: "", minute: "", amPm: "AM", offset: "" },
      dhuhr: { hour: "", minute: "", amPm: "AM", offset: "" },
      asr: { hour: "", minute: "", amPm: "AM", offset: "" },
      maghrib: { hour: "", minute: "", amPm: "AM", offset: "" },
      isha: { hour: "", minute: "", amPm: "AM", offset: "" },
    });
  };

  const validateForm = () => {
    for (const prayer in times) {
      const { hour, minute, amPm, offset } = times[prayer];
      if (selectedOption === "fixed" && (!hour || !minute || !amPm)) {
        return false; // Fixed time fields are required
      }
      if (selectedOption === "offset" && offset === "") {
        return false; // Offset value is required
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!date) {
      alert("Date is required.");
      return;
    }
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    if (!validateForm()) {
      setError(true);
      alert("All fields are required and must be valid.");
      return;
    }

    const newFilteredTimes = Object.fromEntries(
      Object.entries(times).map(([prayer, time]) => {
        const filteredTime = Object.fromEntries(
          Object.entries(time).filter(([key, value]) => {
            return value !== "" && !(key === "amPm" && time.offset);
          })
        );
        return [prayer, filteredTime];
      })
    );

    mutate({ date:utcDate.toISOString(), filteredTimes: newFilteredTimes });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (data) => updateiqamatimingsapi(data.date, data.filteredTimes),
    onSuccess: () => {
      setDate(null);
      setSelectedOption("fixed");
      setTimes({
        fajr: { hour: "", minute: "", amPm: "", offset: "" },
        dhuhr: { hour: "", minute: "", amPm: "", offset: "" },
        asr: { hour: "", minute: "", amPm: "", offset: "" },
        maghrib: { hour: "", minute: "", amPm: "", offset: "" },
        isha: { hour: "", minute: "", amPm: "", offset: "" },
      });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[825px] mt-8 top-[15%] transform transition-transform duration-500 ease-out -translate-y-20">
        <DialogHeader>
          <DialogTitle>Update Iqamah</DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <label className="block mb-4">Iqamah Change Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[100%] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />

                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {["fajr", "dhuhr", "asr", "maghrib", "isha"].map((prayer) => (
              <div key={prayer}>
                <Label className="block capitalize">{prayer}</Label>
                <div className="flex gap-0 items-center">
                  {selectedOption === "offset" ? (
                    <Input
                      type="number"
                      placeholder="Offset value"
                      value={times[prayer].offset}
                      onChange={(e) =>
                        handleTimeChange(prayer, "offset", e.target.value)
                      }
                      className={cn(
                        "border p-1 ml-2 rounded",
                        error && !times[prayer].offset && "border-red-500"
                      )}
                    />
                  ) : (
                    <div className="flex items-center gap-2 ml-2">
                      <input
                        type="number"
                        value={times[prayer].hour}
                        onChange={(e) =>
                          handleTimeChange(prayer, "hour", e.target.value)
                        }
                        placeholder="HH"
                        className={cn(
                          "border p-1 w-14 rounded text-center",
                          error && !times[prayer].hour && "border-red-500"
                        )}
                      />
                      <span>:</span>
                      <input
                        type="number"
                        value={times[prayer].minute}
                        onChange={(e) =>
                          handleTimeChange(prayer, "minute", e.target.value)
                        }
                        placeholder="MM"
                        className={cn(
                          "border p-1 w-14 rounded text-center",
                          error && !times[prayer].minute && "border-red-500"
                        )}
                      />
                      <select
                        value={times[prayer].amPm}
                        onChange={(e) =>
                          handleTimeChange(prayer, "amPm", e.target.value)
                        }
                        className="border p-1 rounded"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  )}
                  <select
                    value={selectedOption}
                    onChange={(e) => handleOptionChange(e.target.value)}
                    className="border p-1 ml-2 rounded"
                  >
                    <option value="fixed">Fixed</option>
                    <option value="offset">Offset</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            {!isLoading ? (
              <>Save changes</>
            ) : (
              <div className="spinner w-3 h-3 mr-2"></div>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateIqama;
