import React from 'react';
import { Link, useParams } from 'react-router-dom';


function Detail() {
  const { movieName, name, date, theaterTime, bookedSeats, imageUrl } = useParams();
  return (
    <>
    <div className='d-flex justify-content-center align-items-center'>
        <div className='ticket mt-5' style={{ width: "30%",   height: "480px" ,borderRadius:"15px"}}>

        <div className='mt-4 d-flex'>
          <img className='ms-3 rounded' src={imageUrl} alt="" width={120} />
          <div >
          <p className='ms-4 mt-3 ' style={{fontWeight:"bolder"}}>{movieName} (U/A)</p>
          <p>
          <p className='mt-1 ms-4' style={{fontSize:"14px",color:"#666666"}}>{date} | <span className='fw-bold text-dark'>{theaterTime}</span></p></p>
          <p className='ms-4' style={{fontSize:"13px"}}><i class="fa-solid fa-film text-dark fw-bold" style={{color:"#666666"}}></i> {name}</p>
          </div>
        </div>
        <div className='mt-3 ms-3' style={{borderBottom:"2px dotted #666666",width:"350px"}}></div>
     <div className='d-flex mt-3'>
        <img className='ms-2' src="https://images.vexels.me/media/users/3/158117/isolated/preview/ccf8792bac0e235d217f3e0993841bac-qr-code-label.png" alt="" width={130} />
    
    <p className='fw-bold ms-3 mt-3 fs-6' >Seat No(s): <span className='fs-5'>{bookedSeats}</span><br />
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
  );
}

export default Detail;
