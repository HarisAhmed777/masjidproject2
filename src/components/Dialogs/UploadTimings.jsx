import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import { uploadtimingsapi } from "../API/Api";

function UploadTimings({ open, setOpen, uploaddata }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["uploadtimings", uploaddata],
    queryFn: () => {
      uploadtimingsapi(uploaddata);
    },
    enabled: false,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] mt-8">
        <DialogHeader>
          <DialogTitle>Upload Timings</DialogTitle>
        </DialogHeader>
        <div>
          <p>
            Are you sure ,you checked all the datas and ready to upload the
            timings{" "}
          </p>
        </div>
        <DialogFooter>
          <Button type="button" onClick={() => refetch()}>
            Upload
          </Button>
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-800"
            onClick={() => setOpen(!open)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadTimings;
