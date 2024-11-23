import React from "react";
import azhan from "../assets/images/athan.png";
function Athan() {
  return (
    <div className="bg-[#f9f9f9] pt-4 ps-5">
      <h2 className="text-xl sm:text-3xl text-blue-900">Azhan timings</h2>
      <div className="bg-white ms-3 shadow-md mt-3 pb-4 w-11/12">
        <div  className="lg:grid md:grid-cols-3 gap-4 pt-4 pe-4">
          <img src={azhan} alt="noimg found" />
          <div className=" col-span-2">
            <h2>
              Please note that the Athan timings are optional and only supported
              on limited prayer timing screen. Website widgets and Athan+ phone
              app will not display the Athan timings.
            </h2>
            <h2 className="mt-4">
              To enter Athan time, simply enter the number of minutes before
              Iqamah time. The system will calculate it based on this. For
              example, if Iqamah for Fajr is at 6:15am and Athan is at 6:05am
              then enter 10 for Fajr to indicate Athan is called 10 minutes
              before Iqamah time.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Athan;
