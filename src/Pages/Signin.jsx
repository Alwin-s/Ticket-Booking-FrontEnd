import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAPI, registerAPI } from '../services/allAPI';
import swal from 'sweetalert';



function Login() {
  const [isActive, setIsActive] = useState(false);
  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleSignInClick = () => {
    setIsActive(false);
  };
  const navigate=useNavigate()
  const [userData,setUserData]=useState({
    username:"",email:"",password:"",profilePic:""
  });

  const [preview,setPreview]=useState('')
  useEffect(()=>{
  if(userData.profilePic){
    setPreview(URL.createObjectURL(userData.profilePic))
  }
  },[userData.profilePic])




  //register APi
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, profilePic } = userData;
    if (!username || !email || !password) {
        alert("Please fill in the missing fields.");
    } else {
        const reqBody = new FormData();
        reqBody.append("username", username);
        reqBody.append("email", email);
        reqBody.append("password", password);
        if (profilePic) {
            reqBody.append("profilePic", profilePic);
        }
        const reqHeader = {
            'Content-Type': 'multipart/form-data'
        };
        try {
            const result = await registerAPI(reqBody, reqHeader);
            if (result.status === 200) {
                swal(`${result.data.username}`, "Has Registered successfully.", "success").then(() => {
                    setUserData({ username: "", email: "", password: "" });
                    setIsActive(false);
                });
            } else {
                console.log(result);
                console.log(result.response.data);
            }
        } catch (error) {
            console.error("Error while registering:", error);
            alert("An error occurred while registering. Please try again later.");
        }
    }
};




  
  //Login Api
  const handleLoign = async (e) => {
    e.preventDefault();
    const { email, password } = userData;
    if (!email || !password) {
      alert("Please fill the missing fields..");
    } else {
      const result = await loginAPI(userData);
      if (result.status === 200) {
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.exisitingUser));
        sessionStorage.setItem("token", result.data.token);
        swal("Welcome!", "It's time to grab your seats!", "success").then(() => {
          setUserData({
            email: "",
            password: ""
          });
          navigate("/"); 
        });
      } else {
        alert(result.response.data);
      }
    }
  };
  


  return (
    <>
    <style>
    {`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Montserrat', sans-serif;
    }

    body{
      background-color: #c96ff;
      background: linear-gradient(to right, #e2e2e2, #ffffff);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 100vh;
    }

    .container{
      background-color: #fff;
      border-radius: 30px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
      position: relative;
      overflow: hidden;
      width: 768px;
      max-width: 100%;
      min-height: 480px;
    }

    .container p{
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0.3px;
      margin: 20px 0;
    }

    .container span{
      font-size: 12px;
    }

    .container a{
      color: #333;
      font-size: 13px;
      text-decoration: none;
      margin: 15px 0 10px;
    }

    .container button{
      background-color: #0F3443;
      color: #fff;
      font-size: 12px;
      padding: 10px 45px;
      border: 1px solid transparent;
      border-radius: 8px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-top: 10px;
      cursor: pointer;
    }

    .container button.hidden{
      background-color: transparent;
      border-color: #fff;
    }

    .container form{
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 40px;
      height: 100%;
    }

    .container input{
      background-color: #eee;
      border: none;
      margin: 8px 0;
      padding: 10px 15px;
      font-size: 13px;
      border-radius: 8px;
      width: 100%;
      outline: none;
    }

    .form-container{
      position: absolute;
      top: 0;
      height: 100%;
      transition: all 0.6s ease-in-out;
    }

    .sign-in{
      left: 0;
      width: 50%;
      z-index: 2;
    }

    .container.active .sign-in{
      transform: translateX(100%);
    }

    .sign-up{
      left: 0;
      width: 50%;
      opacity: 0;
      z-index: 1;
    }

    .container.active .sign-up{
      transform: translateX(100%);
      opacity: 1;
      z-index: 5;
      animation: move 0.6s;
    }

    @keyframes move{
      0%, 49.99%{
          opacity: 0;
          z-index: 1;
      }
      50%, 100%{
          opacity: 1;
          z-index: 5;
      }
    }

    .social-icons{
      margin: 20px 0;
    }

    .social-icons a{
      border: 1px solid #ccc;
      border-radius: 20%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin: 0 3px;
      width: 40px;
      height: 40px;
    }

    .toggle-container{
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: all 0.6s ease-in-out;
      border-radius: 150px 0 0 100px;
      z-index: 1000;
    }

    .container.active .toggle-container{
      transform: translateX(-100%);
      border-radius: 0 150px 100px 0;
    }

    .toggle{
      background-color: #512da8;
      height: 100%;
      background: linear-gradient(to right,  #3E5151, #0F3443 );
      color: #fff;
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      transform: translateX(0);
      transition: all 0.6s ease-in-out;
    }

    .container.active .toggle{
      transform: translateX(50%);
    }

    .toggle-panel{
      position: absolute;
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 30px;
      text-align: center;
      top: 0;
      transform: translateX(0);
      transition: all 0.6s ease-in-out;
    }

    .toggle-left{
      transform: translateX(-200%);
    }

    .container.active .toggle-left{
      transform: translateX(0);
    }

    .toggle-right{
      right: 0;
      transform: translateX(0);
    }

    .container.active .toggle-right{
      transform: translateX(200%);
    }
  `}
  </style>

 
  <br />

   <Link to={"/"}>  <p className='ms-4 text-primary' style={{fontSize:"13px",position:"fixed",top:"9%"}}><i class="fa-regular fa-circle-left"></i> Back To Home</p></Link>
    <div className={`container ${isActive ? 'active' : ''}`}>
      <div className="form-container sign-up">
        {/* register */}
        <form  onSubmit={handleRegister}>
          <h2 className='fw-bold' >Create Account</h2>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" value={userData.username}  
          onChange={e=>setUserData({...userData,username:e.target.value})} />
          <input type="text" placeholder="Email"  value={userData.email}
           onChange={e=>setUserData({...userData,email:e.target.value})} />
          <input type="password" className='mb-0' placeholder="Password"  value={userData.password}
           onChange={e=>setUserData({...userData,password:e.target.value})}/>


            <div className='ms-2 mb-2 d-flex align-items-center'>
            <input type="file" onChange={e=>setUserData({...userData,profilePic:e.target.files[0]})} className=' ms-4 d-none' name="" id="file" />
            <label style={{cursor:"pointer"}} htmlFor="file" className='mt-3 mb-0 d-flex'>
             <img src={preview?preview: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} style={{objectFit:"cover",borderRadius:"50px"}} height={47} width={47} alt="" />
              <p className='ms-3 mt-1' style={{ fontSize: "12.5px", color: "#666666" }}>Add an avatar</p>
            </label>
          </div>



          <button type="submit">Register</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form onSubmit={handleLoign}>
          
          <h1 className='fw-bold fs-2 text-dark'> Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
          </div>
          <span>or use your email password</span>
          <input type="text" placeholder="Email"  value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})}/>
          <input type="password" placeholder="Password" value={userData.password}
           onChange={e=>setUserData({...userData,password:e.target.value})}/>
          <a href="">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1 className='fw-bold fs-1'>Welcome!</h1>
            <p>Already Have an Account ?</p>
            <button className="hidden" id="login" onClick={handleSignInClick}>Login</button>
          </div>
          <div className="toggle-panel toggle-right">
            <div >
            <img src="https://www.freeiconspng.com/thumbs/hd-tickets/download-ticket-ticket-free-entertainment-icon-orange-ticket-design-0.png" alt="" width={50} height={45} />
                            &nbsp; <span className='fs-3' style={{ fontFamily: "Bangers, system-ui" }}>Tic-Booker</span>
            </div>
       
            
             <p className='mt-5'> Don't have an Account ? <br />
                Do Register <i class="fa-solid fa-down-long"></i> </p>
            <button className="hidden" id="register" onClick={handleRegisterClick}>Register</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
