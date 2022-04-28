const dgram = require('dgram');

var news = [
    "Borussia Dortmund wins German championship",
    "Tornado warning for the Bay Area",
    "More rain for the weekend",
    "Android tablets take over the world",
    "iPad2 sold out",
    "Nation's rappers down to last two samples"
 ];


const  server = dgram.createSocket('udp4'); 
const PORT = 8000;
const HOST = '127.0.0.1'
const  MCAST_ADDR = '230.185.192.108';

 server.on('listening' ,()=>{

    const address = server.address();
    console.log(`server listening ${address.address}:${address.port} \n`);
 })

 server.bind({
    address: HOST,
    port: PORT,
    exclusive: false
}, ()=>{
    server.setBroadcast(true);
    server.addMembership(MCAST_ADDR, HOST);
    server.setMulticastTTL(128);
})

setInterval(NewMessage, 3000);
function NewMessage (){
    var message = new Buffer.from(news[Math.floor(Math.random() * news.length)]);

    server.send(message, 0, message.length, PORT, MCAST_ADDR);
    console.log("Sent " + message + " to the wire...");
}


server.on('error', (err) =>{
    console.log(`server error:\n ${err.stack}`);
})