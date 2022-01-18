import axios from 'axios'

const server = axios.create({
    baseURL : 'http://localhost:5000' , 
    withCredentials : true, 
    credentials : 'include'
})

export default server