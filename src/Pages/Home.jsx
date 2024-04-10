import React, { useState, useEffect, useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./home.css";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import MovieCards from './MovieCards';
import { stateChangeResponseContext } from '../context/ContextShare';


function Home({ searchInput }) {
  const {stateChangeResponse,setStateChangeResponse}=useContext(stateChangeResponseContext)
  const storedLocation = localStorage.getItem('selectedOption');

  // // State to hold the search input value
  // const [searchInput, setSearchInput] = useState("");

  // // Function to handle search input change
  // const handleSearchInputChange = (input) => {
  //   setSearchInput(input);
  // };

  return (
    <>
      {/* <Header onSearchInputChange={handleSearchInputChange} />  */}
      <Carousel className='mt-' >
        <Carousel.Item interval={1500}>
          <img src="https://wallpapercave.com/wp/wp8872767.jpg" alt="" height={400} width={"100%"} style={{objectFit:"cover"}}/>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img src="https://www.bhmpics.com/downloads/south-indian-movies-banner-Wallpapers/40.1618134774_screenshot_20210411-152236_chrome.jpg" 
          height={400} width={"100%"} style={{objectFit:"cover"}} alt="" />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img src="https://i0.wp.com/thecinemafiles.com/wp-content/uploads/2023/06/TheFlash_Banner.jpg?fit=1500%2C500&ssl=1" alt="" height={400} width={"100%"}  style={{objectFit:"cover"}}/>
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
          <img src="https://assets-in.bmscdn.com/discovery-catalog/events/et00341470-etzxfnvwbp-landscape.jpg" 
          height={400} width={"100%"} style={{objectFit:"cover"}} alt="" />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <br />
      {
        storedLocation ? (
          <>
            <h3 className='fw-bolder ms-5'><span className='text-danger rounded'>┃</span>Top Movies in {storedLocation}<span className='text-danger rounded'>┃</span></h3>
          </>
        ) : (
          <h3 className='fw-bolder ms-5'><span className='text-danger rounded'>┃</span>Top Movies in Kochi<span className='text-danger rounded'>┃</span></h3>
        )
      }
      <br />
      {/* Pass the search input value to MovieCards component */}
      <MovieCards searchInput={searchInput} />
      <Footer/>
    </>
  );
}

export default Home;
