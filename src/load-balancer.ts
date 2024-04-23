import http from'http'
import httpProxy from 'http-proxy'
import { SERVER1_PORT, SERVER2_PORT } from './constants'

const servers=[
    `http://localhost:${SERVER1_PORT}`,
    `http://localhost:${SERVER2_PORT}`,
]

let availableServers=[...servers]
let currentServer=0

const balancer= httpProxy.createProxyServer({})

function serverHealthCheckup(server: string){
    return new Promise((resolve)=>{
        http.get(server,(response)=>{
            if (response.statusCode==200){
                resolve(true)
            }else{
                resolve(false)
            }
        }).on('error',()=>{
            resolve(false)
        })
    })
}

async function healthChecks(){
    const healthStatus= await Promise.all(servers.map(serverHealthCheckup))
    availableServers=servers.filter((_,idx)=>{healthStatus[idx]})
}

setInterval(()=>{
    healthChecks().then(()=>{
        console.log("Health of all server checked")
    }).
    catch((error)=>{
        console.log("Failed to do Health check",error)
    })
},10000) // For every 10000 milli secs
