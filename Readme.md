# Own Load Balancer
Built the complete functioning load-balancer with roundrobin approach, along with continous server health check up

## How to try it 
1.  Open the command line or Terminal.
2.  Run `git clone https://github.com/tigerabrodi/load-balancer.git`.
3.  Then `cd load-balancer`.
4.  Install npm `npm install`.
5.  Open 3 new command prompts or Terminals.
6.  Start the load balancer `npm run laod-balancer` you should see "Load balancer started on port 3000" and periodical Healthcheck upadtes.
7.  Start the first server `npm run start-server1` , you should see "Server-1 is running at http://localhost:8080";
8.  Start the second server `npm run start-server2` , you should see "Server-2 is running at http://localhost:8081";
9.  Then send the curl request `curl http://localhost:3000` to see which server responds to your request.


## Thinks I am planning to do in this repo
- [X] Create load balancer server
- [X] create server-1 and server-2
- [X] Create more servers and down servers to test the system
- [ ] Explain about Load Balancer

