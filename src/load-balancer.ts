import http from'http'
import httpProxy from 'http-proxy'
import { SERVER1_PORT, SERVER2_PORT } from './constants'

const servers=[
    `http://localhost:${SERVER1_PORT}`,
    `http://localhost:${SERVER2_PORT}`,
]

let availableServers=[...servers]
let currentServerIdx=0

const balancer= httpProxy.createProxyServer({})

// Check for server response
function serverHealthCheckup(server: string){
    return new Promise((resolve)=>{
        http
        .get(server,(response)=>{
            if (response.statusCode===200){
                resolve(true)
            }else{
                resolve(false)
            }
        })
        .on('error',()=>{
            resolve(false)
        })
    })
}


// Filter Healthy Severs
async function healthChecks(){
    const healthStatus= await Promise.all(servers.map(serverHealthCheckup))
    // console.log(healthStatus) # Checking
    availableServers=servers.filter((_,idx)=>healthStatus[idx])
    // console.log(availableServers) # checking
}

setInterval(() => {
    healthChecks()
      .then(() => {
        console.log('Health check performed')
      })
      .catch((err) => {
        console.error('Health check failed', err)
      })
  }, 10000) // Every 10 seconds


// Algorithm used for balancing the load.
function roundrobin(){
    if (availableServers.length===0){return null}
    const server=availableServers[currentServerIdx%availableServers.length]
    currentServerIdx=(currentServerIdx+1) % availableServers.length
    // console.log("New Sever:",server)
    return server
}

const server=http.createServer((request,response)=>{
    const target=roundrobin()

    if(target){
        balancer.web(request,response,{target})
    }
    else{
        console.log('Else')
        response.writeHead(502)
        response.end("No Healthy available servers")
    }
})

console.log('Load balancer started on port 3000')
server.listen(3000)
