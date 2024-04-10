import { BASE_URL } from "./baseurl"
import { commonAPI } from "./commonAPI"


//register 
export const registerAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/user/register`,reqBody,reqHeader)
}

//Login Api
export const loginAPI=async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"") 
}

//addProjects
export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/projects/add`,reqBody,reqHeader)
}

//get all bookeddetails
export const allBookedDetailsAPI=async()=>{
    return await commonAPI("GET",`${BASE_URL}/user/all`,"","")
}

//get user bookeddetails
export const userBookedDetailsAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/user/allprojects`,"",reqHeader)
}

//delete Ticket //cancle ticket
export const deleteBookedSeatsAPI = async (projectId, reqHeader) => {
    return await commonAPI("DELETE", `${BASE_URL}/projects/remove/${projectId}`, {}, reqHeader);
};

//edit user details
export const editUsersAPI=async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${BASE_URL}/user/edit/${id}`,reqBody,reqHeader)
}

//get all user Profle details
export const allUserProfileDetails=async()=>{
    return await commonAPI("GET",`${BASE_URL}/user/allprofile`,"","")
}