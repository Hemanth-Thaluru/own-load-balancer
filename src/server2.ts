import http from "http"
import {SERVER2_PORT} from "./constants"

// Create server 
const server1=http.createServer((request, response)=>{
response.writeHead(200,{'Content-Type':'text/plain'})
response.end(' This response is from server-2\n')
})

// Listen for the request !
server1.listen(SERVER2_PORT,()=>{
    console.log(`Server-2 is running at http://localhost:${SERVER2_PORT}\n`)
})