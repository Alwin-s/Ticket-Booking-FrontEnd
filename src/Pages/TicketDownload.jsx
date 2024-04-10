import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { userBookedDetailsAPI } from '../services/allAPI';


function TicketDownload() {
    const[movieDetails,setMovieDetails]=useState([]);
    const [movies, setMovies] = useState([]);
    const[theaterDetailas,setTheaterDetails]=useState();
    const[dbBooked,setDbBooked]=useState([]);

    const getUserSeats=async()=>{
        if(sessionStorage.getItem("token")){
            const token =sessionStorage.getItem("token")
            const reqHeader={
                'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
            }
            const result=await userBookedDetailsAPI(reqHeader)
            if(result.status===200){
                setDbBooked(result.data)
            }else{
                console.log(result);
                console.log(result.response);
            }
        }
    }
    const lastBookedSeats = dbBooked[dbBooked.length - 1]?.bookedSeats || [];
    



   
const { id , theaterId} = useParams();
useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('/data.json');
            setMovies(response.data.movies);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);
function getFormattedDate() {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const currentDate = new Date().toLocaleDateString(undefined, options);
    return currentDate;
}


useEffect(() => {
    const findMovie = movies.find((item) => item.id == id);
    setMovieDetails(findMovie)
    const findThearer= findMovie?.detailView?.theaters?.find((item)=>item.id== theaterId);
    setTheaterDetails(findThearer);
    getUserSeats()
}, [movies, id ,theaterId]);


const storedDate = localStorage.getItem('selectedDate');
      console.log('Stored Date:', storedDate);





const theaterTime = JSON.parse(localStorage.getItem("TheaterTime"));



    
  return (
    <>
    <div className='d-flex justify-content-center align-items-center'>
        <div className='ticket mt-5' style={{ width: "30%",   height: "480px" ,borderRadius:"15px"}}>

        <div className='mt-4 d-flex'>
          <img className='ms-3 rounded' src={movieDetails?.image} alt="" width={120} />
          <div >
          <p className='ms-4 ' style={{fontWeight:"bolder"}}>{movieDetails?.name} (U/A)</p>
          <p className='ms-4' style={{fontSize:"14px",color:"#666666"}}>{movieDetails?.language} , 2D <br />
          <p className='mt-1'>{storedDate} | <span className='fw-bold text-dark'>{theaterTime}</span></p></p>
          <p className='ms-4' style={{fontSize:"13px"}}><i class="fa-solid fa-film text-dark fw-bold"></i> {theaterDetailas?.name}</p>
          </div>
        </div>
        <div className='mt-3 ms-3' style={{borderBottom:"2px dotted #666666",width:"350px"}}></div>
     <div className='d-flex mt-3'>
        <img className='ms-2' src="https://images.vexels.me/media/users/3/158117/isolated/preview/ccf8792bac0e235d217f3e0993841bac-qr-code-label.png" alt="" width={130} />
    
    <p className='fw-bold ms-3 mt-3 fs-6' >Seat No(s): <span className='fs-5'>{String(lastBookedSeats)}</span><br />
    <p style={{fontSize:"13px"}} className='mt-3'>BOOKING ID: WPSWC420Q </p>
    </p>
     </div>
     <div className='text-center mt-4'>
        <p className='ms-3' style={{fontSize:"14px",color:"#666666"}}>A confirmation is sent on email/SMS/WhatsApp within <br /> 15 mins of Booking</p>
     </div>
  
    </div>
    
    </div>
<div className='text-center mt-5'>
<Link to={"/"}><button className='btn btn-danger'>Back To Home</button></Link>
</div>
   </> 
  )
}

export default TicketDownload