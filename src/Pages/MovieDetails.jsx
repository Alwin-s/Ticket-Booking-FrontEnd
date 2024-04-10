import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from "../Components/Header"
import Footer from '../Components/Footer';
function MovieDetails() {
    const[movieDetails,setMovieDetails]=useState([]);

    const [movies, setMovies] = useState([]);
    const { id } = useParams();
    window.scrollTo(0,0)
    
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
    }, [movies, id]);


//   const [searchInput, setSearchInput] = useState("");   
//   const handleSearchInputChange = (input) => {
//     setSearchInput(input);
//   };

    return (
        <>
        {/* <Header onSearchInputChange={handleSearchInputChange}/> */}
        <div style={{overflowX:"hidden"}}>
           <div>
            <Link to={"/"} >
            <button className='btn btn-outline-danger  mb-2 me-2' style={{display:"flex",position:"fixed",bottom:"0px",right:"0px"}}>&nbsp;  <i class="fa-solid fa-house mt-1"></i>&nbsp;</button></Link>
           </div>

           <div style={{
    backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 41.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(${movieDetails?.bgimg})`,
    backgroundPosition: "50% 50%"
}}>
                <div style={{width:"100%",height:"470px"}} >

                <div className="row">
                    <button className='btn btn-secondary'>Book Your Tickets</button>
                    <div className="col-3">
                    <div className='ms-5  d-flex' style={{paddingTop:"15px"}}>
            <img src={movieDetails?.image} alt="" width={270} height={395}  style={{borderRadius:"20px"}}/>          
        </div>
                    </div>
                    <div className="col-9 mt-4 text-white" style={{paddingTop:"50px"}}>
                    <h3 className='text-white ms-5 fw-bolder fs-1'>{movieDetails?.name}</h3>
                    <p className='ms-5 fw-bold fst-italic'>( {movieDetails?.language} )</p>
                    <p className='ms-5 '>{movieDetails?.genre}</p>
                    <h4 className='ms-5 fw-bold'><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" alt="" width={40} />&nbsp; {movieDetails?.rating} / 10</h4>
                    
                    <Link to={`/theaters/${movieDetails?.id}/${movieDetails?.name}`}>
    <button className='btn btn-success ms-5 mt-5 w-25'>Book Now</button>
</Link>

                    
                    </div>
                </div>
                

        </div>
            </div>
            
     



<br />










           <h3 className='ms-3 fw-bold mt-2'> <span className='text-danger rounded'>┃</span>About <i class="fa-solid fa-chevron-right text-danger"></i></h3>
          
          <div className='w-75 ms-5' style={{color:"#0000008A"}}>
            {
             movieDetails?.detailView?.about
             
            }
            </div>
            <br />

            <h3 className='ms-3 fw-bold'>  <span className='text-danger rounded'>┃</span>Top Cast <i class="fa-solid fa-chevron-right text-danger"></i></h3>

            <div className="row mt-4 ms-3">
    {movieDetails?.detailView?.cast?.map((castMember, index) => (
        <div key={index} className="col-5">
            <div className='d-flex'>
                <img
                    src={castMember.url}
                    alt={`Cast ${index}`}
                    className='mb-4'
                    style={{ borderRadius: "50%", width: "100px", height: "100px" }}
                />
                <div className='d-flex flex-column align-items-center justify-content-center ms-3'>
                    <p className='mb-0 fw-bold'>{castMember.name}</p>
                    <p className='mb-0 fst-italic' style={{ color: "#0000008A" }}>{castMember.role}</p>
                </div>
            </div>
        </div>
    ))}
</div>









            
           

        </div>
        <Footer/>
        </>
    );
    
}

export default MovieDetails;
