import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addProjectAPI, allBookedDetailsAPI } from '../services/allAPI';
import swal from 'sweetalert';
import { PayPalButton } from "react-paypal-button-v2";


function BookSeats() {
    const [seats, setSeats] = useState([]);
    const[movieDetails,setMovieDetails]=useState([]);
    const [movies, setMovies] = useState([]);
    const[theaterDetailas,setTheaterDetails]=useState();
    const [selectDeselect,setSelectDeselect]=useState([]);
    const [showButton, setShowButton] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const open=()=>setShow(true)
    const navigate=useNavigate()

    const handleSeat = (seatNo) => {
        if (dbseats.includes(String(seatNo))) {
            alert("This seat is already booked.");
            return; 
        }
        if (selectDeselect.includes(seatNo)) {
            setSelectDeselect((prev) => prev.filter((index) => index !== seatNo));
        } else {
            setSelectDeselect([...selectDeselect, seatNo]);
        }
    };
    
    useEffect(() => {
        const seats = [];
        for (let i = 1; i <= theaterDetailas?.seatNo; i++) {
            seats.push(i);
        }
        setSeats(seats);
    }, [theaterDetailas]);
   

   
    //useeffect to clear selectdeseclect array
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const userData = JSON.parse(localStorage.getItem('userData')) || [];
        const theaterId = theaterDetailas?.id;
        const movieName = movieDetails?.name;
    
        // Filter booked seats based on username, theater ID, and movie name
        const filteredBookedSeats = userData
            ?.filter(user => user?.name === loggedInUser) // Filter by username
            ?.flatMap(user => user?.selectedSeats?.filter(seat => seat?.id === theaterId && seat?.movieName === movieName)) // Filter by theater ID and movie name
            ?.flatMap(seat => seat?.bookedSeats);
    
        // Check if any selected seat is already booked
        const isAnySeatBooked = selectDeselect.some(seat => filteredBookedSeats?.includes(seat));
        if (isAnySeatBooked) {
            alert("Already booked!");
            setSelectDeselect([]);
            return;
        }
    
        setShowButton(selectDeselect.length > 0);
    }, [selectDeselect, theaterDetailas?.id, movieDetails?.name]);
    
   
const[token,setToken]=useState("")


    const[trial,setTrial]=useState({})
    
    const selectedShowTime = JSON.parse(localStorage.getItem('TheaterTime')) || [];
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    const today = localStorage.getItem('selectedDate');
useEffect(() => {
   
    const updatedTrial = {
        theaterId:theaterDetailas?.id,
        theaterName: theaterDetailas?.name,
        movieName: movieDetails?.name,
        bookedSeats: selectDeselect,
        theaterTime: selectedShowTime,
        date: today
    };

    setTrial(updatedTrial);
}, [ theaterDetailas, movieDetails, selectDeselect]);

useEffect(()=>{
if(sessionStorage.getItem("token")){
    setToken(sessionStorage.getItem("token"))
}else{
    setToken("")
}
},[])
const [loggedIn,setLoggedIn]=useState(false)
const [bookedDetails,setBookedDetails]=useState([]);

    const getBookedSeatsDetails=async()=>{
        const result=await allBookedDetailsAPI()
        if(result.status===200){
            setBookedDetails(result.data)
        }else{
            console.log(result);
            console.log(result.response);
        }
    }
    const[dbseats,setdbSeats]=useState([]);
 

    useEffect(() => {
        const filteredThtime = bookedDetails.filter(detail =>
            detail.theaterName === theaterDetailas?.name &&
            detail.movieName === movieDetails?.name).flatMap(a => a.theaterTime);

    const selectedShowTime = JSON.parse(localStorage.getItem('TheaterTime')) || [];


    const isShowTimeSelected = filteredThtime.includes(selectedShowTime[0]);


        const filteredBookedSeats = bookedDetails.filter(detail =>
            detail.theaterName === theaterDetailas?.name &&
            detail.movieName === movieDetails?.name &&
            detail.date === today &&
            isShowTimeSelected
        );
        const bookedSeatz = filteredBookedSeats.flatMap(detail => detail.bookedSeats);
        setdbSeats(bookedSeatz);
    }, [bookedDetails, theaterDetailas, movieDetails]);
    
   
    

    


    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setLoggedIn(true)
        }else{
            setLoggedIn(false)
        }
        //api call 
        getBookedSeatsDetails()
    },[])

    const handleOpen=()=>{
        if(loggedIn){
            open()
        }else{
            swal("Unauthorized", "Please log in to book tickets.", "warning").then(() => {navigate("/signin");});
        }
    }
    

    // Function to handle payment success
    const handlePaymentSuccess = async (details, data) => {
        try {
            await pay(); 
            handleClose()
            setShowButton(false)
        } catch (error) {
            console.error('Error handling payment success:', error);
        }
    };
    
    const pay = async () => {
        const { theaterId, theaterName, movieName, bookedSeats, theaterTime, date } = trial;
        const reqBody = { theaterId, theaterName, movieName, bookedSeats, theaterTime, date };
      
        console.log("Request Data:", reqBody); 
      
        if (token) {
          const reqHeader = {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          };
      
          try {
            const result = await addProjectAPI(reqBody, reqHeader); // Pass JSON data directly
            if (result.status === 200) {
              console.log(result.data);
              swal("Booking Confirmed", "Enjoy your show :)", "success").then(() => {
                navigate(`/ticketdownload/${movieDetails?.id}/${movieDetails?.name}/${theaterDetailas?.id}`)
              });
            } else {
              console.log(result.response.data);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }
      };

    
    
    const time=JSON.parse(localStorage.getItem('TheaterTime'))
    const tickets=selectDeselect.length;
    const amount=tickets *100;
    const dSelectedSeats = selectDeselect.join(', ');


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

useEffect(() => {
    const findMovie = movies.find((item) => item.id == id);
    setMovieDetails(findMovie)
    const findThearer= findMovie?.detailView?.theaters?.find((item)=>item.id== theaterId);
    setTheaterDetails(findThearer)
}, [movies, id ,theaterId]);








  return (
    <>
   
     
         <div className='bozz p-1 d-flex justify-content-between ms-3' style={{height:"55px"}}>
         <Link to={"/"} style={{ color: "black", fontWeight: "", textDecoration: "none" }}>
                            <img src="https://www.freeiconspng.com/thumbs/hd-tickets/download-ticket-ticket-free-entertainment-icon-orange-ticket-design-0.png" alt="" width={50} height={45} />
                            &nbsp; <span className='fs-4' style={{ fontFamily: "Bangers, system-ui" }}>Tic-Booker</span>
                        </Link>
            <div className='d-flex text-center'>
                <h6 className='mt-1 fw-bold'>{movieDetails?.name} Ⓤ <br />
                <p className='fw-bold mt-2' style={{color:"#666666" ,fontSize:"13px"}}>{theaterDetailas?.name} | {time}</p></h6>
            </div>
       
          <div style={{fontSize:"13px"}}  className='d-flex fw-bold mt-2'>
            <button className='guide btn btn-outline-success h-75'>Available</button>
            <button className='guide btn btn-secondary disabled ms-2 h-75'>Booked</button> 
            <button className='guide btn btn-primary h-75 ms-2'>Selected</button> 
        </div>
       </div>
        
       <div className='mb-5 mt-4 ' style={{ display: 'flex', alignItems: 'center', justifyContent: "center", gap: '20px', margin: 'auto', flexWrap: 'wrap', width: "850px"}}>
                {seats.map((seat, index) => (
                    <div
                        key={index}
                       onClick={()=>handleSeat(index+1)}
                       style={{marginBottom: '5px',display: "flex",alignItems: "center",justifyContent: "center"}}className='seat'>

                         <button
                        style={{ width: "35px", height: "35px" }}
                        className={`mt-1 btn ${selectDeselect.includes(index + 1) ? 'btn-primary' : dbseats.includes(String(index + 1)) ? 'btn-dark disabled' : 'btn-outline-success'}`}
 
                    >
                        <p  style={{ fontSize: "13px",marginTop:"1px",marginLeft:"-3px" }}>{index + 1}</p>
                    </button>

                    </div>
                ))}
            </div>
            <div className='d-flex align-items-center justify-content-center' style={{marginTop:"-8px"}}>
                <img src="https://assetscdn1.paytm.com/movies_new/_next/static/media/screen-icon.8dd7f126.svg" alt="" />
            </div>
         {showButton  && (<>
    <div className='boz d-flex bg-light  p-3  mb-0  w-100 align-items-center justify-content-evenly '>
        <div>
          <button className='btn btn-outline-dark fw-bold' style={{fontSize:"12px"  }}>{tickets} Tickets <i class="fa-regular fa-square-check fw-bolder"></i></button>
        </div>
            <div className='text-dark w-25' style={{marginTop:"-6px"}}>
             <button className='btn btn-outline-dark w-75 fw-bolder ' style={{fontSize:"13px"}}><i class="fa-solid fa-couch"></i> Seat No(s): {dSelectedSeats}</button>
            </div>
        <div className='text-end w-25' style={{marginTop:"-6px"}}>
      <Link >
      <button className='btn btn-success w-100 fw-bold' onClick={handleOpen}>Pay &nbsp; ₹ {amount}/-</button></Link>
        </div>
    </div>
   
  
    </>
)}
<Modal  show={show} backdrop="static" keyboard={false}>
    <div className='d-flex justify-content-center align-items-center p-5'>
  <div className='w-75'>  
  
    <PayPalButton
  options={{
    clientId: "AbH8R_yOyWU1jBV_3sEpdM2C3Bkbdaf83JfS4UWlBz_0XHYXapjSen3H9JMlXCqZa-EzlKtzllegyXng",
    currency: "USD",
  }}
  amount={amount}
  onSuccess={handlePaymentSuccess}
  onError={(err) => {
    console.error("PayPal error:", err);
  }}
/>

  </div>
  </div>
  <div className='text-center w-100'>
      <button className='btn btn-danger mb-3 w-75' onClick={handleClose}>Cancel</button>
  </div>
</Modal>

{/*
 sb-lft8n30233559@personal.example.com
n+_7N;Mi 
*/}

        
    </>
  )
}

export default BookSeats

