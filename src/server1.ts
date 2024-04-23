import http from "http"
import {SERVER1_PORT} from "./constants"

// Create server 
const server1=http.createServer((request, response)=>{
response.writeHead(200,{'content-Type':'text/plain'})
response.end(' This response is from server-1\n')
})

// Listen for the request
server1.listen(SERVER1_PORT,()=>{
    console.log(`Server-1 is running at http://localhost:${SERVER1_PORT}\n`)
})