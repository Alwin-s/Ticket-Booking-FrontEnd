import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { deleteBookedSeatsAPI, userBookedDetailsAPI } from '../services/allAPI';
import { cancelTicketResponseContext, dataResponseContext } from '../context/ContextShare';
import { BASE_URL } from '../services/baseurl';

function UserDataCards() {
    window.scrollTo(0, 0)
    const { cancelTicketResponse, setCancelTicketResponse } = useContext(cancelTicketResponseContext);
    const { dataResponse, setDataResponse } = useContext(dataResponseContext)
    const [dbBooked, setDbBooked] = useState([]);
    const [movies, setMovies] = useState([]);
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate()

    const getUserSeats = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
            const result = await userBookedDetailsAPI(reqHeader)
            if (result.status === 200) {
                setDbBooked(result.data)
            } else {
                console.log(result);
                console.log(result.response);
            }
        }
    }
    useEffect(() => {
        getUserSeats()
    }, [cancelTicketResponse, dataResponse])


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
        const storedUser = sessionStorage.getItem("existingUser");
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        }
    }, []);

    const formatDate = (dateString) => {
        const options = { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    };

    const groupUserDataByDate = () => {
        const groupedData = {};
        dbBooked.forEach(seat => {
            if (!groupedData[seat.date]) {
                groupedData[seat.date] = [];
            }
            groupedData[seat.date].push(seat);
        });
        return groupedData;
    };

    const sortedDates = Object.keys(groupUserDataByDate()).sort((a, b) => new Date(b) - new Date(a));
    const username = userData?.username;

    const handleDelete = async (id) => {
        swal({
            title: "Are you sure?", text: "Once deleted, you will not be able to recover this ticket!", icon: "warning", buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const token = sessionStorage.getItem('token');
                    const reqHeader = {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    };
                    try {
                        const result = await deleteBookedSeatsAPI(id, reqHeader);
                        if (result.status === 200) {
                            setCancelTicketResponse(result.data)
                            swal("Ticket Canceled");
                        } else {
                            alert(result.response.data);
                        }
                    } catch (error) {
                        console.error("Error while canceling ticket:", error);
                        alert("An error occurred while canceling the ticket. Please try again later.");
                    }
                }
            });
    };

    return (
        <>
            {/* <Header /> */}
            <div className='d-flex p-1 '>
                <img   src={dataResponse && dataResponse.profilePic ? `${BASE_URL}/uploads/${dataResponse.profilePic}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}  className='ms-3'
                    alt="" style={{ objectFit: "cover", borderRadius: "50%", width: "50px", height: "50px" }} />
                <h4 className='ms-2 mt-2 mb-4'> <span className='fw-bolder text-danger'>{dataResponse?.username}</span> </h4>
            </div>
            <div className='d-flex flex-column overflow-auto' style={{ maxWidth: '100%', overflowX: 'auto', marginBottom: "100px" }}>
                {sortedDates.length === 0 ? (
                    <div className="mt-2 text-center">
                        <p className="ms-4 text-center fw-bold mb-5 mt-3  ">You haven't booked any tickets yet !</p>
                        <Link to={"/"}><button className='btn btn-danger login ' style={{ width: "100px" }}>Book Now</button></Link>
                    </div>
                ) : (
                    sortedDates.map(date => {
                        // Extracting only the date part without the time
                        const currentDate = new Date();
                        const formattedDate = new Date(date);
                        const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                        const formattedDateWithoutTime = new Date(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate());
                
                        return (
                            <div key={date} className="mt-2">
                                <h4 className={`text-start ms-4 fw-bold mb-2 mt-2`}>
                                    <i className="fa-solid fa-calendar-days" style={{ color: "#666666" }}></i> {date}
                                </h4>
                                <div className="d-flex p-3" style={{ overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'auto' }}>
                                    {groupUserDataByDate()[date].map((seat, index) => {
                                        const matchingMovie = movies.find(movie => movie.name === seat.movieName);
                                        return (
                                            <div key={index} className="ticket card ms-3" style={{ minWidth: "27rem", maxWidth: "27rem" }}>
                                                  <div className="card-body" style={formattedDateWithoutTime < currentDateWithoutTime ? { backgroundColor: '#eaeaea', color: '' } :{}}>
                                                    <div className="row">
                                                        <div className="col-4"><img width={120} height={165} src={matchingMovie ? matchingMovie.image : 'placeholder.jpg'} alt={seat.movieName} className="movie-image rounded" /></div>
                                                        <div className="col-8">
                                                            <p className="card-title fw-bold">{seat.movieName} (U/A)</p>
                                                            <p className='mt-3' style={{ fontSize: "14px", color: "#666666" }}><i className="fa-solid fa-film"></i>  {seat.theaterName}</p>
                                                            <p style={{ fontSize: "14px", color: "#666666" }}>{seat.date} | <span className='fw-bolder text-dark'> {seat.theaterTime}</span></p>
                                                            <p className='fw-bold'> {seat.bookedSeats.length} <span className='fw-light' style={{ fontSize: "14px", color: "#666666" }}>Ticket(s)</span> </p>
                                                            <p className='fw-bold '>Seat No(s): <span className='fs-5'>{seat.bookedSeats.join(', ')}</span></p>
                                                            <div className='d-flex'>
                                                                <Link to={`/detail/${encodeURIComponent(seat.movieName)}/${encodeURIComponent(seat.theaterName)}/${encodeURIComponent(seat.date)}/${encodeURIComponent(seat.theaterTime)}/${encodeURIComponent(seat.bookedSeats)}/${encodeURIComponent(matchingMovie?.image)}`} className="text-decoration-none"> <p className='mb-0 fw-bolder text-primary'>View Ticket</p> </Link>
                                                                <button onClick={()=>handleDelete(seat._id)} className='login  bg-danger ms-5' style={formattedDateWithoutTime < currentDateWithoutTime ? {display:"none"} :{width:"100px"}}>Cancel Ticket</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
            <Footer />
        </>
    );
}

export default UserDataCards;
