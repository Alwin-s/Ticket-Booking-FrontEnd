import React, { useContext, useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { stateChangeResponseContext } from '../context/ContextShare';

function MovieCards({ searchInput }) {
  const {stateChangeResponse,setStateChangeResponse}=useContext(stateChangeResponseContext)
  const [movies, setMovies] = useState([]);
  const [state, setState] = useState(localStorage.getItem('selectedOption') || 'Kochi'); // Set default state to 'Kochi' if selectedOption is not found

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (!stateChangeResponse) {
          response = await axios.get(`/movies/${state}`);
        } else {
          response = await axios.get('/data.json');
        }
        setMovies(response.data.movies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [state,stateChangeResponse]); // Update when the state (selected seats) changes

  // Filter movies based on search input
  const filteredMovies = movies.filter(movie =>
    movie.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="d-flex mb-5 flex-wrap justify-content-evenly" style={{ overflowX: "hidden", padding: "0 40px" }}>
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => {
          const isSelected = movie.selectedOptions?.includes(stateChangeResponse); 
          return isSelected ? (
            <div key={movie.id} className="col-lg-3 col-md-6 mb-2">
              <Card style={{ width: '15rem' }} className="border-0">
                <Link to={`/moviedetails/${movie.id}`} id='top'>
                  <Card.Img className='movieimg' style={{ cursor: 'pointer', borderRadius: '15px' }} variant="top" src={movie.image} height={356} />
                </Link>
                <Card.Body>
                  <Card.Title className="fw-bold">{movie.name}</Card.Title>
                  <p>
                    <i className="fa-solid fa-star text-danger"></i> {movie.rating} / 10
                    <br />
                    <span>{movie.genre}</span>
                  </p>
                </Card.Body>
              </Card>
            </div>
          ) : null;
        })
      ) : (
        <h1><Spinner animation="border" className='text-center text-danger fs-4' /></h1>
      )}
    </div>
  );
}

export default MovieCards;
