import axios from 'axios'
import { jwtDecode } from 'jwt-decode';
const api = axios.create({
    baseURL:'http://localhost:7777',
    withCredentials:true
})

// api.interceptors.request.use(async (config) => {
//     // Check if accessToken is available and valid; refresh if necessary
//     if (config.url === '/v1/signup/newuser' || config.url === '/v1/user/login') {
//         return config;
//     }

//     // Check if accessToken is available and valid; refresh if necessary
//     if (!accessToken || isTokenExpired(accessToken)) {
//         accessToken = await refreshAccessToken();
//     }

//     if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

function isTokenExpired(token) {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
}

export const accessToken = async () => {
    try {
        const access = await api.get('/v1/user/access-token');
        return access.status === 200 && access.data.authenticate !== undefined ? access.data.authenticate : false;
    } catch (error) {
        console.log("Error:", error);
        console.log(error.response.status);
        if (error.response && error.response.status === 401) {
            return false; // Not authenticated if status is 401
        }
        return false; // Default to false for any other error
    }
};

export const sendverifyication =  async()=>{
    try{
        const getres = await api.post('/v1/user/sendemail');
        console.log(getres.data.message);
        return getres.data.message;
    }
    catch(error){
        console.log(error.message);
    }
} 

async function refreshAccessToken() {
    console.log('this is executed');
    const response = await api.get('/v1/user/refresh-token'); // Backend endpoint to refresh token
    return response.data.accessToken;
}
export const signupnewuser = async (formdata)=>{
    const setdata = await api.post('/v1/signup/newuser',formdata);
    return setdata.status ===200?  setdata.message :[];

};

export const loginuser = async (formdata)=>{
    try{
        const setdata = await api.post('/v1/user/login',formdata);
        return setdata.status ===200? ({Login:true}) :"";
        
    }
    catch(error){
       if(res.status===400) return({message:"authenticationfailed"});
        console.log(error.message);
    }
}
export const verifiedemail = async (token)=>{
    try {
        console.log(token);
        console.log("Enterted verified email")
        const res = await api.put('/v1/user/emailverified',{token});
    console.log(res);   
    return res.status===200? res.data:[]
    } 
    catch (error) {
            console.log(error.message);
    }
    
}

export const checkemail  = async()=>{
    try{
        const chkemail = await api.get('/v1/user/checkemail');
        console.log(chkemail.data.isverified);
        return chkemail.data.isverified;

    }
    catch(error){
        console.log(error);
    }
}

export const forgotpasswordapi = async (email)=>{
    try {
        const res = await api.post('/v1/user/forgotpassword',{email})
        console.log(res.data)
        return res.data;
    } catch (error) {
        
    }
}
export const resetpassowrdapi =  async (token,password)=>{
    try {
        const formdata= ({
            token:token,
            password:password
        })
        const res = await api.put('/v1/user/resetpassword',{formdata});
        console.log(res.data);
        return res.status ===200?res.data:'';
    } catch (error) {
        
    }
}

export const addiqamatimingsapi = async (date,filteredTimes)=>{
    try{
        console.log("This is from api")
        console.log(date,filteredTimes);
        const res = await api.post('/v1/iqama/addiqama',{date,filteredTimes});
        return res.data;
    }
    catch(error){
        console.log(error.message);
    }
}
export const updateiqamatimingsapi = async (date,filteredTimes)=>{
  try {
    const res = api.post('/v1/iqama/updateiqama',{date,filteredTimes});
    return res.data;

  } catch (error) {
    
  }
}
  export const deleteiqamaapi =  async (id)=>{
    try {
      console.log(id);
      const res = api.post('/v1/iqama/deleteiqama',{id});
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

export const alliqmas =  async ()=>{
    try{
        const res = await api.get('/v1/iqama/alliqmas');
        return res.data;
    }
    catch(error){
        console.log(error.message);
    }
}
export const getlatandlan = async () => {
    try {
      const res = await api.get('/v1/user/latandlan');
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Error fetching latitude and longitude:", error);
    }
  };
  
// Helper function to get the full month name from the month number
// Helper function to get the full month name from the month number

// Helper function to get the full month name from the month number
const getMonthName = (month) => {
    return new Date(0, month - 1).toLocaleString('default', { month: 'long' });
  };
  
  // Helper function to format time by removing "(GMT)" and using 24-hour "HH:mm" format
  const formatTime = (timeString) => {
    // Remove "(GMT)" and extra whitespace, then convert to 24-hour format
    const cleanTime = timeString.replace(" (GMT)", "").trim();
    const [time, period] = cleanTime.split(" ");
    
    // Convert to 24-hour format if needed
    let [hours, minutes] = time.split(":");
    if (period === "PM" && hours !== "12") {
      hours = parseInt(hours) + 12;
    } else if (period === "AM" && hours === "12") {
      hours = "00";
    }
    return `${hours}:${minutes}`;
  };
  
  export const fetchSalahTimings = async ({ latitude, longitude, method, standard, latitudecalculation, startMonth, startYear, endMonth, endYear }) => {
    try {
      console.log("fetchSalahTimings is activated", latitude, longitude, method, standard, latitudecalculation, startMonth, startYear, endMonth, endYear);
  
      const monthArray = [];
      for (let year = startYear; year <= endYear; year++) {
        const start = year === startYear ? startMonth : 1;
        const end = year === endYear ? endMonth : 12;
        for (let month = start; month <= end; month++) {
          monthArray.push({ month, year });
        }
      }
  
      const promises = monthArray.map(({ month, year }) =>
      axios.get('https://api.aladhan.com/v1/calendar', {
        params: {
          latitude,
          longitude,
          method,
          school: 'standard',
          latitudeAdjustmentMethod: latitudecalculation,
          month,
          year,
         
        },
      })
      
      );
  
      const results = await Promise.all(promises);
  
      // Combine results and format timings
      const monthlyData = results.reduce((acc, result, index) => {
        const { month, year } = monthArray[index];
        const monthName = `${getMonthName(month)} ${year}`;
  
        if (!acc[monthName]) {
          acc[monthName] = [];
        }
  
        acc[monthName].push(
          ...result.data.data.map((day) => ({
            date: day.date.gregorian.date,
            timings: {
              Fajr: formatTime(day.timings.Fajr),
              Sunrise: formatTime(day.timings.Sunrise),
              Dhuhr: formatTime(day.timings.Dhuhr),
              Asr: formatTime(day.timings.Asr),
              Maghrib: formatTime(day.timings.Maghrib),
              Isha: formatTime(day.timings.Isha),
            },
          }))
        );
        return acc;
      }, {});
  
      console.log(monthlyData); // Output the formatted data
      return monthlyData;
    } catch (error) {
      console.error("Error fetching salah timings:", error);
      throw error;
    }
  };

 export  const uploadtimingsapi = async (datas)=>{
    try{
      console.log("api called successfully");
      const res = await api.post('/v1/salah/uploadtimings',datas);
      console.log(res);
      return res.data;
    }
    catch(error){
      console.log(error);
    }
  }
  
  export const getiqmahtimingsinhome = async()=>{
    try{
      const res = await api.get('/v1/iqama/iqmah');
      console.log(res.data);
      return res.data;
    }
    catch(error){
      console.log(error);
    }
  }
  export const getsalahtimingsinhome =  async()=>{
    try{
      const res = await api.get('/v1/salah/home');
      console.log(res.data);
      return res.data;
    } 
    catch(error){
      console.log(error);
    }
  }