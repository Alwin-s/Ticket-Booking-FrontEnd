import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from "../Components/Header"
import Footer from '../Components/Footer';
import { Spinner } from 'react-bootstrap';


function Theaters() {


    const getFormattedDate = (date) => {
        const options = { weekday: 'short',day: '2-digit', month: 'short' };
        const dateString = date.toLocaleDateString('en-US', options);
        return dateString.replace(/,(?=\s)/, '');

      };
      
      const today = new Date();
      const todayDate = getFormattedDate(today);
      
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowDate = getFormattedDate(tomorrow);
      

      const dayAfterTomarrow= new Date();
      dayAfterTomarrow.setDate(dayAfterTomarrow.getDate()+2);
      const dayAfterDate=getFormattedDate(dayAfterTomarrow)
      

    
    const[movieDetails,setMovieDetails]=useState([]);
    const [movies, setMovies] = useState([]);

    const { id } = useParams();
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

    const [showTodayDetails, setShowTodayDetails] = useState(true);
const handleToday = () => {
  setShowTodayDetails(true);
  setShowTomorrowDetails(false);
  setShow2Details(false);
  const todayDate = new Date();
  localStorage.setItem('selectedDate', todayDate.toLocaleString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }));
};

const [showTomorrowDetails, setShowTomorrowDetails] = useState(false);
const handleTomorrowButtonClick = () => {
  setShowTomorrowDetails(true);
  setShowTodayDetails(false);
  setShow2Details(false);
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  localStorage.setItem('selectedDate', tomorrowDate.toLocaleString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }));
};

const [show2Details, setShow2Details] = useState(false);
const handleDayAfter = () => {
  setShow2Details(true);
  setShowTodayDetails(false);
  setShowTomorrowDetails(false);
  const dayAfterDate = new Date();
  dayAfterDate.setDate(dayAfterDate.getDate() + 2);
  localStorage.setItem('selectedDate', dayAfterDate.toLocaleString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }));
};
useEffect(()=>{
  localStorage.removeItem('selectedDate')
  },[])


useEffect(() => {
  let storedDate = localStorage.getItem('selectedDate');
  const todayDate = new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' });
  if (!storedDate) {
    localStorage.setItem('selectedDate', todayDate);
    storedDate = todayDate; 
  }
  console.log('Stored Date:', storedDate);
}, [showTodayDetails, showTomorrowDetails, show2Details]);


    
    const [selectedShowTime, setSelectedShowTime] = useState(null);

    const handleShowTimeClick = (time) => {
      setSelectedShowTime(time);
      const storedTheaterTime = JSON.parse(localStorage.getItem('TheaterTime')) || [];
      storedTheaterTime.push(time);
      localStorage.setItem('TheaterTime', JSON.stringify(storedTheaterTime));
    };
    useEffect(() => {
   localStorage.removeItem('TheaterTime')
    }, []);

    useEffect(() => {
        const findMovie = movies.find((item) => item.id == id);
        setMovieDetails(findMovie)
    }, [movies, id]);
  return (
    <>
    {/* <Header/> */}
    <div style={{ overflowX:"hidden",
        backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 41.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(${movieDetails?.bgimg})`,
        backgroundPosition: "50% 50%"
    }}>
        <div>
            
        </div>
         <div style={{width:"100%",height:"166px"}} className='p-4 ms-2 text-white' >
            <h2 className='fw-bold d-flex mb-2'>{movieDetails?.name} - ({movieDetails?.language})</h2>
           
            <p className='text-white fw-bold mb-' style={{fontSize:"12px"}}>U . 2h 15m</p>
            <button className='btn btn-outline-light'>{movieDetails?.genre}</button>
           

        </div>
       
    </div>

<div className='ms-3 mt-4 mb-4 'z>
<button className={`btn ${showTodayDetails ? 'btn-danger' : 'btn-outline-danger'} fw-bold ms-4`} onClick={handleToday}
style={{width:"75px",fontSize:"14px"}} >{todayDate}</button>

<button className={`btn ${showTomorrowDetails ? 'btn-danger' : 'btn-outline-danger'} fw-bold ms-4`} onClick={handleTomorrowButtonClick}
style={{width:"75px",fontSize:"14px"}} >{tomorrowDate}</button>

<button className={`btn ${show2Details ? 'btn-danger' : 'btn-outline-danger'} fw-bold ms-4`} onClick={handleDayAfter}
style={{width:"75px",fontSize:"14px"}} >{dayAfterDate}</button>
</div>

  
    <h4 className='ms-3 fw-bold mt-4'>  <span className='text-danger rounded'>┃</span>Theater Details <i class="fa-solid fa-chevron-right text-danger"></i></h4>
    {showTodayDetails && (
  <div className="container mt-4 mb-5">
    <div className="row">
      {movieDetails?.detailView?.theaters && movieDetails.detailView.theaters.map((theater, index) => {
        const filteredShows = theater.shows.filter(show => {
          const showDateTime = new Date(`${new Date().toDateString()} ${show.time}`);
          const currentDateTime = new Date();
          return showDateTime >= currentDateTime;
        });

        if (filteredShows.length === 0) {
          return null; 
        }

        return (
          <div key={index} className="col-lg-6">
           <div className="card mt-3 shadow border-0 text-white" style={{ backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 46.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(${movieDetails?.bgimg})` ,backgroundSize:"contain"}}>

              <div className="card-body">
                <h5 className="card-title fw-bold"><span className='text-danger rounded'>┃</span>{theater.name} </h5>
                <p className="card-text fst-italic" style={{ color: "white" }}>Show Timings:</p>
                {filteredShows.map((show, showIndex) => (
                <Link to={`/bookseats/${movieDetails?.id}/${movieDetails?.name}/${theater.id}`}>
                  <button onClick={() => handleShowTimeClick(show.time)}  key={showIndex} className='btn btn-outline-light fw-bold me-3 mb-2' style={{ width: "96.3px", fontSize: "12px" }}>
                      {show ? show.time : "No more shows today"} 
                  </button></Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}


{showTomorrowDetails && (
        <div className="container mt-4 mb-5">
          <div className="row">
            {movieDetails?.detailView?.theaters ? (
              movieDetails?.detailView?.theaters.map((theater, index) => (
                <div key={index} className="col-lg-6">
                 <div className="card mt-3 shadow border-0 text-white" style={{ backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 46.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(${movieDetails?.bgimg})` ,backgroundSize:"contain"}}>

                    <div className="card-body">
                      <h5 className="card-title fw-bold"><span className='text-danger rounded'>┃</span>{theater.name} </h5>
                      <p className="card-text fst-italic" style={{ color: "white" }}>Show Timings:</p>
                      {theater?.shows.filter(show => {
    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1); 
    const showTomorrowDateTime = new Date(`${tomorrowDate.toDateString()} ${show.time}`);
    const currentDateTime = new Date();
    return showTomorrowDateTime >= currentDateTime;
}).map((show, showIndex) => (
<Link to={`/bookseats/${movieDetails?.id}/${movieDetails?.name}/${theater.id}`}>
                  <button onClick={() => handleShowTimeClick(show.time)}  key={showIndex} className='btn btn-outline-light fw-bold me-3 mb-2' style={{ width: "96.3px", fontSize: "12px" }}>
                      {show ? show.time : "No more shows today"} 
                  </button></Link>
))}

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1><Spinner animation="border" className='text-center text-danger fs-4' /></h1>
            )}
          </div>
        </div>
      )}

{show2Details && (
        <div className="container mt-4 mb-5">
          <div className="row">
            {movieDetails?.detailView?.theaters ? (
              movieDetails?.detailView?.theaters.map((theater, index) => (
                <div key={index} className="col-lg-6">
                    <div className="card mt-3 shadow border-0 text-white" style={{ backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 46.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(${movieDetails?.bgimg})` ,backgroundSize:"contain"}}>
                    <div className="card-body">
                      <h5 className="card-title fw-bold"><span className='text-danger rounded'>┃</span>{theater.name} </h5>
                      <p className="card-text text-white fst-italic" style={{ color: "#0000008A" }}>Show Timings:</p>
                      {theater?.shows.filter(show => {
    const dayAfterTomorrowDate = new Date();
    dayAfterTomorrowDate.setDate(dayAfterTomorrowDate.getDate() + 2); // Set to the day after tomorrow
    const showDayAfterTomorrowDateTime = new Date(`${dayAfterTomorrowDate.toDateString()} ${show.time}`);
    const currentDateTime = new Date();
    return showDayAfterTomorrowDateTime >= currentDateTime;
}).map((show, showIndex) => (
<Link to={`/bookseats/${movieDetails?.id}/${movieDetails?.name}/${theater.id}`}>
                  <button onClick={() => handleShowTimeClick(show.time)}  key={showIndex} className='btn btn-outline-light  me-3 mb-2' style={{ width: "96.3px", fontSize: "12px" }}>
                      {show ? show.time : "No more shows today"} 
                  </button></Link>
))}

                 </div>
                  </div>
                </div>
              ))
            ) : (
              <h1><Spinner animation="border" className='text-center text-danger fs-4' /></h1>
            )}
          </div>
        </div>
      )}


    
    <Footer/>
</>
  )
}

export default Theaters