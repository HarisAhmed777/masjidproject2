import React from "react";
import alert from "../assets/images/alert.png";
import megaphone from "../assets/images/megaphone.png";
import weblayout from "../assets/images/weblayout.png";
import schedule from "../assets/images/schedule.png";
import notification from "../assets/images/notification.png";
import donate from "../assets/images/donate.png";
import prayermat from "../assets/images/prayermat.png";
import HomePagecontent from "../components/HomePagecontent";
import SalahAndIqamahTable from "../components/SalahandIqmanTable";
function Home() {
  const homecontent = [
    {
      divclass: "bg-blue-500 text-white shadow-2xl",
      img: alert,
      heading: "Submit For Review",
      para: "Get Your masjifd listed on our products",
    },
    {
      divclass: "bg-white text-black shadow-2xl",
      img: prayermat,
      heading: "Manage Iqamah Timings",
      para: "Add or edit Iqamah Timings.Iqmah timings should be well in advance",
    },
    {
      divclass: "bg-white text-black shadow-2xl",
      img: weblayout,
      heading: "Display New Content",
      para: "Add or edit Iqamah Timings.Iqmah timings should be well in advance",
    },
    {
      divclass: "bg-white text-black shadow-2xl ",
      img: megaphone,
      heading: "Add Announcement",
      para: "Display text on screen/Azthan+ ",
    },
    {
      divclass: "bg-white text-black shadow-2xl",
      img: schedule,
      heading: "View Monthly Calender",
      headingclass: "text-xxl",
      para: "Monthly Prayer And Iqmah Timings",
    },
    {
      divclass: "bg-white text-black shadow-2xl",
      img: donate,
      heading: "Manage Donations",
      headingclass: "text-xxl",
      para: "Monthly Prayer And Iqmah Timings",
    },
    {
      divclass: "bg-white text-black shadow-2xl",
      img: notification,
      heading: "Send a Push Notifications",
      headingclass: "text-xxl",
      para: "Monthly Prayer And Iqmah Timings",
    },
  ];
  return (
    <div className="bg-[#f9f9f9] pt-4 ps-5">
      <h2 className="text-xl sm:text-3xl text-blue-900">Welcome Back!</h2>
      <p className="ps-2 mt-1">What do u like to do today?</p>
      <div className="bg-white ms-3 shadow-md mt-3 pb-4 w-11/12 grid grid-flow-col ">
        <div>
          <h2 className="font-bold text-xl pt-2 ps-4 mb-4">Urgent Task</h2>
          <div className="grid grid-cols-1 w-9/12 gap-4 grid-row-1 grid-flow-row mb-4">
            <HomePagecontent {...homecontent[0]} />
          </div>
          <h2 className="font-bold text-xl pt-2 ps-4">Quick Actions</h2>
          <div className="grid grid-cols-1 w-9/12 gap-4 grid-row-1 grid-flow-row mb-4">
            <HomePagecontent {...homecontent[1]} />
            <HomePagecontent {...homecontent[2]} />
          </div>
          <div className="grid grid-cols-2 gap-4 w-3/4">
            <HomePagecontent {...homecontent[3]} />
            <HomePagecontent {...homecontent[4]} />
            <HomePagecontent {...homecontent[5]} />
            <HomePagecontent {...homecontent[6]} />
          </div>
          <div></div>
        </div>
        <div>
        <SalahAndIqamahTable/>
      </div>
      </div>
      
      </div>
      
  );
}

export default Home;
