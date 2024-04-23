import http from "http"
import {SERVER2_PORT} from "./constants"

const server1=http.createServer((request, response)=>{

response.writeHead(200,{'content-Type':'text/plain'})
response.end(' This response is from server-2\n')
})

server1.listen(SERVER2_PORT,()=>{
    console.log(`Server-2 is running at https://localhost:${SERVER2_PORT}\n`)
})