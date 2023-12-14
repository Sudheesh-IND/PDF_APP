

//importing axios
import axios from 'axios'

//variable for base url
const base_url='http://localhost:5000'

const JWT=localStorage.getItem('tok_en_PDF_APP_gsdgghhtew864466atua56ry546t41hfauh')

//api call for user user register

export const registerApi=async(name,email,password)=>{
    //inside try catch block
    try {

        //making these variables into an object
        const body={name,email,password}
        console.log(body)
        //callig the api using axios post method
        const response=await axios.post(`${base_url}/register`,body)
        return response
        
    } catch (error) {
        return error
    }
}

//api call for login
export const login=async(email,password)=>{
    //inside try catch block
    try {

       //making these variables into an object
       const body={email,password}
        
       //callig the api using axios post method
       const response=await axios.post(`${base_url}/userlogin`,body)
       return response 
        
    } catch (error) {
        return error
    }
}

//api call to get userDetails with respect to theuser details
export const getdetails=async(userId)=>{
    //inside try catch block
    try {
        
        //axios request
        const response=await axios.get(`${base_url}/getdetails/${userId}`,{
            headers:{
                Authorization:JWT
            }
        })
        return response
        
    } catch (error) {
        return error
    }
}

//api call to upload pdf
export const uploadpdf=async(userId,formData,title)=>{
     //inside try catch block
     try {

         
        //callig the api using axios post method
        const response=await axios.post(`${base_url}/uploadpdf/${userId}/${title}`,formData,{
            headers:{
                Authorization:JWT
            }
        })
        return response 
         
     } catch (error) {
         return error
     }
}

//api call to get all pdf data
export const getPdfDetails=async(userId)=>{
    //inside try catch block

    try {
        
        //axios request
        const response=await axios.get(`${base_url}/getpdf/${userId}`,{
            headers:{
                Authorization: JWT
            }
        })
        return response
        
    } catch (error) {
        return error
    }
}

//api call to extract pdf data
export const extractPdf=async(filename,pdfPages)=>{
    try {

        //making these variables into an object
        const body={filename,pdfPages}
         
        //callig the api using axios post method
        const response=await axios.post(`${base_url}/extract`,body,{
            headers:{
                Authorization: JWT
            }
        })
        return response 
         
     } catch (error) {
         return error
     }
}

//pdf deleting api call
export const deletPdf=async(filename)=>{
     //inside try catch block

     try {
        
        //axios request
        const response=await axios.get(`${base_url}/delete/${filename}`,{
            headers:{
                Authorization: JWT
            }
        })
        return response
        
    } catch (error) {
        return error
    }
}