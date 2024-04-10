import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import MovieDetails from "./Pages/MovieDetails";
import Theaters from "./Pages/Theaters";
import BookSeats from "./Pages/BookSeats";
import TicketDownload from "./Pages/TicketDownload";
import UserDataCards from "./Pages/UserDataCards";
import Detail from "./Pages/Detail";
import Header from "./Components/Header";
import { useState } from "react";

function App() {
    const [searchInput, setSearchInput] = useState("");
    const handleSearchInputChange = (input) => {
      setSearchInput(input);
    };
    const location = useLocation();
    const isExcludedPage = location.pathname.startsWith("/bookseats") || location.pathname.startsWith("/ticketdownload") || location.pathname.startsWith('/signin') || location.pathname.startsWith("/detail") ;

    return (
        <div className="App">
          {!isExcludedPage && <Header onSearchInputChange={handleSearchInputChange} />}
          <Routes>
            <Route path="/" element={<Home searchInput={searchInput} />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/moviedetails/:id" element={<MovieDetails />} />
            <Route path="/theaters/:id/:name" element={<Theaters />} />
            <Route path="/bookseats/:id/:name/:theaterId" element={<BookSeats />} />
            <Route path="/ticketdownload/:id/:name/:theaterId" element={<TicketDownload />} />
            <Route path="/userdatacards" element={<UserDataCards />} />
            <Route path="/detail/:movieName/:name/:date/:theaterTime/:bookedSeats/:imageUrl" element={<Detail />} />
          </Routes>
        </div>
    );
}

export default App;
