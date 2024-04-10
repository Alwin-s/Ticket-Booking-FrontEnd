import React, { useContext, useEffect, useRef, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate , useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import swal from 'sweetalert';
import { BASE_URL } from '../services/baseurl';
import Modal from 'react-bootstrap/Modal';
import { allUserProfileDetails, editUsersAPI } from '../services/allAPI';
import { dataResponseContext, editUserResponseContext, stateChangeResponseContext } from '../context/ContextShare';


function Header({ onSearchInputChange }) {
    const {editUserResponse,setEditUserResponse}=useContext(editUserResponseContext)
    const {dataResponse,setDataResponse}=useContext(dataResponseContext)
    const {stateChangeResponse,setStateChangeResponse}=useContext(stateChangeResponseContext)
    const[modalOpen,setModalOpen]=useState(false)
    const [show, setShow] = useState(false);
    const [selectedOption, setSelectedOption] = useState(localStorage.getItem('selectedOption') || 'Kochi');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const modalClose = () =>{ 
        setModalOpen(false)
        setUserData({
            id:profileDetails._id, username:profileDetails.username,email:profileDetails.email,profilePic:""
        })
        setPreview("")
    }


    const modalopen = () => setModalOpen(true);

    const handleSelectChange = (event) => {
        window.scrollTo(0, 440);
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        localStorage.setItem('selectedOption', selectedValue);
        setStateChangeResponse(selectedValue)
        if (window.location.pathname !== "/") {
            navigate('/');
        } 
    };
    
    
    useEffect(() => {
        if (!localStorage.getItem('selectedOption')) {
            localStorage.setItem('selectedOption', 'Kochi');
            setStateChangeResponse("Kochi")
        }else{
            setStateChangeResponse(selectedOption); 
        }
    }, []);

    const [loggedIn,setLoggedIn]=useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setLoggedIn(true)
        }else{
            setLoggedIn(false)
        }
    },[])

    const userData = JSON.parse(sessionStorage.getItem("existingUser"));

    const navigate=useNavigate()
    const handleLogOut = () => {
        swal({
            title: " Sure you want to log out?",
            text: "You will be logged out of your account.",
            icon: "warning",
            buttons: ["Cancel", "Log Out"],
            dangerMode: true,
        })
        .then((willLogOut) => {
            if (willLogOut) {
                sessionStorage.removeItem("existingUser");
                sessionStorage.removeItem("token");
                navigate("/signin");
            } 
            
        });
    };
    
    const [searchInput, setSearchInput] = useState("");
    const inputRef = useRef(null);
    const location = useLocation();

    const handleSearchInputChange = (event) => {
        const value = event.target.value;
        setSearchInput(value);
        onSearchInputChange(value);
        window.scrollTo(0, 440);
    };

    const handleKeyPress = (event) => {
        navigate('/');
    };

    useEffect(() => {
        if (location.pathname !== "/") {
            setSearchInput('');
            onSearchInputChange('');
        }
    }, [location, onSearchInputChange]);


    //all UserProfileDetails
    const [userProfile,setUserProfile]=useState([])
    const [profileDetails,setProfileDetails]=useState([])
    const userProfileDetails = async()=>{
        const result = await allUserProfileDetails()
        if(result.status===200){
            setUserProfile(result.data)
        }   else{
            console.log(result);
            console.log(result.response);
        }
    }
    useEffect(()=>{
        userProfileDetails()
    },[editUserResponse,stateChangeResponse])
    console.log(stateChangeResponse);
    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("existingUser"));
        if (userData && userProfile.length > 0) {
            const userDetails = userProfile.find(user => user._id === userData._id);
            if (userDetails) {
                setProfileDetails(userDetails);
                setDataResponse(userDetails)
            }
        }
    }, [userData, userProfile ,dataResponse]);
    


    useEffect(() => {
        if (profileDetails) {
          setUserData({
            id: profileDetails._id,
            username: profileDetails.username,
            email: profileDetails.email,
          });
        }
      }, [profileDetails]);
      

    const [userDataa,setUserData]=useState({
        id:profileDetails?._id, username:profileDetails?.username,email:profileDetails?.email,profilePic:""
      });
      const [preview,setPreview]=useState('')

      useEffect(()=>{
      if(userDataa.profilePic){
        setPreview(URL.createObjectURL(userDataa.profilePic))
      }
      },[userDataa.profilePic])


      const handleUpdate = async()=>{
        const {id,username,email,profilePic}=userDataa
        if(!username || !email ){
            alert("Please fill the missing fields !")
        }else{
            const reqBody= new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            preview?reqBody.append("profilePic",profilePic): reqBody.append("profilePic",profileDetails?.profilePic)
            if(preview){        
            const reqHeader={
              'Content-Type': 'multipart/form-data'
            }
            //api calll
            const result = await editUsersAPI(id,reqBody,reqHeader)
            if(result.status===200){
                setEditUserResponse(result.data)
                swal("Profile Updated");
                modalClose()
                handleClose()
            }else{
                console.log(result);
                console.log(result.response.data);
            }

            }else{
                const reqHeader={
                    'Content-Type': 'application/json'
                  }
                  //api call
                  const result = await editUsersAPI(id,reqBody,reqHeader)
                  if(result.status===200){
                    setEditUserResponse(result.data)
                    swal("Profile Updated");
                    modalClose()
                    handleClose()
                  }else{
                      console.log(result);
                      console.log(result.response.data);
                  }
            }
        }
      }


    return (
        <>
         <Navbar expand="lg" className="bg-white p-4" style={{ position: "sticky", top: "0px", zIndex: "1", height: "65px" }}>
    <>
        <Navbar.Brand href="#home">
            <Link to={"/"} style={{ color: "black", fontWeight: "", textDecoration: "none" }}>
                <img src="https://www.freeiconspng.com/thumbs/hd-tickets/download-ticket-ticket-free-entertainment-icon-orange-ticket-design-0.png" alt="" width={50} height={45} />
                <span className='fs-3' style={{ fontFamily: "Bangers, system-ui", marginLeft: "10px" }}>Tic-Booker</span>
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <div className="input-group ms-5" style={{ width: "550px", marginRight: "auto" }}>
                <span className="input-group-text rounded-0 border-right-0">
                    <i class="fa-solid fa-location-dot text-danger"></i>  &nbsp;   &nbsp;
                    <select name="state" id="state" className='border-0' style={{ outline: "none" }} value={selectedOption} onChange={handleSelectChange}>
                        <option value="Kochi">KOCHI</option>
                        <option value="Palakkad">PALAKKAD</option>
                        <option value="Thrissur">THRISSUR</option>
                        <option value="Calicut">CALICUT</option>
                        <option value="Kannur">KANNUR</option>
                    </select>
                </span>
                <span className="input-group-text rounded-0" style={{ borderRight: "0px" }}>
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input type="text" onKeyDown={handleKeyPress} ref={inputRef} onKeyPress={handleKeyPress} value={searchInput} onChange={handleSearchInputChange} className="form-control rounded-0 fs-6 shadow-none" style={{ outline: 'none', borderLeft: "0px", borderColor: " lightgrey" }} placeholder="Search for Movies, Events, and More.." />
            </div>
            <Nav className="ms-auto" style={{ fontFamily: "unset" ,display:"flex",alignItems:"center"}}>
                {loggedIn && (
                    <>
                        <Link className='me-4' to={"/userdatacards"} style={{ textDecoration: "none", marginTop: "15px", marginRight: "15px" }}>
                            <p style={{ fontSize: "13px", cursor: "pointer", color: "black" }}>
                                <i class="fa-solid fa-ticket"></i> Booked Tickets
                            </p>
                        </Link>
                        <p onClick={handleShow} style={{ fontSize: "13px", cursor: "pointer", marginTop: "15px", marginRight: "15px" }}>
                            <img   src={dataResponse && dataResponse.profilePic ? `${BASE_URL}/uploads/${dataResponse.profilePic}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} className='' alt="" style={{ objectFit: "cover", borderRadius: "50%", width: "30px", height: "30px" }} /> <span className='fw-bolder'> {profileDetails?.username}</span>
                        </p>
                    </>
                )}
                {loggedIn ?
                    <Nav.Link href="">
                        <button onClick={handleLogOut} className='login btn btn-danger'>Log out</button>
                    </Nav.Link>
                    :
                    <Nav.Link href="" className='mt-1 me-2'>
                        <Link to={"/signin"}><button className='login'>Sign in</button></Link>
                    </Nav.Link>}


                            <Button onClick={handleShow} className=" bg-white border-0">
                                <span className='navbar-toggler-icon'></span>
                            </Button>
                            <Offcanvas show={show} onHide={handleClose}>
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title className='fw-bolder'>HEY !</Offcanvas.Title>
                                    
                                </Offcanvas.Header>
                                <Offcanvas.Body className='text-center'>
                                
                              
                                {loggedIn ? (
  <>
    <img
      src={profileDetails && profileDetails.profilePic ? `${BASE_URL}/uploads/${profileDetails.profilePic}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}alt=""style={{objectFit: "cover",borderRadius: "50%",width: "100px",height: "100px"}}/>
    <div className='d-flex justify-content-center'>
      <p style={{fontSize:"18px"}} className='mt-3 me-2 mb-0 ms-5 fw-bold'>
         {profileDetails?.username}
      </p>
      <button onClick={modalopen} className='outline-0 border-0 btn'><i className="fa-solid fa-pen-to-square text-success"></i></button>
    </div>
    <p style={{fontSize:"15px"}} className='mt-2 me-3 '> Email: {profileDetails?.email}</p>

 <div style={{fontSize:"13.6px",cursor:"pointer"}}>
<div onClick={handleClose} className='d-start mt-2 text-start' style={{width:"100%",height:"50px",backgroundColor:"lightgrey",borderBottom:"1px solid grey"}}>
<Link to={"/"} style={{textDecoration:"none"}}><p className='p-3 text-dark'><i class="fa-solid fa-house"></i> Home</p></Link>
</div>
<div onClick={handleClose} className='d-start mt-1 text-start' style={{width:"100%",height:"50px",backgroundColor:"lightgrey",borderBottom:"1px solid grey"}}>
<Link to={'/userdatacards'} style={{textDecoration:"none"}}><p className='p-3 text-dark'><i class="fa-solid fa-ticket"></i> Booked Tickets</p></Link>
</div>
<div onClick={modalopen} className='d-start mt-1 text-start' style={{width:"100%",height:"50px",backgroundColor:"lightgrey",borderBottom:"1px solid grey"}}>
<p className='p-3'><i class="fa-solid fa-pen"></i> Edit Profile</p>
</div>
<div onClick={handleLogOut} className='d-start mt-1 text-start' style={{width:"100%",height:"50px",backgroundColor:"lightgrey",borderBottom:"1px solid grey"}}>
<p className='p-3'><i class="fa-solid fa-right-from-bracket"></i> Log Out</p>
</div>
</div>

  </>
) : (<>
      <p>Welcome to Tic Booker </p>
  <Link to={"/signin"}>
    <button className='login'>Sign in</button>
  </Link>
  </>
)}


                                </Offcanvas.Body>
                            </Offcanvas>



                        </Nav>
                    </Navbar.Collapse>
                </>
            </Navbar>
            <div className='text-align-center ms-4  d-none d-lg-flex' style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                <div>
                    <h6 style={{ fontSize: "13px" }}> Any Movies</h6>
                </div>
                <div className='ms-3'>
                    <h6 style={{ fontSize: "13px" }}> Any Theater</h6>
                </div>
                <div className='ms-3'>
                    <h6 style={{ fontSize: "13px" }}> Any Date</h6>
                </div>
                <div className='ms-3'>
                    <h6 style={{ fontSize: "13px" }}> Any Time</h6>
                </div>
                <div className='ms-auto '>
                    <h6 style={{ fontSize: "13px" }}>Great Offers</h6>
                </div>
                <div className='ms-3 me-4' >
                    <h6 style={{ fontSize: "13px" }} className='me-1'> Gift Cards</h6>
                </div>
                <div className='me-5' >
                   
                </div>
            </div>

    
<Modal style={{marginLeft:"-23%"}} show={modalOpen} onHide={modalClose}>
       <Modal.Header onClick={modalClose} closeButton style={{borderBottom:"none"}}>
        </Modal.Header>
        <div className='text-center' style={{marginTop:"-5%"}}>
            <h5 className='fw-bolder'>Edit Profile</h5>
          </div>
        <Modal.Body className='mt-2 text-center align-items-center justify-content-center'>
            <label style={{cursor:"pointer"}}>
                <input type="file" style={{display:"none"}} onChange={e=>setUserData({...userDataa,profilePic:e.target.files[0]})} />
                <img  src={preview ? preview : (profileDetails?.profilePic ? `${BASE_URL}/uploads/${profileDetails?.profilePic}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png")}
      alt=""style={{objectFit: "cover",borderRadius: "50%",width: "100px",height: "100px"}}/>
      <div className='ms-5' style={{marginTop:"-25%"}}>
      <i class="fa-solid fa-camera ms-4  p-2" style={{borderRadius:"50%",backgroundColor:"lightgreen"}}></i>
      </div>
            </label>
       
      <br />
      <div className='mt-2' style={{paddingLeft:"30px",paddingRight:"30px"}}>
        <p className='text-start  mb-0' style={{fontSize:"13.5px",color:"#666666"}}>Username :   <i class="fa-solid fa-pen fa-sm"></i></p>
      <input  onChange={e=>setUserData({...userDataa,username:e.target.value})} type="text" value={userDataa?.username} className='ms- inz form-control' placeholder='UserName' />
      <p className='text-start mb-0' style={{fontSize:"13.5px",color:"#666666"}}>Email :  <i class="fa-solid fa-pen fa-sm"></i></p>
      <input onChange={e=>setUserData({...userDataa,email:e.target.value})} type="text" value={userDataa?.email} className=' inz form-control' placeholder='Email' />
      </div>
        </Modal.Body>
        <div className='p-3 mb-3 d-flex align-items-center justify-content-center'>
          <Button onClick={handleUpdate} className='w-75' variant="danger">Update</Button>
        </div>  
      </Modal>


        </>
    );
}

export default Header;

