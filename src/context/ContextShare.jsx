import { createContext, useState } from "react";

export const editUserResponseContext=createContext()
export const cancelTicketResponseContext=createContext()
export const dataResponseContext=createContext()
export const stateChangeResponseContext=createContext()

function ContextShare({children}){
    const [editUserResponse,setEditUserResponse]=useState({})
    const [cancelTicketResponse,setCancelTicketResponse]=useState({})
    const [dataResponse,setDataResponse]=useState({})
    const [stateChangeResponse,setStateChangeResponse]=useState({})
    return(
        <>
        <editUserResponseContext.Provider value={{editUserResponse,setEditUserResponse}}>
            <cancelTicketResponseContext.Provider  value={{cancelTicketResponse,setCancelTicketResponse}}>
                <dataResponseContext.Provider value={{dataResponse,setDataResponse}}>
                    <stateChangeResponseContext.Provider value={{stateChangeResponse,setStateChangeResponse}}>
                    {children}
                    </stateChangeResponseContext.Provider>
                </dataResponseContext.Provider>
            </cancelTicketResponseContext.Provider>
        </editUserResponseContext.Provider>
        </>
    )
}

export default ContextShare