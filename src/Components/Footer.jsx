import React from 'react'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';


function Footer() {
  return (
    <div>
          <MDBFooter bgColor='' className='text-center text-lg-start text-dark' style={{backgroundColor:"#EFEFEF"}}>
  
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-2'>
          <MDBRow className='mt-3' style={{paddingTop:"30px"}}>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className=' fw- mb-4'>
                <MDBIcon  className="me-3" />
               <span style={{color:"red"}}>About</span>
              </h6>
              <div style={{fontSize:"14px",lineHeight:"12px"}}>
              <p>
                 Terms and conditions</p> 
               <p>Privacy policy</p>  
               <p>Purchase policy</p>     
              
              </div>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
            <h6 className='text-danger'>Choose Language</h6>
            
            <div className='mt-3' style={{fontSize:"14px",lineHeight:"12px"}}>
              <p className='fw-bold'>English</p>
              <p>Malayalam</p>
              <p>Hindi</p>
              <p>Tamil</p>
            </div>

            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-danger'>Apps</h6>
              
              <img className='mt-2' src="https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png" alt="" width={135} height={40} />
              
              <img className='mt-2' src="https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png" alt="" width={135} height={40}  />
             <br />
             <br />
             <h6 className='text-danger'>Follow Us On</h6>
             <img src="https://pngimg.com/d/facebook_logos_PNG19754.png" alt=""  width={43}/>
             <img className='ms-1' src="https://seeklogo.com/images/T/twitter-x-logo-0339F999CF-seeklogo.com.png?v=638264860180000000" alt=""  width={33}/>
             <img src="https://png.pngtree.com/png-vector/20230225/ourmid/pngtree-three-dimensional-instagram-icon-png-image_6618437.png" alt=""  width={35} className='ms-2'/>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-danger mb-2'>
              Contact Us             
                </h6>
                <div style={{fontSize:"13px",lineHeight:"24px"}}>
                  <p>Tic Booker Private Limited <br />
                  42, Dr Ranga Road, Mylapore, <br />
                  Chennai 678704, India <br />
                  +91 97546348343</p>
                </div>
             <div style={{display:"flex"}}>
              <input type="text" name="" id="" placeholder='Enter Your Email Id:' style={{padding:"8px",fontSize:"14px",height:"35px"}}/>
              <button className='ms-2 border-0 rounded text-white' style={{backgroundColor:"red",padding:"8px",height:"35px",paddingBottom:"18px"}}>Subscribe</button>
             </div>

            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        Copyright  © 2024 : Tic Booker . Private Limited      

      </div>
    </MDBFooter>


    </div>
  )
}

export default Footer